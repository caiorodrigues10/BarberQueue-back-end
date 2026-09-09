# Graph Report - agendai-back-end  (2026-09-08)

## Corpus Check
- 607 files · ~211,545 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 3835 nodes · 9296 edges · 239 communities (171 shown, 68 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 264 edges (avg confidence: 0.78)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `529fad4f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- api.ts
- IFiadoResponseDTO
- IServiceResponseDTO
- PostsController.ts
- IExpenseResponseDTO
- AbacatePayService
- index.ts
- compilerOptions
- IBarbershopRepository
- AppError
- 💈 AgendAI — Backend API
- IBarbershopResponseDTO
- normalizeCpf
- IStorageProvider
- appointments.spec.ts
- IPlanResponseDTO
- IAppointmentResponseDTO
- auth.routes.ts
- MercadoPagoService
- IUserResponseDTO
- RegisterUseCase.ts
- IPaymentDTO.ts
- IPaymentResponseDTO
- SubscribeUseCase.ts
- AgendAI Back‑end — Manual do Sistema
- blockedEntityService.ts
- AppointmentController.ts
- LoginUseCase.ts
- IQueueRepository
- BarbershopFinancialController.ts
- queue.spec.ts
- LogoController.ts
- emailWorker.ts
- IPaymentRepository
- paymentSchemas.ts
- monitor-routes.js
- scripts
- planEconomics.ts
- index.ts
- Referência Completa de Rotas
- appointmentUseCases.ts
- payments.spec.ts
- IQueueItemResponseDTO
- assertAppointmentBookable.ts
- referralService.ts
- index.ts
- .findById
- ContactController.ts
- IEmailProvider.ts
- devDependencies
- CreateBarbershopUseCase
- server.ts
- QueueRepository
- GcsStorageProvider
- 9. Como Criar um Novo Módulo
- Barbearias
- AppointmentRepository
- 12. Erros Comuns e Como Evitá-los
- AdminDashboardController.ts
- IAppointmentRepository
- GetQueueMetricsUseCase
- 🤖 AI_GUIDE.md — Guia Completo para IAs no Projeto AgendAI
- Categorias
- app.ts
- ListBarbershopsUseCase.ts
- ListQueueController.ts
- Google Cloud Storage — setup AgendAI
- 13. Regras de Negócio Críticas
- Fiado
- GetBarbershopUseCase.ts
- CheckInAppointmentController.ts
- PlansController.ts
- enqueueWhatsApp
- 6. Sistema de Autenticação e Autorização
- 8. Banco de Dados e Prisma
- dependencies
- Passo a passo
- Despesas
- Pagamentos
- 3. Arquitetura e Padrões
- 7. Sistema de Assinaturas e Bloqueio de CPF
- Apêndice B — Endpoints por Role
- Agendamentos
- Fila (Queue)
- Serviços
- setup-gcs.sh
- VerifyEmailController.ts
- PlansController
- StaffUserController
- CrmController
- 14. Integrações Externas
- 5. Convenções de Código
- Admin — Entidades Bloqueadas
- CrmRepository.ts
- Admin — Usuários
- seed-test.js
- postgres.ts
- package.json
- Admin — Assinaturas
- Admin — Barbearias
- Admin — Planos
- Assinaturas
- Auth
- Financeiro da Barbearia
- fastify.d.ts
- bcryptjs
- busboy
- dayjs
- disposable-email-domains
- @fastify/cors
- AGENTS.md
- @fastify/multipart
- @fastify/rate-limit
- @fastify/swagger
- @fastify/swagger-ui
- @google-cloud/storage
- ioredis
- jsonwebtoken
- ProcessAbacateWebhookController.ts
- node-cron
- CreateUserUseCase.ts
- @prisma/client
- reflect-metadata
- resend
- @resvg/resvg-js
- tsconfig-paths
- tsyringe
- zod
- tsup
- tsx
- @types/bcryptjs
- @types/node
- @types/node-cron
- authSchemas.ts
- vite-tsconfig-paths
- vitest
- ensure-gcs-key.sh
- emailValidationService.spec.ts
- disposable-email-domains.d.ts
- setup.ts
- vitest.config.mts
- SubscribeController.ts
- GoogleLoginUseCase
- Pentest local — auth, sessão, pagamentos e webhooks (21 ago 2026)
- DeleteBarbershopUseCase
- sendWhatsAppMessage
- Pentest local — inputs, upload, XSS e exposição pública
- UpdateBarbershopUseCase
- QueueRepository
- Pentest local autorizado
- ListBarbershopsUseCase
- bruteForceProtection.ts
- RefundPaymentUseCase
- cancelSubscription.spec.ts
- PENTEST_REPORT_TEMPLATE.md
- fastify
- @prisma/adapter-pg
- @testcontainers/postgresql
- @types/jsonwebtoken
- app.security.spec.ts
- AdminDashboardController.ts
- IQueueRepository
- issueAuthSession.ts
- AsaasService.ts
- sendWhatsAppMessage
- assertAppointmentBookable.ts
- ExportUserDataUseCase
- AdminNotificationController.ts
- AdminNotificationController
- google-auth-library
- @opentelemetry/api
- JoinQueueController.ts
- disposable-email-domains
- @opentelemetry/resources
- @opentelemetry/sdk-node
- @opentelemetry/semantic-conventions
- pino
- @sentry/node
- ListSubscriptionsController
- queue.spec.ts
- GetPaymentStatusUseCase
- ForgotPasswordUseCase
- payments.routes.ts
- payments.routes.ts
- AdminBarbershopController
- ResetPasswordUseCase
- bruteForceProtection.spec.ts
- @fastify/rate-limit
- @google-cloud/storage
- pg
- @upstash/redis
- Runbook: Aplicar migrations do backend em Staging/Produção
- IClientPackageRepository
- packageUseCases.ts
- referrals.routes.ts
- MercadoPagoService
- CompleteServiceUseCase.ts
- authenticate.ts
- assertOperationEnabled.ts
- index.ts
- CancelSubscriptionController.ts
- check-docs.mjs
- ProcessAsaasWebhookUseCase.ts
- ExportFinancialDataUseCase.ts
- resendWebhookService.ts
- GetPaymentStatusUseCase
- AGENTS.md — AgendAI Backend
- IPaymentRepository
- Arquitetura backend — Clean Architecture e SOLID
- queueDuplicate.ts
- Estrutura — Backend (`agendai-back-end`)
- calendar.routes.ts
- CheckInAppointmentUseCase.ts
- SetupTrialCardUseCase
- onboarding.routes.ts
- verifyRecaptcha.ts
- ResetPasswordUseCase
- notifications.routes.ts
- .barbershopId
- seed.ts
- Auth
- Sistema de Assinaturas
- users.routes.ts
- bcryptjs
- ListSubscriptionsController
- copilot-instructions.md
- google-auth-library
- ioredis
- @opentelemetry/exporter-prometheus
- @testcontainers/postgresql
- typescript
- DeleteAvatarUseCase
- DailyCloseoutController
- subscribe.spec.ts
- @opentelemetry/instrumentation-fastify

## God Nodes (most connected - your core abstractions)
1. `AppError` - 168 edges
2. `prisma` - 142 edges
3. `authenticate()` - 73 edges
4. `setRlsContext()` - 67 edges
5. `authorize()` - 66 edges
6. `checkSubscription()` - 62 edges
7. `IBarbershopRepository` - 58 edges
8. `getRedisConnection()` - 49 edges
9. `IPaymentResponseDTO` - 41 edges
10. `apiRoutes()` - 39 edges

## Surprising Connections (you probably didn't know these)
- `qualifyReferralOnPayment()` --indirect_call--> `base()`  [INFERRED]
  src/modules/referrals/services/referralService.ts → src/modules/products/catalogTemplates.ts
- `buildAuthProbeApp()` --indirect_call--> `authenticate()`  [INFERRED]
  src/tests/pentest/auth-session.pentest.spec.ts → src/shared/infra/http/middlewares/authenticate.ts
- `analyticsRoutes()` --indirect_call--> `checkSubscription()`  [INFERRED]
  src/modules/analytics/routes/analytics.routes.ts → src/shared/infra/http/middlewares/checkSubscription.ts
- `reviewRoutes()` --indirect_call--> `checkSubscription()`  [INFERRED]
  src/modules/appointments/routes/review.routes.ts → src/shared/infra/http/middlewares/checkSubscription.ts
- `notificationsRoutes()` --indirect_call--> `SendAppointmentRemindersUseCase`  [INFERRED]
  src/shared/infra/http/routes/notifications.routes.ts → src/modules/appointments/useCases/appointmentUseCases.ts

## Import Cycles
- None detected.

## Communities (239 total, 68 thin omitted)

### Community 0 - "api.ts"
Cohesion: 0.17
Nodes (30): activationRoutes(), analyticsRoutes(), ActivationController, reviewRoutes(), reviewSchema, cashMovementRoutes(), ExportFinancialDataUseCase, injectable (+22 more)

### Community 1 - "IFiadoResponseDTO"
Cohesion: 0.06
Nodes (38): FiadoController, FiadoStatus, ICreateFiadoDTO, ICreateFiadoPaymentDTO, IFiadoListQuery, IFiadoPaymentResponseDTO, IFiadoResponseDTO, IFiadoSummary (+30 more)

### Community 2 - "IServiceResponseDTO"
Cohesion: 0.09
Nodes (22): CompleteAppointmentController, completeAppointmentSchema, CompleteAppointmentUseCase, inject, injectable, ProductsController, shopId(), adjustmentSchema (+14 more)

### Community 3 - "PostsController.ts"
Cohesion: 0.06
Nodes (40): ClientController, ICreateSalonClientDTO, ISalonClientAppointmentDTO, ISalonClientListQuery, ISalonClientPackageSummaryDTO, ISalonClientResponseDTO, IUpdateSalonClientDTO, MockSalonClientRepository (+32 more)

### Community 4 - "IExpenseResponseDTO"
Cohesion: 0.05
Nodes (32): GetWeatherForecastController, GetWeatherForecastUseCase, inject, injectable, CrmController, resolveCampaignClientIds(), resolveShop(), CrmCampaignListItem (+24 more)

### Community 5 - "AbacatePayService"
Cohesion: 0.06
Nodes (28): ICreateServiceDTO, IServiceResponseDTO, IUpdateServiceDTO, MockServiceRepository, ServiceRepository, IServiceRepository, createServiceSchema, updateServiceSchema (+20 more)

### Community 6 - "index.ts"
Cohesion: 0.07
Nodes (35): logger, computeProratedAmount(), findApprovedPayment(), getProratedRefundInfo(), issueProratedRefund(), logger, ProratedRefundResult, abacateMock (+27 more)

### Community 7 - "compilerOptions"
Cohesion: 0.08
Nodes (25): ExpenseController, ExpenseRecurrence, ExpenseType, ICreateExpenseDTO, IExpenseListQuery, IExpenseResponseDTO, IExpenseSummary, IUpdateExpenseDTO (+17 more)

### Community 8 - "IBarbershopRepository"
Cohesion: 0.08
Nodes (44): connectSchema, WhatsAppConnectionController, assertShopAccess(), detachEvolutionInstanceWithTimeout(), ShopWhatsAppDto, ShopWhatsAppStatus, inject, injectable (+36 more)

### Community 9 - "AppError"
Cohesion: 0.07
Nodes (30): billingAddressSchema, cardPayerSchema, CreateCardPaymentInput, createCardPaymentSchema, CreatePixPaymentInput, createPixPaymentSchema, getPaymentStatusSchema, identificationSchema (+22 more)

### Community 10 - "💈 AgendAI — Backend API"
Cohesion: 0.06
Nodes (36): IConfirmLogoDTO, GetLogoUploadUrlUseCase, IGetLogoUploadUrlDTO, IGetLogoUploadUrlResult, inject, injectable, ADMIN, otherOwner (+28 more)

### Community 11 - "IBarbershopResponseDTO"
Cohesion: 0.08
Nodes (27): ClientPackageController, resolveBarbershopId(), ServicePackageController, BookClientPackageInput, bookClientPackageSchema, CreateServicePackageInput, createServicePackageSchema, dateField (+19 more)

### Community 12 - "normalizeCpf"
Cohesion: 0.15
Nodes (16): assertPaymentProviderEnabled(), EnabledPaymentProvider, enabledPaymentProviders(), IInvoiceResponseDTO, ISubscriptionResponseDTO, SubscriptionStatus, logger, inferBillingCycle() (+8 more)

### Community 13 - "IStorageProvider"
Cohesion: 0.07
Nodes (35): AdminUserController, BlockedEntityAdminController, adminListBlockedEntitiesQuerySchema, BlockInput, blockSchema, UnblockInput, unblockSchema, logger (+27 more)

### Community 14 - "appointments.spec.ts"
Cohesion: 0.13
Nodes (21): BusinessSegment, ManualShopStatus, OpeningMode, OperationMode, ScheduleExceptionDTO, ShopOpenStateDTO, ICreateBarbershopDTO, IUpdateBarbershopDTO (+13 more)

### Community 15 - "IPlanResponseDTO"
Cohesion: 0.10
Nodes (33): ChargeTrialEndedSubscriptionsUseCase, injectable, getProcessRole(), shouldRunApi(), shouldRunCrons(), shouldRunWorkers(), VALID_ROLES, ALLOWED_TABLES (+25 more)

### Community 16 - "IAppointmentResponseDTO"
Cohesion: 0.05
Nodes (37): ./*, config/*, dist, dtos/*, ES2022, libs/*, modules/*, node_modules (+29 more)

### Community 17 - "auth.routes.ts"
Cohesion: 0.11
Nodes (16): IBillingAddressDTO, ICardPayerDTO, ICreateCardPaymentDTO, ICreatePixPaymentDTO, IPixQrCodeDTO, MercadoPagoService, MPPaymentResponse, injectable (+8 more)

### Community 18 - "MercadoPagoService"
Cohesion: 0.14
Nodes (9): GetBarbershopController, ListPublicStaffUseCase, inject, injectable, ListBarbershopsController, ListBarbershopsUseCase, inject, injectable (+1 more)

### Community 19 - "IUserResponseDTO"
Cohesion: 0.09
Nodes (16): CancelPaymentController, CancelPaymentUseCase, logger, inject, injectable, ListPaymentsController, ListPaymentsUseCase, inject (+8 more)

### Community 20 - "RegisterUseCase.ts"
Cohesion: 0.13
Nodes (14): AppointmentStatus, IAppointmentResponseDTO, IAvailabilitySlotDTO, ICreateAppointmentDTO, IListAppointmentsQuery, IUpdateAppointmentDTO, AppointmentRepository, AppointmentWithRelations (+6 more)

### Community 21 - "IPaymentDTO.ts"
Cohesion: 0.04
Nodes (50): sensitiveRoutes, adapter, hasSslMode, pool, prisma, EnrichedBarbershop, ExpenseRow, FiadoRow (+42 more)

### Community 22 - "IPaymentResponseDTO"
Cohesion: 0.12
Nodes (14): AbacateCheckout, AbacateCustomer, AbacateProduct, CreateCheckoutInput, EnsureProductInput, allowInsecureWebhooks(), ProcessAbacateWebhookController, RequestWithRawBody (+6 more)

### Community 23 - "SubscribeUseCase.ts"
Cohesion: 0.05
Nodes (30): RecordActivationEventUseCase, injectable, AppointmentController, IAppointmentRepository, ADMIN, otherOwner, buildQueueUpdateMessage(), buildReminderMessage() (+22 more)

### Community 24 - "AgendAI Back‑end — Manual do Sistema"
Cohesion: 0.43
Nodes (5): AdminDashboardController, formatLabel(), generateTimeSlots(), getPeriodConfig(), Period

### Community 25 - "blockedEntityService.ts"
Cohesion: 0.11
Nodes (11): AdminAuditLogController, AdminNotificationController, AdminReferralsController, adminRoutes(), auditLogController, barbershopController, blockedEntityController, dashboardController (+3 more)

### Community 26 - "AppointmentController.ts"
Cohesion: 0.10
Nodes (19): assertRateLimit(), ContactController, hits, contactTopics, SubmitContactInput, submitContactSchema, SubmitContactMessageUseCase, injectable (+11 more)

### Community 27 - "LoginUseCase.ts"
Cohesion: 0.12
Nodes (29): buildPrompt(), callAnthropic(), callDeepseek(), callGemini(), callGroq(), callMistral(), callOpenAI(), DEFAULT_PROVIDER_ORDER (+21 more)

### Community 28 - "IQueueRepository"
Cohesion: 0.17
Nodes (13): GetSubscriptionController, loadActivePlans(), SubscriptionEconomicsController, computePlanEconomics(), computePlatformEconomics(), inferTierKey(), monthsBetween(), PlanBillingCycle (+5 more)

### Community 29 - "BarbershopFinancialController.ts"
Cohesion: 0.17
Nodes (14): blockOwnerCpfs(), SUBSCRIPTION_STATUS_CONFIG, checkProductsInventoryAccess(), checkSubscription(), getCachedAccess(), getRedis(), refreshSubscriptionCache(), setCachedAccess() (+6 more)

### Community 30 - "queue.spec.ts"
Cohesion: 0.12
Nodes (16): issueAuthSession(), mapRole(), UserLike, GoogleLoginUseCase, mockFindByEmail, mockUser, mockVerifyIdToken, prismaMock (+8 more)

### Community 31 - "LogoController.ts"
Cohesion: 0.11
Nodes (13): createBarbershopSchema, phoneBR, scheduleItemSchema, updateBarbershopSchema, updateScheduleSchema, CreateBarbershopController, CreateBarbershopUseCase, inject (+5 more)

### Community 32 - "emailWorker.ts"
Cohesion: 0.08
Nodes (23): ClientPackageStatus, IClientPackageResponseDTO, ICreateServicePackageDTO, IPackageSalesSummary, ISellClientPackageDTO, IServicePackageResponseDTO, IUpdateServicePackageDTO, PackagePaymentMethod (+15 more)

### Community 33 - "IPaymentRepository"
Cohesion: 0.18
Nodes (8): ICreatePlanDTO, IPlanResponseDTO, IUpdatePlanDTO, PlanBillingCycle, MockPlanRepository, PlanRepository, select, IPlanRepository

### Community 34 - "paymentSchemas.ts"
Cohesion: 0.14
Nodes (3): IQueueItemResponseDTO, MockQueueRepository, QueueRepository

### Community 35 - "monitor-routes.js"
Cohesion: 0.16
Nodes (8): inject, ICreateUserDTO, RoleLiteral, IUserResponseDTO, MockUserRepository, publicSelect, UserRepository, IUserRepository

### Community 36 - "scripts"
Cohesion: 0.07
Nodes (28): scripts, build, db:migrate:status, db:push, db:push:prod, db:studio, db:validate-schema, dev (+20 more)

### Community 37 - "planEconomics.ts"
Cohesion: 0.08
Nodes (13): AsaasBillingType, AsaasCustomer, AsaasPayment, AsaasPixQrCode, AsaasRefund, AsaasService, logger, injectable (+5 more)

### Community 38 - "index.ts"
Cohesion: 0.07
Nodes (14): LoyaltyController, AdjustManualInput, adjustManualSchema, ConfigureLoyaltyProgramInput, configureLoyaltyProgramSchema, RecordCashbackInput, recordCashbackSchema, RecordVisitInput (+6 more)

### Community 39 - "Referência Completa de Rotas"
Cohesion: 0.22
Nodes (17): InventoryEngine, lockProduct(), injectable, Tx, writeMovement(), CatalogProductSnapshot, namesToSkip(), nextStockQty() (+9 more)

### Community 40 - "appointmentUseCases.ts"
Cohesion: 0.09
Nodes (14): IQueueRepository, DeleteQueueItemController, DeleteQueueItemUseCase, inject, injectable, inject, inject, ALLOWED_TRANSITIONS (+6 more)

### Community 41 - "payments.spec.ts"
Cohesion: 0.15
Nodes (10): ProfileController, injectable, DeleteAccountController, validateDeleteAccount(), DeleteAccountUseCase, injectable, ExportUserDataController, ExportUserDataUseCase (+2 more)

### Community 42 - "IQueueItemResponseDTO"
Cohesion: 0.11
Nodes (19): 💈 AgendAI — Backend API, Autenticação, Com Docker (recomendado), Como Rodar, Configuração do Ambiente, Documentação Swagger, Estrutura do Projeto, Principais entidades (+11 more)

### Community 43 - "assertAppointmentBookable.ts"
Cohesion: 0.12
Nodes (16): Admin — Audit Logs, Admin — Dashboard, Admin — Financeiro, `GET /admin/audit-logs` 🔒 🛡️ `MASTER_ADMIN`, `GET /admin/dashboard`, `GET /admin/financial/barbershops` 🔒 🛡️ `MASTER_ADMIN`, `GET /admin/financial/overview` 🔒 🛡️ `MASTER_ADMIN`, `GET /admin/financial/summary` 🔒 🛡️ `MASTER_ADMIN` (+8 more)

### Community 44 - "referralService.ts"
Cohesion: 0.17
Nodes (16): ReferralsController, applyReferralCode(), ensureReferralCode(), generateCode(), getReferralDashboard(), logger, tierLabel(), GetMyReferralsUseCase (+8 more)

### Community 45 - "index.ts"
Cohesion: 0.09
Nodes (31): GetBarbershopUseCase, inject, injectable, assertShopAccess(), idSchema, manualStatusSchema, queueStatusSchema, shopPayload() (+23 more)

### Community 46 - ".findById"
Cohesion: 0.08
Nodes (22): ExpenseCategoryController, expenseCatRepo, ServiceCategoryController, serviceCatRepo, ExpenseCategoryRecord, mapExpenseCategoryToDTO(), mapServiceCategoryToDTO(), ServiceCategoryRecord (+14 more)

### Community 47 - "ContactController.ts"
Cohesion: 0.16
Nodes (8): IPaymentRepository, allowInsecureWebhooks(), ProcessAsaasWebhookController, timingSafeStringEqual(), IAsaasWebhookPayload, ProcessAsaasWebhookUseCase, inject, injectable

### Community 48 - "IEmailProvider.ts"
Cohesion: 0.24
Nodes (4): assertProductPermission(), ProductActor, ProductCatalogUseCase, injectable

### Community 49 - "devDependencies"
Cohesion: 0.13
Nodes (24): agendaiWordmark(), badge(), buildPostSvg(), escapeXml(), formatBRL(), hoursCard(), LayoutCtx, photoPanel() (+16 more)

### Community 50 - "CreateBarbershopUseCase"
Cohesion: 0.22
Nodes (4): classifyMaturity(), confidenceInterval(), DemandPredictor, walkForwardBacktest()

### Community 51 - "server.ts"
Cohesion: 0.18
Nodes (21): VerifyEmailController, VerifyEmailUseCase, apiUrl(), buildForgotPasswordEmail(), buildVerifyEmail(), escapeHtml(), emailLayout(), frontendUrl() (+13 more)

### Community 52 - "QueueRepository"
Cohesion: 0.14
Nodes (7): CashMovementFilters, CashMovementRepository, CreateCashMovementData, DailyCloseoutData, DailyCloseoutRepository, DailyCloseoutResponse, DailyCloseoutUseCases

### Community 53 - "GcsStorageProvider"
Cohesion: 0.10
Nodes (21): AgendAI Back‑end — Manual do Sistema, Autenticação e Autorização, Banco de Dados (Prisma), Com Docker, Como Adicionar um Novo Caso de Uso/Endpoint, Convenções, Definições, Dicas para IA (+13 more)

### Community 54 - "9. Como Criar um Novo Módulo"
Cohesion: 0.11
Nodes (26): availabilityQuerySchema, CreateAppointmentInput, createAppointmentSchema, dateField, listAppointmentsQuerySchema, phoneBR, slotsQuerySchema, timeField (+18 more)

### Community 55 - "Barbearias"
Cohesion: 0.10
Nodes (10): ConfirmLogoUseCase, inject, injectable, DeleteLogoUseCase, inject, injectable, LogoController, inject (+2 more)

### Community 57 - "12. Erros Comuns e Como Evitá-los"
Cohesion: 0.11
Nodes (22): ENUM_TO_INPUT, logger, PostRow, postSelect, createPostSchema, designOptionsSchema, generatePostSchema, getConfigQuerySchema (+14 more)

### Community 58 - "AdminDashboardController.ts"
Cohesion: 0.09
Nodes (33): getNotificationV2Mode(), EmailTemplateId, emailDestination(), EmailJobData, emailNotificationType(), emailQueue, emailQueueEvents, enqueueLegacy() (+25 more)

### Community 59 - "IAppointmentRepository"
Cohesion: 0.50
Nodes (4): Admin — Assinaturas, `DELETE /admin/subscriptions/:barbershopId` 🔒 🛡️ `MASTER_ADMIN`, `GET /admin/subscriptions/:id` 🔒 🛡️ `MASTER_ADMIN`, `GET /admin/subscriptions` 🔒 🛡️ `MASTER_ADMIN`

### Community 60 - "GetQueueMetricsUseCase"
Cohesion: 0.20
Nodes (10): ALLOWED_MIME_SET, logger, UploadVideoController, IUploadVideoDTO, IUploadVideoResult, inject, injectable, UploadVideoUseCase (+2 more)

### Community 61 - "🤖 AI_GUIDE.md — Guia Completo para IAs no Projeto AgendAI"
Cohesion: 0.14
Nodes (6): AbacatePayService, injectable, inject, inject, ISubscribeDTO, frontendBaseUrl()

### Community 62 - "Categorias"
Cohesion: 0.17
Nodes (11): 1. Preparação, 2. Pré-validação, 3. Aplicação, 4. Pós-validação, Escala horizontal, Estado conhecido, Falhas e recuperação, Fluxo de deploy (+3 more)

### Community 63 - "app.ts"
Cohesion: 0.11
Nodes (19): dotenv-cli, devDependencies, dotenv-cli, prisma, @types/bcryptjs, @types/jsonwebtoken, @types/node, @types/node-cron (+11 more)

### Community 64 - "ListBarbershopsUseCase.ts"
Cohesion: 0.18
Nodes (11): AdminBarbershopController, adminCreateBarbershopSchema, adminCreateUserSchema, adminListBarbershopsQuerySchema, adminListSubscriptionsQuerySchema, adminListUsersQuerySchema, adminUpdateBarbershopStatusSchema, adminUpdateUserSchema (+3 more)

### Community 65 - "ListQueueController.ts"
Cohesion: 0.20
Nodes (9): IBookPackageSlotDTO, assertPackageBookable(), RequestingUser, batchSlotsOverlap(), IBatchSlot, overlaps(), timeToMinutes(), debitClientPackageInTx() (+1 more)

### Community 66 - "Google Cloud Storage — setup AgendAI"
Cohesion: 0.50
Nodes (4): Admin — Planos, `DELETE /admin/plans/:id` 🔒 🛡️ `MASTER_ADMIN`, `PATCH /admin/plans/:id` 🔒 🛡️ `MASTER_ADMIN`, `POST /admin/plans` 🔒 🛡️ `MASTER_ADMIN`

### Community 67 - "13. Regras de Negócio Críticas"
Cohesion: 0.23
Nodes (10): IJoinQueueDTO, QueueStatus, IUpdateQueueItemDTO, PrismaQueueStatus, toDTO(), toPrisma(), QueueWaitEstimate, digits() (+2 more)

### Community 68 - "Fiado"
Cohesion: 0.15
Nodes (9): FEATURE_NAMES, MaturityLevel, RECOMMENDATIONS, TreeNode, TreeOptions, SeasonalDecomposition, correlation(), mean() (+1 more)

### Community 71 - "PlansController.ts"
Cohesion: 0.28
Nodes (7): IEmailProvider, SendEmailInput, SendEmailResult, logger, ResendEmailProvider, injectable, MockEmailProvider

### Community 72 - "enqueueWhatsApp"
Cohesion: 0.50
Nodes (4): Assinaturas, `DELETE /subscriptions/me` 🔒 🛡️ `MASTER_ADMIN, OWNER`, `GET /subscriptions/me` 🔒, `POST /subscriptions` 🔒 🛡️ `MASTER_ADMIN, OWNER`

### Community 73 - "6. Sistema de Autenticação e Autorização"
Cohesion: 0.09
Nodes (19): BarbershopFinancialController, ExpenseRow, ExpenseWithCategory, FiadoRow, FiadoWithPayments, BarbershopInsightsDTO, GetBarbershopInsightsUseCase, InsightsPeriod (+11 more)

### Community 74 - "8. Banco de Dados e Prisma"
Cohesion: 0.26
Nodes (7): assertSameBarbershop(), assertShopWhatsAppConnected(), buildPostImage(), defaultCtaText(), loadPostContext(), PostsController, toPostResponse()

### Community 75 - "dependencies"
Cohesion: 0.24
Nodes (4): GetQueueMetricsController, GetQueueMetricsUseCase, inject, injectable

### Community 76 - "Passo a passo"
Cohesion: 0.14
Nodes (16): setupSwagger(), buildApp(), checkDatabase(), checkMigrations(), checkRedis(), healthRoutes(), correlationIdMiddleware(), registerRoutes() (+8 more)

### Community 77 - "Despesas"
Cohesion: 0.06
Nodes (38): forgotPasswordSchema, googleLoginSchema, loginSchema, phoneBR, refreshSchema, registerSchema, resetPasswordSchema, scheduleItemSchema (+30 more)

### Community 78 - "Pagamentos"
Cohesion: 0.20
Nodes (7): PlansController, planSelect, billingCycleSchema, CreatePlanInput, createPlanSchema, UpdatePlanInput, updatePlanSchema

### Community 80 - "7. Sistema de Assinaturas e Bloqueio de CPF"
Cohesion: 0.15
Nodes (11): IRegisterDTO, BASE_INPUT, mockCreate, mockFindFirst, mockFindUnique, mockTransaction, mockTxBarbershopCreate, mockTxScheduleCreateMany (+3 more)

### Community 81 - "Apêndice B — Endpoints por Role"
Cohesion: 0.18
Nodes (11): buildCreateBody(), buildUpdateArgs(), CREATED_POST_ROW, fakeUser(), mockBarbershopFindUnique, mockBroadcast, mockFeedPostCreate, mockFeedPostFindUnique (+3 more)

### Community 82 - "Agendamentos"
Cohesion: 0.31
Nodes (5): CachedWeatherProvider, DEFAULT_CONDITION, OpenMeteoWeatherProvider, WMO_CODES, DailyForecast

### Community 83 - "Fila (Queue)"
Cohesion: 0.17
Nodes (7): SendAppointmentRemindersUseCase, CronLogger, scheduleAppointmentReminders(), CronLockOptions, withCronLock(), DistributedLock, RedisDistributedLock

### Community 84 - "Serviços"
Cohesion: 0.10
Nodes (13): IBarbershopRepository, DeleteBarbershopController, DeleteBarbershopUseCase, inject, injectable, GetScheduleController, GetScheduleUseCase, inject (+5 more)

### Community 85 - "setup-gcs.sh"
Cohesion: 0.18
Nodes (11): 9. Como Criar um Novo Módulo, Passo 10 — Schema Prisma, Passo 1 — DTOs, Passo 2 — Interface do Repositório, Passo 3 — Mock Repository (para testes), Passo 4 — Implementação Prisma, Passo 5 — Schemas Zod, Passo 6 — UseCases (+3 more)

### Community 87 - "PlansController"
Cohesion: 0.18
Nodes (10): Achados e correções aplicadas neste ciclo, Casos executáveis (inclusos no plano), Casos manuais → automatizados, Controles validados (sem achado novo), Inventário Graphify, Limitações, PENTEST-AUTH-001 — Authorization sem validação de scheme `Bearer` (corrigido), PENTEST-AUTH-002 — Refresh JWT sem `jti` podia colidir no mesmo segundo (corrigido) (+2 more)

### Community 88 - "StaffUserController"
Cohesion: 0.18
Nodes (11): Barbearias, `DELETE /barbershops/:id/logo` 🔒 🛡️ `MASTER_ADMIN, OWNER` 📋, `DELETE /barbershops/:id` 🔒 🛡️ `MASTER_ADMIN`, `GET /barbershops`, `GET /barbershops/:id`, `GET /barbershops/:id/schedule`, Logo — Fluxo via Signed URL (recomendado para produção), Logo — Upload Direto via Multipart (mais simples) (+3 more)

### Community 89 - "CrmController"
Cohesion: 0.16
Nodes (13): IPaymentResponseDTO, PaymentMethod, PaymentProvider, PaymentStatus, MockPaymentRepository, mapToDTO(), PaymentRepository, ICreatePaymentRecordDTO (+5 more)

### Community 90 - "14. Integrações Externas"
Cohesion: 0.20
Nodes (10): 12. Erros Comuns e Como Evitá-los, ❌ Converter BigInt para Number, ❌ Esquecer de registrar o repositório no container, ❌ Esquecer `reflect-metadata` no setup de testes, ❌ Importar tipos Prisma do pacote diretamente, ❌ Instanciar Prisma fora de `prismaClient.ts`, ❌ Não registrar rota no `api.ts`, ❌ Passar string de token JWT diretamente em `expiresIn` (+2 more)

### Community 91 - "5. Convenções de Código"
Cohesion: 0.22
Nodes (8): args, base, once, probe(), run(), serviceId, shopId, token

### Community 92 - "Admin — Entidades Bloqueadas"
Cohesion: 0.12
Nodes (8): GoalController, CreateGoalInput, createGoalSchema, GoalQueryInput, goalQuerySchema, UpdateGoalInput, updateGoalSchema, GoalUseCases

### Community 93 - "CrmRepository.ts"
Cohesion: 0.10
Nodes (13): CashMovementController, CashMovementQueryInput, cashMovementQuerySchema, CreateCashMovementInput, createCashMovementSchema, CashMovementUseCases, CloseoutQueryInput, closeoutQuerySchema (+5 more)

### Community 94 - "Admin — Usuários"
Cohesion: 0.25
Nodes (10): base(), CATALOG_TEMPLATES, CatalogTemplate, getCatalogTemplate(), STOCK_EXPENSE, stripCost(), assertUniqueProductCode(), isProductUniqueViolation() (+2 more)

### Community 96 - "postgres.ts"
Cohesion: 0.28
Nodes (9): notifyQueueCapacity(), mocks, JoinQueueController, JoinQueueUseCase, injectable, isQueueStaffForShop(), isPlaceholderWhatsApp(), resolveQueueWhatsApp() (+1 more)

### Community 98 - "Admin — Assinaturas"
Cohesion: 0.22
Nodes (9): 10. Como Criar um Novo Endpoint, 15. Checklist antes de Finalizar uma Tarefa, 1. Visão Geral do Projeto, 2. Stack e Versões, 4. Estrutura de Pastas, 🤖 AI_GUIDE.md — Guia histórico do Backend AgendAI, Apêndice A — Mapa de Tokens de Injeção, Exemplo completo — `GET /reviews` (+1 more)

### Community 99 - "Admin — Barbearias"
Cohesion: 0.22
Nodes (9): Categorias, `DELETE /expense-categories/:id` 🔒 🛡️ `MASTER_ADMIN, OWNER` 📋, `DELETE /service-categories/:id` 🔒 🛡️ `MASTER_ADMIN, OWNER` 📋, `GET /expense-categories` 🔒 🛡️ `MASTER_ADMIN, OWNER, EMPLOYEE` 📋, `GET /service-categories` 🔒 🛡️ `MASTER_ADMIN, OWNER, EMPLOYEE` 📋, `PATCH /expense-categories/:id` 🔒 🛡️ `MASTER_ADMIN, OWNER` 📋, `PATCH /service-categories/:id` 🔒 🛡️ `MASTER_ADMIN, OWNER` 📋, `POST /expense-categories` 🔒 🛡️ `MASTER_ADMIN, OWNER` 📋 (+1 more)

### Community 100 - "Admin — Planos"
Cohesion: 0.12
Nodes (31): findExisting(), NotificationPayload, NotificationV2Mode, recordTerminalNotificationFailure(), resolveSkipReason(), scheduleNotification(), ScheduleNotificationInput, uniqueKey() (+23 more)

### Community 101 - "Assinaturas"
Cohesion: 0.22
Nodes (5): DailyLimitExceededError, GeneratePostInput, baseInput, mockRedisGet, mockRedisSet

### Community 102 - "Auth"
Cohesion: 0.16
Nodes (7): channelName(), isRealtimeEvent(), logger, RealtimeEvent, RealtimeHub, RealtimeTopic, SendableSocket

### Community 103 - "Financeiro da Barbearia"
Cohesion: 0.10
Nodes (11): adapter, defaultPlans, pool, prisma, inject, inject, inject, inject (+3 more)

### Community 104 - "fastify.d.ts"
Cohesion: 0.22
Nodes (8): mockBarbershopFindMany, mockBarbershopUpdate, mockBroadcast, mockFeedPostCreate, mockFeedPostFindMany, mockFeedPostUpdate, mockScheduleFindFirst, mockServiceFindMany

### Community 105 - "bcryptjs"
Cohesion: 0.25
Nodes (6): Alternativa: `GCS_CREDENTIALS_JSON`, Google Cloud Storage — setup AgendAI, Produção (Cloud Run / GKE), Pré-requisitos, Rotação de chave, Scripts relacionados

### Community 106 - "busboy"
Cohesion: 0.25
Nodes (8): 13.1 Fila (Queue), 13.2 Fiado, 13.3 Agendamentos, 13.4 Usuários, 13.5 Barbearias, 13.6 Pagamentos, 13.7 CPF no JWT, 13. Regras de Negócio Críticas

### Community 107 - "dayjs"
Cohesion: 0.20
Nodes (9): Alertas mínimos, Ativação do ledger de notificações, Auditoria de dados sensíveis, Backup, restauração e rollback, Gate de lançamento, Operação do MVP público, Smoke comportamental, Staging isolado (+1 more)

### Community 108 - "disposable-email-domains"
Cohesion: 0.25
Nodes (7): Achados confirmados, Controles validados, Evidência de mapeamento, Limitações e próximas verificações, PENTEST-INPUT-001 — URLs de imagem do feed sem esquema permitido, PENTEST-INPUT-002 — conteúdo HTML do feed é armazenado sem sanitização de domínio, Pentest local — inputs, upload, XSS e exposição pública

### Community 109 - "@fastify/cors"
Cohesion: 0.25
Nodes (8): `DELETE /fiado/:id` 🔒 🛡️ `MASTER_ADMIN, OWNER` 📋, Fiado, `GET /fiado/:id` 🔒 🛡️ `MASTER_ADMIN, OWNER, EMPLOYEE` 📋, `GET /fiado` 🔒 🛡️ `MASTER_ADMIN, OWNER, EMPLOYEE` 📋, `GET /fiado/summary` 🔒 🛡️ `MASTER_ADMIN, OWNER, EMPLOYEE` 📋, `PATCH /fiado/:id` 🔒 🛡️ `MASTER_ADMIN, OWNER, EMPLOYEE` 📋, `POST /fiado/:id/payments` 🔒 🛡️ `MASTER_ADMIN, OWNER, EMPLOYEE` 📋, `POST /fiado` 🔒 🛡️ `MASTER_ADMIN, OWNER, EMPLOYEE` 📋

### Community 110 - "AGENTS.md"
Cohesion: 0.13
Nodes (7): Claude, dependencies, devDependencies, Inventário de pacotes — Backend (agendai-back-end), Inventário de scripts — Backend (`agendai-back-end`), Observações críticas, Gemini

### Community 111 - "@fastify/multipart"
Cohesion: 0.20
Nodes (5): CreateUserController, CreateUserUseCase, inject, injectable, MockHashProvider

### Community 112 - "@fastify/rate-limit"
Cohesion: 0.29
Nodes (7): 6.1 Middlewares disponíveis, 6.2 Combinação padrão de preHandler, 6.3 Roles e permissões, 6.4 Acesso ao usuário no request, 6.5 Autorização em UseCases, 6.6 Token JWT, 6. Sistema de Autenticação e Autorização

### Community 113 - "@fastify/swagger"
Cohesion: 0.29
Nodes (7): 8.1 Instância do Prisma, 8.2 UUIDs, 8.3 Soft delete vs hard delete, 8.4 Enum mapping, 8.5 Migrations vs db push, 8.6 BigInt, 8. Banco de Dados e Prisma

### Community 114 - "@fastify/swagger-ui"
Cohesion: 0.29
Nodes (7): 1. Projeto GCP, 2. Variáveis no `.env`, 3. Criar Service Account + chave JSON, 4. Bucket, CORS, IAM público e pastas, 5. Rodar a API, 6. Smoke test, Passo a passo

### Community 115 - "@google-cloud/storage"
Cohesion: 0.29
Nodes (6): Achado estático (corrigido), Ambiente isolado, Casos executáveis incluídos, Casos manuais (agora automatizados em `src/tests/pentest/`), Inventário assistido por Graphify, Pentest local autorizado

### Community 116 - "ioredis"
Cohesion: 0.29
Nodes (7): `DELETE /expenses/:id` 🔒 🛡️ `MASTER_ADMIN, OWNER` 📋, Despesas, `GET /expenses/:id` 🔒 🛡️ `MASTER_ADMIN, OWNER, EMPLOYEE` 📋, `GET /expenses` 🔒 🛡️ `MASTER_ADMIN, OWNER, EMPLOYEE` 📋, `GET /expenses/summary` 🔒 🛡️ `MASTER_ADMIN, OWNER, EMPLOYEE` 📋, `PATCH /expenses/:id` 🔒 🛡️ `MASTER_ADMIN, OWNER, EMPLOYEE` 📋, `POST /expenses` 🔒 🛡️ `MASTER_ADMIN, OWNER, EMPLOYEE` 📋

### Community 117 - "jsonwebtoken"
Cohesion: 0.29
Nodes (7): `GET /payments/:id` 🔒 🛡️ `MASTER_ADMIN, OWNER, EMPLOYEE`, `GET /payments` 🔒 🛡️ `MASTER_ADMIN, OWNER`, Pagamentos, `PATCH /payments/:id/cancel` 🔒 🛡️ `MASTER_ADMIN, OWNER`, `POST /payments/card` 🔒, `POST /payments/pix` 🔒, `POST /payments/webhook`

### Community 118 - "ProcessAbacateWebhookController.ts"
Cohesion: 0.16
Nodes (7): IMercadoPagoWebhookDTO, ProcessWebhookController, webhookBodySchema, logger, ProcessWebhookUseCase, inject, injectable

### Community 119 - "node-cron"
Cohesion: 0.33
Nodes (6): 3.1 Clean Architecture (simplificada), 3.2 Padrão por módulo, 3.3 Injeção de Dependências, 3.4 Tratamento de Erros, 3.5 Resposta HTTP padrão, 3. Arquitetura e Padrões

### Community 120 - "CreateUserUseCase.ts"
Cohesion: 0.33
Nodes (6): 7.1 Fluxo de acesso, 7.2 Status de Subscription, 7.3 Resposta 402 padronizada, 7.4 Bloqueio automático de CPF, 7.5 Serviço de bloqueio, 7. Sistema de Assinaturas e Bloqueio de CPF

### Community 121 - "@prisma/client"
Cohesion: 0.33
Nodes (6): Apêndice B — Endpoints por Role, MASTER_ADMIN only, OWNER + EMPLOYEE + MASTER_ADMIN, OWNER + MASTER_ADMIN, OWNER only, Público (sem autenticação)

### Community 122 - "reflect-metadata"
Cohesion: 0.33
Nodes (6): Agendamentos, `DELETE /appointments/:id` 🔒 🛡️ `MASTER_ADMIN, OWNER` 📋, `GET /appointments/:id` 🔒 🛡️ `MASTER_ADMIN, OWNER, EMPLOYEE` 📋, `GET /appointments` 🔒 🛡️ `MASTER_ADMIN, OWNER, EMPLOYEE` 📋, `PATCH /appointments/:id` 🔒 🛡️ `MASTER_ADMIN, OWNER, EMPLOYEE` 📋, `POST /appointments` 🔒 🛡️ `MASTER_ADMIN, OWNER, EMPLOYEE` 📋

### Community 123 - "resend"
Cohesion: 0.33
Nodes (6): Como obter o token JWT para o monitor, Interpretação dos status, Monitor de Rotas em Tempo Real, O que o monitor exibe, Requisitos do monitor, Uso básico

### Community 124 - "@resvg/resvg-js"
Cohesion: 0.33
Nodes (6): `DELETE /queue/:id` 🔒 📋, Fila (Queue), `GET /queue` 🔒 📋, `GET /queue/metrics`, `PATCH /queue/:id` 🔒 📋, `POST /queue`

### Community 125 - "tsconfig-paths"
Cohesion: 0.33
Nodes (6): `DELETE /services/:id` 🔒 🛡️ `MASTER_ADMIN, OWNER` 📋, `GET /services`, `GET /services/:id`, `POST /services` 🔒 🛡️ `MASTER_ADMIN, OWNER` 📋, `PUT /services/:id` 🔒 🛡️ `MASTER_ADMIN, OWNER` 📋, Serviços

### Community 126 - "tsyringe"
Cohesion: 0.60
Nodes (5): err(), info(), ok(), setup-gcs.sh script, warn()

### Community 127 - "zod"
Cohesion: 0.10
Nodes (24): getMonitoringDashboard(), hoursAgo(), minutesAgo(), getNotificationOperationsHealth(), heartbeatStatus(), ProcessRole, logger, RedisRateLimitStore (+16 more)

### Community 128 - "tsup"
Cohesion: 0.12
Nodes (18): broadcastPostToClients(), logger, mockEnqueue, mockFindMany, mockFindUnique, enqueuePostBroadcast(), getEvents(), getQueue() (+10 more)

### Community 130 - "@types/bcryptjs"
Cohesion: 0.40
Nodes (5): 11.1 Configuração, 11.2 Padrão de teste, 11.3 Executar testes, 11.4 O que deve ser testado, 11. Testes

### Community 131 - "@types/node"
Cohesion: 0.40
Nodes (5): 14.0 E-mail (Resend) + Indicação, 14.1 Mercado Pago, 14.2 Google Cloud Storage, 14.3 Variáveis de Ambiente Obrigatórias em Produção, 14. Integrações Externas

### Community 132 - "@types/node-cron"
Cohesion: 0.40
Nodes (5): 5.1 Importações, 5.2 Nomenclatura, 5.3 Tipos, 5.4 Async/Await, 5. Convenções de Código

### Community 133 - "authSchemas.ts"
Cohesion: 0.40
Nodes (5): Admin — Entidades Bloqueadas, `DELETE /admin/blocked-entities/:id` 🔒 🛡️ `MASTER_ADMIN`, `GET /admin/blocked-entities/:id` 🔒 🛡️ `MASTER_ADMIN`, `GET /admin/blocked-entities` 🔒 🛡️ `MASTER_ADMIN`, `POST /admin/blocked-entities` 🔒 🛡️ `MASTER_ADMIN`

### Community 134 - "vite-tsconfig-paths"
Cohesion: 0.40
Nodes (5): Admin — Notificações, `GET /admin/notifications` 🔒 🛡️ `MASTER_ADMIN`, `GET /admin/notifications/unread-count` 🔒 🛡️ `MASTER_ADMIN`, `PATCH /admin/notifications/:id/read` 🔒 🛡️ `MASTER_ADMIN`, `PATCH /admin/notifications/read-all` 🔒 🛡️ `MASTER_ADMIN`

### Community 135 - "vitest"
Cohesion: 0.40
Nodes (5): Admin — Usuários, `DELETE /admin/users/:id` 🔒 🛡️ `MASTER_ADMIN`, `GET /admin/users` 🔒 🛡️ `MASTER_ADMIN`, `PATCH /admin/users/:id` 🔒 🛡️ `MASTER_ADMIN`, `POST /admin/users` 🔒 🛡️ `MASTER_ADMIN`

### Community 136 - "ensure-gcs-key.sh"
Cohesion: 0.40
Nodes (3): prisma, { PrismaClient }, { randomUUID }

### Community 138 - "disposable-email-domains.d.ts"
Cohesion: 0.50
Nodes (3): main, name, version

### Community 139 - "setup.ts"
Cohesion: 0.50
Nodes (4): Admin — Barbearias, `GET /admin/barbershops` 🔒 🛡️ `MASTER_ADMIN`, `PATCH /admin/barbershops/:id/status` 🔒 🛡️ `MASTER_ADMIN`, `POST /admin/barbershops` 🔒 🛡️ `MASTER_ADMIN`

### Community 140 - "vitest.config.mts"
Cohesion: 0.24
Nodes (12): refreshCrmCampaignStatus(), prismaMock, loadNotificationPayload(), claimAttempt(), completeAttempt(), createWorker(), failAttempt(), isFinalAttempt() (+4 more)

### Community 141 - "SubscribeController.ts"
Cohesion: 0.27
Nodes (5): ListQueueController, toPublicView(), ListQueueUseCase, inject, injectable

### Community 142 - "GoogleLoginUseCase"
Cohesion: 0.50
Nodes (4): Financeiro da Barbearia, `GET /barbershop/financial/expenses` 🔒 🛡️ `OWNER` 📋, `GET /barbershop/financial/fiados` 🔒 🛡️ `OWNER` 📋, `GET /barbershop/financial/summary` 🔒 🛡️ `OWNER` 📋

### Community 145 - "sendWhatsAppMessage"
Cohesion: 0.16
Nodes (17): header(), RawBodyRequest, ResendWebhookController, resendWebhookPreParsing(), sanitizeNotificationError(), addSuppression(), applyEmailEvent(), EmailWebhookEvent (+9 more)

### Community 154 - "PENTEST_REPORT_TEMPLATE.md"
Cohesion: 0.18
Nodes (11): bcryptjs, @fastify/cors, @fastify/swagger, dependencies, bcryptjs, @fastify/cors, @fastify/swagger, pino (+3 more)

### Community 158 - "@types/jsonwebtoken"
Cohesion: 0.36
Nodes (7): canGiveDiscount(), canOverrideProductPrice(), canSeeProductCosts(), COST_PERMISSIONS, isPrivilegedActor(), loadEmployeePermissions(), EmployeePermission

### Community 160 - "AdminDashboardController.ts"
Cohesion: 0.25
Nodes (3): AdminFinancialController, adminFinancialRoutes(), financial

### Community 165 - "assertAppointmentBookable.ts"
Cohesion: 0.36
Nodes (4): CancellationContextController, CancellationContextResult, CancellationContextUseCase, emptyContext()

### Community 173 - "@opentelemetry/resources"
Cohesion: 0.29
Nodes (4): issueProratedRefundMock, prismaMock, cancelReasonSchema, CancelSubscriptionController

### Community 182 - "payments.routes.ts"
Cohesion: 0.22
Nodes (9): Fiado / despesas / comissões, Fila / agenda / híbrido, Notificações, Pacotes, Pagamentos, Produtos / estoque / retail, Regras de negócio — Backend, Tenant, permissões, RLS (+1 more)

### Community 188 - "@google-cloud/storage"
Cohesion: 0.22
Nodes (8): Backup do Render, Cutover, Migração PostgreSQL Render → Supabase, Preparação do Supabase, Reconciliação obrigatória, Regras de segurança, Rollback, Variáveis

### Community 190 - "@upstash/redis"
Cohesion: 0.22
Nodes (6): insideRlsTx, rlsExtension, RequestContext, categoriesRoutes(), expenseCat, serviceCat

### Community 200 - "CompleteServiceUseCase.ts"
Cohesion: 0.18
Nodes (16): backfillCrmLedger(), EventInput, recordAppointmentCompletion(), recordCrmFinancialEvent(), recordFiadoCreated(), recordFiadoPayment(), recordPackageSale(), recordQueueCompletion() (+8 more)

### Community 201 - "authenticate.ts"
Cohesion: 0.33
Nodes (5): abacateWebhookPreParsing(), ListRefundsController, checkoutRateLimit, paymentRoutes(), webhookRateLimit

### Community 202 - "assertOperationEnabled.ts"
Cohesion: 0.33
Nodes (4): ChangeOperationModeController, ChangeOperationModeUseCase, inject, injectable

### Community 203 - "index.ts"
Cohesion: 0.16
Nodes (12): ICommissionEntryDTO, ICommissionSplitDTO, ICommissionSummary, IListCommissionsQuery, CommissionRepository, CommissionWithRelations, dateFilter(), include (+4 more)

### Community 204 - "CancelSubscriptionController.ts"
Cohesion: 0.15
Nodes (3): IBarbershopResponseDTO, BarbershopRepository, MockBarbershopRepository

### Community 205 - "check-docs.mjs"
Cohesion: 0.29
Nodes (4): entryFiles, errors, pkg, root

### Community 206 - "ProcessAsaasWebhookUseCase.ts"
Cohesion: 0.33
Nodes (3): GetQueueWaitEstimateUseCase, inject, injectable

### Community 207 - "ExportFinancialDataUseCase.ts"
Cohesion: 0.40
Nodes (5): logger, RECAPTCHA_MIN_SCORE, RecaptchaResponse, verifyRecaptcha(), verifyToken()

### Community 209 - "GetPaymentStatusUseCase"
Cohesion: 0.14
Nodes (13): ALL_PERMISSIONS, DEFAULT_EMPLOYEE_PERMISSIONS, RoleLiteral, cpfSchema, CreateUserDTO, createUserSchema, LoginDTO, loginSchema (+5 more)

### Community 210 - "AGENTS.md — AgendAI Backend"
Cohesion: 0.33
Nodes (6): 0. Regras essenciais, 1. O que é esta API, 2. Inventários locais, 3. Comandos frequentes, 4. Checklist de mudança, AGENTS.md — AgendAI Backend

### Community 212 - "Arquitetura backend — Clean Architecture e SOLID"
Cohesion: 0.33
Nodes (5): Arquitetura backend — Clean Architecture e SOLID, Fluxo de execução vs direção das dependências, Responsabilidades, SOLID (exemplos locais), Transações

### Community 213 - "queueDuplicate.ts"
Cohesion: 0.10
Nodes (21): updateQueueItemSchema, buildQueueCalledMessage(), buildQueueCancelledMessage(), buildQueueJoinedMessage(), logger, notifyCustomerJoinedQueue(), NotifyQueuePositionResult, NotifyQueuePositionUpdatesUseCase (+13 more)

### Community 214 - "Estrutura — Backend (`agendai-back-end`)"
Cohesion: 0.33
Nodes (5): Estrutura — Backend (`agendai-back-end`), Middlewares, Módulos (`src/modules/`), Providers / integrações (arquivos), Rotas HTTP (`shared/infra/http/routes/`)

### Community 215 - "calendar.routes.ts"
Cohesion: 0.22
Nodes (8): blockSchema, calendarRoutes(), exceptionSchema, id, policySchema, shopId(), CommissionController, realtimeWsRoutes()

### Community 216 - "CheckInAppointmentUseCase.ts"
Cohesion: 0.22
Nodes (7): CheckInAppointmentController, checkInSchema, CheckInAppointmentUseCase, ICheckInDTO, ICheckInResult, logger, injectable

### Community 217 - "SetupTrialCardUseCase"
Cohesion: 0.50
Nodes (4): DemandPrediction, WeatherForecastPoint, ConfidenceLevel, EnhancedDemandPrediction

### Community 218 - "onboarding.routes.ts"
Cohesion: 0.31
Nodes (6): onboardingRoutes(), GetOnboardingUseCase, injectable, injectable, UpdateOnboardingStepUseCase, OnboardingProgressController

### Community 220 - "ResetPasswordUseCase"
Cohesion: 0.40
Nodes (4): Checkout de assinatura (implementado), Domínios → persistência (visão), Mapa de domínio — Backend, Testes

### Community 221 - "notifications.routes.ts"
Cohesion: 0.15
Nodes (10): AuthConfig, extractBearerToken(), JwtPayload, authenticateOptional(), JwtPayload, feedRoutes(), queueRoutes(), referralsRoutes() (+2 more)

### Community 222 - ".barbershopId"
Cohesion: 0.38
Nodes (6): retryNotification(), listSchema, notificationsRoutes(), ownerShop(), preferencesSchema, whatsappBodySchema

### Community 223 - "seed.ts"
Cohesion: 0.50
Nodes (3): Comandos, Graphify — Backend, Procedimento obrigatório

### Community 224 - "Auth"
Cohesion: 0.50
Nodes (4): Auth, `GET /auth/me` 🔒, `POST /auth/login`, `POST /auth/refresh`

### Community 225 - "Sistema de Assinaturas"
Cohesion: 0.50
Nodes (4): Fluxo de assinatura, Sistema de Assinaturas, Status de assinatura, Trial

### Community 240 - "subscribe.spec.ts"
Cohesion: 0.27
Nodes (7): makeFullSubscription(), makeSubscription(), NOW, prismaMock, SubscribeUseCase, inject, injectable

## Knowledge Gaps
- **881 isolated node(s):** `docker-entrypoint.sh script`, `args`, `base`, `token`, `shopId` (+876 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **68 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `AppError` connect `IPaymentDTO.ts` to `api.ts`, `IFiadoResponseDTO`, `IServiceResponseDTO`, `PostsController.ts`, `IExpenseResponseDTO`, `AbacatePayService`, `index.ts`, `compilerOptions`, `IBarbershopRepository`, `AppError`, `💈 AgendAI — Backend API`, `IBarbershopResponseDTO`, `normalizeCpf`, `IStorageProvider`, `appointments.spec.ts`, `auth.routes.ts`, `IUserResponseDTO`, `IPaymentResponseDTO`, `SubscribeUseCase.ts`, `AppointmentController.ts`, `BarbershopFinancialController.ts`, `queue.spec.ts`, `@types/jsonwebtoken`, `emailWorker.ts`, `monitor-routes.js`, `planEconomics.ts`, `index.ts`, `Referência Completa de Rotas`, `appointmentUseCases.ts`, `assertAppointmentBookable.ts`, `referralService.ts`, `index.ts`, `.findById`, `@opentelemetry/resources`, `QueueRepository`, `9. Como Criar um Novo Módulo`, `12. Erros Comuns e Como Evitá-los`, `GetQueueMetricsUseCase`, `ListBarbershopsUseCase.ts`, `ListQueueController.ts`, `13. Regras de Negócio Críticas`, `CompleteServiceUseCase.ts`, `6. Sistema de Autenticação e Autorização`, `index.ts`, `Passo a passo`, `Despesas`, `Pagamentos`, `ExportFinancialDataUseCase.ts`, `Serviços`, `queueDuplicate.ts`, `calendar.routes.ts`, `CheckInAppointmentUseCase.ts`, `Admin — Entidades Bloqueadas`, `CrmRepository.ts`, `Admin — Usuários`, `notifications.routes.ts`, `.barbershopId`, `Admin — Planos`, `@fastify/multipart`?**
  _High betweenness centrality (0.156) - this node is a cross-community bridge._
- **Why does `prisma` connect `IPaymentDTO.ts` to `api.ts`, `IFiadoResponseDTO`, `tsup`, `PostsController.ts`, `IExpenseResponseDTO`, `AbacatePayService`, `index.ts`, `compilerOptions`, `AppError`, `💈 AgendAI — Backend API`, `vitest.config.mts`, `IStorageProvider`, `appointments.spec.ts`, `normalizeCpf`, `IPlanResponseDTO`, `sendWhatsAppMessage`, `RegisterUseCase.ts`, `SubscribeUseCase.ts`, `AgendAI Back‑end — Manual do Sistema`, `blockedEntityService.ts`, `AppointmentController.ts`, `IQueueRepository`, `BarbershopFinancialController.ts`, `queue.spec.ts`, `@types/jsonwebtoken`, `emailWorker.ts`, `IPaymentRepository`, `monitor-routes.js`, `assertAppointmentBookable.ts`, `Referência Completa de Rotas`, `referralService.ts`, `index.ts`, `.findById`, `@opentelemetry/resources`, `devDependencies`, `QueueRepository`, `9. Como Criar um Novo Módulo`, `12. Erros Comuns e Como Evitá-los`, `AdminDashboardController.ts`, `ListBarbershopsUseCase.ts`, `ListQueueController.ts`, `13. Regras de Negócio Críticas`, `PlansController.ts`, `CompleteServiceUseCase.ts`, `6. Sistema de Autenticação e Autorização`, `index.ts`, `Passo a passo`, `Despesas`, `Pagamentos`, `Fila (Queue)`, `calendar.routes.ts`, `CheckInAppointmentUseCase.ts`, `CrmController`, `onboarding.routes.ts`, `SetupTrialCardUseCase`, `Admin — Usuários`, `.barbershopId`, `postgres.ts`, `Admin — Planos`, `zod`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Why does `AsaasService` connect `planEconomics.ts` to `emailWorker.ts`, `index.ts`, `AppError`, `normalizeCpf`, `ContactController.ts`, `subscribe.spec.ts`, `auth.routes.ts`, `IUserResponseDTO`, `🤖 AI_GUIDE.md — Guia Completo para IAs no Projeto AgendAI`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Are the 34 inferred relationships involving `authenticate()` (e.g. with `activationRoutes()` and `analyticsRoutes()`) actually correct?**
  _`authenticate()` has 34 INFERRED edges - model-reasoned connections that need verification._
- **Are the 33 inferred relationships involving `setRlsContext()` (e.g. with `activationRoutes()` and `analyticsRoutes()`) actually correct?**
  _`setRlsContext()` has 33 INFERRED edges - model-reasoned connections that need verification._
- **What connects `docker-entrypoint.sh script`, `args`, `base` to the rest of the system?**
  _881 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `IFiadoResponseDTO` be split into smaller, more focused modules?**
  _Cohesion score 0.05757286192068801 - nodes in this community are weakly interconnected._