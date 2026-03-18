# Portfólio Vinicius - LinkTree Moderno

Um portfólio moderno e animado construído com React, Vite, React Router e Framer Motion.

## 🚀 Funcionalidades

- ✨ **Design Moderno**: Interface elegante com animações suaves
- 📱 **Responsivo**: Funciona perfeitamente em todos os dispositivos
- 🎨 **Animações**: Transições fluidas usando Framer Motion
- 📂 **Portfólio Interativo**: Seção dedicada para exibir seus projetos
- 🔗 **Links Sociais**: Integração com suas redes sociais

## 📦 Instalação

```bash
npm install
```

## 🛠️ Desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 🏗️ Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`

## 🌐 Deploy e Domínio

### Opção 1: Vercel (Recomendado)
1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Conecte seu repositório
4. Configure seu domínio personalizado nas configurações do projeto
5. Aponte o DNS do seu domínio para a Vercel

### Opção 2: Netlify
1. Faça push do código para o GitHub
2. Acesse [netlify.com](https://netlify.com)
3. Conecte seu repositório
4. Configure seu domínio personalizado
5. Aponte o DNS do seu domínio para a Netlify

### Opção 3: GitHub Pages
1. Instale o plugin: `npm install --save-dev gh-pages`
2. Adicione no `package.json`:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```
3. Execute: `npm run deploy`

### Configuração do DNS
Para usar seu domínio personalizado, você precisará:
- **A Record**: Aponte para o IP do servidor (fornecido pela plataforma)
- **CNAME**: Aponte para o domínio da plataforma (ex: `your-project.vercel.app`)

## 📝 Personalização

### Adicionar Projetos ao Portfólio

Edite o arquivo `src/pages/Portfolio.jsx` e modifique o array `projects`:

```javascript
const projects = [
  {
    id: 1,
    title: 'Nome do Projeto',
    description: 'Descrição detalhada do projeto',
    image: '/caminho/para/imagem.jpg',
    url: 'https://link-do-projeto.com',
    technologies: ['React', 'Node.js', 'MongoDB']
  },
  // Adicione mais projetos aqui...
];
```

### Personalizar Links Sociais

Edite o arquivo `src/pages/Home.jsx` e modifique o array `links`:

```javascript
const links = [
  { id: 1, url: 'https://...', title: 'Linkedin', icon: faLinkedin },
  // Adicione mais links...
];
```

## 🎨 Tecnologias Utilizadas

- React 18
- React Router DOM
- Framer Motion
- Vite
- Font Awesome
- CSS3 (com animações e gradientes)

## 📄 Licença

Este projeto é de uso pessoal.
