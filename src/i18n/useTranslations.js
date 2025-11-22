import { ref } from 'vue'

const translations = {
  de: {
    title: 'Meine Projekt Gallery',
    subtitle: 'Eine Sammlung meiner besten Programmierprojekte',
    games: 'Spiele',
    'games-count': '3 Projekte',
    tools: 'Tools',
    'tools-count': '1 Projekt',
    services: 'Services',
    'services-count': '0 Projekte',
    demo: 'Demo',
    live: 'Live',
    api: 'API',
    about: ' Über diese Gallery', 
    'about-text': 'Diese Projekt-Gallery zeigt meine besten Programmierprojekte in verschiedenen Kategorien. Jedes Projekt ist in einer spezifischen Kategorie organisiert. Verwende den Dark Mode Button für ein dunkles Design und die Spracheinstellungen um zwischen Deutsch und Englisch zu wechseln.',
    features: 'Features',
    'feature-1': '🌓 Dark/Light Mode Toggle',
    'feature-2': '🌍 Mehrsprachigkeit (DE/EN)',
    'feature-3': '🎮 Kategorisierte Darstellung',
    'space-desc': 'Ein Minesweeper Klon mit KI-Spiel-Unterstützung, verschiedenen Schwierigkeitsgraden und Leaderboard.',
    'memory-desc': 'Erste Anwendung einer virtuellen Flugzeugswebsite mit C# und WPF.',
    'formatter-desc': 'Ein einfacher Auto Clicker, der Mausklicks in konfigurierbaren Intervallen automatisiert.',
    'categories': 'Kategorien',
    'filter': 'Filter',
    'all': 'Alle',
    'search': 'Suchen',
    'search-placeholder': 'Projekte durchsuchen...',
    'no-results': 'Keine Projekte gefunden',
    'filter-languages': 'Sprachen',
    'filter-frameworks': 'Frameworks',
    'filter-technologies': 'Technologien',
    'show-filters': 'Filter anzeigen',
    'hide-filters': 'Filter ausblenden',
    'clear-filters': 'Filter zurücksetzen'
  },
  en: {
    title: 'My Project Gallery',
    subtitle: 'A collection of my best programming projects',
    games: 'Games',
    'games-count': '3 Projects',
    tools: 'Tools',
    'tools-count': '1 Project',
    services: 'Services',
    'services-count': '0 Projects',
    demo: 'Demo',
    live: 'Live',
    api: 'API',
    about: ' About this Gallery', 
    'about-text': 'This project gallery showcases my best programming projects in different categories. Each projects is organized in a specific section. Use the Dark Mode button for a dark design and the language settings to switch between German and English.',
    features: 'Features',
    'feature-1': '🌓 Dark/Light Mode Toggle',
    'feature-2': '🌍 Multi-language support (DE/EN)',
    'feature-3': '🎮 Categorized display',
    'space-desc': 'A clone of Minesweeper with AI game support, different difficulty levels and a leaderboard.',
    'memory-desc': 'First application of a virtual airplane website using C# and WPF.',
    'formatter-desc': 'A simple auto clicker that automates mouse clicks at configurable intervals.',
    'categories': 'Categories',
    'filter': 'Filter',
    'all': 'All',
    'search': 'Search',
    'search-placeholder': 'Search projects...',
    'no-results': 'No projects found',
    'filter-languages': 'Languages',
    'filter-frameworks': 'Frameworks',
    'filter-technologies': 'Technologies',
    'show-filters': 'Show filters',
    'hide-filters': 'Hide filters',
    'clear-filters': 'Clear filters'
  }
}

// Initialize language from localStorage or default to 'de'
const savedLanguage = typeof localStorage !== 'undefined' ? localStorage.getItem('language') : null
const currentLanguage = ref(savedLanguage || 'de')

export function useTranslations() {
    const t = (key) => {
        return translations[currentLanguage.value][key] || key
    }

    const setLanguage = (lang) => {
        if (translations[lang]) {
            currentLanguage.value = lang
            localStorage.setItem('language', lang)
        }
    }

    return { t, setLanguage, currentLanguage }
}

// Initialize theme from localStorage or system preference
const getInitialTheme = () => {
    if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('theme')
        if (saved) return saved
    }
    // Check system preference
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
    }
    return 'light'
}

const currentTheme = ref(getInitialTheme())

export function useTheme() {
    const isDarkMode = ref(currentTheme.value === 'dark')

    // Apply theme on initialization
    if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', currentTheme.value)
    }

    const toggleTheme = () => {
        currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
        isDarkMode.value = currentTheme.value === 'dark'
        document.documentElement.setAttribute('data-theme', currentTheme.value)
        localStorage.setItem('theme', currentTheme.value)
    }

    return { isDarkMode, toggleTheme }
}