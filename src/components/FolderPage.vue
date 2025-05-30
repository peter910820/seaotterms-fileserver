<template>
  <div class="row main-block">
    <h1 class="center">伺服器資料</h1>
    <div class="col s6 file-block input-field">
      <div class="row">
        <div class="col s12 folder" v-for="(item, index) in buttonValue" :key="index" :value="item">
          <input type="button" class="button-folder" :value="item.split('/')[1]" />
        </div>
        <!-- <div class="col s12" v-for="(item, index) in fileData" :key="index" :value="item">
          <a :href="item">
            <span>{{ item as string }}</span>
          </a>
        </div> -->
      </div>
    </div>
    <div class="col s6 file-block input-field">
      <div class="row">
        <!-- <div class="col s12" v-for="(item, index) in fileData" :key="index" :value="item">
          <a :href="item">
            <span>{{ item as string }}</span>
          </a>
        </div> -->

        <!-- test -->
        <!-- <div class="col s12">
          <a>D:\ScreenShots\screenShotsOld</a>
        </div>
        <div class="col s12">
          <a>D:\ScreenShots\screenShotsOld</a>
        </div>
        <div class="col s12">
          <a>D:\ScreenShots\screenShotsOld</a>
        </div>
        <div class="col s12">
          <a>D:\ScreenShots\screenShotsOld</a>
        </div>
        <div class="col s12">
          <a>D:\ScreenShots\screenShotsOld</a>
        </div>
        <div class="col s12">
          <a>D:\ScreenShots\screenShotsOld</a>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, defineComponent } from "vue";
import { useRouter } from "vue-router";
import axios, { AxiosResponse } from "axios";
import { useDirectoryStore } from "@/store/file";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const directoryStore = useDirectoryStore();
    const { directory } = storeToRefs(directoryStore);
    const buttonValue = ref(directory.value);
    console.log(directoryStore);
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

    return { fileData, buttonValue };
  },
});
</script>

<style scoped>
a {
  font-size: 25px;
}
.center {
  text-align: center;
}
.folder {
  margin-top: 10px;
  > input {
    width: 150px;
    height: 50px;
    font-size: 20px;
  }
}
</style>
