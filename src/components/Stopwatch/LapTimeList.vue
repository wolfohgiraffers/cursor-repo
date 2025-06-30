<template>
  <div class="lap-time-list" v-if="lapTimes.length > 0">
    <div class="lap-header">
      <h3 class="lap-title">
        <span class="lap-icon">📊</span>
        랩 타임 기록
        <span class="lap-count">({{ lapTimes.length }})</span>
      </h3>
      
      <div class="lap-stats" v-if="lapStats">
        <div class="stat-item">
          <span class="stat-label">최고 기록</span>
          <span class="stat-value fastest">{{ formatTime(lapStats.fastest) }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">최저 기록</span>
          <span class="stat-value slowest">{{ formatTime(lapStats.slowest) }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">평균</span>
          <span class="stat-value">{{ formatTime(lapStats.average) }}</span>
        </div>
      </div>

      <button 
        class="clear-btn"
        @click="$emit('clear-laps')"
        title="모든 랩 타임 삭제"
      >
        <span class="clear-icon">🗑️</span>
        지우기
      </button>
    </div>

    <div class="lap-list">
      <div 
        v-for="lap in reversedLapTimes" 
        :key="lap.id"
        class="lap-item"
        :class="{ 
          'fastest': lapStats && lap.time === lapStats.fastest,
          'slowest': lapStats && lap.time === lapStats.slowest
        }"
      >
        <div class="lap-number">
          <span class="lap-badge">#{{ lap.id }}</span>
        </div>
        
        <div class="lap-times">
          <div class="lap-split">
            <span class="time-label">구간</span>
            <span class="time-value">{{ lap.formattedTime }}</span>
          </div>
          <div class="lap-total">
            <span class="time-label">누적</span>
            <span class="time-value">{{ lap.formattedTotalTime }}</span>
          </div>
        </div>
        
        <div class="lap-timestamp">
          {{ lap.timestamp }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  lapTimes: {
    type: Array,
    required: true
  },
  lapStats: {
    type: Object,
    default: null
  },
  formatTime: {
    type: Function,
    required: true
  }
})

defineEmits(['clear-laps'])

// 최신 랩 타임이 위로 오도록 역순 정렬
const reversedLapTimes = computed(() => {
  return [...props.lapTimes].reverse()
})
</script>

<style scoped>
.lap-time-list {
  margin-top: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.lap-header {
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 2px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.lap-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.lap-icon {
  font-size: 1.5rem;
}

.lap-count {
  font-size: 0.9rem;
  color: #666;
  font-weight: 400;
}

.lap-stats {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-label {
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
}

.stat-value {
  font-size: 0.9rem;
  font-weight: 600;
  font-family: monospace;
  color: #333;
}

.stat-value.fastest {
  color: #10b981;
}

.stat-value.slowest {
  color: #ef4444;
}

.clear-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background: #e9ecef;
  color: #333;
  transform: translateY(-1px);
}

.clear-icon {
  font-size: 1rem;
}

.lap-list {
  max-height: 400px;
  overflow-y: auto;
}

.lap-item {
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #f1f3f4;
  transition: all 0.3s ease;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.lap-item:hover {
  background: #f8f9fa;
}

.lap-item.fastest {
  background: linear-gradient(90deg, #d1fae5 0%, #f0fdf4 100%);
  border-left: 4px solid #10b981;
}

.lap-item.slowest {
  background: linear-gradient(90deg, #fee2e2 0%, #fef2f2 100%);
  border-left: 4px solid #ef4444;
}

.lap-number {
  min-width: 60px;
}

.lap-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #667eea;
  color: white;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.lap-times {
  flex: 1;
  display: flex;
  gap: 2rem;
  margin-left: 1rem;
}

.lap-split,
.lap-total {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.time-label {
  font-size: 0.75rem;
  color: #666;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.time-value {
  font-family: monospace;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
}

.lap-timestamp {
  font-size: 0.8rem;
  color: #999;
  font-family: monospace;
  min-width: 80px;
  text-align: right;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .lap-header {
    padding: 1rem;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .lap-title {
    font-size: 1.1rem;
    justify-content: center;
  }
  
  .lap-stats {
    justify-content: center;
    gap: 1rem;
  }
  
  .clear-btn {
    align-self: center;
  }
  
  .lap-item {
    padding: 1rem;
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
  }
  
  .lap-number {
    min-width: auto;
    text-align: center;
  }
  
  .lap-times {
    margin-left: 0;
    justify-content: space-around;
  }
  
  .lap-timestamp {
    text-align: center;
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .lap-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .lap-times {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .lap-split,
  .lap-total {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

/* 스크롤바 스타일 */
.lap-list::-webkit-scrollbar {
  width: 6px;
}

.lap-list::-webkit-scrollbar-track {
  background: #f1f3f4;
}

.lap-list::-webkit-scrollbar-thumb {
  background: #c1c7cd;
  border-radius: 3px;
}

.lap-list::-webkit-scrollbar-thumb:hover {
  background: #a8b2ba;
}
</style>