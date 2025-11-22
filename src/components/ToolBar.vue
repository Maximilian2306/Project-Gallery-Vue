<template>
  <div class="toolbar">
    <div class="toolbar-container">
      <!-- Filter Toggle -->
      <div class="toolbar-item filter-toggle" @click="isFilterExpanded = !isFilterExpanded">
        <i class="fas fa-filter"></i>
        <span class="toolbar-label">{{ t('filter') }}</span>
        <span v-if="selectedTechs.length > 0" class="active-count">
          {{ selectedTechs.length }}
        </span>
        <i :class="['fas', 'chevron', isFilterExpanded ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
      </div>

      <!-- Search Bar -->
      <div class="toolbar-item search-wrapper">
        <i class="fas fa-search search-icon"></i>
        <input
          type="text"
          :placeholder="t('search-placeholder')"
          :value="searchQuery"
          @input="$emit('update:searchQuery', $event.target.value)"
          class="search-input"
        />
        <button
          v-if="searchQuery"
          class="clear-search"
          @click="$emit('update:searchQuery', '')"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Settings -->
      <div class="toolbar-item settings">
        <button class="icon-btn" @click="toggleTheme">
          <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
        </button>
        <select class="lang-select" :value="currentLanguage" @change="handleLanguageChange">
          <option disabled value="">🌐 Language</option>
          <option value="de">🇩🇪</option>
          <option value="en">🇺🇸</option>
        </select>
        <button class="icon-btn" @click="showInfo">
          <i class="fas fa-info-circle"></i>
        </button>
      </div>
    </div>

    <!-- Expandable Filter Content -->
    <div class="filter-panel" :class="{ expanded: isFilterExpanded }">
      <div class="filter-panel-content">
        <!-- Clear Button -->
        <div class="filter-actions">
          <button
            class="filter-tag all-tag"
            :class="{ active: selectedTechs.length === 0 }"
            @click="clearFilters"
          >
            <i class="fas fa-layer-group"></i>
            {{ t('all') }}
          </button>
          <button
            v-if="selectedTechs.length > 0"
            class="clear-btn"
            @click="clearFilters"
          >
            <i class="fas fa-times"></i>
            {{ t('clear-filters') }}
          </button>
        </div>

        <!-- Filter Columns -->
        <div class="filter-columns">
          <div
            v-for="(category, key) in techCategories"
            :key="key"
            class="filter-column"
          >
            <div class="column-header">
              <i :class="['fas', 'fa-' + category.icon]"></i>
              <span>{{ t(category.titleKey) }}</span>
            </div>
            <div class="column-items">
              <button
                v-for="tech in category.items"
                :key="tech"
                class="filter-item"
                :class="{ active: selectedTechs.includes(tech) }"
                @click="toggleTech(tech)"
              >
                <span class="item-name">{{ tech }}</span>
                <span class="item-count">({{ getTechCount(tech) }})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject } from 'vue'
import { techCategories } from '../data/projects'

export default {
  name: 'ToolBar',
  props: {
    technologies: {
      type: Array,
      required: true
    },
    selectedTechs: {
      type: Array,
      required: true
    },
    projects: {
      type: Array,
      required: true
    },
    searchQuery: {
      type: String,
      default: ''
    }
  },
  emits: ['update:selectedTechs', 'update:searchQuery'],
  setup(props, { emit }) {
    const showInfoModal = inject('showInfoModal')
    const { t, currentLanguage, setLanguage } = inject('translations')
    const { isDarkMode, toggleTheme } = inject('theme')

    const isFilterExpanded = ref(false)

    const handleLanguageChange = (event) => {
      setLanguage(event.target.value)
    }

    const showInfo = () => {
      showInfoModal.value = true
    }

    const toggleTech = (tech) => {
      const newSelected = props.selectedTechs.includes(tech)
        ? props.selectedTechs.filter(t => t !== tech)
        : [...props.selectedTechs, tech]
      emit('update:selectedTechs', newSelected)
    }

    const clearFilters = () => {
      emit('update:selectedTechs', [])
    }

    const getTechCount = (tech) => {
      return props.projects.filter(p => p.tech.includes(tech)).length
    }

    return {
      t,
      currentLanguage,
      isDarkMode,
      toggleTheme,
      handleLanguageChange,
      showInfo,
      isFilterExpanded,
      techCategories,
      toggleTech,
      clearFilters,
      getTechCount
    }
  }
}
</script>

<style scoped>
.toolbar {
  background: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
}

.toolbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.toolbar-item {
  display: flex;
  align-items: center;
}

/* Filter Toggle */
.filter-toggle {
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  color: var(--text-color);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.filter-toggle:hover {
  border-color: var(--primary-color);
}

.filter-toggle i:first-child {
  color: var(--primary-color);
}

.toolbar-label {
  font-size: 0.9rem;
}

.active-count {
  background: var(--gradient);
  color: white;
  padding: 0.1rem 0.4rem;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 600;
}

.chevron {
  font-size: 0.7rem;
  opacity: 0.5;
  margin-left: 0.25rem;
}

/* Search */
.search-wrapper {
  flex: 1;
  position: relative;
  min-width: 200px;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  color: var(--text-color);
  opacity: 0.5;
  font-size: 0.85rem;
}

.search-input {
  width: 100%;
  padding: 0.5rem 2rem 0.5rem 2.25rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-color);
  color: var(--text-color);
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.search-input::placeholder {
  color: var(--text-color);
  opacity: 0.5;
}

.clear-search {
  position: absolute;
  right: 0.5rem;
  background: none;
  border: none;
  color: var(--text-color);
  opacity: 0.5;
  cursor: pointer;
  padding: 0.25rem;
}

.clear-search:hover {
  opacity: 1;
}

/* Settings */
.settings {
  gap: 0.5rem;
}

.icon-btn {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s ease;
}

.icon-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.lang-select {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

/* Filter Panel */
.filter-panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.filter-panel.expanded {
  max-height: 400px;
}

.filter-panel-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem 1.5rem;
  border-top: 1px solid var(--border-color);
}

.filter-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.filter-tag {
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  background: var(--bg-color);
  color: var(--text-color);
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.filter-tag:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.filter-tag.active {
  background: var(--gradient);
  color: white;
  border-color: transparent;
}

.all-tag {
  font-weight: 600;
}

.clear-btn {
  background: none;
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 0.3rem 0.6rem;
  border-radius: 15px;
  font-size: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
}

/* Filter Columns */
.filter-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
}

.filter-column {
  display: flex;
  flex-direction: column;
}

.column-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-color);
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--border-color);
}

.column-header i {
  color: var(--primary-color);
  font-size: 0.85rem;
}

.column-items {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.filter-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  color: var(--text-color);
  transition: all 0.2s ease;
}

.filter-item:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.filter-item.active {
  background: var(--gradient);
  color: white;
  border-color: transparent;
}

.item-name {
  font-weight: 500;
}

.item-count {
  opacity: 0.7;
  font-size: 0.75rem;
}

/* Responsive */
@media (max-width: 768px) {
  .toolbar-container {
    padding: 0.75rem 1rem;
    flex-wrap: wrap;
  }

  .toolbar-label {
    display: none;
  }

  .search-wrapper {
    order: 3;
    flex: 1 1 100%;
    min-width: 100%;
    margin-top: 0.5rem;
  }

  .filter-toggle {
    flex: 1;
  }

  .settings {
    margin-left: auto;
  }

  .filter-panel-content {
    padding: 1rem;
  }

  .filter-columns {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .clear-btn span {
    display: none;
  }
}
</style>
