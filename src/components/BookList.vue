<template>
  <div class="p-4">
    <h2>Books with ISBN > 1000</h2>
    <ul>
      <li v-for="b in books" :key="b.id">
        {{ b.name }} - ISBN: {{ b.isbn }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import { collection, query, where, getDocs } from 'firebase/firestore'

const books = ref([])

const fetchBooks = async () => {
  try {
    const q = query(collection(db, 'books'), where('isbn', '>', 1000))
    const snap = await getDocs(q)
    const items = []
    snap.forEach(doc => items.push({ id: doc.id, ...doc.data() }))
    books.value = items
  } catch (e) {
    console.error('Error fetching books:', e)
  }
}

onMounted(fetchBooks)
</script>
