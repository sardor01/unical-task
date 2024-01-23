<template>
  <div class="loader">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
  </div>
</template>

<style scoped>
.loader {
  --dim: 2.5rem;
  width: var(--dim);
  height: var(--dim);
  position: relative;
  animation: loaderSpin 1.5s linear infinite;
}

.loader .circle {
  --color: #333;
  --dim: 1rem;
  width: var(--dim);
  height: var(--dim);
  background-color: var(--color);
  border-radius: 50%;
  position: absolute;
}

.loader .circle:nth-child(1) {
  top: 0;
  left: 0;
}

.loader .circle:nth-child(2) {
  top: 0;
  right: 0;
}

.loader .circle:nth-child(3) {
  bottom: 0;
  left: 0;
}

.loader .circle:nth-child(4) {
  bottom: 0;
  right: 0;
}

@keyframes loaderSpin {
  0% {
    transform: scale(1) rotate(0);
  }

  20%,
  25% {
    transform: scale(1.2) rotate(90deg);
  }

  45%,
  50% {
    transform: scale(1) rotate(180deg);
  }

  70%,
  75% {
    transform: scale(1.2) rotate(270deg);
  }

  95%,
  100% {
    transform: scale(1) rotate(360deg);
  }
}
</style>
