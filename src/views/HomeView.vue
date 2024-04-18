<template>
  <div class="home">
    <h1>Добро пожаловать в нашу клинику!</h1>
    <p>
      Для регистрации нового клиента, пожалуйста, перейдите к форме регистрации.
    </p>
    <router-link to="/step-1">Начать регистрацию</router-link>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>
