import React from 'react'

export default function Cart() {

  const [user, setUser] = useState([])
  async function getUser(){
    const q = collection(db, "shoelist")
    const querySnapshot = await getDocs(q);
    const list = []
querySnapshot.forEach((doc) => {
  list.push({ id: doc.id, ...doc.data() })
})
setUser(list)
  }


  return (
    <div>Cart</div>
  )
}
