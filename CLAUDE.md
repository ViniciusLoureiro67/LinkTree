# Vinicius Loureiro - Portfolio

Portfolio pessoal interativo construído com React, Tailwind CSS, shadcn/ui e Ant Design.

## Stack

- **Framework:** React 18 + Vite 5
- **Estilização:** Tailwind CSS v4 + CSS Modules
- **Componentes:** shadcn/ui + Ant Design 6
- **Animações:** Framer Motion
- **Drag & Drop:** @dnd-kit
- **Roteamento:** React Router DOM v7
- **Ícones:** Lucide React + FontAwesome

## Estrutura do Projeto

```
src/
├── components/
│   ├── ui/              # Componentes shadcn/ui (Button, Card, Badge)
│   ├── demos/           # Demos interativas (KanbanDemo, NotificationsDemo)
│   ├── Navigation.jsx
│   └── ScreenshotGallery.jsx
├── pages/
│   ├── Home.jsx         # Página inicial com links sociais
│   ├── Portfolio.jsx    # Grid de projetos
│   └── ProjectDetails.jsx # Detalhes de projeto com demos
├── lib/
│   └── utils.js         # Utilitários (cn)
└── index.css            # Estilos globais + Tailwind
```

## Comandos NPM

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build de produção
npm run lint     # Verifica erros de lint
npm run preview  # Preview do build
```

## Padrões de Código

### Componentes React

```jsx
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export function ComponentName({ className, ...props }) {
  return (
    <motion.div
      className={cn("base-classes", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      {...props}
    >
      {/* Conteúdo */}
    </motion.div>
  );
}
```

### Estilos

- **Glassmorphism:** `bg-white/5 backdrop-blur-lg border border-white/10`
- **Cards:** `bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all`
- **Texto gradiente:** `bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent`

### Animações (Framer Motion)

```jsx
// Container com stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// Item com slide
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

// Hover
whileHover={{ scale: 1.05, y: -5 }}
whileTap={{ scale: 0.95 }}
```

## Comandos Claude Code

| Comando | Descrição |
|---------|-----------|
| `/commit` | Criar commits atômicos seguindo convenções |
| `/plan` | Planejar implementação de features |
| `/exec` | Executar plano aprovado |
| `/pr` | Criar Pull Request documentado |
| `/component` | Criar novo componente React |
| `/portfolio` | Adicionar projeto ao portfólio |
| `/ui` | Criar interfaces seguindo padrões UI |
| `/ui-ux-pro-max` | Design com diretrizes avançadas |

## Adicionando Projetos ao Portfólio

### 1. Lista de projetos (Portfolio.jsx)

```jsx
{
  id: 'project-slug',
  title: 'Nome do Projeto',
  description: 'Descrição curta',
  image: '/screenshots/thumb.jpg',
  url: '/portfolio/project-slug',
  technologies: ['React', 'TypeScript'],
  featured: true
}
```

### 2. Dados detalhados (ProjectDetails.jsx)

```jsx
'project-slug': {
  id: 'project-slug',
  title: 'Nome do Projeto',
  subtitle: 'Subtítulo',
  description: 'Descrição completa',
  technologies: [...],
  features: [...],
  highlights: [...],
  screenshots: [...]
}
```

### 3. Screenshots

- Salvar em `public/screenshots/`
- Formato: `{projeto}-{feature}-{numero}.jpg`
- Resolução: 1920x1080 ou 1280x720

## Convenções de Commit

```
<emoji> <type>(<scope>): <subject>
```

| type | emoji | uso |
|------|-------|-----|
| feat | ✨ | Nova funcionalidade |
| fix | 🐛 | Correção de bug |
| style | 👌 | Mudanças visuais |
| refactor | ♻️ | Refatoração |
| docs | 📚 | Documentação |
| chore | 🔧 | Manutenção |
| build | ➕ | Dependências |
| perf | ⚡ | Performance |

### Scopes

**UI:** components, pages, hooks, ui, router, layout, animations
**Infra:** vite, tailwind, eslint, deps, config
**Domínio:** portfolio, projects, home, about, contact, demos

## Boas Práticas

- [ ] Mobile-first (responsivo)
- [ ] Acessibilidade (aria-labels, contraste 4.5:1)
- [ ] Performance (lazy loading, transform/opacity)
- [ ] Animações 150-300ms
- [ ] Usar `cn()` para merge de classes
- [ ] Exportação nomeada de componentes

## Sobre o Projeto

Este é o portfolio pessoal de **Vinicius Loureiro**, Engenheiro Front-end especializado em React com experiência em sistemas empresariais.

### Estatísticas

- 2500+ commits em produção
- 350+ componentes React/TypeScript
- 5 sistemas empresariais em produção
- Stack: React 19, TypeScript, Tailwind, shadcn/ui, Inertia.js

### Links

- [GitHub](https://github.com/ViniciusLoureiro67)
- [LinkedIn](https://linkedin.com/in/vsloureiro)
- [Instagram](https://instagram.com/im.viniciusloureiro)

## Responda sempre em Português (pt-BR)
