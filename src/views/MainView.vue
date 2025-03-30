<template>
  <div class="main-style">
    <div class="sticky-navbar">
      <NavBar />
    </div>
    <div class="row">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  components: {
    NavBar,
  },
  setup() {
    return;
  },
});
</script>

<style>
.row {
  height: 100%;
  margin-bottom: 0px;
  padding: 30px;
}
.main-block {
  padding: 40px;
}
.sub-block {
  padding-top: 20px;
  margin-top: 10px;
  cursor: default !important;
  border: 2px solid white;
  border-radius: 20px;
}
.sticky-navbar {
  position: sticky;
  top: 0px;
  z-index: 10;
}
.sticky-profile {
  position: sticky;
  top: 70px;
}
.browser-default {
  background-color: #f2ebea;
  font-size: 15px;
  /* font-family: "Cubic_11_1.100_R"; */
}
/* font-settings */
/* @font-face {
  font-family: "Cubic_11_1.100_R";
  src: url("@/assets/fonts/Cubic_11_1.100_R.ttf") format("truetype");
} */

.main-style {
  min-height: 100vh;
  min-width: 768px;
  /* font-family: "Cubic_11_1.100_R"; */

  background-color: #f2ebea;
  background-size: 400% 400%;
}
</style>
