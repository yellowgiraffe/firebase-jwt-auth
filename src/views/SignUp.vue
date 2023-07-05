<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import LoaderSpinner from '../components/LoaderSpinner.vue'


const authStore = useAuthStore()
const router = useRouter()

const email = ref()
const password = ref()

const signUp = async () => {
  await authStore.auth({ email: email.value, password: password.value }, 'signUp')
  router.push('/cars')
}
</script>

<template>
  <h2>Sign up</h2>
  <form class="flex flex-column gap-3">
    <Message v-if="authStore.error" severity="warn">{{ authStore.error }}</Message>
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <i class="pi pi-user"></i>
      </span>
      <InputText v-model="email" type="email" placeholder="Email" />
    </div>
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <i class="pi pi-at"></i>
      </span>
      <InputText v-model="password" type="password" placeholder="Password" />
    </div>
    <LoaderSpinner v-if="authStore.isLoading" />
    <div v-else class="flex flex-column gap-3">
      <Button label="Sign up" @click="signUp" />
      <span>Are you already registered? <router-link to="/signin">Sign in</router-link></span>
    </div>
  </form>
</template>