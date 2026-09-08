# AGENTS.md — AgendAI Backend

> **Ponto de entrada obrigatório** para qualquer IA neste repositório (`agendai-back-end/`).
> Autossuficiente sem a pasta externa do monorepo.
> Codex e OpenCode usam este arquivo como entrada.

**Última revisão documental:** 2026-09-08 (baseada no código atual).
**Prisma:** 6.4.0 — não tratar como 7.x.

---

## 0. Regras essenciais

1. Fluxo: **Route → middleware → Controller → UseCase → IRepository/Provider → infra**.
2. Erros de negócio: `AppError`. Resposta `{ success, data|message }`.
3. Validação de entrada: **Zod** nas rotas/schemas.
4. DI: registrar no `shared/container`. Não espalhar `new PrismaClient()`.
5. Operações de assinatura/estoque/fiado/comissão: preservar **atomicidade** (transações).
6. **Não existe `npm run lint`** neste package — não inventar.
7. DB produção: **`prisma migrate deploy`**, não `db push`.
8. Segredos só via env (nomes em `.env.example`); nunca commitar credenciais.
9. Graphify: [docs/agents/GRAPHIFY.md](docs/agents/GRAPHIFY.md).
10. Escopo mínimo; sem commit/PR automático sem pedido.

---

## 1. O que é esta API

API REST SaaS multi-tenant (Fastify 4 + TypeScript + Prisma 6 + PostgreSQL) para salões/barbearias: fila, agenda, CRM, pacotes, produtos/estoque, financeiro, comissões, assinaturas (Asaas / AbacatePay / Mercado Pago), WhatsApp (Evolution), e-mail (Resend), GCS, admin.

Prefixo: `/api` (exceto health conforme `app.ts`).

---

## 2. Inventários locais

| Doc | Conteúdo |
|---|---|
| [STRUCTURE.md](docs/agents/STRUCTURE.md) | Pastas, módulos, rotas, middlewares, integrações |
| [DOMAIN_MAP.md](docs/agents/DOMAIN_MAP.md) | Domínio → rotas → persistência |
| [PACKAGES.md](docs/agents/PACKAGES.md) | Dependências diretas |
| [SCRIPTS.md](docs/agents/SCRIPTS.md) | Scripts npm (inclui o que altera banco) |
| [BUSINESS_RULES.md](docs/agents/BUSINESS_RULES.md) | Invariantes |
| [ARCHITECTURE.md](docs/agents/ARCHITECTURE.md) | Clean Architecture + SOLID |
| [GRAPHIFY.md](docs/agents/GRAPHIFY.md) | Graphify e subagentes |

Detalhes históricos úteis: `AI_GUIDE.md`, `system-docs/MANUAL.md`, `system-docs/api.http`, `docs/RUNBOOK_MIGRATIONS.md` — **em conflito, prevalece este AGENTS.md + inventários**.

---

## 3. Comandos frequentes

Diretório: **`agendai-back-end/`**.

```bash
npm install
npx prisma generate
npm run dev
npm run typecheck
npm run test:unit
npm run docs:check
```

Scripts que **alteram banco:** `prisma:migrate*`, `db:push`, `prisma:seed`, `start:prod`, `security:audit-logs`. Ver [SCRIPTS.md](docs/agents/SCRIPTS.md).

`test:coverage` **não** configura provider de coverage no `vitest.config.mts` — não afirmar geração de relatório de cobertura.

---

## 4. Checklist de mudança

- [ ] Rota/middleware/Zod/container atualizados?
- [ ] UseCase sem acoplar SDK sem necessidade?
- [ ] Transação onde há invariante financeira/estoque?
- [ ] Teste unitário com mock de repository quando regra muda?
- [ ] `docs:check` se package/scripts/estrutura documentada mudou?
