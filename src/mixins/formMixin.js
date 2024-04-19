export const formMixin = {
  methods: {
    validateForm() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        if (this.step === 3) {
          this.sendData();
        } else {
          this.step++;
          const nextStepName = `step${this.step}`;
          this.$router.push({
            name: nextStepName,
            params: { formData: this.form },
          });
        }
      }
    },
    goBack() {
      if (this.step > 1) {
        this.step--;
        const prevStepName = `step${this.step}`;
        this.$router.push({
          name: prevStepName,
          params: { formData: this.form },
        });
      } else {
        this.$router.push("/");
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
