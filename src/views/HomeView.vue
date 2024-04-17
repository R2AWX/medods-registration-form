<template>
  <div class="home">
    <h1>Добро пожаловать в нашу клинику!</h1>
    <p>
      Для регистрации нового клиента, пожалуйста, перейдите к форме регистрации.
    </p>
    <router-link to="/personal-details">Начать регистрацию</router-link>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style lang="scss" scoped>
.home {
  text-align: center;
  margin-top: 50px;
}

.router-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
</style>
