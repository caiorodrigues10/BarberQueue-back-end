# Arquitetura backend — Clean Architecture e SOLID

## Fluxo de execução vs direção das dependências

**Execução:**

`Rota/middleware → Controller → UseCase → Repository/Provider (infra)`

**Dependências (direção correta):**

- Regras de negócio (`useCases`) dependem de **contratos** (`IRepository`, providers).
- Infraestrutura **implementa** esses contratos.
- O container (`shared/container`) **compõe** as ligações.

UseCases **não** devem importar SDKs externos diretamente quando já existe provider/serviço injetável. Acessos diretos a `prisma` em controllers/use cases existentes são **desvios** a avaliar ao alterar o domínio — não proliferar.

## Responsabilidades

| Camada | Faz | Não faz |
|---|---|---|
| Rota | Contrato HTTP, `preHandler`, Zod | Regra financeira |
| Controller | Traduz HTTP ↔ UseCase | Persistência |
| UseCase | Regra + coordenação + transação | Detalhes de SQL/SDK |
| Repository | Persistência/consultas | Política de assinatura |
| Provider | Integração externa | Orquestração de domínio |
| Container | Wiring | Lógica de negócio |

## Transações

Fechamento de venda, estoque, fiado, comissão e estornos exigem **atomicidade**. Separar em vários repositories **sem** `prisma.$transaction` (ou unidade de trabalho equivalente) pode quebrar invariantes. Preferir coordenar a transação no UseCase/serviço de domínio.

## SOLID (exemplos locais)

| Princípio | Exemplo |
|---|---|
| SRP | Webhook de pagamento ≠ cálculo de estoque |
| OCP | Novos providers de pagamento atrás do mesmo fluxo de subscribe/webhook |
| LSP | `Mock*Repository` preserva contrato do repositório |
| ISP | Interfaces por domínio, não “god repository” |
| DIP | `SubscribeUseCase` recebe serviços via `@inject`, não instancia SDK no construtor ad hoc |

Sem metas arbitrárias de linhas/cobertura universal. Refatoração incremental com testes de comportamento.
