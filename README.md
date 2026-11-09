# Aidan — Aplicativo mobile

Aplicativo Aidan para Android (com suporte de desenvolvimento via Expo Web), criado em **React Native + Expo + TypeScript + Expo Router**. Esta é a base oficial de desenvolvimento, migrada do repositório de demonstração `aidan-showcase`.

## Estado atual

**Fundação preparada; API ainda não integrada.** As telas, animações e fluxos visuais foram preservados e continuam usando dados mockados. Esta entrega adiciona a configuração de ambientes, cliente HTTP e módulos de integração preliminares; autenticação real, backend, persistência de dados e Google OAuth ainda serão desenvolvidos.

- Telas: splash animada, login, conta Google demonstrativa, cadastro, verificação, localização, boas-vindas, home, menu, perfil, configurações, lista de compras, comparação de preços, pedidos, comunidade e mapas simulados.
- Animações: logo Aidan inicial, carrinho na tela de boas-vindas e menu lateral suave.
- Interações de demonstração: formulários editáveis, checkboxes, filtros e navegação.
- Base técnica: `src/api` com `fetch`, timeout, tratamento de erros e interfaces **provisórias**.

**Aviso:** o botão Google da versão atual é apenas uma simulação, não autenticação Google. O exemplo Dara é dado de demonstração e não deve ficar no produto final.

## Requisitos

- Node.js 22 LTS (arquivo `.nvmrc`).
- npm.
- Git e uma conta GitHub para publicar.
- Conta Expo para gerar builds Android (EAS).
- Dispositivo Android real, emulador ou navegador para desenvolvimento.

## Início rápido

```bash
cd aidan
nvm use             # se você usa nvm; alternativamente use Node 22 instalado
npm ci              # instalação reproduzível via package-lock.json
cp .env.example .env
npm run web         # ou: npx expo start --clear --web
```

Teste no Android:

```bash
npm start
```

Leia o QR Code no Expo Go compatível com SDK 54 ou use uma development build. Em celular físico, servidor/porta/API precisam ser alcançáveis pela rede do celular.

### Variáveis de ambiente

```dotenv
EXPO_PUBLIC_USE_MOCKS=true
EXPO_PUBLIC_API_URL=
EXPO_PUBLIC_API_TIMEOUT_MS=12000
EXPO_PUBLIC_API_HEALTH_PATH=/health
```

Em modo mock, a interface continua funcionando com os dados locais. Quando o backend estiver pronto, precisamos **ajustar as rotas e conectar cada tela aos services** — definir a URL sozinho não realiza essa integração.

Variáveis `EXPO_PUBLIC_*` são **públicas e incorporadas ao app compilado**. Não grave client secrets, senhas nem chaves privadas nelas.

## Comandos

| Comando | Função |
| --- | --- |
| `npm ci` | Instala dependências do lockfile |
| `npm start` | Inicia o Expo |
| `npm run web` | Testa no navegador |
| `npm run android` | Abre fluxo de desenvolvimento Android |
| `npm run typecheck` | Checa TypeScript |
| `npm run doctor` | Diagnóstico Expo |
| `npm run lint` | ESLint Expo |
| `npm run build:apk` | Gera APK preview via EAS |
| `npm run build:prod` | Gera build de produção via EAS |

## APK e EAS

Este é um **novo aplicativo**: o antigo `projectId` do showcase foi removido para evitar que os builds se misturem. A identidade atual está em `app.json` (`slug: aidan`, `android.package: com.suporteaidan.aidan`). Confirme esse identificador antes de publicar na Play Store; alterar o `package` após distribuir impede atualizar o mesmo app pela loja.

```bash
npm install --global eas-cli
eas login
eas init                 # criar/vincular NOVO projeto Aidan no Expo
eas build -p android --profile preview
```

`eas.json` configura o perfil `preview` para gerar **APK** instalável e `production` para o fluxo normal de distribuição. O build real requer credenciais/configuração da conta Expo.

## Estrutura

```text
app/                     # rotas e telas Expo Router
assets/                  # logo, fotos e ilustrações
src/
  api/
    client.ts            # cliente HTTP centralizado
    errors.ts            # ApiError
    contracts.ts         # tipos provisórios, a confirmar com backend
    routes.ts            # URLs/paths provisórios, a confirmar
    services/            # auth, catálogo, listas, pedidos, perfil e comunidade
  auth/tokenStore.ts     # token somente em memória (temporário)
  config/env.ts          # configuração pública de API/mocks
  components/            # componentes reutilizáveis
  data/                  # mocks atuais
  theme/                 # tema
  hooks/                 # hooks atuais
docs/
  API-INTEGRATION.md     # integração e mapa de endpoints propostos
  GITHUB-SSH.md          # publicação GitHub com SSH
  ROADMAP.md             # fases e próximos passos
.github/workflows/      # CI: npm ci + typecheck + Expo check
.env.example             # exemplo, sem segredos
.gitignore
.nvmrc
package-lock.json        # deve ser versionado
```

## API / Backend-Aidan

Repositório informado: https://github.com/suporteaidan/Backend-Aidan

A estrutura e os endpoints desse backend **ainda precisam ser inspecionados**. Portanto, o contrato em `src/api/contracts.ts` e `src/api/routes.ts` representa apenas uma proposta. Não afirme que `/auth/login` ou qualquer outra rota existe até conferir o servidor.

Na implementação da API, vamos mapear registro, login/refresh/logout, perfil e endereços, catálogo, listas, comparação de mercado/preços, pedidos, entregas, avaliações/comunidade e localização. Autenticação deverá usar mecanismos seguros para tokens, expiração de sessão e autorização no servidor.

Consulte [`docs/API-INTEGRATION.md`](docs/API-INTEGRATION.md).

## GitHub e SSH

Veja [`docs/GITHUB-SSH.md`](docs/GITHUB-SSH.md), com criação da chave Ed25519 na sua máquina, cadastro da chave pública no GitHub e comandos para o primeiro push.

**Não inclua** `node_modules`, `.git` herdado do showcase, chaves privadas, `.env`, APKs e artefatos compilados no repositório.

## Licença e privacidade

O ZIP original já trazia um arquivo `LICENSE` MIT; ele foi preservado **sem alteração**. Antes de tornar o repositório público/comercial, decida se essa licença atende ao modelo do produto. Não exponha dados reais, credenciais de API ou imagens pessoais sem autorização.
