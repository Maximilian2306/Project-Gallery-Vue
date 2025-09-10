<template>
  <section class="category-section">
    <div class="category-header">
      <div class="category-icon">
        <i :class="`fas fa-${category.icon}`"></i>
      </div>
      <h2 class="category-title">{{ t(category.titleKey) }}</h2>
      <div class="category-count">{{ t(category.countKey) }}</div>
    </div>
    <div class="projects-grid">
      <ProjectTile
        v-for="project in projects"
        :key="project.id"
        :project="project"
        :gradient="category.gradient"
      />
    </div>
  </section>
</template>

<script>
import { inject } from 'vue'
import ProjectTile from './ProjectTile.vue'

export default {
  name: 'CategorySection',
  components: {
    ProjectTile
  },
  props: {
    category: {
      type: Object,
      required: true
    },
    projects: {
      type: Array,
      required: true
    }
  },
  setup() {
    const { t } = inject('translations')
    
    return {
      t
    }
  }
}
</script>

<style scoped>
.category-section {
  background: var(--category-bg);
  border-radius: 20px;
  margin-bottom: 3rem;
  box-shadow: 0 10px 30px var(--shadow);
  border: 1px solid var(--border-color);
  overflow: hidden;
  animation: slideInUp 0.6s ease;
}

.category-header {
  background: var(--gradient);
  color: white;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.category-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%);
}

.category-icon {
  width: 50px;
  height: 50px;
  background: rgba(255,255,255,0.2);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  backdrop-filter: blur(10px);
}

.category-title {
  font-size: 1.8rem;
  font-weight: bold;
}

.category-count {
  margin-left: auto;
  background: rgba(255,255,255,0.2);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
}

.projects-grid {
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

@keyframes slideInUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    padding: 1rem;
  }
  
  .category-header {
    padding: 1rem 1.5rem;
  }
  
  .category-title {
    font-size: 1.4rem;
  }
}

@media (max-width: 480px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>