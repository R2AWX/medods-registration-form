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
      <!-- Фамилия -->
      <div class="form-group">
        <label for="lastName">Фамилия*</label>
        <input type="text" id="lastName" v-model="$v.form.lastName.$model" />
        <span v-if="isLastNameValid" class="valid-feedback">✔</span>
        <span v-else-if="$v.form.lastName.$error" class="error-message"
          >Это поле обязательно.</span
        >
      </div>

      <!-- Имя -->
      <div class="form-group">
        <label for="firstName">Имя*</label>
        <input type="text" id="firstName" v-model="$v.form.firstName.$model" />
        <span v-if="isFirstNameValid" class="valid-feedback">✔</span>
        <span v-else-if="$v.form.firstName.$error" class="error-message"
          >Это поле обязательно.</span
        >
      </div>

      <!-- Отчество -->
      <div class="form-group">
        <label for="middleName">Отчество</label>
        <input type="text" id="middleName" v-model="form.middleName" />
        <span v-if="form.middleName" class="valid-feedback">✔</span>
      </div>

      <!-- Дата рождения -->
      <div class="form-group">
        <label for="birthDate">Дата рождения*</label>
        <input type="date" id="birthDate" v-model="$v.form.birthDate.$model" />
        <span v-if="isBirthDateValid" class="valid-feedback">✔</span>
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
        <span v-if="isPhoneNumberValid" class="valid-feedback">✔</span>
        <span v-if="$v.form.phoneNumber.$error" class="error-message"
          >Введите корректный номер телефона, начинающийся с 7.</span
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
        <span v-if="form.gender" class="valid-feedback">✔</span>
      </div>

      <!-- Группа клиентов -->
      <div class="form-group">
        <label for="clientGroup">Группа клиентов*</label>
        <select
          id="clientGroup"
          v-model="form.clientGroup"
          multiple
          title="Для выбора нескольких значений зажмите Ctrl или Shift"
        >
          <option value="VIP">VIP</option>
          <option value="Проблемные">Проблемные</option>
          <option value="ОМС">ОМС</option>
        </select>
        <p class="hint-text">
          Для выбора нескольких значений зажмите Ctrl или Shift
        </p>
        <span v-if="isClientGroupValid" class="valid-feedback">✔</span>
        <span v-if="$v.form.clientGroup.$error" class="error-message"
          >Выберите хотя бы один вариант.</span
        >
      </div>

      <!-- Лечащий врач -->
      <div class="form-group">
        <label for="doctor">Лечащий врач</label>
        <select id="doctor" v-model="form.doctor">
          <option value="">Выберите врача</option>
          <option value="Иванов">Иванов</option>
          <option value="Захаров">Захаров</option>
          <option value="Чернышева">Чернышева</option>
        </select>
        <span v-if="form.doctor" class="valid-feedback">✔</span>
      </div>

      <!-- Не отправлять СМС -->
      <div class="form-group">
        <label for="noSms">Не отправлять СМС</label>
        <input type="checkbox" id="noSms" v-model="form.noSms" />
      </div>

      <!-- Кнопки -->
      <button type="button" @click="goBack">Назад</button>
      <button type="button" @click="validateForm">Продолжить</button>
    </form>
  </div>
</template>

<script>
import { required, minLength, helpers } from "vuelidate/lib/validators";
import router from "@/router";

const phoneNumberPattern = helpers.regex("phoneNumber", /^7\d{10}$/);

export default {
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
      step: 1,
    };
  },
  validations: {
    form: {
      lastName: { required },
      firstName: { required },
      birthDate: { required },
      phoneNumber: { required, phoneNumberPattern },
      clientGroup: { required, minLength: minLength(1) },
    },
  },
  computed: {
    isLastNameValid() {
      return this.$v.form.lastName.$dirty && !this.$v.form.lastName.$error;
    },
    isFirstNameValid() {
      return this.$v.form.firstName.$dirty && !this.$v.form.firstName.$error;
    },
    isBirthDateValid() {
      return this.$v.form.birthDate.$dirty && !this.$v.form.birthDate.$error;
    },
    isPhoneNumberValid() {
      return (
        this.$v.form.phoneNumber.$dirty && !this.$v.form.phoneNumber.$error
      );
    },
    isClientGroupValid() {
      return (
        this.$v.form.clientGroup.$dirty && !this.$v.form.clientGroup.$error
      );
    },
  },
  methods: {
    validateForm() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        if (this.step === 3) {
          this.sendData();
        } else {
          this.step++;
          router.push(`/step-${this.step}`);
        }
      }
    },
    goBack() {
      if (this.step > 1) {
        this.step--;
        router.push(`/step-${this.step}`);
      } else {
        router.push("/");
      }
    },
    sendData() {
      fetch("https://webhook.site/29be5378-febb-48a8-8cbe-80c190cec7dc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(this.form),
      })
        .then(() => {
          alert(
            "Данные успешно отправлены, но ответ не может быть прочитан из-за CORS политики."
          );
        })
        .catch((error) => {
          console.error("Ошибка при отправке данных:", error);
          alert("Ошибка при отправке данных.");
        });
    },
  },
};
</script>
