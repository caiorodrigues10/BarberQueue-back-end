import type { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';

/**
 * PostgreSQL advisory lock wrapper for serializing concurrent access.
 * Uses Prisma's $queryRawUnsafe for raw SQL.
 */
export class AdvisoryLock {
  constructor(private prisma: PrismaClient) {}

  /**
   * Acquires a session-level advisory lock.
   * The lock is held until the connection is released.
   * Returns a release function.
   */
  async acquire(lockId: number): Promise<() => Promise<void>> {
    await this.prisma.$executeRawUnsafe(
      'SELECT pg_advisory_lock($1)',
      lockId
    );
    return async () => {
      await this.prisma.$executeRawUnsafe(
        'SELECT pg_advisory_unlock($1)',
        lockId
      );
    };
  }

  /**
   * Tries to acquire an advisory lock without blocking.
   * Returns the release function if acquired, null otherwise.
   */
  async tryAcquire(lockId: number): Promise<(() => Promise<void>) | null> {
    const result = await this.prisma.$queryRawUnsafe(
      'SELECT pg_try_advisory_lock($1) as acquired',
      lockId
    ) as Array<{ acquired: boolean }>;
    if (result[0]?.acquired) {
      return async () => {
        await this.prisma.$executeRawUnsafe(
          'SELECT pg_advisory_unlock($1)',
          lockId
        );
      };
    }
    return null;
  }

  /**
   * Generates a deterministic lock ID from barbershop + date.
   * Uses MD5 hash to avoid collisions from 4-byte buffer truncation.
   */
  static generateLockId(barbershopId: string, date: string): number {
    const hash = createHash('md5').update(`${barbershopId}:${date}`).digest();
    return hash.readUInt32BE(0);
  }
}
