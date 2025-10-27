<template>
  <div ref="headerContainer" class="header-container bg-neutral-900">
    <!-- 유체 시뮬레이션 캔버스 -->
    <canvas ref="canvas" class="header-canvas"></canvas>
    <!-- 헤더 컨텐츠 -->
    <div class="header-content">
      <div
        class="flex flex-col items-center justify-center w-full h-full relative z-20"
      >
        <div
          class="fluid-title text-7xl font-bold text-neutral-100 relative z-20"
        >
          MAKING IMPOSSIBLE,
        </div>
        <div
          class="fluid-subtitle text-9xl font-bold text-neutral-900 relative z-20"
        >
          <span class="text-neutral-900">POSSIBLE</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
const canvas = ref<HTMLCanvasElement | null>(null);
const headerContainer = ref<HTMLDivElement | null>(null);
let fluidSimulation: any = null;

onMounted(() => {
  if (canvas.value) {
    initFluidSimulation();
  }

  // 스크롤 이벤트 리스너 추가
  window.addEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  if (!headerContainer.value) return;

  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  // 스크롤 위치에 따라 투명도 계산 (0~1)
  const opacity = Math.max(0, 1 - scrollY / windowHeight);

  // 스크롤 위치에 따라 글자 크기 계산 (1.0 ~ 2.0)
  const scale = Math.min(2.0, 1 + (scrollY / windowHeight) * 1.0);

  // 헤더 컨테이너 투명도 적용
  headerContainer.value.style.opacity = opacity.toString();

  // 글자 크기 적용
  const titleElement = headerContainer.value.querySelector(
    ".fluid-title"
  ) as HTMLElement;
  const subtitleElement = headerContainer.value.querySelector(
    ".fluid-subtitle"
  ) as HTMLElement;

  if (titleElement) {
    titleElement.style.transform = `scale(${scale})`;
  }
  if (subtitleElement) {
    subtitleElement.style.transform = `scale(${scale})`;
  }

  // 투명도에 따라 포인터 이벤트 조절 (부드러운 페이드아웃)
  if (opacity < 0.1) {
    headerContainer.value.style.pointerEvents = "none";
  } else {
    headerContainer.value.style.pointerEvents = "auto";
  }
};

const initFluidSimulation = async () => {
  if (!canvas.value) return;

  try {
    // webgl-fluid 동적 import
    const { default: WebGLFluid } = await import("webgl-fluid");

    // 유체 시뮬레이션 초기화
    fluidSimulation = new (WebGLFluid as any)(canvas.value, {
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 512,
      CAPTURE_RESOLUTION: 512,
      DENSITY_DISSIPATION: 0.98,
      VELOCITY_DISSIPATION: 0.99,
      PRESSURE_DISSIPATION: 0.8,
      PRESSURE_ITERATIONS: 25,
      CURL: 1,
      SPLAT_RADIUS: 0.25,
      SPLAT_FORCE: 6000,
      SHADING: true,
      COLORFUL: true,
      COLOR_UPDATE_SPEED: 10,
      PAUSED: false,
      BACK_COLOR: { r: 0, g: 0, b: 0 },
      TRANSPARENT: true,
      BLOOM: false,
      BLOOM_ITERATIONS: 8,
      BLOOM_RESOLUTION: 256,
      BLOOM_INTENSITY: 0.8,
      BLOOM_THRESHOLD: 0.6,
      BLOOM_SOFT_KNEE: 0.7,
      SUNRAYS: true,
      SUNRAYS_RESOLUTION: 196,
      SUNRAYS_WEIGHT: 1.0,
    });

    console.log("Fluid simulation initialized successfully");
  } catch (error) {
    console.error("Failed to initialize fluid simulation:", error);

    // 폴백: 간단한 배경 효과
    initFallbackEffect();
  }
};

const initFallbackEffect = () => {
  if (!canvas.value) return;

  const ctx = canvas.value.getContext("2d");
  if (!ctx) return;

  // 간단한 파티클 효과
  const particles: any[] = [];

  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvas.value.width,
      y: Math.random() * canvas.value.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    });
  }

  const animate = () => {
    if (!canvas.value || !ctx) return;

    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.value!.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.value!.height)
        particle.vy *= -1;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  };

  animate();
};
</script>

<style scoped>
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* 헤더 섹션 높이 제한 */
  overflow: hidden;
  transition: opacity 0.3s ease-in-out;
}

.header-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: auto;
}

.header-content {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none; /* 마우스 이벤트를 캔버스로 전달 */
}

/* 텍스트 가독성을 위한 그림자 효과 */
.header-content div,
.header-content span {
  position: relative;
  z-index: 15;
  transition: transform 0.3s ease-in-out;
  transform-origin: center center;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .header-container {
    height: 50vh;
  }

  .header-content div {
    font-size: 3rem !important;
  }
}

@media (max-width: 480px) {
  .header-container {
    height: 40vh;
  }

  .header-content div {
    font-size: 2rem !important;
  }
}
</style>
