<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount, watch } from "vue";
import { upload as uploadFn, getPic, deletePic } from "@/axios";
import { useLoadingStore } from "@/store";
import { setBackImage } from "@/use";
import "viewerjs/dist/viewer.css";
import { api as Viewer } from "v-viewer";
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
      initDataFn();
    };
    img.src = e.target.result;
  };
  file && reader.readAsDataURL(file);
};

const images = ref([]);
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
const isLoading = ref(true);
let initData = true;
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

const initDataFn = () => {
  getData(true);
  setTimeout(() => {
    loadImgs();
  }, 200);
  imgBlock.value = "";
};
onMounted(() => {
  setTimeout(() => {
    getData().then((res) => {
      loadImgs();
    });
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
    initData = false;
    if (isRefresh) {
      initData = true;
      clearData();
    }
    if (!initData) {
      resolve(true);
      return;
    }
    if (isRefresh) {
    }
    list.value = await getPic();
    images.value = list.value.map(
      (item) => import.meta.env.VITE_SERVER_URL + item.src
    );
    resolve(true);
    isLoading.value = false;
    nextTick(() => {
      displayData(list.value, 0);
    });
  });
}

const getUrl = (src, e) => {
  let preUrl = import.meta.env.VITE_SERVER_URL;
  return preUrl + src;
};

const deletePicture = async (id) => {
  if (confirm("确认删除吗？")) {
    let res = await deletePic(id);
    initDataFn();
  }
};

const imgClick = (item) => {
  const index = images.value.findIndex((i) => i.includes(item.src));
  Viewer({
    images: images.value,
    options: {
      initialViewIndex: index,
    },
  });
};
</script>

<template>
  <div class="d-content d-picture">
    <input v-if="damon" type="file" ref="imgBlock" :onchange="upload" />

    <div class="d-pic">
      <div class="d-pic-block" ref="list1">
        <div v-for="item in listOne">
          <img
            :src="loadingPic"
            :data-src="getUrl(item.src)"
            :title="item.name"
            :style="{ height: item.realHeight + 'px' }"
            @click="imgClick(item)"
          />
          <span v-if="damon" @click="deletePicture(item._id)">删除</span>
        </div>
      </div>
      <div class="d-pic-block" ref="list2">
        <div v-for="item in listTwo">
          <img
            :src="loadingPic"
            :data-src="getUrl(item.src)"
            :title="item.name"
            :style="{ height: item.realHeight + 'px' }"
            @click="imgClick(item)"
          />
          <span v-if="damon" @click="deletePicture(item._id)">删除</span>
        </div>
      </div>
      <div class="d-pic-block" ref="list3">
        <div v-for="item in listThree">
          <img
            :src="loadingPic"
            :data-src="getUrl(item.src)"
            :title="item.name"
            :style="{ height: item.realHeight + 'px' }"
            @click="imgClick(item)"
          />
          <span v-if="damon" @click="deletePicture(item._id)">删除</span>
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
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            transform: scale(1.05);
          }
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
