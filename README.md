# Project Gallery Vue

A modern, responsive portfolio gallery built with Vue 3 to showcase programming projects in an organized and visually appealing way.

![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=flat&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=flat&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

## Features

- **Dark/Light Mode** - Toggle between themes with automatic system preference detection
- **Multi-language Support** - Switch between German and English
- **Advanced Filtering** - Filter projects by programming languages, frameworks, and technologies
- **Real-time Search** - Instantly search projects by name or tech stack
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Persistent Settings** - Theme and language preferences saved to localStorage
- **Categorized Display** - Projects organized into Games, Tools, and Services
- **Smooth Animations** - Modern UI with subtle transitions and hover effects

## Tech Stack

- **Vue 3** - Composition API with reactive state management
- **Vite** - Fast build tool and development server
- **FontAwesome** - Icon library for UI elements
- **CSS Custom Properties** - Theming system with CSS variables
- **LocalStorage** - Client-side preference persistence

## Project Structure

```
src/
├── components/
│   ├── AppHeader.vue        # Header with title and animated background
│   ├── CategorySection.vue  # Project category container
│   ├── InfoModal.vue        # About dialog
│   ├── ProjectTile.vue      # Individual project card
│   ├── SidebarNavigation.vue # Sidebar with category links
│   └── Toolbar.vue          # Combined filter, search, and settings bar
├── data/
│   └── projects.js          # Project and category data
├── i18n/
│   └── useTranslations.js   # Internationalization and theme composables
├── App.vue                  # Root component
├── main.js                  # Application entry point
└── style.css                # Global styles and CSS variables
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Maximilian2306/Project-Gallery-Vue.git
   cd Project-Gallery-Vue
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deploy to GitHub Pages

```bash
npm run deploy
```

## Adding New Projects

Edit `src/data/projects.js` to add new projects:

```javascript
{
    id: 5,
    category: 'tools',  // 'games', 'tools', or 'services'
    title: 'Project Name',
    descriptionKey: 'project-desc',  // Add translation key
    icon: 'code',  // FontAwesome icon name
    tech: ['JavaScript', 'Vue', 'Node.js'],
    demoLink: 'https://your-demo-link.com',
    codeLink: 'https://github.com/your-repo'
}
```

Don't forget to add the description translation in `src/i18n/useTranslations.js` for both languages.

## Customization

### Adding New Filter Categories

Edit `techCategories` in `src/data/projects.js`:

```javascript
export const techCategories = {
    languages: {
        titleKey: 'filter-languages',
        icon: 'code',
        items: ['JavaScript', 'Python', 'C#']
    },
    // Add more categories...
}
```

### Theming

Modify CSS custom properties in `src/style.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    /* ... */
}
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run deploy` | Deploy to GitHub Pages |
| `npm run lint` | Run ESLint |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Maximilian Hahn**

- GitHub: [@Maximilian2306](https://github.com/Maximilian2306)

---

Made with Vue.js
