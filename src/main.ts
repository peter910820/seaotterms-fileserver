import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

// 引入 Materialize CSS
import "materialize-css/dist/css/materialize.min.css";
// 引入 Materialize JS
import "materialize-css/dist/js/materialize.min.js";

createApp(App).use(router).mount("#app");
