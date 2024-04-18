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
      name: "personalDetails",
      component: PersonalDetails,
    },
    {
      path: "/step-2",
      name: "addressDetails",
      component: AddressDetails,
    },
    {
      path: "/step-3",
      name: "passportDetails",
      component: PassportDetails,
    },
  ],
});
