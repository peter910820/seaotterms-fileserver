<template>
  <div class="col s12">
    <h1>資源伺服器目錄</h1>
  </div>
  <div class="col s12 input-field">
    <select>
      <option class="validate" value="" disabled selected>選擇主題</option>
      <option :value="1">測試</option>
      <option :value="1">測試2</option>
      <option :value="1">測試3</option>
      <option :value="1">測試4</option>
      <option :value="1">測試5</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { initMaterialFormSelect } from "@/composables/useMaterial";

onMounted(() => {
  initMaterialFormSelect();
});
</script>

<style scoped></style>
