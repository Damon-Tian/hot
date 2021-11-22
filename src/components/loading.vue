<script setup></script>

<template>
  <div class="loading-block">
    <span class="loader-block"></span>
    <span class="loader-block"></span>
    <span class="loader-block"></span>
    <span class="loader-block"></span>
    <span class="loader-block"></span>
    <span class="loader-block"></span>
    <span class="loader-block"></span>
    <span class="loader-block"></span>
    <span class="loader-block"></span>
  </div>
</template>

<style scoped lang="less">
.loading-block {
  width: 7.5em;
  height: 7.5em;
  position: relative;
  margin: 0 auto;
  font-size: 4px;
}
.loader-block {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  opacity: 0;
  width: 2em;
  height: 2em;
  background: #fdfdfd;
  //   -webkit-animation: show 0.88s step-end infinite alternate,
  //     pulse 0.88s linear infinite alternate;
  animation: show 0.88s step-end infinite alternate,
    pulse 0.88s linear infinite alternate;
  &:nth-child(1) {
    transform: translate(0, 0);
    animation-delay: 0.065s;
  }
  &:nth-child(2) {
    transform: translate(2.667em, 0);
    animation-delay: 0.13s;
  }
  &:nth-child(3) {
    transform: translate(5.333em, 0);
    animation-delay: 0.195s;
  }
  &:nth-child(4) {
    transform: translate(0, 2.667em);
    animation-delay: 0.325s;
  }
  &:nth-child(5) {
    transform: translate(2.677em, 2.677em);
    animation-delay: 0.13s;
  }
  &:nth-child(6) {
    transform: translate(5.333em, 2.677em);
    animation-delay: 0.455s;
  }
  &:nth-child(7) {
    transform: translate(0, 5.333em);
    animation-delay: 0.39s;
  }
  &:nth-child(8) {
    transform: translate(2.677em, 5.333em);
    animation-delay: 0.26s;
  }
  &:nth-child(9) {
    transform: translate(5.333em, 5.333em);
    // animation-delay: 0.065s;
  }
}

@keyframes show {
  0%,
  40% {
    opacity: 0;
  }

  41%,
  100% {
    opacity: 1;
  }
}
@keyframes pulse {
  0%,
  40% {
    background: #fdfdfd;
  }

  41%,
  100% {
    background: #dadada;
  }
}
</style>
