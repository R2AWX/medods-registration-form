<template>
  <div>
    <form @submit.prevent="submitForm">
      <!-- Индекс -->
      <div class="form-group">
        <label for="postalCode">Индекс</label>
        <input type="text" id="postalCode" v-model="form.postalCode" />
      </div>

      <!-- Страна -->
      <div class="form-group">
        <label for="country">Страна</label>
        <input type="text" id="country" v-model="form.country" />
      </div>

      <!-- Область -->
      <div class="form-group">
        <label for="region">Область</label>
        <input type="text" id="region" v-model="form.region" />
      </div>

      <!-- Город -->
      <div class="form-group">
        <label for="city">Город*</label>
        <input type="text" id="city" v-model="$v.form.city.$model" />
        <span v-if="$v.form.city.$error" class="error-message"
          >Это поле обязательно.</span
        >
      </div>

      <!-- Улица -->
      <div class="form-group">
        <label for="street">Улица</label>
        <input type="text" id="street" v-model="form.street" />
      </div>

      <!-- Дом -->
      <div class="form-group">
        <label for="house">Дом</label>
        <input type="text" id="house" v-model="form.house" />
      </div>

      <button type="submit" :disabled="$v.form.$invalid">Отправить</button>
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      form: {
        postalCode: "",
        country: "",
        region: "",
        city: "",
        street: "",
        house: "",
      },
    };
  },
  validations: {
    form: {
      city: { required },
      // Валидация для других полей если нужна
    },
  },
  methods: {
    submitForm() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        // Логика отправки данных
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form-group {
  margin-bottom: 1rem;
}

.error-message {
  color: red;
}
</style>
