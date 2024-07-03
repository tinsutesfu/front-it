import { useContext, useEffect, useState } from 'react'
import '../styles/pages/tracking.css'
import { datacontext } from '../context/Context';
import axios from "../api/axios";
import Orders from './Orders';

const Tracking = () => {
  const {token}=useContext(datacontext)
  const [data,setdata]=useState([]);

  const fetchorder=async()=>{
const response=await axios.post('/api/place/userorder',{},{headers:{token}});
setdata(response.data.data);
console.log(response.data)
  }

  useEffect(()=>{
    if (token) {
      fetchorder()
    }
  },[token])
  return (
    <>
     

    <div className="my-orders">
      
        <h2>
          my orders</h2>
        

      

        <div className="container">
         {data.map((order,index)=>{
          return(
            <div key={index} className="myorders-order">
<img src='images/lap.del.jpg'/>
<p>{order.items.map((item,index)=>{
  if (index===order.items.length-1) {
    return item.name +'x'+item.quantity
  } else {
    return item.name +'x'+item.quantity+','
  }
})}</p>
<p>{(order.amount).toFixed(2)}</p>
<p>items:{order.items.length}</p>
<p><span>&#x25cf;</span>deliveryID:{order.deliveryId}</p>
<p><span>&#x25cf;</span>{order.items.map((item)=>{
  return item.deliveryOptionId;
})}</p>
<p><span>&#x25cf;</span>{order.status}</p>
<button onClick={fetchorder}>track order</button>
            </div>
          )
         })}
        </div>

      

        
      </div>
    
    </>
  )
}

export default Tracking
