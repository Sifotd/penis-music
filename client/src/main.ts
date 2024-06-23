import { createApp } from 'vue'
import ElementPlus from "element-plus";
import "./assets/css/index.scss";
import "./assets/icons/index.js";

import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router';

import "element-plus/dist/index.css";


createApp(App)
  .use(createPinia())
  .use(router)
  .use(ElementPlus)
  .mount('#app')
