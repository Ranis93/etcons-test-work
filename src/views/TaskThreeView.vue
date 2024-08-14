<script setup lang="ts">
import MultiSelect from 'primevue/multiselect';
import { ref } from "vue";
interface ICountry {
  name: string
  code: string
}
const selectedCountries = ref<ICountry[] | null>(null);
const countries = ref([
  { name: 'Australia', code: 'AU' },
  { name: 'Brazil', code: 'BR' },
  { name: 'China', code: 'CN' },
  { name: 'Egypt', code: 'EG' },
  { name: 'France', code: 'FR' },
  { name: 'Germany', code: 'DE' },
  { name: 'India', code: 'IN' },
  { name: 'Japan', code: 'JP' },
  { name: 'Spain', code: 'ES' },
  { name: 'United States', code: 'US' }
])
const clearSelectedCountries = (): void => {
  selectedCountries.value = null
}
const showCountries = (slotProps: ICountry[] | null): string => {
  return slotProps?.length ? slotProps.map(itm => itm.name).join(', ') : 'Select Countries'
}
</script>
<template>
  <div class="three">
    <h2>Задание 3</h2>
    <div>
      <MultiSelect v-model="selectedCountries" :options="countries" optionLabel="name" placeholder="Select Countries">
        <template #value="slotProps">
          <div class="modifiedMultiselect">
            <div>{{ showCountries(slotProps.value) }}
            </div>
            <div class="modifiedMultiselect__icon" v-if="slotProps.value?.length" @click="clearSelectedCountries">
              <i class="pi pi-times"></i>
            </div>
          </div>
        </template>
      </MultiSelect>
    </div>
  </div>
</template>

<style lang="scss">
.modifiedMultiselect {
  display: flex;
  justify-content: center;
  align-items: center;

  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 15px;
  }
}

.p-multiselect-label {
  padding-right: 0 !important;
}
</style>