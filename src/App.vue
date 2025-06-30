<script setup>
import { computed, onMounted } from 'vue'
import { useStopwatch } from './composables/useStopwatch.js'
import StopwatchDisplay from './components/Stopwatch/StopwatchDisplay.vue'
import StopwatchControls from './components/Stopwatch/StopwatchControls.vue'
import LapTimeList from './components/Stopwatch/LapTimeList.vue'
import { useKeyboard } from './composables/useKeyboard.js'

// 스톱워치 로직
const { 
  isRunning, 
  currentTime, 
  formattedTime, 
  lapTimes,
  lapStats,
  start, 
  pause, 
  reset,
  addLap,
  clearLaps,
  formatTime
} = useStopwatch()

// 토글 함수
const toggle = () => {
  if (isRunning.value) {
    pause()
  } else {
    start()
  }
}

// 모바일 감지
const isMobile = computed(() => {
  return window.innerWidth <= 768
})

// 키보드 단축키 설정
useKeyboard({
  onToggle: toggle,
  onReset: reset,
  onLap: addLap
})

// 컴포넌트 마운트 시 환영 메시지
onMounted(() => {
  console.log('⏱️ 스톱워치 앱이 시작되었습니다!')
  console.log('키보드 단축키: Space(시작/정지), R(리셋), L(랩 타임)')
})
</script>

<template>
  <div id="app">
    <header class="app-header">
      <h1 class="app-title">
        <span class="icon">⏱️</span>
        스톱워치
      </h1>
      <p class="app-subtitle">정확하고 직관적인 시간 측정</p>
    <!-- </header> -->

    <!-- <main class="app-main"> -->
      <div class="container">
        <StopwatchDisplay 
          :formatted-time="formattedTime"
          :is-running="isRunning"
        />
        
        <StopwatchControls
          :is-running="isRunning" 
          :current-time="currentTime"
          @toggle="toggle"
          @reset="reset"
          @add-lap="addLap"
        />

        <LapTimeList
          :lap-times="lapTimes"
          :lap-stats="lapStats"
          :format-time="formatTime"
          @clear-laps="clearLaps"
        />

        <div class="keyboard-shortcuts" v-if="!isMobile">
          <p class="shortcuts-title">키보드 단축키</p>
          <div class="shortcuts-list">
            <span class="shortcut">
              <kbd>Space</kbd> 시작/일시정지
            </span>
            <span class="shortcut">
              <kbd>R</kbd> 리셋
            </span>
            <span class="shortcut">
              <kbd>L</kbd> 랩 타임
            </span>
          </div>
        </div>
      </div>
    </main>

    <footer class="app-footer">
      <p>&copy; 2024 스톱워치 앱 - Phase 2 고급 버전</p>
    </footer>
  </div>
</template>

<style>
/* 전역 스타일 초기화 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* 헤더 스타일 */
.app-header {
  text-align: center;
  padding: 3rem 0 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.app-title {
  font-size: 3rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.app-title .icon {
  font-size: 3.5rem;
}

.app-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  font-weight: 300;
  letter-spacing: 1px;
}

/* 메인 콘텐츠 */
.app-main {
  flex: 1;
  padding: 2rem 0;
}

/* 키보드 단축키 */
.keyboard-shortcuts {
  text-align: center;
  margin-top: 3rem;
  padding: 1.5rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.shortcuts-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
}

.shortcuts-list {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.shortcut {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

kbd {
  background: #f1f3f4;
  border: 1px solid #dadce0;
  border-radius: 4px;
  color: #3c4043;
  font-family: monospace;
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

/* 푸터 */
.app-footer {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  color: #666;
  font-size: 0.9rem;
  border-top: 1px solid #e9ecef;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .app-header {
    padding: 2rem 0 1.5rem;
  }
  
  .app-title {
    font-size: 2.5rem;
  }
  
  .app-title .icon {
    font-size: 3rem;
  }
  
  .app-subtitle {
    font-size: 1rem;
  }
  
  .app-main {
    padding: 1rem 0;
  }
  
  .keyboard-shortcuts {
    margin-top: 2rem;
    padding: 1rem;
  }
  
  .shortcuts-list {
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .app-title {
    font-size: 2rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .app-title .icon {
    font-size: 2.5rem;
  }
  
  .shortcuts-list {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
