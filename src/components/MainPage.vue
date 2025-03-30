<template>
  <div class="col s12">
    <h1>資源伺服器目錄</h1>
  </div>
  <form action="/api/upload" method="post" enctype="multipart/form-data">
    <div class="col s12 file-field input-field">
      <div class="btn">
        <span><i class="material-icons">upload_file</i></span>
        <input type="file" name="file" />
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text" placeholder="Upload one files" />
      </div>
    </div>
    <div class="col s12 input-field">
      <select>
        <option class="validate" value="" disabled selected>選擇資料夾</option>
        <option v-for="(item, index) in directory" :key="index" :value="item">
          {{ (item as string).split("\\")[1] }}
        </option>
      </select>
    </div>
    <button class="btn waves-effect waves-light" type="submit" name="action">
      Submit
      <i class="material-icons right">send</i>
    </button>
  </form>
</template>

<script lang="ts">
import { onMounted, ref, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { initMaterialFormSelect } from "@/composables/useMaterial";
import axios, { AxiosResponse } from "axios";

export default defineComponent({
  setup() {
    const router = useRouter();
    let directory = ref(null);

    onMounted(async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const getDirectory = async (): Promise<AxiosResponse | undefined> => {
        const apiUrl = "http://127.0.0.1:3000/api/directory";
        try {
          const response = await axios.get(apiUrl);
          return response;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return error.response;
        }
      };
      const response = await getDirectory();
      if (response && response.status === 200) {
        console.log(response.data.msg);
        directory.value = response.data.msg.slice(1);
      } else if (response) {
        router.push("/error");
      } else {
        router.push("/error");
      }
      initMaterialFormSelect();
    });

    return { directory };
  },
});
</script>

<style scoped></style>
