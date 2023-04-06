import {GoogleButton} from 'react-google-button';
import { UserAuth } from './AuthContext';
import {useHistory,useNavigate} from 'react-router-dom';


import React, { useEffect ,useState} from 'react'
import App from '../App';
import './Login.css'

function SignIn() {
    const {googleSignIn,user}=UserAuth();
    
    const [main,setmain]=useState(false);

    const handleGoogle=async()=>{
        try {
            await  googleSignIn()
           
                
           
        } catch (error) {
            console.log(error);
        }
    }
  /* useEffect(()=>{
       if(user){
          navigate('/home');
          console.log(user);
       }else{
        navigate('/')
       }
   },[user])
*/

  return (
    <div>
       {!user?  <div className='Login-Container'><h1>Sign in</h1><div>
              <GoogleButton onClick={handleGoogle} />
          </div></div>:<App/>}
    </div>
  )
}

export default SignIn