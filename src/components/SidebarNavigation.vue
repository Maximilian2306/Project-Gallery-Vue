<template>
  <aside :class="['sidebar', { open: isSidebarOpen }]">
    <div class="sidebar-header">
      <h3>
        <i class="fas fa-folder"></i>
        {{ t('categories') }}
      </h3>
    </div>
    <nav class="nav-menu">
      <a
        v-for="category in categories"
        :key="category.id"
        :href="`#${category.id}`"
        :class="['nav-item', { active: activeCategory === category.id }]"
        @click="scrollToCategory(category.id, $event)"
      >
        <i :class="`fas fa-${category.icon}`"></i>
        {{ t(category.titleKey) }}
        <span class="nav-count">{{ getCategoryCount(category.id) }}</span>
      </a>
    </nav>
  </aside>
</template>

<script>
import { ref, inject, onMounted, onUnmounted } from 'vue'

export default {
  name: 'SidebarNavigation',
  props: {
    categories: {
      type: Array,
      required: true
    },
    projects: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const { t } = inject('translations')
    const isSidebarOpen = ref(false)
    const activeCategory = ref('games')

    const getCategoryCount = (categoryId) => {
      return props.projects.filter(p => p.category === categoryId).length
    }

    const scrollToCategory = (categoryId, event) => {
      event.preventDefault()
      activeCategory.value = categoryId
      
      const element = document.getElementById(categoryId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      
      // Close sidebar on mobile
      if (window.innerWidth <= 768) {
        isSidebarOpen.value = false
      }
    }

    const handleScroll = () => {
      const sections = document.querySelectorAll('.category-section')
      let current = ''
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id')
        }
      })
      
      if (current) {
        activeCategory.value = current
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      t,
      isSidebarOpen,
      activeCategory,
      getCategoryCount,
      scrollToCategory
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: var(--card-bg);
  border-right: 1px solid var(--border-color);
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  z-index: 100;
  transition: transform 0.3s ease;
  top: 0;
  left: 0;
}

.sidebar-header {
  background: var(--gradient);
  color: white;
  padding: 1.5rem;
  text-align: center;
}

.sidebar-header h3 {
  font-size: 1.2rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.nav-menu {
  padding: 1rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  color: var(--text-color);
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.nav-item:hover {
  background: var(--border-color);
  padding-left: 2rem;
}

.nav-item.active {
  background: var(--gradient);
  color: white;
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--accent-color);
}

.nav-item i {
  margin-right: 0.75rem;
  width: 20px;
  text-align: center;
}

.nav-count {
  margin-left: auto;
  background: var(--border-color);
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  font-size: 0.8rem;
}

.nav-item.active .nav-count {
  background: rgba(255, 255, 255, 0.2);
}

/* Mobile Styles */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
  
  .sidebar.open {
    transform: translateX(0);
  }
}
</style>

