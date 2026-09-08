# Regras de negócio — Backend

Invariantes confirmadas no código/testes. Divergências com regra de produto aprovada → pendência documental (não alterar comportamento só por doc).

## Trial e assinatura

- `TRIAL_DAYS = 30` em `shared/constants/subscription.ts`.
- Trial calendário **≠** inadimplência: não bloquear CPF só porque o trial acabou.
- Status bloqueados nas APIs operacionais: trial expirado sem assinatura válida, ou `PAST_DUE` / `CANCELED` / `UNPAID` → tipicamente **402** `SUBSCRIPTION_REQUIRED`.
- Inadimplência real pode levar a `BlockedEntity` / **403** `CPF_BLOCKED`.
- Pagamento aprovado (webhook) → desbloqueio + assinatura `ACTIVE`.
- `MASTER_ADMIN` isento de `checkSubscription`.
- Dashboard/insights: `checkDashboardAccess` / **403** `DASHBOARD_REQUIRED` no plano sem dashboard (exceto trial Pro).

## Tenant, permissões, RLS

- Tenant = `Barbershop`.
- `authorize(roles)` + permissões de employee onde aplicável.
- `setRlsContext` para isolamento; não assumir que todo endpoint já aplica RLS — verificar rota.

## Fila / agenda / híbrido

- Modos de operação do salão restringem join/booking (`shopOpenState`, WhatsApp obrigatório em alguns fluxos).
- Fila pública vs staff mascarada conforme auth.

## Pacotes

- Receita na venda do pacote (`pricePaid`); consumo/agenda debita sessão; cancelamento `CONFIRMED` restaura crédito (ver `packages.spec.ts`).

## Fiado / despesas / comissões

- Fiado com pagamentos parciais; validação de telefone/valores nos schemas.
- Comissões: módulo dedicado + testes de validação — confirmar regras ao alterar fechamento.

## Produtos / estoque / retail

- Estoque insuficiente → erro de negócio (`INSUFFICIENT_STOCK`), não 500 genérico.
- SKU/barcode únicos por tenant (índices parciais + asserts).
- Venda/estorno: idempotência e prevenção de duplicidade financeira (serviços de idempotency / refunds).
- Resumos financeiros de produtos devem **liquidar estornos** (net), não só bruto.

## Notificações

- Evolution WhatsApp: opcional; sem credenciais = no-op / falha isolada.
- E-mail Resend + filas BullMQ; allowlist em dev.
- Crons: lembretes de agenda, publisher de posts, etc.

## Pagamentos

Providers **implementados:** Asaas, AbacatePay, Mercado Pago.

- **Produção (default):** só Asaas (`paymentProviders.ts` fallback `["ASAAS"]`).
- Override: env `PAYMENT_PROVIDERS_ENABLED`.
- Webhooks com verificação de assinatura/token; modo inseguro só com flag explícita de não-produção.
