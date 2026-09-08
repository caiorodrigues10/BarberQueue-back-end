# Graphify — Backend

## Procedimento obrigatório

1. Ler `AGENTS.md` local + `git status`.
2. `graphify query/explain/path/affected` no domínio.
3. Confirmar rotas, use cases, contratos e consumidores no código.
4. Alteração focada (Controller → UseCase → Repository).
5. Testes compatíveis (`test:unit`, integration se tocar DB/contrato).
6. Atualizar docs/grafo; `npm run docs:check` se inventário mudou.

## Comandos

Grafo em `agendai-back-end/graphify-out/` e/ou monorepo `graphify-out/`.

```powershell
graphify query "SubscribeUseCase assinatura" --budget 1500
graphify explain "AsaasService"
graphify path "SubscribeUseCase" "AsaasService"
graphify affected "Product" --depth 2
graphify update .
```

Com `--graph` se houver múltiplos grafos.

Arestas inferidas ≠ prova. Sem Graphify: registrar limitação e usar busca direcionada.

Subagentes: não atualizar o mesmo grafo em paralelo. Informar objetivo, escopo de arquivos, contratos, Graphify, testes e formato de relatório.

Mimo/OpenCode: inventário/resumo documental. Migrations, dinheiro e permissões: revisão do agente principal.
