# Roadmap Aidan

## Fase 1 — Base do repositório (iniciada)
- [x] Migrar telas e assets do `aidan-showcase` sem `node_modules`, `.git` ou `.idea`.
- [x] Renomear o pacote/identidade Expo para `aidan`.
- [x] Criar README, `.gitignore`, `.env.example`, CI e guia de Git/SSH.
- [x] Criar cliente HTTP, erros, serviços e contratos preliminares.
- [ ] Criar/vincular GitHub `aidan` com sua chave SSH local.
- [ ] Vincular novo projeto EAS via `eas init` e configurar credentials.

## Fase 2 — App funcional e integração
- [ ] Revisar e padronizar navegação, componentes e layouts responsivos.
- [ ] Adicionar gerenciamento de sessão e formulários com validação.
- [ ] Substituir os mocks por repositories/services com estados de loading/erro/vazio.
- [ ] Consumir endpoints reais de cadastro, login e perfil.
- [ ] Persistir sessão com armazenamento seguro e expiração de tokens.
- [ ] Integrar busca, listas, comparação de preços, pedidos, comunidade e entregas.
- [ ] Mapas, permissões e localização com consentimento.
- [ ] Testes unitários, integração e E2E; observabilidade.

## Fase 3 — API Backend-Aidan
- [ ] Ler código e documentação do backend.
- [ ] Fechar contrato OpenAPI/Swagger e modelo do banco.
- [ ] Implementar auth, permissões, validação, rate limit e políticas de privacidade.
- [ ] Criar endpoints de perfil, produtos, lista, pedidos, mercados, comunidade e localização.
- [ ] Deploy, migrações, CI, logs, métricas e segurança.
