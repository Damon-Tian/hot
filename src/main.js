import { createApp, toRefs } from "vue";
import router from "@/router";
import App from "./App.vue";
import { useLoadingStore } from "./store";
import { createPinia } from "pinia";

import "virtual:svg-icons-register";
import SvgIcon from "./components/SvgIcon.vue";

router.beforeEach((to, from) => {
  // ...
  console.log("before enterrrrrrr");
  const { changeLoading } = toRefs(useLoadingStore());
  changeLoading.value(true);
});

createApp(App)
  .use(router)
  .use(createPinia())
  .component("SvgIcon", SvgIcon)
  .mount("#app");
