<template>
  <header class="header">
    <div class="header-content">
      <h1>
        <i class="fas fa-code"></i>
        <span>{{ t('title') }}</span>
      </h1>
      <p>{{ t('subtitle') }}</p>
    </div>
  </header>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'AppHeader',
  setup() {
    const { t } = inject('translations')
    
    return {
      t
    }
  }
}
</script>

<style scoped>
.header {
  background: var(--gradient);
  color: white;
  padding: 2rem 0;
  position: relative;
  overflow: hidden;
}

.header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="white" opacity="0.1"/><circle cx="80" cy="40" r="1.5" fill="white" opacity="0.1"/><circle cx="40" cy="70" r="1" fill="white" opacity="0.1"/></svg>');
  animation: float 20s infinite linear;
}

@keyframes float {
  from { transform: translateX(-100px); }
  to { transform: translateX(100px); }
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  position: relative;
  z-index: 2;
}

.header h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: slideInDown 1s ease;
}

.header p {
  font-size: 1.2rem;
  opacity: 0.9;
  animation: slideInUp 1s ease 0.3s both;
}

@keyframes slideInDown {
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slideInUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@media (max-width: 768px) {
  .header h1 { font-size: 2rem; }
}
</style>