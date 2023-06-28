<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div :class="$style.go">vue</div>
    <div :class="$style.to">vue</div>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src


@Options({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {}
</script>

<style lang="less">
body {
  background-color: #fff;

  #app {
    color: red;
  }
}
</style>

<style module>
.go {
  color: red;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.to {
  font-weight: bold;
  color: #000;
}
</style>
