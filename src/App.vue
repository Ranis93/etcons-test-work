<script setup lang="ts">
</script>

<template>
  <header>
    <h1>Задания</h1>

    <div class="wrapper p-light-theme">
      <nav>
        <RouterLink to="/">Задание 1</RouterLink>
        <RouterLink to="/task2">Задание 2</RouterLink>
        <RouterLink to="/task3">Задание 3</RouterLink>
        <RouterLink to="/task4">Задание 4</RouterLink>
        <RouterLink to="/task5">Задание 5</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

h1 {
  display: block;
}

nav {
  width: 100%;
  font-size: 16px;
  text-align: center;
  margin: 2rem 0;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
