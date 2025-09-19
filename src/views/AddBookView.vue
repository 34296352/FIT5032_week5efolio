<template>
  <h1>Add Book</h1>
  <form @submit.prevent="addBook">
    <div>
      <label for="isbn">ISBN:</label>
      <input id="isbn" v-model="isbn" />
    </div>
    <div>
      <label for="name">Name:</label>
      <input id="name" v-model="name" />
    </div>
    <button type="submit">Add Book</button>
  </form>

  
  <BookList />
</template>

<script setup>
import { ref } from 'vue'
import db from '../firebase/init.js'
import { addDoc, collection } from 'firebase/firestore'
import BookList from '../components/BookList.vue'

const isbn = ref('')
const name = ref('')

const addBook = async () => {
  const n = Number(isbn.value)
  if (Number.isNaN(n)) { alert('ISBN must be a number'); return }

  await addDoc(collection(db, 'books'), { isbn: n, name: name.value })
  isbn.value = ''
  name.value = ''
}
</script>
