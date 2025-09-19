import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCHdFiX0hO2ayBEFflu4-xK1oZXlR2cBCA",
  authDomain: "week7-jiawei-a3a06.firebaseapp.com",
  projectId: "week7-jiawei-a3a06",
  storageBucket: "week7-jiawei-a3a06.appspot.com",
  messagingSenderId: "89619635834",
  appId: "1:89619635834:web:4515339d14d048e0525c3"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)


export default db