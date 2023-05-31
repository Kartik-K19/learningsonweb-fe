import React,{useState,useEffect,useContext} from "react";
import Title from "../components/Title";
import "../styles/course.css";
import Accordion from "../components/Accordian";
import Footer from "../components/Footer";
import { useParams,useNavigate, Link} from "react-router-dom";
import { Context } from "../Context/context";
import { API , BACKEND_URL, BEARER} from "../constant";
import { setToken,getToken } from "../helpers";
import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';


function Course() {
  const {id} = useParams();
  const {user,handleAddToCart} = useContext(Context);
  const navigate = useNavigate();
  
  const [course, setCourse] = useState({});
  const [lectures,setLectures] = useState({});



  const makeApiCall = async ()=>{
     await fetch(`${API}/courses/${id}?populate=*`)
    .then((response) => response.json())
    .then((data) => setCourse(data));
    

  }
  const makeDeepCall = async ()=>{
    await fetch(`${API}/courses/${id}?populate=videos.lectures.lecture_video`)
    .then((response) => response.json())
    .then((data) => setLectures(data));
  }
  
  useEffect(() => {
    makeApiCall();
    makeDeepCall()
    
    // console.log(userValues)
    
  }, [user]);
  // console.log(course)
  const rupee = "₹"

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
 
  const handleNavigate=(event)=>{
    if(user){
      handleSubmit(event);
    }
    else{
      navigate('/login');
    }
  }

 const handleContinue= ()=>{
  navigate(`/courses/${id}/lessons`)
 }
  // console.log(userValues)
  const handleSubmit = (event) => {
   
    event.preventDefault();
    
    // pass the form values to your onFinish function
    onFinish(data);
  }
  
    const data = {
      
        courses: { 
          connect: [id]
        }
      
    }
    const progress = {
      data:{
        progress: 0,
        course:{
          connect:[id]
        },
        users_permissions_user:{
            connect:[user?.id]
        }
      }
      
    }
  
  const headers = {
    "Authorization": `Bearer ${getToken()}`,
    'Content-Type': 'application/json'
    // Add any other headers you need
  };
  const onFinish = async (data) => {
    
    
      axios.put(`${API}/users/${user.id}`, data, { headers })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
  });

  fetch('${API}/progresses', {
    method: 'POST',
    headers: {
        "Authorization": `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(progress)
  })
  .then(response => response.json())
  
  .catch(error => console.error(error));


  navigate(`/courses/${id}/lessons`)
}

  return (
    <>
      <Title title={course.data?.attributes.Title} />

      <section>
        <div className="c-container">
          <div className="c-left">
            <div className="course-info-head">
              <img src={BACKEND_URL+ course.data?.attributes.Course_img.data?.attributes?.formats.medium.url} alt="img" />
              <div className="c-sum">
                <div className="c-sum-info">
                  <h4>Teacher</h4>
                  <p>{course.data?.attributes.instructor.data.attributes.Name}</p>
                </div>
                <div className="c-sum-info">
                  <h4>Category</h4>
                  <p>{course.data?.attributes.category.data?.attributes.title}</p>
                </div>
                <div className="c-sum-info">
                  <h4>Review</h4>
                  <p>2.5 *</p>
                </div>
              </div>
            </div>
            <div className="c-overview" id="overview">
              <h2>Overview</h2>

              <h4>Course Description</h4>
              <p>
                {course.data?.attributes.Course_description}
              </p>
            </div>
            <div id="curriculum">
            <Accordion data={lectures.data?.attributes?.videos}/>
            </div>
            <div className="instructor" id="instructor">
              <h2>Instructor</h2>
              <br />
              <div className="ins-card">
                <h4>{course.data?.attributes.instructor.data.attributes.Name}</h4>
                <p>{course.data?.attributes.instructor.data.attributes.designation}</p>
                <br />
                <p>
                 {course.data?.attributes.instructor.data?.attributes?.about}
                </p>
              </div>
            </div>
          </div>

          <div className="c-right">
            <div className="c-info-card">
              <h1>{course.data?.attributes.Price!==0? `${rupee}${" "}${course.data?.attributes.Price}`: "Free"}</h1>
              {user && user?.courses.findIndex((c) => c.id==id)!==-1? (
                  <button onClick={handleContinue}>Continue</button>
                ) : (
                  <div className="reg-cart">
                    <button onClick={() => { handleAddToCart(course.data, id) }}>Add To Cart</button>
                  </div>
              )}
              
              <div className="c-menu">
                <a href="#overview" >Overview</a>
                <hr />
                <a href="#curriculum">Curriculum</a>
                <hr />
                <a href="#instructor">Instructor</a>
                <hr />
                <a href="#instructor">Reviews</a>
              </div>
            </div>

            <div className="c-feature-card">
              <h1>Course Features</h1>
              <div className="feature-menu">
                <div className="f-menu-item">
                <p>Lectures</p>
                <p>{course.data?.attributes.Lectures}</p>
                </div>
                <hr />
                <div className="f-menu-item">
                <p>Duration</p>
                <p>{course.data?.attributes.Duration}</p>
                </div>
                <hr />
                <div className="f-menu-item">
                <p>Skill Level</p>
                <p>{course.data?.attributes.Skill_Level}</p>
                </div>
                <hr />
                <div className="f-menu-item">
                <p>Language</p>
                <p>{course.data?.attributes.Language}</p>
                </div>
              </div>
            </div>
            <div className="latest-course-section">
              <h3 className="filter-title">Latest Courses</h3>

              <div className="latest-c-container">
                <div className="latest-course">
                  <div className="latest-c-left">
                    <img src={require("../images/Courses/teach-online.jpg")} alt="img"/>
                  </div>
                  <div className="latest-c-right">
                    <h4>How to teach an online course</h4>
                    <p>Free</p>
                  </div>
                </div>
                <div className="latest-course">
                  <div className="latest-c-left">
                    <img src={require("../images/Courses/teach-online.jpg")} alt="img"/>
                  </div>
                  <div className="latest-c-right">
                    <h4>How to teach an online course</h4>
                    <p>Free</p>
                  </div>
                </div>
                <div className="latest-course">
                  <div className="latest-c-left">
                    <img src={require("../images/Courses/teach-online.jpg")} alt="img"/>
                  </div>
                  <div className="latest-c-right">
                    <h4>How to teach an online course</h4>
                    <p>Free</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Course;
