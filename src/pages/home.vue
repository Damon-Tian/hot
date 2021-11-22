<script setup>
import { toRefs } from "vue";
import { useLoadingStore } from "@/store";
import { setBackImage } from "@/use";
setBackImage("home");
</script>

<template>
  <div class="d-content d-home">
    <div>
      <h2>There is something</h2>
      <h2>Something is Something</h2>
      <h2>Don't need to know</h2>
      <h2>What is something</h2>
    </div>
  </div>
</template>

<style lang="less" scoped>
.d-home {
  display: flex;
  align-items: center;
  height: 80vh;
  justify-content: center;
  text-align: center;
  h2 {
    font-size: 32px;
    letter-spacing: 3px;
  }
}
</style>
