<template>
  <div>
    <form @submit.prevent="submitForm">
      <!-- Фамилия -->
      <div class="form-group">
        <label for="lastName">Фамилия*</label>
        <input type="text" id="lastName" v-model="$v.form.lastName.$model" />
        <span v-if="$v.form.lastName.$error" class="error-message"
          >Это поле обязательно.</span
        >
      </div>

      <!-- Имя -->
      <div class="form-group">
        <label for="firstName">Имя*</label>
        <input type="text" id="firstName" v-model="$v.form.firstName.$model" />
        <span v-if="$v.form.firstName.$error" class="error-message"
          >Это поле обязательно.</span
        >
      </div>

      <!-- Отчество -->
      <div class="form-group">
        <label for="middleName">Отчество</label>
        <input type="text" id="middleName" v-model="form.middleName" />
      </div>

      <!-- Дата рождения -->
      <div class="form-group">
        <label for="birthDate">Дата рождения*</label>
        <input type="date" id="birthDate" v-model="$v.form.birthDate.$model" />
        <span v-if="$v.form.birthDate.$error" class="error-message"
          >Это поле обязательно.</span
        >
      </div>

      <!-- Номер телефона -->
      <div class="form-group">
        <label for="phoneNumber">Номер телефона*</label>
        <input
          type="text"
          id="phoneNumber"
          v-model="$v.form.phoneNumber.$model"
        />
        <span v-if="$v.form.phoneNumber.$error" class="error-message"
          >Введите корректный номер телефона.</span
        >
      </div>

      <!-- Пол -->
      <div class="form-group">
        <label for="gender">Пол</label>
        <select id="gender" v-model="form.gender">
          <option value="">Выберите пол</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>
      </div>

      <!-- Группа клиентов -->
      <div class="form-group">
        <label for="clientGroup">Группа клиентов*</label>
        <select id="clientGroup" v-model="$v.form.clientGroup.$model" multiple>
          <option value="VIP">VIP</option>
          <option value="Проблемные">Проблемные</option>
          <option value="ОМС">ОМС</option>
        </select>
        <span v-if="$v.form.clientGroup.$error" class="error-message"
          >Выберите хотя бы одну группу.</span
        >
      </div>

      <!-- Лечащий врач -->
      <div class="form-group">
        <label for="doctor">Лечащий врач*</label>
        <select id="doctor" v-model="$v.form.doctor.$model">
          <option value="">Выберите врача</option>
          <option value="Иванов">Иванов</option>
          <option value="Захаров">Захаров</option>
          <option value="Чернышева">Чернышева</option>
        </select>
        <span v-if="$v.form.doctor.$error" class="error-message"
          >Выберите лечащего врача.</span
        >
      </div>

      <!-- Не отправлять СМС -->
      <div class="form-group">
        <label for="noSms">Не отправлять СМС</label>
        <input type="checkbox" id="noSms" v-model="form.noSms" />
      </div>

      <button type="submit" :disabled="$v.form.$invalid">Отправить</button>
    </form>
  </div>
</template>

<script>
import { required, minLength, helpers } from "vuelidate/lib/validators";

const phoneNumberPattern = helpers.regex("phoneNumber", /^7\d{10}$/);

export default {
  data() {
    return {
      form: {
        lastName: "",
        firstName: "",
        middleName: "",
        birthDate: "",
        phoneNumber: "",
        gender: "",
        clientGroup: [],
        doctor: "",
        noSms: false,
      },
    };
  },
  validations: {
    form: {
      lastName: { required },
      firstName: { required },
      birthDate: { required },
      phoneNumber: { required, phoneNumberPattern },
      clientGroup: { required, minLength: minLength(1) },
      doctor: { required },
      // noSms не требует валидации
    },
  },
  methods: {
    submitForm() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        // Отправка данных
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
