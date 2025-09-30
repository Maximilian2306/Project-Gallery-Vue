<template>
  <div class="controls">
    <div class="settings">
      <!-- Dark / Light Mode Toggle -->
      <button class="toggle-btn" @click="toggleTheme">
        <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
      </button>

      <!-- Language Selector -->
      <div class="language-selector">
        <select :value="currentLanguage" @change="handleLanguageChange">
          <option disabled value="">🌐 Sprache wählen</option>
          <option value="de">🇩🇪 Deutsch</option>
          <option value="en">🇺🇸 English</option>
        </select>
      </div>

      <!-- Info Button -->
      <button class="toggle-btn" @click="showInfo">
        <i class="fas fa-info-circle"></i>
      </button>
    </div>
  </div>
</template>


<script>
import { inject } from 'vue'

export default {
  name: 'AppControls',
  setup() {
    const showInfoModal = inject('showInfoModal')
    const { currentLanguage, setLanguage } = inject('translations')
    const { isDarkMode, toggleTheme } = inject('theme')

    const handleLanguageChange = (event) => {
      setLanguage(event.target.value)
    }

    const showInfo = () => {
      showInfoModal.value = true
    }

    return {
      currentLanguage,
      isDarkMode,
      toggleTheme,
      handleLanguageChange,
      showInfo
    }
  }
}
</script>

<style scoped>
.controls {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.settings {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.toggle-btn {
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 50px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-color);
}

.toggle-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px var(--shadow);
}

.language-selector select {
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  color: var(--text-color);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .controls {
    justify-content: center;
    text-align: center;
  }
}
</style>