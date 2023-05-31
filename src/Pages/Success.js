import React,{useState,useEffect,useContext}from 'react'
import { Context } from '../Context/context'
import { getToken } from '../helpers'
import axios from 'axios'
import { useNavigate,useLocation } from 'react-router-dom'
import { API } from '../constant'



const Success = () => {

  const{cartItems,removeFromCart,user} = useContext(Context)
  const [ids, setIds] = useState([]);
  
 const navigate = useNavigate();

 const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const success = queryParams.get('success') === 'true';


  const handleSubmit = () => {
   
    
        cartItems?.forEach(async (item) => {
          const data = {
            courses: {
              connect: [item.id]
            }
          };
    
          const progress = {
            data: {
              progress: 0,
              course: {
                connect: [item.id]
              },
              users_permissions_user: {
                connect: [user.id]
              }
            }
          };
          console.log(item.id,user.id)
          await onFinish(data, progress);
          removeFromCart(item.id)
        });
      
     navigate('/profile')
  }
  const headers = {
    "Authorization": `Bearer ${getToken()}`,
    'Content-Type': 'application/json'
    // Add any other headers you need
  };
  
    
    
    const onFinish = async (data, progress) => {
        try {
          // Make the PUT request to update user data
          await axios.put(`${API}/users/${user.id}`, data, { headers });
      
          // Make the POST request to create progress records
          await axios.post(`${API}/progresses`, progress, { headers });
      
          // Handle success or show a success message to the user
          console.log('Cart items added successfully!');
        } catch (error) {
          // Handle the error or show an error message to the user
          console.error('Error adding cart items:', error);
        }
      };


  



useEffect(() => {
  
}, [user,cartItems])


  return (
    <>
    <div className='success-page' style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",margin:"200px"}}>
        {success ? (
            <>
            <h1>Payment Successful</h1>
            <button style={{padding: "8px 16px",
              backgroundColor: "#ffb700",
              border: "none",
              color: "#fff",
              fontSize: "14px",
              textDecoration: "none",
              bordeRadius: "4px",
              transition: "background-color 0.3s ease",cursor:"pointer",marginTop:5}}
             onClick={handleSubmit}
              
              >Go to Courses</button>
            </>
        ) : (
            <>
            <h1>Payment Unsuccessful</h1>
            <p>Sorry, the payment was unsuccessful. Please try again.</p>
            <button style={{padding: "8px 16px",
              backgroundColor: "#ffb700",
              border: "none",
              color: "#fff",
              fontSize: "14px",
              textDecoration: "none",
              bordeRadius: "4px",
              transition: "background-color 0.3s ease",cursor:"pointer",marginTop:5}}
              onClick={()=>navigate('/cart')}
              >Back to Cart</button>
            </>
        )}
        </div>
    </>
  )
}

export default Success