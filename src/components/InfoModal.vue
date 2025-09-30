<template>
  <div class="modal" @click.self="closeModal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>
        <i class="fas fa-info-circle"></i>
        <span>{{ t('about') }}</span>
      </h2>
      <p>{{ t('about-text') }}</p>
      <br>
      <p><strong>{{ t('features') }}:</strong></p>
      <ul>
        <li>{{ t('feature-1') }}</li>
        <li>{{ t('feature-2') }}</li>
        <li>{{ t('feature-3') }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'InfoModal',
  emits: ['close'],
  setup(props, { emit }) {
    const { t } = inject('translations')
    
    const closeModal = () => {
      emit('close')
    }

    return {
      t,
      closeModal
    }
  }
}
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
}

.modal-content {
  background: var(--card-bg);
  margin: 10% auto;
  padding: 2rem;
  border-radius: 20px;
  width: 90%;
  max-width: 600px;
  position: relative;
  animation: slideInDown 0.3s ease;
}

.close {
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 2rem;
  cursor: pointer;
  color: var(--text-color);
}

.close:hover {
  opacity: 0.7;
}

@keyframes slideInDown {
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>