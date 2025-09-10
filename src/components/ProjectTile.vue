<template>
  <div class="project-tile">
    <div :class="['project-image', gradient]">
      <i :class="`fas fa-${project.icon} project-image-icon`"></i>
    </div>
    <div class="project-info">
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-description">{{ t(project.descriptionKey) }}</p>
      <div class="project-tech">
        <span v-for="tech in project.tech" :key="tech" class="tech-tag">
          {{ tech }}
        </span>
      </div>
      <div class="project-links">
        <a :href="project.demoLink" class="project-link btn-primary">
          <i class="fas fa-play"></i>
          <span>{{ t('demo') }}</span>
        </a>
        <a :href="project.codeLink" class="project-link btn-secondary">
          <i class="fab fa-github"></i>
          Code
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'ProjectTile',
  props: {
    project: {
      type: Object,
      required: true
    },
    gradient: {
      type: String,
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
.project-tile {
  background: var(--card-bg);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid var(--border-color);
  position: relative;
}

.project-tile:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px var(--shadow);
}

.project-image {
  width: 100%;
  height: 180px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-image.game-pattern {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
}

.project-image.tool-pattern {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.project-image.service-pattern {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.project-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" stroke-width="0.5" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
}

.project-image-icon {
  font-size: 3rem;
  color: white;
  z-index: 2;
  position: relative;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

.project-info {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.project-description {
  color: var(--text-color);
  opacity: 0.7;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-tag {
  background: var(--border-color);
  color: var(--text-color);
  padding: 0.2rem 0.6rem;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 500;
}

.project-links {
  display: flex;
  gap: 0.5rem;
}

.project-link {
  flex: 1;
  padding: 0.6rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-primary {
  background: var(--gradient);
  color: white;
}

.btn-secondary {
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  background: transparent;
}

.project-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px var(--shadow);
}
</style>