# GitHub Actions Setup

Como a GitHub App não tem permissão para criar workflows, você precisa adicionar o workflow manualmente no GitHub.

## Passo 1: Acesse seu repositório no GitHub

1. Vá para https://github.com/angelo-marques/design-patterns-angelo
2. Clique em "Actions" na barra de navegação superior

## Passo 2: Crie um novo workflow

1. Clique em "New workflow"
2. Clique em "set up a workflow yourself"
3. Nomeie o arquivo como `deploy.yml`

## Passo 3: Cole o conteúdo do workflow

Copie e cole o seguinte conteúdo:

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 10.4.1
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run tests
        run: pnpm test
      
      - name: Build project
        run: pnpm build
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build-artifacts
          path: |
            dist/
            client/dist/
          retention-days: 5
      
      - name: Deploy to GitHub Pages
        if: github.ref == 'refs/heads/main' && github.event_name == 'push'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./client/dist
```

## Passo 4: Commit e Push

1. Clique em "Start commit"
2. Adicione a mensagem: "Add GitHub Actions workflow for build and deploy"
3. Clique em "Commit new file"

## Passo 5: Verificar o build

1. Vá para a aba "Actions"
2. Você verá o workflow rodando
3. Aguarde a conclusão do build

## Alternativa: Adicionar via Git Local

Se preferir adicionar via git local, execute:

```bash
git checkout main
git pull origin main
# Crie o arquivo .github/workflows/deploy.yml com o conteúdo acima
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions workflow"
git push origin main
```

## Troubleshooting

Se o workflow ainda não rodar:

1. Verifique se o repositório tem GitHub Pages habilitado em Settings → Pages
2. Certifique-se que a branch `main` está selecionada como source
3. Verifique os logs do workflow em Actions para erros específicos
