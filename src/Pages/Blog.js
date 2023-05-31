import React,{useState,useEffect} from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
import '../styles/blog.css'
import Footer from '../components/Footer'
import Title from '../components/Title'
import { API, BACKEND_URL } from '../constant'


function Blog() {

    const {id} = useParams();
    const navigate = useNavigate();

    const [blogs, setBlogs] = useState([]);
  
  
    const makeApiCall = async ()=>{
       await fetch(`${API}/blogs?populate=*`)
      .then((response) => response.json())
      .then((data) => setBlogs(data.data));
      
    }
    
    useEffect(() => {
      makeApiCall();
      
    }, []);
  return (
    
    <>
       <Title title="Blogs"/>

      <section className='blog-body'>
            <div className='b-body-container'>
                <div className='b-body-left'>
                    
                    <div className='blog-left-content'>
                        {blogs && blogs.length > 0 && blogs.map((item,index)=>{
                        
                        const timestamp = item.attributes.publishedAt;

                            const dateObj = new Date(timestamp);
                            const monthNames = [
                                "January",
                                "February",
                                "March",
                                "April",
                                "May",
                                "June",
                                "July",
                                "August",
                                "September",
                                "October",
                                "November",
                                "December"
                              ];

                            // Get the date components
                            const year = dateObj.getFullYear();
                            const monthIndex = dateObj.getMonth();
                            const monthName = monthNames[monthIndex]; // Months are zero-indexed, so we add 1
                            const day = dateObj.getDate();
                        
                        return (
                            <div className='blog-info' key={item.id}>
                            <div className='blog-info-top'>
                                <img src={BACKEND_URL+ item.attributes.image.data?.attributes?.formats.medium?.url}
                                onClick={()=>navigate(`/blogs/${item.id}`)} alt="online" />
                            </div>
                            <div className='blog-info-bottom'>
                            <div className='blog-info-head'>
                                <div className='b-info-head-left'>
                                  
                                    <h1>{day}</h1>
                                    <p>{monthName}</p>
                                    
                                </div>
                                <div className='b-info-center'>
                                <h1 onClick={()=>navigate(`/blogs/${item.id}`)}>{item.attributes.title}</h1>
                                <div className='b-info-center-content'>
                                    <div> 
                                        <p>Posted By</p>
                                        <p>{item?.attributes.instructor.data?.attributes.Username}</p>
                                    </div>
                                    <div>
                                        <p>Categories</p>
                                        <p>{item?.attributes.category.data?.attributes.title}</p>
                                    </div>
                                    <div>
                                        <p>Date</p>
                                        <p>{day}/{monthIndex+1}/{year}</p>
                                    </div>
                                    <div>
                                        <p>Comments</p>
                                        <p>{item.attributes.comment.length}</p>
                                    </div>

                                </div>
                               
                                </div>
                          
                            </div>
                                <div className='b-info-content'>
                                <p>{item.attributes.description}</p>
                                <button onClick={()=>{navigate(`/blogs/${item.id}`)}}>Read More</button>
                                </div>
                            </div>
                            <hr/>
                        </div>

                        );

                                })}
                        
                       
                    </div>
                </div>
                <aside className='c-body-right'>
                   
                    <div className='latest-course-section'>

                        <h3 className='filter-title'>Latest Courses</h3>

                        <div className='latest-c-container'>
                            <div className='latest-course'>
                                <div className='latest-c-left'>
                                    <img src={require('../images/Courses/teach-online.jpg')}/>
                                </div>
                                <div className='latest-c-right'>
                                    <h4>How to teach an online course</h4>
                                    <p>Free</p>
                                </div>

                            </div>
                            <div className='latest-course'>
                                <div className='latest-c-left'>
                                    <img src={require('../images/Courses/teach-online.jpg')}/>
                                </div>
                                <div className='latest-c-right'>
                                    <h4>How to teach an online course</h4>
                                    <p>Free</p>
                                </div>

                            </div>
                            <div className='latest-course'>
                                <div className='latest-c-left'>
                                    <img src={require('../images/Courses/teach-online.jpg')}/>
                                </div>
                                <div className='latest-c-right'>
                                    <h4>How to teach an online course</h4>
                                    <p>Free</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='latest-course-section'>

                        <h3 className='filter-title'>Latest Posts</h3>

                        <div className='latest-c-container'>
                            <div className='latest-course'>
                                <div className='latest-c-left'>
                                    <img src={require('../images/Courses/teach-online.jpg')}/>
                                </div>
                                <div className='latest-c-right'>
                                    <h4>How to teach an online course</h4>
                                    
                                </div>

                            </div>
                            <div className='latest-course'>
                                <div className='latest-c-left'>
                                    <img src={require('../images/Courses/teach-online.jpg')}/>
                                </div>
                                <div className='latest-c-right'>
                                    <h4>How to teach an online course</h4>
                                    
                                </div>

                            </div>
                            <div className='latest-course'>
                                <div className='latest-c-left'>
                                    <img src={require('../images/Courses/teach-online.jpg')}/>
                                </div>
                                <div className='latest-c-right'>
                                    <h4>How to teach an online course</h4>
                                    
                                </div>

                            </div>
                        </div>
                    </div>
                    
                </aside>

            </div>


        </section>
        <Footer/>

    </>
  )
}

export default Blog