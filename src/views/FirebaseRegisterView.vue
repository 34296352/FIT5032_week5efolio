<template>
  <div class="container">
    <h1>Create an Account</h1>
    <p><input type="email" v-model="email" placeholder="Email" /></p>
    <p><input type="password" v-model="password" placeholder="Password" /></p>
    <p><button :disabled="loading" @click="register">
      {{ loading ? 'Registering…' : 'Save to Firebase' }}
    </button></p>
    <p v-if="msg">{{ msg }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const msg = ref('')
const loading = ref(false)
const router = useRouter()

const register = async () => {
  msg.value = ''; loading.value = true
  try {
    const auth = getAuth() 
    const cred = await createUserWithEmailAndPassword(auth, email.value, password.value)
    msg.value = `✅ Registered: ${cred.user.email}`
    alert(msg.value)
    router.push('/FireLogin')
  } catch (e) {
    msg.value = `❌ ${e.code}: ${e.message}`
    alert(msg.value)
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>
