import React ,{useState,useEffect}from 'react'
import { useNavigate,Navigate } from 'react-router-dom';
import { UserAuth } from './AuthContext';
function ProtectedRoute({children}) {
    let {user} =UserAuth();
   
      useEffect(()=>{
        if(!user){
            <Navigate to="/"/>

        }
    },[user])
   
    
  return children;
 
};

export default ProtectedRoute