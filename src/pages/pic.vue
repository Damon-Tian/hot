<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from "vue";
import { upload as uploadFn, getPic, deletePic } from "@/axios";
import { useLoadingStore } from "@/store";
import { setBackImage } from "@/use";
setBackImage("pic");
import loadingPic from "@/assets/img/loading.gif";
const { damon } = useLoadingStore();
const uploadImg = ref("");
const imgBlock = ref(null);
const upload = async (val) => {
  uploadImg.value = val;

  let file = imgBlock.value.files[0];
  let reader = new FileReader();
  reader.onload = async (e) => {
    let img = new Image();
    img.onload = async function () {
      let compute = {
        width: img.width,
        height: img.height,
      };
      await uploadFn({ ...compute, file });
      getData(true);
    };
    img.src = e.target.result;
  };
  file && reader.readAsDataURL(file);
};

const list = ref([]);
const listOne = ref([]);
const listTwo = ref([]);
const listThree = ref([]);

function displayData(data, index) {
  if (data.length <= index) return;
  let item = data[index];
  let height = Math.floor((390 * item.height) / item.width);
  item.realHeight = height;
  let result = computeHeight();
  switch (result) {
    case "one":
      listOne.value.push(item);
      break;
    case "two":
      listTwo.value.push(item);
      break;
    case "three":
      listThree.value.push(item);
      break;
  }
  index = index + 1;
  nextTick(() => {
    displayData(data, index);
  });
}
function computeHeight() {
  let one = {
    key: "one",
    value: getHeight(listOne.value),
  };
  let two = {
    key: "two",
    value: getHeight(listTwo.value),
  };
  let three = {
    key: "three",
    value: getHeight(listThree.value),
  };
  return one.value > two.value
    ? two.value > three.value
      ? three.key
      : two.key
    : one.value > three.value
    ? three.key
    : one.key;
}
function clearData() {
  listOne.value = [];
  listTwo.value = [];
  listThree.value = [];
}
function getHeight(list) {
  let height = 0;
  list.forEach((item, index) => {
    height = height + item.realHeight || 0;
  });
  return height;
}

await getData(true);
function loadImgs() {
  let imgs = document.querySelectorAll(".d-pic img");
  let h = window.innerHeight;
  let s = document.querySelector(".app-content").scrollTop;
  for (let i = 0; i < imgs.length; i++) {
    if (h + s > imgs[i].offsetParent.offsetTop) {
      if (
        imgs[i].src == imgs[i].getAttribute("data-src") ||
        !imgs[i].getAttribute("data-src")
      )
        continue;
      let img = new Image();
      img.onload = function () {
        imgs[i].src = imgs[i].getAttribute("data-src");
      };
      img.src = imgs[i].getAttribute("data-src");
    }
  }
}
onMounted(() => {
  setTimeout(() => {
    loadImgs();
  }, 1000);
  document.querySelector(".app-content").addEventListener("scroll", loadImgs);
});
onBeforeUnmount(() => {
  document
    .querySelector(".app-content")
    .removeEventListener("scroll", loadImgs);
});
async function getData(isRefresh) {
  return new Promise(async (resolve, reject) => {
    if (isRefresh) {
      clearData();
    }
    list.value = await getPic();
    resolve("success");
    nextTick(() => {
      displayData(list.value, 0);
    });
  });
}

const getUrl = (src, e) => {
  let preUrl = import.meta.env.VITE_SERVER_URL;
  return preUrl + src;
};
</script>

<template>
  <div class="d-content d-picture">
    <input type="file" ref="imgBlock" :onchange="upload" />
    <p><span @click="imgBlock.value = ''">clear</span></p>

    <div class="d-pic">
      <div class="d-pic-block" ref="list1">
        <div v-for="item in listOne">
          <img
            :src="loadingPic"
            :data-src="getUrl(item.src)"
            :title="item.name"
          />
          <span v-if="damon" @click="deletePic(item.id)">删除</span>
        </div>
      </div>
      <div class="d-pic-block" ref="list2">
        <div v-for="item in listTwo">
          <img
            :src="loadingPic"
            :data-src="getUrl(item.src)"
            :title="item.name"
          />
          <span v-if="damon" @click="deletePic(item.id)">删除</span>
        </div>
      </div>
      <div class="d-pic-block" ref="list3">
        <div v-for="item in listThree">
          <img
            :src="loadingPic"
            :data-src="getUrl(item.src)"
            :title="item.name"
          />
          <span v-if="damon" @click="deletePic(item.id)">删除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.d-picture {
  max-width: 1200px;
  margin-bottom: 10px;
  .d-pic {
    display: flex;
    justify-content: space-between;
    .d-pic-block {
      width: 390px;
      display: block;
      & > div {
        position: relative;
        text-align: center;
        margin-bottom: 10px;
        img {
        }
        span {
          position: absolute;
          right: 5px;
          top: 5px;
          color: red;
        }
      }
    }
  }
}
</style>
