# Estrutura — Backend (`agendai-back-end`)

```
agendai-back-end/
├── AGENTS.md
├── AI_GUIDE.md                 ← guia histórico (aponta para AGENTS.md canônico)
├── package.json
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── system-docs/                ← MANUAL.md, api.http
├── docs/                       ← runbooks, pentest, agents/
│   └── agents/                 ← inventários deste manual
├── scripts/
└── src/
    ├── modules/                ← domínios (auth, queue, payments, products, …)
    ├── shared/
    │   ├── container/          ← DI (tsyringe) + providers
    │   ├── infra/http/         ← app, server, middlewares, routes
    │   ├── infra/cron/
    │   ├── infra/queue/        ← BullMQ
    │   ├── services/           ← Evolution, idempotency, …
    │   ├── constants/
    │   └── errors/AppError.ts
    ├── libs/prismaClient.ts
    ├── config/
    └── tests/                  ← setup, integration, pentest
```

## Módulos (`src/modules/`)

`admin`, `appointments`, `auth`, `barbershops`, `clients`, `commissions`, `contact`, `crm`, `email`, `expenses`, `feed`, `fiado`, `notifications`, `packages`, `payments`, `plans`, `posts`, `products`, `queue`, `referrals`, `serviceCategories`, `services`, `shared`, `subscriptions`, `users`.

## Rotas HTTP (`shared/infra/http/routes/`)

Registradas via `api.ts` / `index.ts`. Inclui: auth, users, services, barbershops, queue, appointments, admin, adminFinancial, payments, webhooks, plans, fiado, expenses, barbershopFinancial, categories, feed, posts, notifications, contact, referrals, clients, packages, products, commissions, crm, ws.

Prefixo da API: **`/api`** (exceto health/métricas conforme app).

## Middlewares

`authenticate`, `authenticateOptional`, `authorize`, `checkSubscription`, `checkDashboardAccess`, `checkProductsInventoryAccess`, `setRlsContext`, `subscriptionAccessCache`, `verifyRecaptcha`, `correlationId`.

## Providers / integrações (arquivos)

| Integração | Implementação | Env (nomes) |
|---|---|---|
| Mercado Pago | `payments/services/MercadoPagoService.ts` | `MERCADOPAGO_*` |
| AbacatePay | `payments/services/AbacatePayService.ts` | `ABACATEPAY_*` |
| Asaas | `payments/services/AsaasService.ts` | `ASAAS_*` |
| Evolution WhatsApp | `shared/services/evolutionApiService.ts` (+ `whatsappNotificationService` shim) | `EVOLUTION_*` (`ZAPI_*` no `.env.example` é vestígio; sem uso no código) |
| Resend | `ResendEmailProvider` | `RESEND_*`, `EMAIL_*` |
| GCS | `GcsStorageProvider` | `GCS_*` |
| Redis / BullMQ | filas + cache assinatura | `REDIS_URL` |
| Sentry / OTEL | opcional | `SENTRY_DSN`, `OTEL_*` |
| Google OAuth | auth Google | `GOOGLE_CLIENT_*` |

Código existente ≠ habilitado em todo ambiente ≠ validado em produção.
