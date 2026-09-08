# Claude

Antes de qualquer alteração neste repositório backend, leia **[AGENTS.md](./AGENTS.md)** e `docs/agents/`.

Arquitetura: Route → Controller → UseCase → contratos → infra. Prisma **6.4**. Não há script `lint`. Migrations de produção: `migrate deploy`.
