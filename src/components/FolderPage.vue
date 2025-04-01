<template>
  <div class="row">
    <div class="col s12">
      <h1>伺服器資料</h1>
    </div>
    <div class="col s12 file-field input-field">
      <div class="col s12" v-for="(item, index) in fileData" :key="index" :value="item">
        <a href="{{ item as string }}">
          <span>{{ item as string }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, defineComponent } from "vue";
import { useRouter } from "vue-router";
import axios, { AxiosResponse } from "axios";

export default defineComponent({
  setup() {
    const router = useRouter();
    const fileData = ref(null);

    onMounted(async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const getFile = async (): Promise<AxiosResponse | undefined> => {
        const apiUrl = "/api/file";
        try {
          const response = await axios.get(apiUrl);
          return response;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return error.response;
        }
      };
      const response = await getFile();
      if (response && response.status === 200) {
        fileData.value = response.data.data;
      } else if (response) {
        router.push("/error");
      } else {
        router.push("/error");
      }
    });

    return { fileData };
  },
});
</script>

<style scoped>
a {
  font-size: 25px;
}
</style>
