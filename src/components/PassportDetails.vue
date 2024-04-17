<template>
  <div>
    <form @submit.prevent="submitForm">
      <!-- Тип документа -->
      <div class="form-group">
        <label for="documentType">Тип документа*</label>
        <select
          id="documentType"
          v-model="$v.form.documentType.$model"
          required
        >
          <option disabled value="">Выберите тип документа</option>
          <option value="passport">Паспорт</option>
          <option value="birthCertificate">Свидетельство о рождении</option>
          <option value="driverLicense">Водительское удостоверение</option>
        </select>
        <span v-if="$v.form.documentType.$error" class="error-message"
          >Это поле обязательно.</span
        >
      </div>

      <!-- Серия -->
      <div class="form-group">
        <label for="series">Серия</label>
        <input type="text" id="series" v-model="form.series" />
      </div>

      <!-- Номер -->
      <div class="form-group">
        <label for="number">Номер</label>
        <input type="text" id="number" v-model="form.number" />
      </div>

      <!-- Кем выдан -->
      <div class="form-group">
        <label for="issuedBy">Кем выдан</label>
        <input type="text" id="issuedBy" v-model="form.issuedBy" />
      </div>

      <!-- Дата выдачи -->
      <div class="form-group">
        <label for="issueDate">Дата выдачи*</label>
        <input
          type="date"
          id="issueDate"
          v-model="$v.form.issueDate.$model"
          required
        />
        <span v-if="$v.form.issueDate.$error" class="error-message"
          >Это поле обязательно.</span
        >
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
        documentType: "",
        series: "",
        number: "",
        issuedBy: "",
        issueDate: "",
      },
    };
  },
  validations: {
    form: {
      documentType: { required },
      issueDate: { required },
      // Добавьте дополнительные валидаторы для других полей, если необходимо
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
