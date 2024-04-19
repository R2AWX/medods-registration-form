import Vue from "vue";
import Router from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PersonalDetails from "@/components/PersonalDetails.vue";
import AddressDetails from "@/components/AddressDetails.vue";
import PassportDetails from "@/components/PassportDetails.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/step-1",
      name: "step1",
      component: PersonalDetails,
      props: true,
    },
    {
      path: "/step-2",
      name: "step2",
      component: AddressDetails,
      props: true,
    },
    {
      path: "/step-3",
      name: "step3",
      component: PassportDetails,
      props: true,
    },
  ],
});
