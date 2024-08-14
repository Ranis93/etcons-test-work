<script setup lang="ts">
import Calendar from 'primevue/calendar';
import { ref } from 'vue';

const time = ref()
</script>
<template>
  <div class="two">
    <h2>Задание 2</h2>
    <div>
      <h4>Значение переменной директивы v-model: {{ time ? time.toLocaleString('ru-RU', {
        hour: 'numeric', minute:
          'numeric'
      }) : ''
        }}</h4>
      <Calendar id="calendar-timeonly" v-model="time" timeOnly showButtonBar showIcon />
    </div>
  </div>
</template>

<style></style>