# CM Pisos - Distribuidor de Pisos e Carpetes

Site estático para GitHub Pages com catálogo de produtos Belgotex.

## Estrutura

- `public/index.html` - Página principal
- `public/css/style.css` - Estilos globais
- `public/js/main.js` - Lógica do catálogo e filtros
- `public/images/` - Imagens dos produtos e hero

## Para GitHub Pages

1. Clone o repositório
2. Vá até Settings → Pages → Build and deployment
3. Selecione "Deploy from a branch"
4. Escolha `main` (ou sua branch padrão) e `/root` como source
5. Clique em Save

O site estará disponível em `https://<seu-usuario>.github.io/<repo-name>`

## Desenvolvimento Local

```bash
# Usando Python (pré-instalado)
npm run dev

# Ou usando http-server
npm run serve
```

Abra http://localhost:8000

## Build para GitHub Pages

Nenhum build necessário! Os arquivos em `public/` são servidos diretamente.
