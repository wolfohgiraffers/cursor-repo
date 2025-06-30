<template>
  <div class="stopwatch-controls">
    <button 
      class="control-btn primary"
      :class="{ 'stop': isRunning }"
      @click="$emit('toggle')"
    >
      <span class="btn-icon">{{ isRunning ? '⏸' : '▶' }}</span>
      <span class="btn-text">{{ isRunning ? '일시정지' : '시작' }}</span>
    </button>
    
    <button 
      class="control-btn lap"
      @click="$emit('add-lap')"
      :disabled="!isRunning && !currentTime"
      title="현재 시간을 랩 타임으로 기록"
    >
      <span class="btn-icon">⏱</span>
      <span class="btn-text">랩 타임</span>
    </button>
    
    <button 
      class="control-btn secondary"
      @click="$emit('reset')"
      :disabled="!currentTime && !isRunning"
    >
      <span class="btn-icon">⏹</span>
      <span class="btn-text">리셋</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  isRunning: {
    type: Boolean,
    required: true
  },
  currentTime: {
    type: Number,
    required: true
  }
})

defineEmits(['toggle', 'reset', 'add-lap'])
</script>

<style scoped>
.stopwatch-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 2rem 0;
  flex-wrap: wrap;
}

.control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  min-width: 120px;
}

.control-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.control-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.primary {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
}

.primary.stop {
  background: linear-gradient(135deg, #f44336 0%, #da190b 100%);
}

.lap {
  background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
  color: white;
}

.lap:hover:not(:disabled) {
  background: linear-gradient(135deg, #1976D2 0%, #1565C0 100%);
}

.secondary {
  background: linear-gradient(135deg, #757575 0%, #616161 100%);
  color: white;
}

.btn-icon {
  font-size: 1.2rem;
  line-height: 1;
}

.btn-text {
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

/* 버튼 파도 효과 */
.control-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: width 0.6s, height 0.6s;
  transform: translate(-50%, -50%);
  z-index: 0;
}

.control-btn:active:not(:disabled)::before {
  width: 300px;
  height: 300px;
}

.btn-icon,
.btn-text {
  position: relative;
  z-index: 1;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .stopwatch-controls {
    gap: 0.8rem;
    padding: 1.5rem 0;
  }
  
  .control-btn {
    padding: 0.8rem 1.2rem;
    font-size: 0.9rem;
    min-width: 100px;
  }
  
  .btn-icon {
    font-size: 1.1rem;
  }
  
  .btn-text {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .stopwatch-controls {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;
  }
  
  .control-btn {
    width: 200px;
    padding: 1rem 1.5rem;
  }
  
  .btn-text {
    font-size: 0.9rem;
  }
}

/* 추가 애니메이션 */
@keyframes pulse {
  0% {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  50% {
    box-shadow: 0 4px 15px rgba(33, 150, 243, 0.4);
  }
  100% {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
}

.lap:not(:disabled) {
  animation: pulse 2s ease-in-out infinite;
}
</style> 