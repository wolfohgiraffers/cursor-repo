<template>
  <div class="stopwatch-display" :class="{ 'running': isRunning }">
    <div class="time-container">
      <div class="time-display" :class="{ 'running': isRunning }">
        {{ formattedTime }}
      </div>
      <div class="running-indicator" :class="{ 'active': isRunning }">
        <div class="pulse-ring"></div>
        <div class="pulse-ring delay-1"></div>
        <div class="pulse-ring delay-2"></div>
      </div>
    </div>
    <div class="status-indicator" :class="{ 'active': isRunning }">
      <span class="status-icon">{{ isRunning ? '🏃‍♂️' : '⏸️' }}</span>
      <span class="status-text">{{ isRunning ? '진행 중' : '정지됨' }}</span>
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
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin: 2rem 0;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.stopwatch-display.running {
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.2),
    0 0 50px rgba(102, 126, 234, 0.3);
  transform: scale(1.01);
}

.stopwatch-display::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.05),
    transparent
  );
  transform: rotate(45deg);
  transition: all 0.5s ease;
  opacity: 0;
}

.stopwatch-display.running::before {
  opacity: 1;
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}

.time-container {
  position: relative;
  display: inline-block;
}

.time-display {
  font-size: 4rem;
  font-weight: 300;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  line-height: 1.1;
  position: relative;
  z-index: 2;
}

.time-display.running {
  text-shadow: 
    0 0 20px rgba(255, 255, 255, 0.8),
    0 2px 10px rgba(0, 0, 0, 0.3);
  transform: scale(1.02);
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    text-shadow: 
      0 0 20px rgba(255, 255, 255, 0.8),
      0 2px 10px rgba(0, 0, 0, 0.3);
  }
  to {
    text-shadow: 
      0 0 30px rgba(255, 255, 255, 1),
      0 0 40px rgba(102, 126, 234, 0.8),
      0 2px 10px rgba(0, 0, 0, 0.3);
  }
}

.running-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  opacity: 0;
}

.running-indicator.active .pulse-ring {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.pulse-ring.delay-1 {
  animation-delay: 0.5s;
}

.pulse-ring.delay-2 {
  animation-delay: 1s;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.4);
    opacity: 0;
  }
}

.status-indicator {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
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

.status-icon {
  font-size: 1.2rem;
  animation: bounce 2s ease-in-out infinite;
}

.status-indicator.active .status-icon {
  animation: run 1s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

@keyframes run {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-2px);
  }
  75% {
    transform: translateX(2px);
  }
}

.status-text {
  font-size: 0.9rem;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .stopwatch-display {
    padding: 2rem 1.5rem;
    margin: 1rem 0;
  }
  
  .time-display {
    font-size: 2.8rem;
  }
  
  .status-indicator {
    font-size: 0.9rem;
    margin-top: 1rem;
  }
  
  .status-icon {
    font-size: 1.1rem;
  }
  
  .status-text {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .stopwatch-display {
    padding: 1.5rem 1rem;
  }
  
  .time-display {
    font-size: 2.2rem;
  }
  
  .status-indicator {
    font-size: 0.8rem;
    margin-top: 0.8rem;
  }
  
  .status-icon {
    font-size: 1rem;
  }
  
  .status-text {
    font-size: 0.7rem;
  }
}

/* 접근성 개선 */
@media (prefers-reduced-motion: reduce) {
  .stopwatch-display,
  .time-display,
  .status-indicator,
  .pulse-ring {
    animation: none !important;
    transition: none !important;
  }
  
  .stopwatch-display.running {
    transform: none;
  }
  
  .time-display.running {
    transform: none;
  }
}
</style> 