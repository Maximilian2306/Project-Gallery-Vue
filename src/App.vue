<template>
  <div id="app" class="app-container">
    <!-- Mobile Sidebar Toggle -->
    <button class="sidebar-toggle" @click="toggleSidebar">
      <i class="fas fa-bars"></i>
    </button>
    
    <!-- Sidebar Navigation -->
    <SidebarNavigation 
      :categories="categories"
      :projects="projects"
      ref="sidebar"
    />
    
    <!-- Main Content -->
    <div class="main-content">
      <AppHeader />
      <AppControls />
      <div class="main-container">
        <CategorySection
          v-for="category in categories"
          :key="category.id"
          :id="category.id"
          :category="category"
          :projects="getProjectsByCategory(category.id)"
        />
      </div>
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
import SidebarNavigation from './components/SidebarNavigation.vue'
import { useTranslations, useTheme } from './i18n/useTranslations'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppControls,
    CategorySection,
    InfoModal,
    SidebarNavigation
  },
  setup() {
    const showInfoModal = ref(false)
    const sidebar = ref(null)
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
        id: 4,
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

    const toggleSidebar = () => {
      if (sidebar.value) {
        sidebar.value.isSidebarOpen = !sidebar.value.isSidebarOpen
      }
    }

    return {
      showInfoModal,
      sidebar,
      categories,
      projects,
      getProjectsByCategory,
      toggleSidebar
    }
  }
}
</script>

<style>
@import './style.css';

.app-container {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  width: calc(100% - 250px);
  transition: margin-left 0.3s ease;
}

.sidebar-toggle {
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
  background: var(--gradient);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 2px 10px var(--shadow);
  transition: all 0.3s ease;
}

.sidebar-toggle:hover {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .sidebar-toggle {
    display: block;
  }
  
  .main-content {
    margin-left: 0;
    width: 100%;
  }
  
  .header {
    padding-left: 4rem;
  }
}
</style>