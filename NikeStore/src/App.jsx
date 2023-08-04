
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import MainPage from './MainPage'
import Context from './context';
import {db} from './assets/config'
import { collection,  getDocs } from "firebase/firestore";
import "firebase/compat/firestore";
import Login from './Login';
import SignUp from './Signup';
import View from './View';
import Cart from './Cart';

function App() {

  const [shoes, setShoes] = useState([])
  const [userEmail, setUserEmail] = useState(null)
  async function getShoes(){
    const q = collection(db, "shoelist")
    const querySnapshot = await getDocs(q);
    const list = []
querySnapshot.forEach((doc) => {
  list.push({ id: doc.id, ...doc.data() })
})
setShoes(list)
  }

  useEffect(() => {
    getShoes()

  }, []);
 
  return (
    <Context.Provider value={{shoes , userEmail, setUserEmail}}>
    <BrowserRouter>
    <Routes>
<Route path='/login' element={<Login/>}/>
<Route path='/signup' element={<SignUp/>}/>
<Route path='/' element={<MainPage/>}/>
<Route path='/view/:id' element={<View/>} />
<Route path='/cart' element={<Cart/>}/>
</Routes>
</BrowserRouter>
    </Context.Provider>
  )
}

export default App
