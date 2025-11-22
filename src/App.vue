<template>
  <div id="app" class="app-container">
    <button class="sidebar-toggle" @click="toggleSidebar">
      <i class="fas fa-bars"></i>
    </button>
    
    <SidebarNavigation 
      :categories="categories"
      :projects="projects"
      ref="sidebar"
    />
    
    <div class="main-content">
      <AppHeader />
      <ToolBar
        :technologies="technologies"
        :selected-techs="selectedTechs"
        :projects="projects"
        :search-query="searchQuery"
        @update:selected-techs="selectedTechs = $event"
        @update:search-query="searchQuery = $event"
      />
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
import { ref, provide, computed } from 'vue'
import AppHeader from './components/AppHeader.vue'
import CategorySection from './components/CategorySection.vue'
import InfoModal from './components/InfoModal.vue'
import SidebarNavigation from './components/SidebarNavigation.vue'
import ToolBar from './components/ToolBar.vue'
import { useTranslations, useTheme } from './i18n/useTranslations'
import { categories as categoryData, projects as projectData, getAllTechnologies } from './data/projects'

export default {
  name: 'App',
  components: {
    AppHeader,
    CategorySection,
    InfoModal,
    SidebarNavigation,
    ToolBar
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

    const categories = ref(categoryData)
    const projects = ref(projectData)
    const selectedTechs = ref([])
    const searchQuery = ref('')
    const technologies = getAllTechnologies()

    const filteredProjects = computed(() => {
      let result = projects.value

      // Filter by tech stack
      if (selectedTechs.value.length > 0) {
        result = result.filter(project =>
          selectedTechs.value.some(tech => project.tech.includes(tech))
        )
      }

      // Filter by search query
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase().trim()
        result = result.filter(project =>
          project.title.toLowerCase().includes(query) ||
          project.tech.some(tech => tech.toLowerCase().includes(query))
        )
      }

      return result
    })

    const getProjectsByCategory = (categoryId) => {
      return filteredProjects.value.filter(p => p.category === categoryId)
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
      selectedTechs,
      searchQuery,
      technologies,
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