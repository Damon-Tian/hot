import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore("loading", () => {
  const loading = ref(false);
  const count = ref(0);
  const backImg = ref("");

  const backImgs = [
    { type: "home", src: "/img/home.png" },
    // , style: { objectFit: "contain" }
    { type: "zhihu", src: "/img/zhihu.png", style: { objectFit: "contain" } },
    { type: "bilibili", src: "/img/bilibili.png" },
    { type: "movie", src: "/img/movie.jpeg" },
    { type: "tv", src: "/img/tv2.jpg" },
    { type: "book", src: "/img/book.jpg" },
  ];

  function changeLoading(value) {
    loading.value = value;
  }
  function add() {
    count.value == count.value++;
  }
  function setBackImg(type) {
    let imgDom = document.getElementsByClassName("d-back")[0].children[0];

    let item = backImgs.find((i) => i.type == type);
    imgDom.style.opacity = 0;
    setTimeout(() => {
      backImg.value = "";
      if (item?.style) {
        for (let i in item.style) {
          imgDom.style[i] = item.style[i];
        }
      } else {
        imgDom.style = "";
      }
      imgDom.style.opacity = 0;
    }, 1000);

    if (item?.src) {
      let img = new Image();
      img.onload = () => {
        setTimeout((val) => {
          backImg.value = item?.src || "";
          setTimeout(() => {
            imgDom.style.opacity = 1;
          }, 500);
        }, 1500);
      };
      img.src = item?.src;
    }
  }
  return {
    loading,
    changeLoading,
    count,
    add,

    backImg,
    setBackImg,
  };
});
