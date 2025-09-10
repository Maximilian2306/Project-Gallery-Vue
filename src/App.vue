<template>
  <div id="app">
    <AppHeader />
    <AppControls />
    <div class="main-container">
      <CategorySection
        v-for="category in categories"
        :key="category.id"
        :category="category"
        :projects="getProjectsByCategory(category.id)"
      />
    </div>
    <InfoModal v-if="showInfoModal" @close="showInfoModal = false" />
  </div>
</template>

<script>
import { ref, computed, onMounted, provide } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppControls from './components/AppControls.vue'
import CategorySection from './components/CategorySection.vue'
import InfoModal from './components/InfoModal.vue'
import { useTranslations, useTheme } from './i18n/useTranslations'
// import { useTheme } from './i18n/useTheme'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppControls,
    CategorySection,
    InfoModal
  },
  setup() {
    const showInfoModal = ref(false)
    const { currentLanguage, t, setLanguage } = useTranslations()
    const { isDarkMode, toggleTheme } = useTheme()

    // Provide global state
    provide('showInfoModal', showInfoModal)
    provide('translations', { t, currentLanguage, setLanguage })
    provide('theme', { isDarkMode, toggleTheme })

    const categories = ref([
      {
        id: 'games',
        icon: 'gamepad',
        titleKey: 'games',
        countKey: 'games-count',
        gradient: 'game-pattern'
      },
      {
        id: 'tools',
        icon: 'tools',
        titleKey: 'tools',
        countKey: 'tools-count',
        gradient: 'tool-pattern'
      },
      {
        id: 'services',
        icon: 'cloud',
        titleKey: 'services',
        countKey: 'services-count',
        gradient: 'service-pattern'
      }
    ])

    const projects = ref([
      // Games
      {
        id: 1,
        category: 'games',
        title: 'Minesweeper_AI',
        descriptionKey: 'space-desc',
        icon: 'rocket',
        tech: ['JavaScript', 'HTML5', 'WebGL'],
        demoLink: 'https://maximilian2306.github.io/Minesweeper_AI_v2/',
        codeLink: 'https://github.com/Maximilian2306/Minesweeper_AI_v2'
      },
      {
        id: 2,
        category: 'games',
        title: 'FlyTillYouDieDepot',
        descriptionKey: 'memory-desc',
        icon: 'puzzle-piece',
        tech: ['C#', 'WPF', 'XAML', 'SQL'],
        demoLink: '#',
        codeLink: 'https://github.com/Maximilian2306/FlyTillYouDieDepot'
      },

      // Tools

      {
        id: 3,
        category: 'tools',
        title: 'Auto Clicker',
        descriptionKey: 'formatter-desc',
        icon: 'code',
        tech: ['Node.js', 'Express', 'Prettier'],
        demoLink: '#',
        codeLink: '#'
      }
    ])

    const getProjectsByCategory = (categoryId) => {
      return projects.value.filter(p => p.category === categoryId)
    }

    return {
      showInfoModal,
      categories,
      projects,
      getProjectsByCategory
    }
  }
}
</script>

<style>
/* @import './assets/styles/main.css'; */
@import './style.css';
</style> 