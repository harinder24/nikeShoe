import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Context from './context';
export default function SignUp() {
  const { setUserEmail } = useContext(Context);
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  async function handleSubmit(event){
    event.preventDefault();
    const userEmail = document.getElementById("userEmail");
    const userPassword = document.getElementById("userPassword");
   
    if (!email) {
      setEmailError("Please enter your email address.");
      userEmail.style.borderColor = "#cf0007";

      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      userEmail.style.borderColor = "#cf0007";
      return;
    } else {
      userEmail.style.borderColor = "#808080";

      setEmailError("");
    }

    if (!password) {
      setPasswordError("Please enter your password.");
      userPassword.style.borderColor = "#cf0007";

      return;
    } else if (password.length < 6) {
      setPasswordError("Please enter a password with at least 6 characters.");
      userPassword.style.borderColor = "#cf0007";

      return;
    } else {

      userPassword.style.borderColor = "#808080";
      setPasswordError("");
    }
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUserEmail(email)
    navigate('/')
      })
      .catch((error) => {
        setPasswordError("error");
      });
  


  }
  return (
    
    <>
     <section className=' w-full min-h-screen flex justify-center '>
        <div className='w-[486px] mt-10'>
            <div className='w-full px-2'>
                <div className='flex items-center'>
                    <img src="https://th.bing.com/th/id/OIP.IGAtQ8yZOBHlpr0Yhq9PMwHaC6?w=318&h=138&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" srcset="" width="50px" />
                    <img src="https://logolook.net/wp-content/uploads/2021/07/Air-Jordan-Logo.svg" alt="" srcset="" width="70px" />
                </div>
            </div >
            <div className='flex flex-col w-full px-2 gap-4 mt-4'>
               
                <input type="text" id="userEmail" placeholder='Email' className=' bg-transparent w-full py-2 px-2 border-[1px] border-black  rounded-[6px]' autoComplete='off'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                
                />
                {emailError && <div className="FormErrorMessage">{emailError}</div>}
            
                <input type="text" placeholder='Password' className=' bg-transparent w-full py-2 px-2 border-[1px] border-black  rounded-[6px]' autoComplete='off'
                minLength={6}
                id="userPassword"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                />
                {passwordError && (
              <div className="FormErrorMessage">{passwordError}</div>
            )}
                <button onClick={handleSubmit} className=' bg-gray-300 p-2 rounded-[6px] hover:bg-gray-400'>Log In</button>
            </div>

            <div className='pt-4 px-2'>
             Don't Have an account <Link to='/signup' className='  text-blue-500'>Sign up</Link>
            </div>
            
            
        </div>
     </section>
    </>
  )
}