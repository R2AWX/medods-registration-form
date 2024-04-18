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
      <!-- Тип документа -->
      <div class="form-group">
        <label for="documentType">Тип документа*</label>
        <select id="documentType" v-model="$v.form.documentType.$model">
          <option disabled value="">Выберите тип документа</option>
          <option value="passport">Паспорт</option>
          <option value="birthCertificate">Свидетельство о рождении</option>
          <option value="driverLicense">Водительское удостоверение</option>
        </select>
        <span v-if="isDocumentTypeValid" class="valid-feedback">✔</span>
        <span v-else-if="$v.form.documentType.$error" class="error-message"
          >Это поле обязательно.</span
        >
      </div>

      <!-- Серия -->
      <div class="form-group">
        <label for="series">Серия</label>
        <input type="text" id="series" v-model="form.series" />
        <span v-if="form.series" class="valid-feedback">✔</span>
      </div>

      <!-- Номер -->
      <div class="form-group">
        <label for="number">Номер</label>
        <input type="text" id="number" v-model="form.number" />
        <span v-if="form.number" class="valid-feedback">✔</span>
      </div>

      <!-- Кем выдан -->
      <div class="form-group">
        <label for="issuedBy">Кем выдан</label>
        <input type="text" id="issuedBy" v-model="form.issuedBy" />
        <span v-if="form.issuedBy" class="valid-feedback">✔</span>
      </div>

      <!-- Дата выдачи -->
      <div class="form-group">
        <label for="issueDate">Дата выдачи*</label>
        <input type="date" id="issueDate" v-model="$v.form.issueDate.$model" />
        <span v-if="isIssueDateValid" class="valid-feedback">✔</span>
        <span v-else-if="$v.form.issueDate.$error" class="error-message"
          >Это поле обязательно.</span
        >
      </div>

      <!-- Кнопки -->
      <button type="button" @click="goBack">Назад</button>
      <button type="button" @click="submitForm">Отправить</button>
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import router from "@/router";

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
      step: 3,
    };
  },
  validations: {
    form: {
      documentType: { required },
      issueDate: { required },
    },
  },
  computed: {
    isDocumentTypeValid() {
      return (
        this.$v.form.documentType.$dirty && !this.$v.form.documentType.$error
      );
    },
    isIssueDateValid() {
      return this.$v.form.issueDate.$dirty && !this.$v.form.issueDate.$error;
    },
  },
  methods: {
    submitForm() {
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
