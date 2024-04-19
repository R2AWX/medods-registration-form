import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuelidate from "vuelidate";
import "./assets/styles/main.scss";

Vue.config.productionTip = false;

Vue.config.devtools = true;

Vue.use(Vuelidate);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
