<template>
  <div class="row main-block">
    <h1 class="center">伺服器資源</h1>
    <div class="col l4 m12 s12 file-block input-field">
      <div class="row">
        <div class="col s12 folder-block-title">選擇資料夾</div>
        <div class="col s12 folder" v-for="(item, index) in buttonValue" :key="index" :value="item">
          <input
            type="button"
            class="button-folder"
            @click="expandDetails(item.split('/')[1])"
            :value="item.split('/')[1]"
          />
        </div>
      </div>
    </div>
    <div class="col l8 m12 s12 file-block input-field">
      <div class="row">
        <div class="col s12 file-block-title">{{ (fileData[0] as string).split("/").slice(-2, -1)[0] }}資料夾內容</div>
        <div
          class="col s12 wow animate__fadeInRightBig floatup-div file"
          @click="goToUrl(item)"
          v-for="(item, index) in fileData"
          :key="index"
          :value="item"
        >
          <a :href="item">
            <span>{{ item as string }}</span>
          </a>
        </div>
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
    const fileData = ref([]);

    const expandDetails = async (folder: string) => {
      const apiUrl = `/api/files?folder=${folder}`;
      try {
        const response = await axios.get(apiUrl);
        if (response && response.status === 200) {
          fileData.value = response.data.data;
        } else if (response) {
          router.push("/error");
        } else {
          router.push("/error");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        router.push("/error");
      }
    };

    const goToUrl = async (url: string) => {
      window.location.href = url;
    };

    onMounted(async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const getFile = async (): Promise<AxiosResponse | undefined> => {
        const apiUrl = "/api/files";
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

    return { fileData, buttonValue, expandDetails, goToUrl };
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
.file {
  border: 2px solid skyblue;
  border-radius: 100px;
  margin-bottom: 10px;
  padding: 20px;
  cursor: pointer;
}
.folder-block-title {
  font-size: 30px;
}
.file-block-title {
  font-size: 30px;
}
</style>
