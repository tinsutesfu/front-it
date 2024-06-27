import React, { useEffect } from 'react';
import "../styles/pages/verify.css";
import axios from "../api/axios";
import { useNavigate, useSearchParams } from 'react-router-dom'

export const Verify = () => {
    const [searchparams,setsearchparams]=useSearchParams();
    const success=searchparams.get('success');
    const orderId=searchparams.get('orderId');
    const navigate=useNavigate()

    console.log(success,orderId)

    const verifypayment=async()=>{
        const response=await axios.post('/api/place/verify',{success,orderId});
        if (response.data.success) {
            navigate('/tracking')
        } else {
            navigate('/')
        }
    }

    useEffect(()=>{
        verifypayment()
    },[])
  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

