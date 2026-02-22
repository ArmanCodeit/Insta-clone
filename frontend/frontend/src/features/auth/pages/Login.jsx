import React,{useState} from 'react'
import"../style/form.scss"
import { Link } from 'react-router'
import axios from 'axios'

const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e){
    e.preventDefault();

    axios.post("http://localhost:3000/api/auth/login",{
      username,
      password
    },{
      withCredentials: true
    })
    .then((res)=>{
      console.log(res.data)
    })
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={(e)=>{setUsername(e.target.value)}} name='username' placeholder='enter username'/>
          <input type="password" onChange={(e)=>{setPassword(e.target.value)}} name='password' placeholder='enter password'/>
          <button type='submit'>Submit</button>
        </form>

        <p>Don't have an account ? <Link className='toggleAuthForm' to='/register'>Register</Link></p>
      </div>
    </main>
  )
}

export default Login
 