import { ref, computed } from 'vue'

const translations = {
  de: {
    title: 'Meine Projekt Gallery',
    subtitle: 'Eine Sammlung meiner besten Programmierprojekte',
    games: 'Spiele', 
    'games-count': '2 Projekte',
    tools: 'Tools', 
    'tools-count': '1 Projekte',
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
    'space-desc': 'Ein Klon von Minesweeper mit KI-Spiel-Unterstützung, verschiedenen Schwierigkeitsgraden und einem Leaderboard.',
    'memory-desc': 'Erste Anwendung einer virtuellen Flugzeugswebsite mit C# und WPF.',
    'formatter-desc': 'Ein einfacher Auto Clicker, der Mausklicks in konfigurierbaren Intervallen automatisiert.',
    'categories': 'Kategorien'
  },
  en: {
    title: 'My Project Gallery',
    subtitle: 'A collection of my best programming projects',
    games: 'Games', 
    'games-count': '3 Projects',
    tools: 'Tools', 
    'tools-count': '4 Projects',
    services: 'Services', 
    'services-count': '2 Projects',
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
    'categories': 'Categories'
  }
}

const currentLanguage = ref('de')

export function useTranslations() {
  const t = (key) => {
    return translations[currentLanguage.value][key] || key
  }
    const setLanguage = (lang) => {
    if (translations[lang]) {
      currentLanguage.value = lang
    }
    }
    const language = computed(() => currentLanguage.value)
    return { t, setLanguage, language }
}

export function useTheme() {
    const currentTheme = ref('light')
    const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', currentTheme.value)
    }
    const theme = computed(() => currentTheme.value)
    return { theme, toggleTheme }
}