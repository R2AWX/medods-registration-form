<template>
  <div id="app">
    <header>
      <img src="./assets/logo.png" alt="Логотип" />
      <h1>Регистрационная форма клиники</h1>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  background-color: #f5f5f5;
  padding: 20px;
  margin-bottom: 20px;
}

header img {
  max-width: 100px;
}

main {
  margin: 0 auto;
  width: 80%;
  max-width: 600px;
}
</style>
