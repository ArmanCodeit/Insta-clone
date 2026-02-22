import React, { useState } from 'react'
import "../style/form.scss"
import { Link } from 'react-router'
import axios from "axios";

const Register = () => {

  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    axios.post("http://localhost:3000/api/auth/register",{
      username,
      email,
      password
    },{
      withCredentials: true
    })
    .then((res)=>{
      console.log(res)
    })
  }

  return (
    <div>
      <main>
        <div className="form-container">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" onChange={(e)=>{setUsername(e.target.value)}} name='username' placeholder='enter username'/>
            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} name='email' placeholder='enter email'/>
            <input type="password" onChange={(e)=>{setPassword(e.target.value)}} name='password' placeholder='enter password'/>
            <button type='submit'>Submit</button>
          </form>

          <p>Already have an account ?<Link className='toggleAuthForm' to='/login'>Login</Link></p>
        </div>
      </main>
    </div>
  )
}

export default Register