import { ref, computed, onUnmounted } from 'vue'

export function useStopwatch() {
  // 상태 관리
  const isRunning = ref(false)
  const startTime = ref(0)
  const elapsedTime = ref(0)
  const currentTime = ref(0)
  
  let animationFrameId = null
  let intervalId = null

  // 계산된 속성: 포맷된 시간
  const formattedTime = computed(() => {
    const totalMs = currentTime.value
    const hours = Math.floor(totalMs / 3600000)
    const minutes = Math.floor((totalMs % 3600000) / 60000)
    const seconds = Math.floor((totalMs % 60000) / 1000)
    const milliseconds = Math.floor((totalMs % 1000) / 10) // 10ms 단위

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds
      .toString()
      .padStart(2, '0')}`
  })

  // 타이머 업데이트 함수
  const updateTime = () => {
    if (isRunning.value) {
      currentTime.value = elapsedTime.value + (performance.now() - startTime.value)
      animationFrameId = requestAnimationFrame(updateTime)
    }
  }

  // 스톱워치 시작
  const start = () => {
    if (!isRunning.value) {
      isRunning.value = true
      startTime.value = performance.now()
      updateTime()
    }
  }

  // 스톱워치 일시정지
  const pause = () => {
    if (isRunning.value) {
      isRunning.value = false
      elapsedTime.value = currentTime.value
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
      }
    }
  }

  // 스톱워치 리셋
  const reset = () => {
    isRunning.value = false
    startTime.value = 0
    elapsedTime.value = 0
    currentTime.value = 0
    
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
  }

  // 시작/일시정지 토글
  const toggle = () => {
    if (isRunning.value) {
      pause()
    } else {
      start()
    }
  }

  // 컴포넌트 언마운트 시 정리
  onUnmounted(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
    if (intervalId) {
      clearInterval(intervalId)
    }
  })

  return {
    // 상태
    isRunning,
    currentTime,
    formattedTime,
    
    // 메서드
    start,
    pause,
    reset,
    toggle
  }
} 