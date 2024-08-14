<script setup lang="ts">
import InputGroup from 'primevue/inputgroup'
import InputText from 'primevue/inputtext'
import Dialog from 'primevue/dialog'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { ref } from 'vue'

const linkValue = ref('')
const linkInputRef = ref()
const inputIsDisabled = ref(false)
const linkInfo = ref({
  title: '',
  url: ''
})
const visibleDialog = ref(false)
const editInput = () => {
  linkInfo.value.url = linkValue.value
  visibleDialog.value = true
  inputIsDisabled.value = true
}
const editDialog = () => {
  if (!linkInfo.value.title) {
    visibleDialog.value = true
    return
  }
  linkValue.value = linkInfo.value.title
}
const focusOnInput = () => {
  inputIsDisabled.value = false
  linkValue.value = linkInfo.value.url
  setTimeout(() => {
    linkInputRef.value.rootEl.focus()
  }, 100)
}
</script>
<template>
  <div class="one">
    <h2>Задание 1</h2>
    <div>
      <InputGroup>
        <InputText ref="linkInputRef" v-model="linkValue" type="text" variant="filled" placeholder="https://"
          @focusout="editInput" :disabled="inputIsDisabled" />
        <InputGroupAddon @click="focusOnInput" v-if="linkInfo.title || linkInfo.url">
          <i class="pi pi-pencil"></i>
        </InputGroupAddon>
      </InputGroup>
    </div>
    <Dialog v-model:visible="visibleDialog" @update:visible="editDialog" modal header="Введите title"
      :style="{ width: '25rem' }">
      <div class="flex align-items-center gap-3 mb-3">
        <InputText autocomplete="off" v-model="linkInfo.title" />
      </div>
    </Dialog>
  </div>
</template>

<style lang="scss">
.one {
  max-width: 500px;
}
</style>
