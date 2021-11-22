<script setup>
import { ref } from "vue";
import { getZhihu } from "@/axios/index.js";
import { setBackImage, displayData } from "../use/index.js";
defineProps({
  msg: String,
});
setBackImage("zhihu");

/**
 * @param title
 * @param hotNumber
 * @param img
 */
let data = ref([]);
let firstData = await getZhihu();
displayData(0, firstData, data.value, "", 1000);
</script>

<template>
  <div class="bili-hot d-content">
    <transition-group name="fade2">
      <a
        class="z-item"
        v-for="item in data"
        :href="item.pageHref"
        target="_blank"
        :key="item"
      >
        <div class="z-content">
          <p class="z-title">{{ item.title }}</p>
          <p class="z-describe">{{ item.describe }}</p>
          <p class="z-hot-number">{{ item.hotNumber }}</p>
        </div>
        <div class="z-img">
          <img :src="item.img" alt="" />
        </div>
      </a>
    </transition-group>
  </div>
</template>

<style scoped lang="less">
.bili-hot {
  margin-top: 8px;
  max-width: 800px;
}
@imgWidth: 240px;
.z-item {
  display: block;
  box-shadow: 0 2px 12px var(--shadow);
  padding: 20px;
  margin-bottom: 20px;
  font-weight: 700;
  transition: all 1s ease;
  display: flex;
  width: 100%;
  justify-content: space-between;
  min-height: 200px;
  &:hover {
    box-shadow: 0 2px 24px 4px var(--shadow-dark);
  }
  .z-content {
    flex-basis: calc(100% - @imgWidth - 100px);
    .z-title {
      display: flex;
      align-items: baseline;
      font-size: 22px;
      margin-top: 0;
    }
    .z-describe {
      color: rgb(204, 204, 204);
      line-height: 1.5;
    }
    .z-hot-number {
      color: gray;
      background-color: var(--red);
      color: white;
      padding: 5px 10px;
      border-radius: 3px;
      display: inline-block;
    }
  }
  .z-img {
    width: @imgWidth;
    height: 100px;
    img {
      width: @imgWidth;
      height: 160px;
      object-fit: cover;
    }
  }
}
</style>
