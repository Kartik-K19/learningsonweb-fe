import React,{useContext, useEffect} from 'react'
import Title from '../components/Title'
import Footer from '../components/Footer'
import { useParams,useNavigate} from "react-router-dom";
import { Context } from "../Context/context";
import '../styles/cart.css'
import { getToken } from '../helpers';
import { API,AUTH_TOKEN,BACKEND_URL,BEARER } from '../constant';
import { REACT_APP_STRIPE_PUBLISHABLE_KEY } from '../constant';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

function Cart() {
  const {user,removeFromCart,cartItems} = useContext(Context);
  useEffect(()=>{

  },[cartItems,user])

  console.log(cartItems)
  const authToken = getToken()
  const makePaymentRequest = axios.create({
    baseURL:API,
    headers:{
      Authorization: "Bearer "+ authToken,
    },
  })

  
 const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLISHABLE_KEY)

 const handlePayment = async()=>{
      try {
        const stripe = await stripePromise;
        const res = await makePaymentRequest.post("/orders",{
          courses: cartItems,
        })
        console.log(res)
        await stripe.redirectToCheckout({
          sessionId:res.data.stripeSession.id
          
        })
        
      } catch (error) {
        console.log(error)
      }

 }



 let totalPrice = 0
  return (
    <>
        <Title title="Cart"/>

        <section  className = "cart" style={{height:"auto"}}>
          {!cartItems || cartItems?.length===0?(<h1>Your Cart is Empty</h1>):
          
          
          ( 
          
          <table>
                <tbody>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Remove From Cart</th>
                        
                    </tr>
                   
                    {cartItems?.map((item,index)=>{
                    
                   
                    totalPrice+=item.attributes.Price
                    return (

                        <tr key={index}>
                         <td>{item?.attributes.Title}</td>
                         <td>{item?.attributes.Price ==0?("Free"):(item.attributes.Price) }</td>
                         <td><button style={{float:"right",padding:"5px 10px",backgroundColor:"red",color:"white",border:"1px solid",cursor:"pointer"}} onClick={()=>removeFromCart(item.id)}>Delete</button></td>
                        </tr>
                        
                    )})}
                    
                    <tr>
                      <td>Total</td>
                      
                      <td>₹{totalPrice}</td>
                    </tr>
                    <tr><td><button className='payment' onClick={handlePayment}>Proceed to Checkout</button></td></tr>
                   

                    

                </tbody>
                

            </table>)}
            
            
            
          
            

        </section>

        <Footer/>
    </>
  )
}

export default Cart