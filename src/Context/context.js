import { createContext, useContext, useState,useEffect } from "react";
import { getToken } from "../helpers";
import { API,BEARER } from "../constant";
import { useParams,useLocation,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Context = createContext({
    user: undefined,
    isLoading: false,
    setUser: () => {},
  });

const AppContext = ({children}) =>{
    const [userData,setUserData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState();
    const [number, setnumber] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartSubTotal,setCartSubTotal] = useState(0);
    const [cartId, setCartId] = useState(-1)
   
    const location = useLocation();
    const userId = userData?.id;
    const navigate = useNavigate();
    const authToken = getToken();
    useEffect(()=>{},[cartItems])
    useEffect(()=>{},[cartId])
    useEffect(()=>{
        window.scrollTo(0,0)
    },[location])

    const handleAddToCart = async (course,id) =>{

      if(authToken){
        
        let items = [...cartItems]
        let index = items.findIndex(c => c.id === course?.id)
        if(index!==-1){
          toast.error('Course already exists in cart', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
        else{
            items=[...items,course]
            
            const newCart= {
                data:{
                    courses: { 
                        connect: [id]
                    }
                }
            }
            try{
                await fetch(`${API}/carts/${cartId}?populate=*`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${getToken()}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCart)})
            
            .then(response => response.json())
            .then(data => {
              setCartItems(data.data?.attributes.courses.data)
              toast.success('Course added to Cart', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            })
            .catch(error =>  toast.error('Some Error Occured', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              }));
            
            } catch (error) {
              toast.error('Some Error Occured', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
              
            }
        }
      }
      else{
        navigate('/login')
      }
        
    }
    const removeFromCart = async (id) => {
        let items = [...cartItems]
        items = items.filter(c=> c.id !== id)
        setCartItems(items);
        
            const newCart= {
                data:{
                    courses: { 
                        disconnect: [id]
                    }
                }
            }
            try{
                await fetch(`${API}/carts/${cartId}?populate=*`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${getToken()}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCart)})
            
            .then(response => response.json())
            .then(data => {
              setCartItems(data.data?.attributes.courses.data)
              toast.success('Removed from Cart', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            })
            .catch(error => console.error(error));
            
            } catch (error) {
              toast.error('Some Error Occured', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
              
            }
        
    }

    

   
    const fetchCartItems = async (token)=>{
        try {
            const response = await fetch(`${API}/carts?populate=*&[filters][users_permissions_user][id]=${userId}`, {
              headers: { Authorization: `${BEARER} ${token}` },
            });
            
            const data = await response.json();
            
      
            setCartItems(data.data[0]?.attributes.courses?.data);
            setCartId(data.data[0]?.id)
          } catch (error) {
            console.error(error);
            
          }
        };
    
      const fetchLoggedInUser = async (token) => {
        setIsLoading(true);
        try {
          const response = await fetch(`${API}/users/me?populate=*`, {
            headers: { Authorization: `${BEARER} ${token}` },
          });
          const data = await response.json();
    
          setUserData(data);
        } catch (error) {
          console.error(error);
          
        } finally {
          setIsLoading(false);
        }
      };
    
      const handleUser = (user) => {
        setUserData(user);
      };

      const makeUserCart = async (token,id)=>{
        if(token){
        const newCart= {
            data:{
                users_permissions_user:{
                    connect:[id]
                }
            }
        }

        try{
            await fetch(`${API}/carts`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCart)})
        
        .then(response => response.json())
        } catch (error) {
          console.error(error);
          
        }
    }

    }

      
    
      useEffect( () => {
        if (authToken) {
          fetchLoggedInUser(authToken);
        }
      }, [authToken]);
      useEffect(()=>{
        if(authToken){
          
          fetchCartItems(authToken);
          
        }
    
      },[userData,authToken])
     
    
    return(
        <Context.Provider value={
            {
                selectedVideo,
                setSelectedVideo,
                number,
                setnumber,
                user: userData, setUser: handleUser, isLoading,
                cartItems,
                setCartItems,
                cartCount,
                setCartCount,
                cartSubTotal,
                setCartSubTotal,
                handleAddToCart,
                removeFromCart,
                cartId,
                setCartId,
                makeUserCart,
            }

        }>
            {children}
        </Context.Provider>
    )
}

export default AppContext;