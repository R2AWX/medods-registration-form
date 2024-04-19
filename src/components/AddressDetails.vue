<template>
  <div>
    <!-- Индикатор прогресса -->
    <div class="progress-indicator">
      <span :class="{ active: step === 1 }">1. Личные данные</span>
      <span :class="{ active: step === 2 }">2. Адрес</span>
      <span :class="{ active: step === 3 }">3. Паспортные данные</span>
    </div>

    <!-- Форма регистрации -->
    <form @submit.prevent="submitForm">
      <!-- Индекс -->
      <div class="form-group">
        <label for="postalCode">Индекс</label>
        <input type="text" id="postalCode" v-model="form.postalCode" />
        <span v-if="form.postalCode" class="valid-feedback">✔</span>
      </div>

      <!-- Страна -->
      <div class="form-group">
        <label for="country">Страна</label>
        <input type="text" id="country" v-model="form.country" />
        <span v-if="form.country" class="valid-feedback">✔</span>
      </div>

      <!-- Область -->
      <div class="form-group">
        <label for="region">Область</label>
        <input type="text" id="region" v-model="form.region" />
        <span v-if="form.region" class="valid-feedback">✔</span>
      </div>

      <!-- Город -->
      <div class="form-group">
        <label for="city">Город*</label>
        <input type="text" id="city" v-model="$v.form.city.$model" />
        <span v-if="isCityValid" class="valid-feedback">✔</span>
        <span v-else-if="$v.form.city.$error" class="error-message"
          >Это поле обязательно.</span
        >
      </div>

      <!-- Улица -->
      <div class="form-group">
        <label for="street">Улица</label>
        <input type="text" id="street" v-model="form.street" />
        <span v-if="form.street" class="valid-feedback">✔</span>
      </div>

      <!-- Дом -->
      <div class="form-group">
        <label for="house">Дом</label>
        <input type="text" id="house" v-model="form.house" />
        <span v-if="form.house" class="valid-feedback">✔</span>
      </div>

      <!-- Кнопки -->
      <button type="button" @click="goBack">Назад</button>
      <button type="button" @click="validateForm">Продолжить</button>
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { formMixin } from "@/mixins/formMixin";

export default {
  mixins: [formMixin],
  props: {
    formData: Object,
  },
  mounted() {
    if (this.formData) {
      this.form = { ...this.formData };
    }
  },
  data() {
    return {
      form: {
        // Шаг 1
        lastName: "",
        firstName: "",
        middleName: "",
        birthDate: "",
        phoneNumber: "",
        gender: "",
        clientGroup: [],
        doctor: "",
        noSms: false,

        // Шаг 2
        postalCode: "",
        country: "",
        region: "",
        city: "",
        street: "",
        house: "",

        // Шаг 3
        documentType: "",
        series: "",
        number: "",
        issuedBy: "",
        issueDate: "",
      },
      step: 2,
    };
  },
  validations: {
    form: {
      city: { required },
    },
  },
  computed: {
    isCityValid() {
      return this.$v.form.city.$dirty && !this.$v.form.city.$error;
    },
  },
};
</script>
