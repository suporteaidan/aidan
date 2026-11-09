# Git e SSH — publicar o app `aidan`

**O projeto `aidan` no GitHub precisa existir e você precisa ter permissão de escrita.**
A mensagem original não incluiu a URL do repositório do app; o exemplo abaixo
usa `suporteaidan/aidan` **somente se essa for a URL correta**.

## 1. Configurar Git (na sua máquina)

```bash
git --version
git config --global user.name 'Seu nome'
git config --global user.email 'seu-email-do-github@example.com'
```

## 2. Criar chave SSH (somente no seu computador)

```bash
ls -la ~/.ssh
ssh-keygen -t ed25519 -C 'seu-email-do-github@example.com' -f ~/.ssh/id_ed25519_aidan
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519_aidan
cat ~/.ssh/id_ed25519_aidan.pub
```

Use passphrase. **NUNCA envie `id_ed25519_aidan` (sem `.pub`) nem
commite sua chave privada**.

No GitHub: avatar → Settings → SSH and GPG keys → New SSH key → cole **somente** o conteúdo do `.pub`.

Se usar mais de uma conta/chave SSH, crie/edite `~/.ssh/config` com:

```
Host github-aidan
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_aidan
  IdentitiesOnly yes
```

```bash
chmod 600 ~/.ssh/config
ssh -T git@github-aidan
```

No primeiro acesso, confira a fingerprint oficial do GitHub antes de confiar no host.
Veja https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection

## 3. Subir o código

O ZIP entregue tem uma pasta `aidan/`, sem `.git` e sem dependências instaladas.

**Repo remoto vazio:**

```bash
cd ~/Projects/aidan
git init -b main
git add .
git commit -m 'chore: bootstrap Aidan mobile app'
git remote add origin git@github-aidan:suporteaidan/aidan.git
git push -u origin main
```

**Repo remoto com commits/README:** prefira clonar o repositório remoto
primeiro, copiar os arquivos da pasta `aidan/` para o clone, então commitar.
Não use `git push --force` para contornar conflitos.

```bash
cd ~/Projects
git clone git@github-aidan:suporteaidan/aidan.git aidan-remote
rsync -av --exclude='.git' aidan/ aidan-remote/
cd aidan-remote
git add .
git commit -m 'chore: bootstrap Aidan mobile app'
git push -u origin HEAD
```

Se a org não for `suporteaidan`, substitua a URL pelo link SSH exato mostrado em **Code → SSH** no seu repositório GitHub.

## 4. Segurança antes de publicar

```bash
git status --short
git ls-files | grep -E '(node_modules|^\.env$|\.jks$|\.pem$|/\.git/)' || true
```

Verifique manualmente que não há credenciais, senhas, dumps de banco, tokens ou informação pessoal nos arquivos versionados. O app ainda contém a conta e a foto fictícias/da demo.
