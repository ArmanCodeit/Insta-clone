import React,{useState} from 'react'
import"../style/form.scss"
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'


const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { User,loading,handleLogin } = useAuth();
  const navigate = useNavigate();




  if(loading){
    return(
      <h1>loading.....</h1>
    )
  }


  async function handleSubmit(e){
    e.preventDefault();

    await handleLogin(username,password)

    navigate("/");

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
 