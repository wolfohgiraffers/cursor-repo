<template>
  <div class="stopwatch-display">
    <div class="time-display" :class="{ 'running': isRunning }">
      {{ formattedTime }}
    </div>
    <div class="status-indicator" :class="{ 'active': isRunning }">
      {{ isRunning ? '진행 중' : '정지됨' }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  formattedTime: {
    type: String,
    required: true
  },
  isRunning: {
    type: Boolean,
    required: true
  }
})
</script>

<style scoped>
.stopwatch-display {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin: 2rem 0;
}

.time-display {
  font-size: 4rem;
  font-weight: 300;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  line-height: 1.1;
}

.time-display.running {
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  transform: scale(1.02);
}

.status-indicator {
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s ease;
}

.status-indicator.active {
  color: #4CAF50;
  text-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .stopwatch-display {
    padding: 1.5rem;
    margin: 1rem 0;
  }
  
  .time-display {
    font-size: 2.5rem;
  }
  
  .status-indicator {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .time-display {
    font-size: 2rem;
  }
  
  .status-indicator {
    font-size: 0.8rem;
    margin-top: 0.5rem;
  }
}
</style> 