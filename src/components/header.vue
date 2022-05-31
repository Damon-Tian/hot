<script setup>
import { watch, reactive } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
// function changeTheme() {
// document.documentElement.classList.contains("dark")
//   ? (document.documentElement.classList = "")
//   : (document.documentElement.classList = "dark");
// }
const route = useRoute();
const path = route.path;
const links = reactive([
  { name: "home", path: "/home", active: false },
  { name: "知乎", path: "/", active: false },
  { name: "哔哩哔哩热门", path: "/bilibili", active: false },
  { name: "豆瓣", path: "/douban", active: false },
  { name: "图片", path: "/pic", active: false },
]);

watch(
  () => route.path,
  () => {
    links.forEach((item) => {
      item.active = route.path == item.path;
    });
  },
  {
    deep: true,
  }
);
</script>

<template>
  <div class="d-header">
    <router-link
      :to="item.path"
      v-for="item in links"
      :class="item.active ? 'active' : ''"
    >
      {{ item.name }}
    </router-link>
    <!-- <a href="javascript:void(0)" @click="changeTheme">changeTheme</a> -->
  </div>
</template>

<style scoped lang="less">
.d-header {
  z-index: 9;
  height: 60px;
  // box-shadow: 0 2px 12px 0px var(--shadow);
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-weight: 700;
  a {
    margin-right: 40px;
    position: relative;
    &.active {
      &::after {
        content: ".....";
        position: absolute;
        bottom: 5px;
        font-size: 18px;
        left: 50%;
        border-radius: 20px;
        height: 3px;
        color: red;
        opacity: 1;
        transform: translateX(-50%);
        transition: all 0.5s;
        text-shadow: 1px 0 2px red;
      }
    }
    &::after {
      content: ".....";
      position: absolute;
      bottom: 5px;
      font-size: 18px;
      left: 0;
      border-radius: 20px;
      height: 3px;
      color: red;
      opacity: 0;
      transform: translateX(-50%);
      transition: all 0.5s;
      text-shadow: 1px 0 2px red;
    }
    &:hover {
      &:not(.active) {
        &::after {
          left: 50%;
          opacity: 1;
          // background-color: red;
        }
      }
    }
  }
}
</style>
