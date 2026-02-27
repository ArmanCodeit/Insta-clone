import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login,register } from "../services/auth.api.js";

export function useAuth(){
    
    const context = useContext(AuthContext);

    const { User,setUser,loading,setloading } = context;

    // handleLogin
    const handleLogin = async (username,password) =>{
        setloading(true);
        try{
            const response = await login(username,password)
            setUser(response.user);
        } 
        catch(err){
            console.log(err)
        } finally{
            setloading(false);
        }
    }

    // handleRegister
    const handleRegister = async (username,email,password) =>{
        setloading(true);
        try{
            const response = await register(username,email,password)
            setUser(response.user);
        } 
        catch(err){
            console.log(err)
        } finally{
            setloading(false);
        }
    }


    return {
        User,loading,handleLogin,handleRegister
    }

}