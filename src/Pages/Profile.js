import React,{useState,useEffect,useContext} from 'react'
import Title from '../components/Title'
import Footer from '../components/Footer'
import '../styles/profile.css'
import { Context } from '../Context/context'
import { getToken } from '../helpers'
import { Navigate, useNavigate } from 'react-router-dom'
import { API } from '../constant'

function Profile() {
    const {user} = useContext(Context);
    // console.log(user?.courses)
    const userId = user?.id
    const navigate = useNavigate();
    const [progress, setprogress] = useState({})
    const progressCall = async ()=>{
        try {
            const response = await fetch(`${API}/progresses?populate=*&[filters][users_permissions_user][id]=${userId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
              },
            });
            const data = await response.json();
            setprogress(data);
          } catch (error) {
            console.error(error);
          }
          
        }

        const handleNavigate = (id)=>{
            navigate(`/courses/${id}/lessons`)
        }
    

    useEffect(()=>{
        progressCall();
        
    },[user])
    useEffect(()=>{

    },[progress])

    let activeCourses = 0;
    let completedCourses = 0;
    
    progress.data?.map((item)=>{
        if(item.attributes.progress === 100){
            completedCourses+=1;
        }
        else{
            activeCourses+=1
        }
    })

  return (
    <>
        <Title title="Profile"/>

        <section>
            <div className='profile'>
                <div className='profile-left'>
                    <div className='left-info'>
                        <div className='info-head'>
                            <img src={require('../images/prof_pic.jpg')} alt="img" />
                            <h3>{user?.username}</h3>
                        </div>
                        <button>Courses</button>
                        <button>Settings</button>
                        <button>Subscription</button>
                        <button>Logout</button>
                        
                    </div>

                </div>
                <div className='profile-right'>
                    <div className='right-info-head'>
                        <div className='profile-head-info'>
                            <h2>{user?.courses?.length}</h2>
                            <p>Enrolled Courses</p>
                        </div>
                        <div className='profile-head-info'>
                            <h2>{activeCourses}</h2>
                            <p>Active Courses</p>
                        </div>
                        <div className='profile-head-info'>
                            <h2>{completedCourses}</h2>
                            <p>Completed Courses</p>
                        </div>

                    </div>
                    <hr/>
                    <div className='right-info-body'>
                            <div className='course-status'>
                                <div>All</div>
                                
                            </div>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Progress</th>
                                <th>Enrolled Date</th>
                                
                            </tr>
                            {progress?.data?.map((item,index)=>{
                            
                             const date = new Date(item.attributes.publishedAt)
                             const year = date.getFullYear();
                            const monthIndex = date.getMonth();
                            // Months are zero-indexed, so we add 1
                            const day = date.getDate();
                            return (
                                <tr key={index}>
                                 <td>{item.attributes.course.data.attributes.Title}</td>
                                 <td>{item.attributes.progress}%</td>
                                 <td>{day}/{monthIndex+1}/{year}</td>
                                 <td><button onClick={()=>handleNavigate(item.attributes.course.data.id)} style={{border:"none",padding:"5px 10px",cursor:"pointer",backgroundColor:"#fab606",borderRadius:2}}>continue</button></td>
                                </tr>
                            )})}
                           
 
 
  
                        </tbody>
    
                    </table>
                </div>
            </div>
        </section>
        <Footer/>
    </>
  )
}

export default Profile