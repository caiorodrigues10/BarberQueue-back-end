import { DemandPredictor, WeatherDataPoint, WeatherForecastPoint, DemandPrediction, classifyMaturity } from './DemandPredictor';
import { prisma } from '@/libs/prismaClient';

export type ConfidenceLevel = 'insufficient' | 'preliminary' | 'reliable';

export interface EnhancedDemandPrediction extends DemandPrediction {
  confidence: ConfidenceLevel;
  factors: string[];
  scheduleDensity?: number;
  dayOfWeekPattern?: number;
  seasonalityFactor?: number;
  cancellationRate?: number;
  noShowRate?: number;
  recurringServiceScore?: number;
}

export class EnhancedDemandPredictor {
  private basePredictor: DemandPredictor;
  private barbershopId: string;

  constructor(barbershopId: string) {
    this.basePredictor = new DemandPredictor();
    this.barbershopId = barbershopId;
  }

  async train(data: WeatherDataPoint[]): Promise<void> {
    this.basePredictor.train(data);
  }

  async predict(forecast: WeatherForecastPoint[], totalHistoryDays: number): Promise<EnhancedDemandPrediction[]> {
    const basePredictions = this.basePredictor.predict(forecast, totalHistoryDays);
    
    const [
      scheduleDensity,
      dayOfWeekPatterns,
      seasonalityPatterns,
      cancellationRate,
      noShowRate,
      recurringServiceScore
    ] = await Promise.all([
      this.getScheduleDensity(),
      this.getDayOfWeekPatterns(),
      this.getSeasonalityPatterns(),
      this.getCancellationRate(),
      this.getNoShowRate(),
      this.getRecurringServiceScore()
    ]);

    const confidence = this.calculateConfidence(totalHistoryDays);

    return basePredictions.map((pred, i) => {
      const factors: string[] = [];
      let adjustedQueue = pred.predictedQueue;

      if (scheduleDensity !== undefined) {
        const densityFactor = scheduleDensity > 0.7 ? 1.1 : scheduleDensity < 0.3 ? 0.9 : 1;
        adjustedQueue = Math.round(adjustedQueue * densityFactor);
        if (scheduleDensity > 0.7) factors.push('Alta densidade de agenda');
        if (scheduleDensity < 0.3) factors.push('Baixa densidade de agenda');
      }

      const dayOfWeek = new Date(pred.date).getDay();
      if (dayOfWeekPatterns[dayOfWeek] !== undefined) {
        const dowFactor = dayOfWeekPatterns[dayOfWeek];
        adjustedQueue = Math.round(adjustedQueue * dowFactor);
        if (dowFactor > 1.1) factors.push(`Padrão de ${this.getDayName(dayOfWeek)} acima da média`);
        if (dowFactor < 0.9) factors.push(`Padrão de ${this.getDayName(dayOfWeek)} abaixo da média`);
      }

      const month = new Date(pred.date).getMonth();
      if (seasonalityPatterns[month] !== undefined) {
        const seasonFactor = seasonalityPatterns[month];
        adjustedQueue = Math.round(adjustedQueue * seasonFactor);
        if (seasonFactor > 1.1) factors.push(`Sazonalidade de ${this.getMonthName(month)} elevada`);
        if (seasonFactor < 0.9) factors.push(`Sazonalidade de ${this.getMonthName(month)} reduzida`);
      }

      if (cancellationRate > 0.1) {
        const cancelFactor = 1 - (cancellationRate * 0.5);
        adjustedQueue = Math.round(adjustedQueue * cancelFactor);
        factors.push(`Taxa de cancelamento: ${(cancellationRate * 100).toFixed(1)}%`);
      }

      if (noShowRate > 0.1) {
        const noShowFactor = 1 - (noShowRate * 0.5);
        adjustedQueue = Math.round(adjustedQueue * noShowFactor);
        factors.push(`Taxa de no-show: ${(noShowRate * 100).toFixed(1)}%`);
      }

      if (recurringServiceScore > 0) {
        const recurringFactor = 1 + (recurringServiceScore * 0.1);
        adjustedQueue = Math.round(adjustedQueue * recurringFactor);
        factors.push(`Serviços recorrentes: +${(recurringServiceScore * 100).toFixed(0)}%`);
      }

      return {
        ...pred,
        predictedQueue: adjustedQueue,
        confidence,
        factors,
        scheduleDensity,
        dayOfWeekPattern: dayOfWeekPatterns[dayOfWeek],
        seasonalityFactor: seasonalityPatterns[month],
        cancellationRate,
        noShowRate,
        recurringServiceScore,
      };
    });
  }

  private calculateConfidence(totalHistoryDays: number): ConfidenceLevel {
    if (totalHistoryDays < 30) return 'insufficient';
    if (totalHistoryDays < 90) return 'preliminary';
    return 'reliable';
  }

  private async getScheduleDensity(): Promise<number | undefined> {
    try {
      const now = new Date();
      const next7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      const [appointments, schedules] = await Promise.all([
        prisma.appointment.findMany({
          where: {
            barbershopId: this.barbershopId,
            date: { gte: now, lte: next7Days },
            status: { in: ['CONFIRMED', 'CHECKED_IN'] },
          },
          select: { date: true, time: true },
        }),
        prisma.schedule.findMany({
          where: { barbershopId: this.barbershopId, isOpen: true },
          select: { dayOfWeek: true, openTime: true, closeTime: true },
        }),
      ]);

      const totalSlots = schedules.length * 8 * 7;
      const bookedSlots = appointments.length;
      return totalSlots > 0 ? bookedSlots / totalSlots : undefined;
    } catch {
      return undefined;
    }
  }

