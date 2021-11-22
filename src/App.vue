<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Header from "./components/header.vue";
import "normalize.css";
import "@/assets/css/theme.css";
import { toRefs } from "vue";
import { useLoadingStore } from "./store/index.js";
const { backImg } = toRefs(useLoadingStore());
import loadingBlock from "@/components/loading.vue";
</script>

<template>
  <Header />
  <div class="d-back">
    <img :src="backImg" alt="" />
  </div>
  <div class="app-content">
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <transition name="fade" mode="out-in">
          <suspense timeout="0">
            <component :is="Component"></component>
            <template #fallback>
              <div class="d-loading">
                <loadingBlock></loadingBlock>
                <!-- <SvgIcon name="loading" class="d-loading-img"></SvgIcon> -->
              </div>
            </template>
          </suspense>
        </transition>
      </template>
    </router-view>
    <!-- <router-view></router-view> -->
  </div>
</template>
<style lang="less">
@keyframes loading {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.5);
  }
}
.d-back {
  filter: blur(0px);
  position: fixed;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  z-index: -99999;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 1s;
  }
  &::after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(180deg, #000, transparent 50%, #000);
  }
}
.d-loading {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  &-img {
    width: 8rem;
    height: 8rem;
    animation: loading 2s ease-in-out infinite alternate;
  }
  &-word {
    font-size: 1.5rem;
  }
}
</style>
<style lang="less">
body {
  background-color: var(--bg-color);
  color: var(--color);
  line-height: 1.5;
  overflow-x: hidden;
}
a {
  color: inherit;
  text-decoration: none;
}
img {
  max-width: 100%;
}
.app-content {
  margin: 0 auto;
  margin-top: 80px;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  overflow-x: hidden;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  margin: 0 auto;
}
@translatePx: 150px;
.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-from {
  transform: translateX(-@translatePx);
}
.fade-leave-to {
  transform: translateX(@translatePx);
}

.fade2-enter-from,
.fade2-leave-to {
  opacity: 0;
  transform: translate(0px, 20px);
}
.fade2-enter-active,
.fade2-leave-active {
  transition: transform 2s;
}

[hidden] {
  display: none;
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  transition: all 0.3s;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  background: rgb(177, 72, 72);
  // background: white;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  // background: #ededed;
  background: transparent;
}
</style>
