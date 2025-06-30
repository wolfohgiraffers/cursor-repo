import { ref, computed, onUnmounted } from 'vue'

export function useStopwatch() {
  // 상태 관리
  const isRunning = ref(false)
  const startTime = ref(0)
  const elapsedTime = ref(0)
  const currentTime = ref(0)
  const lapTimes = ref([])
  
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

  // 시간 포맷 유틸리티 함수
  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000)
    const minutes = Math.floor((ms % 3600000) / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const milliseconds = Math.floor((ms % 1000) / 10)

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds
      .toString()
      .padStart(2, '0')}`
  }

  // 랩 타임 통계 계산
  const lapStats = computed(() => {
    if (lapTimes.value.length === 0) return null

    const times = lapTimes.value.map(lap => lap.time)
    const min = Math.min(...times)
    const max = Math.max(...times)
    const avg = times.reduce((sum, time) => sum + time, 0) / times.length

    return {
      fastest: min,
      slowest: max,
      average: avg,
      total: lapTimes.value.length
    }
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
    lapTimes.value = []
    
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
  }

  // 랩 타임 추가
  const addLap = () => {
    if (currentTime.value > 0) {
      const lapNumber = lapTimes.value.length + 1
      const lapTime = currentTime.value
      const previousLapTime = lapTimes.value.length > 0 ? lapTimes.value[lapTimes.value.length - 1].totalTime : 0
      const splitTime = lapTime - previousLapTime

      lapTimes.value.push({
        id: lapNumber,
        time: splitTime,
        totalTime: lapTime,
        formattedTime: formatTime(splitTime),
        formattedTotalTime: formatTime(lapTime),
        timestamp: new Date().toLocaleTimeString()
      })
    }
  }

  // 랩 타임 삭제
  const clearLaps = () => {
    lapTimes.value = []
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
    lapTimes,
    lapStats,
    
    // 메서드
    start,
    pause,
    reset,
    toggle,
    addLap,
    clearLaps,
    formatTime
  }
} 