  private async getDayOfWeekPatterns(): Promise<number[]> {
    try {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

      const appointments = await prisma.appointment.findMany({
        where: {
          barbershopId: this.barbershopId,
          date: { gte: ninetyDaysAgo },
          status: { in: ['CONFIRMED', 'COMPLETED', 'CHECKED_IN'] },
        },
        select: { date: true },
      });

      const dayCounts = new Array(7).fill(0);
      const dayTotals = new Array(7).fill(0);

      appointments.forEach((apt: typeof appointments[number]) => {
        const day = new Date(apt.date).getDay();
        dayCounts[day]++;
        dayTotals[day]++;
      });

      const avgPerDay = dayTotals.reduce((s, c) => s + c, 0) / 7;
      return dayCounts.map(c => avgPerDay > 0 ? c / avgPerDay : 1);
    } catch {
      return new Array(7).fill(1);
    }
  }

  private async getSeasonalityPatterns(): Promise<number[]> {
    try {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      const appointments = await prisma.appointment.findMany({
        where: {
          barbershopId: this.barbershopId,
          date: { gte: oneYearAgo },
          status: { in: ['CONFIRMED', 'COMPLETED', 'CHECKED_IN'] },
        },
        select: { date: true },
      });

      const monthCounts = new Array(12).fill(0);
      appointments.forEach((apt: typeof appointments[number]) => {
        const month = new Date(apt.date).getMonth();
        monthCounts[month]++;
      });

      const avgPerMonth = monthCounts.reduce((s, c) => s + c, 0) / 12;
      return monthCounts.map(c => avgPerMonth > 0 ? c / avgPerMonth : 1);
    } catch {
      return new Array(12).fill(1);
    }
  }

  private async getCancellationRate(): Promise<number> {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const [total, cancelled] = await Promise.all([
        prisma.appointment.count({
          where: {
            barbershopId: this.barbershopId,
            date: { gte: thirtyDaysAgo },
          },
        }),
        prisma.appointment.count({
          where: {
            barbershopId: this.barbershopId,
            date: { gte: thirtyDaysAgo },
            status: 'CANCELLED',
          },
        }),
      ]);

      return total > 0 ? cancelled / total : 0;
    } catch {
      return 0;
    }
  }

  private async getNoShowRate(): Promise<number> {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const [total, noShows] = await Promise.all([
        prisma.appointment.count({
          where: {
            barbershopId: this.barbershopId,
            date: { gte: thirtyDaysAgo },
          },
        }),
        prisma.appointment.count({
          where: {
            barbershopId: this.barbershopId,
            date: { gte: thirtyDaysAgo },
            status: 'NO_SHOW',
          },
        }),
      ]);

      return total > 0 ? noShows / total : 0;
    } catch {
      return 0;
    }
  }

  private async getRecurringServiceScore(): Promise<number> {
    try {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

      const appointments = await prisma.appointment.findMany({
        where: {
          barbershopId: this.barbershopId,
          date: { gte: ninetyDaysAgo },
          status: { in: ['CONFIRMED', 'COMPLETED', 'CHECKED_IN'] },
          clientId: { not: null },
        },
        select: { clientId: true, date: true, serviceId: true },
        orderBy: { date: 'asc' },
      });

      const clientServiceIntervals = new Map<string, number[]>();
      
      appointments.forEach((apt: typeof appointments[number]) => {
        const key = `${apt.clientId}-${apt.serviceId}`;
        if (!clientServiceIntervals.has(key)) {
          clientServiceIntervals.set(key, []);
        }
        clientServiceIntervals.get(key)!.push(new Date(apt.date).getTime());
      });

      let recurringCount = 0;
      let totalClients = 0;

      clientServiceIntervals.forEach((dates) => {
        if (dates.length < 2) return;
        totalClients++;

        const intervals = [];
        for (let i = 1; i < dates.length; i++) {
          intervals.push(dates[i] - dates[i - 1]);
        }

        const avgInterval = intervals.reduce((s, i) => s + i, 0) / intervals.length;
        const variance = intervals.reduce((s, i) => s + Math.pow(i - avgInterval, 2), 0) / intervals.length;
        const stdDev = Math.sqrt(variance);
        const cv = avgInterval > 0 ? stdDev / avgInterval : 1;

        if (cv < 0.3 && avgInterval < 60 * 24 * 60 * 60 * 1000) {
          recurringCount++;
        }
      });

      return totalClients > 0 ? recurringCount / totalClients : 0;
    } catch {
      return 0;
    }
  }

  private getDayName(day: number): string {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return days[day] || 'Desconhecido';
  }

  private getMonthName(month: number): string {
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                   'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return months[month] || 'Desconhecido';
  }

  isTrained(): boolean {
    return this.basePredictor.isTrained();
  }

  runBacktest(data: WeatherDataPoint[]) {
    return this.basePredictor.runBacktest(data);
  }
}