<template>
  <div id="app">
    <header>
      <router-link to="/"
        ><img src="./assets/images/logo.png" alt="Логотип"
      /></router-link>
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
