<template>
  <div class="filters">
    <div class="searchPanel">
      <InputGroup>
        <Button icon="pi pi-sliders-v" severity="success" @click="toggle" aria-haspopup="true"
          aria-controls="overlay_menu" />
        <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true">
          <template #item="{ item }">
            <Checkbox v-model="item.checked" :binary="true" @click.stop :inputId="item.label" />
            <label :for="item.label" class="menuLabel" @click.stop> {{ item.label }} </label>
          </template>
        </Menu>
        <InputText placeholder="Поиск" v-model="searchTextValue" @keyup.enter="filterPets" />
        <InputGroupAddon v-if="searchTextValue" @click="clearSearchTextValue">
          <i class="pi pi-times"></i>
        </InputGroupAddon>
        <Button label="Search" severity="info" @click="filterPets" />
      </InputGroup>
    </div>
    <div class="select">
      <MultiSelect v-model="selectedTableCols" :options="tableCols" optionLabel="name" placeholder="Поля таблицы">
      </MultiSelect>
    </div>
  </div>
  <div class="card">
    <DataTable v-if="selectedTableCols?.length" :value="pets" tableStyle="min-width: 50rem" paginator :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]">
      <Column :field="selectedCol.value" :header="selectedCol.name" sortable v-for="selectedCol in selectedTableCols"
        :key="selectedCol"></Column>
    </DataTable>
    <DataTable v-else :value="filteredPets" tableStyle="min-width: 50rem" paginator :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]">
      <Column :field="selectedCol.value" :header="selectedCol.name" sortable v-for="selectedCol in tableCols"
        :key="selectedCol"></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import InputGroup from 'primevue/inputgroup'
import InputText from 'primevue/inputtext'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputGroupAddon from 'primevue/inputgroupaddon'
import MultiSelect from 'primevue/multiselect'
import { ref, onMounted } from 'vue'
import Menu from 'primevue/menu'
import Checkbox from 'primevue/checkbox'

const searchTextValue = ref<string>('')
interface ICols {
  name: string
  value: string
}
const selectedTableCols = ref<ICols[] | null>(null);
const tableCols = ref<ICols[]>([
  { name: 'ID', value: 'id' },
  { name: 'Имя', value: 'name' },
  { name: 'Статус', value: 'status' },
])
const pets = ref();
const filteredPets = ref();
onMounted(() => {
  axios(`https://petstore.swagger.io/v2/pet/findByStatus?status=available`).then(res => {
    res.data.forEach(itm => { itm.id = String(itm.id) })
    pets.value = res.data
    filteredPets.value = res.data
  });
});

const clearSearchTextValue = (): void => {
  searchTextValue.value = ''
  filteredPets.value = pets.value
}

const menu = ref();
const menuItems = ref([
  {
    label: 'Поля для поиска',
    items: [
      { label: 'id', checked: true },
      { label: 'name', checked: true },
      { label: 'status', checked: true },
    ]
  }
]);

const filterPets = () => {
  const menuItemsArr = menuItems.value[0].items.filter(itm => itm.checked).map(itm => itm.label)
  const createCondition = () => {
    const res = menuItemsArr
      .map(menuItem => `itm.${menuItem}.toLowerCase().includes(searchTextValue.value.toLowerCase())`)
      .join('||')
    return res
  }
  const condition = createCondition()

  if (searchTextValue.value && menuItemsArr.length) {
    filteredPets.value = pets.value.filter(itm => {
      return eval(condition)
    })
  }
  else
    filteredPets.value = pets.value
}
const toggle = (event) => {
  menu.value.toggle(event);
};
</script>
<style lang="scss">
.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 10px;
  margin-bottom: 10px;
}

.searchPanel {
  width: 80%;
}

.select {
  width: 20%;

  .p-multiselect {
    width: 100%;
  }
}

.menuLabel {
  width: 100%;
  cursor: pointer;
}

.p-menu-item-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 10px;
}
</style>