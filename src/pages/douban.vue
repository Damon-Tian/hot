<script setup>
import { ref, reactive, onBeforeMount, toRefs, nextTick } from "vue";
import { getDouban } from "@/axios/index.js";
import SvgIcon from "../components/SvgIcon.vue";
import { setBackImage, displayData } from "@/use";
import loadingBlock from "@/components/loading.vue";

let data = ref([]);
let page = ref(1);
const enumType = {
  MOVIE: "movie",
  TV: "tv",
  BOOK: "book",
};
let type = ref(enumType.MOVIE);
const loadingEnum = {
  loaded: "loaded",
  loading: "loading",
  finished: "finished",
};
const loadingMoreStatus = ref(loadingEnum.loading);
const loadingMoreShow = ref(false);
const isLoading = ref(true);

async function getData(type, pageInner) {
  return new Promise(async (resolve, reject) => {
    loadingMoreStatus.value = "loading";
    let dataOrigin = await getDouban(type, pageInner);
    isLoading.value = false;
    if (data.value?.data?.length && pageInner != 1) {
      data.value.data = data.value.data.concat(dataOrigin.data);
    }
    page.value = pageInner + 1;
    dataOrigin.data.length
      ? (loadingMoreStatus.value = loadingEnum.loaded)
      : (loadingMoreStatus.value = loadingEnum.finished);
    resolve(dataOrigin);
  });
}
let firstData = await getData(type.value, page.value);

const types = reactive([
  { id: enumType.MOVIE, label: "Moive", active: false, class: enumType.MOVIE },
  { id: enumType.TV, label: "TV Series", active: false, class: enumType.TV },
  { id: enumType.BOOK, label: "Book", active: false, class: enumType.BOOK },
]);
let currentType = types.find((i) => i.id == type.value);
types.find((i) => i.id == type.value).active = true;
setBackImage(currentType.id);
setTimeout(() => {
  displayData(0, firstData, data.value);
}, 1000);

const tabsClick = async (item) => {
  let currentType = types.find((i) => i.id == item.id);
  if (currentType.active) return;
  data.value = [];
  await new Promise((x, y) => {
    setTimeout(() => {
      x();
    }, 300);
  });
  let checkLoading = false;
  types.forEach((i) => (i.active = false));
  types.find((i) => i.id == item.id).active = true;
  type.value = item.id;
  page.value = 1;

  loadingMoreShow.value = false; //data为空，more的加载会跑出来
  setTimeout(() => {
    if (!checkLoading) {
      isLoading.value = true;
    }
  }, 300);
  let resData = await getData(type.value, page.value);
  checkLoading = true;
  isLoading.value = false;
  setBackImage(item.id);
  displayData(0, resData, data.value, () => {
    loadingMoreShow.value = true;
  });
};
</script>

<template>
  <div class="douban">
    <ul class="douban-tabs">
      <li
        @click="tabsClick(item)"
        v-for="item in types"
        :class="item.active ? 'active' : ''"
      >
        {{ item.label }}
      </li>
    </ul>
    <template v-if="!isLoading">
      <div class="douban-content" :class="types.find((i) => i.active).class">
        <transition-group name="fade2">
          <a
            :href="item.pageHref"
            target="_blank"
            v-for="(item, index) in data"
            :class="index % 2 == 0 ? 'reverse' : ''"
            :key="index"
          >
            <div class="number-back">{{ index + 1 }}</div>
            <div class="item-img">
              <img :src="item.img" alt="" />
            </div>
            <div class="item-content">
              <p class="item-content-title">{{ item.title }}</p>
              <p class="item-content-directors" v-html="item.directors"></p>
              <p>
                <span class="item-content-rank">{{ item.rank }}</span>
                <span class="item-content-rankNumber">
                  {{ item.rankNumber }}
                </span>
              </p>
              <p class="item-content-quote" v-if="item.quote">
                <span>{{ item.quote }}</span>
              </p>
            </div>
          </a>
        </transition-group>
      </div>
      <div class="d-more" v-if="loadingMoreShow">
        <span
          v-if="loadingMoreStatus == loadingEnum.loaded"
          class="mores"
          @click="getData(type, page)"
        >
          MORE
        </span>
        <span v-else-if="loadingMoreStatus == loadingEnum.loading">
          <loadingBlock></loadingBlock>
        </span>
        <span v-else-if="loadingMoreStatus == loadingEnum.finished">
          No More
        </span>
      </div>
    </template>
    <template v-else>
      <div class="d-loading">
        <loadingBlock></loadingBlock>
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
@yellow: #ffd900;
.douban {
  max-width: 1000px;
  margin: 0 auto;
  .douban-tabs {
    margin: 26px 0;
    padding: 0;
    li {
      font-weight: 700;
      display: inline-flex;
      width: 100px;
      height: 40px;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0px 6px 0px #00000030;
      border-radius: 3px;
      margin-right: 40px;
      transition: all 0.3s;
      //   border: 1px solid var(--border-color);
      cursor: pointer;
      &:hover {
        box-shadow: 0 3px 6px 0px var(--shadow-dark);
      }
      &.active {
        background-color: var(--red);
        color: var(--color);
        text-shadow: 8px 8px 2px #ffffff90;
      }
    }
  }
  .douban-content {
    position: relative;
    &.tv {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 30px;
    }
    a {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      padding: 20px;
      box-shadow: 0 2px 12px transparent;
      cursor: pointer;
      transition: all 0.3s;
      border-radius: 6px;
      position: relative;

      .number-back {
        position: absolute;
        right: 200px;
        bottom: 20%;
        transform: translate(-50%, 0%);
        opacity: 0.4;
        z-index: -1;
        color: @yellow;
        text-shadow: 6px 6px 0px rgba(255, 255, 0, 0.205);
        font-size: 4rem;
        font-style: italic;
      }
      &.reverse {
        flex-direction: row-reverse;
      }
      .item-img {
        width: 160px;
      }
      .item-content {
        width: calc(100% - 200px);
        font-weight: 700;
        &-title {
          font-size: 24px;
          margin-top: 0;
        }
        &-directors {
          font-style: italic;
          min-height: 30px;
          vertical-align: middle;
        }
        &-rank {
          color: @yellow;
          font-size: 1.5rem;
          text-shadow: 2px 2px 2px rgba(255, 255, 0, 0.356);
          margin-right: 10px;
        }
        &-quote {
          span {
            background-color: var(--red);
            color: white;
            padding: 10px 20px;
            border-radius: 3px;
            display: inline-block;
          }
        }
      }
      &:hover {
        box-shadow: 0 2px 24px 4px var(--shadow-dark);
      }
    }
  }
}
.d-more {
  text-align: center;
  margin: 20px;
  .mores {
    display: inline-flex;
    font-weight: 700;
    width: 200px;
    height: 40px;
    align-items: center;
    justify-content: center;
    background-color: var(--red);
    color: white;
    border-radius: 3px;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.6s;
    box-shadow: 0 2px 12px transparent;
    &:hover {
      box-shadow: 0 2px 12px red;
    }
  }
}

// .fade2-leave-to {
//   opacity: 0;
// }
</style>
