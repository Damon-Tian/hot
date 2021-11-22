<script setup>
import { ref, reactive, onBeforeMount, toRefs } from "vue";
import { getD } from "@/axios/index.js";
import { setBackImage } from "@/use";
defineProps({
  msg: String,
});
setBackImage("bilibili");

let data = ref("...");
let arr = ref("");
async function getData() {
  return new Promise((resolve, reject) => {
    async function getDD() {
      let dataOrigin = await getD();
      let data = JSON.parse(dataOrigin.xx[0].replace('rankList":', ""));
      if (data[0].owner) {
        resolve(data);
      } else {
        getDD();
      }
    }
    getDD();
  });
}
data.value = await getData();
arr.value = data.value;
</script>

<template>
  <div class="bili-hot d-content">
    <a
      class="b-item"
      v-for="item in arr"
      :href="'https://www.bilibili.com/video/' + item.bvid"
      target="_blank"
    >
      <p class="title">
        <img class="author-img" :src="item?.owner?.face" alt="" />
        <span>{{ item.title }}</span>
      </p>
      <p class="author-name">
        {{ item?.owner?.name }}
      </p>
      <p class="second-title">{{ item.tname }}</p>
      <p class="item-desc">{{ item.desc }}</p>
      <p class="item-img"><img :src="item.pic" alt="" /></p>
    </a>
  </div>
</template>

<style scoped lang="less">
.bili-hot {
  margin-top: 8px;
  max-width: 600px;
}
.b-item {
  display: block;
  box-shadow: 0 2px 12px var(--shadow);
  padding: 20px;
  margin-bottom: 20px;
  font-weight: 700;
  transition: all 1s ease;
  &:hover {
    box-shadow: 0 2px 24px 4px var(--shadow-dark);
  }
  .title {
    display: flex;
    align-items: baseline;
    font-size: 20px;
    span {
      display: inline-block;
      margin-left: 15px;
      position: relative;
      bottom: 10px;
    }
  }
  .second-title {
    color: gray;
    background-color: var(--red);
    color: white;
    padding: 5px 10px;
    border-radius: 3px;
    display: inline-block;
  }
  .author {
    &-img {
      border-radius: 50%;
      width: 40px;
    }
    &-name {
      color: red;
      // text-shadow: 0 0 0px red;
      font-weight: 500;
    }
  }
  .item-desc {
  }
}
</style>
