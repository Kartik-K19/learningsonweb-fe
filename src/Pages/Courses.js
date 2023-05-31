import React, { useEffect, useState } from "react";
import "../styles/courses.css";
import Footer from "../components/Footer";
import { Link, useParams, useNavigate } from "react-router-dom";
import { API,BACKEND_URL } from "../constant";

function Courses() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(-1);
 


  const makeApiCall = async ()=>{
     await fetch(`${API}/courses?populate=*&filters[Title][$contains]=${searchQuery}`)
    .then((response) => response.json())
    .then((data) => setCourses(data.data));
    
  }



  const filterCall = async ()=>{
    if(selectedCategory!==0 && selectedInstructor!==0 && selectedPrice===0){
    await fetch(`${API}/courses?populate=*&[filters][category][id]=${selectedCategory}&[filters][instructor][id]=${selectedInstructor}&[filters][Price][$eq]=${selectedPrice}`)
   .then((response) => response.json())
   .then((data) => setCourses(data.data));
    }


    else if(selectedCategory!==0 && selectedInstructor!==0 && selectedPrice>0){
      await fetch(`${API}/courses?populate=*&[filters][category][id]=${selectedCategory}&[filters][instructor][id]=${selectedInstructor}&[filters][Price][$gt]=${selectedPrice}`)
     .then((response) => response.json())
     .then((data) => setCourses(data.data));
    }


    else if(selectedCategory!==0 && selectedInstructor!==0 && selectedPrice<0){
      await fetch(`${API}/courses?populate=*&[filters][category][id]=${selectedCategory}&[filters][instructor][id]=${selectedInstructor}`)
     .then((response) => response.json())
     .then((data) => setCourses(data.data));
    }


    else if(selectedCategory===0 && selectedInstructor!==0 && selectedPrice === 0){
        await fetch(`${API}/courses?populate=*&[filters][instructor][id]=${selectedInstructor}&[filters][Price][$eq]=${selectedPrice}`)
       .then((response) => response.json())
       .then((data) => setCourses(data.data));
    }

    else if(selectedCategory===0 && selectedInstructor!==0 && selectedPrice > 0){
          await fetch(`${API}/courses?populate=*&[filters][instructor][id]=${selectedInstructor}&[filters][Price][$gt]=${selectedPrice}`)
         .then((response) => response.json())
         .then((data) => setCourses(data.data));
    }
    else if(selectedCategory===0 && selectedInstructor!==0 && selectedPrice < 0){
        await fetch(`${API}/courses?populate=*&[filters][instructor][id]=${selectedInstructor}`)
       .then((response) => response.json())
       .then((data) => setCourses(data.data));
    }
    else if(selectedCategory!==0 && selectedInstructor===0 && selectedPrice === 0){
      await fetch(`${API}/courses?populate=*&[filters][category][id]=${selectedCategory}&[filters][Price][$eq]=${selectedPrice}`)
     .then((response) => response.json())
     .then((data) => setCourses(data.data));
    }
    else if(selectedCategory!==0 && selectedInstructor===0 && selectedPrice > 0){
      await fetch(`${API}/courses?populate=*&[filters][category][id]=${selectedCategory}&[filters][Price][$gt]=${selectedPrice}`)
     .then((response) => response.json())
     .then((data) => setCourses(data.data));
    }
    else if(selectedCategory!==0 && selectedInstructor===0 && selectedPrice < 0){
      await fetch(`${API}/courses?populate=*&[filters][category][id]=${selectedCategory}`)
     .then((response) => response.json())
     .then((data) => setCourses(data.data));
    }
    else if(selectedCategory===0 && selectedInstructor===0 && selectedPrice === 0){
      await fetch(`${API}/courses?populate=*&[filters][Price][$eq]=${selectedPrice}`)
     .then((response) => response.json())
     .then((data) => setCourses(data.data));
    }
    else if(selectedCategory===0 && selectedInstructor===0 && selectedPrice > 0){
      await fetch(`${API}/courses?populate=*&[filters][Price][$gt]=${selectedPrice}`)
     .then((response) => response.json())
     .then((data) => setCourses(data.data));
    }
    


    else{
      await fetch(`${API}/courses?populate=*`)
      .then((response) => response.json())
      .then((data) => setCourses(data.data));
       
    }
   
 }


  
  const makeCategoryCall = async ()=>{
    await fetch(`${API}/categories?populate=*`)
   .then((response) => response.json())
   .then((data) => setCategory(data.data));
   
 }

 const makeInstructorCall = async() =>{
  await fetch(`${API}/instructors?populate=*`)
  .then((response) => response.json())
  .then((data) => setInstructors(data.data));
 }

 const onChange = (event)=>{
  setSearchQuery(event.target.value)

 }
  useEffect(() => {
    makeApiCall();
  }, [searchQuery]);

  useEffect(() => {
    makeCategoryCall();
    makeInstructorCall();
  }, []);

  useEffect(() => {
    filterCall();
  }, [selectedCategory,selectedInstructor,selectedPrice]);

  const rupee = "₹";
   
  // console.log(courses)
  return (
    <>
      <section className="courses-class">
        <div className="courses-container">
          <div className="courses-left">
            <h1>Courses</h1>
          </div>
        </div>
      </section>

      <section className="courses-body">
        <div className="c-body-container">
          <div className="c-body-left">
            <div className="c-body-left-head">
              <div className="head-left">
                <img src={require("../images/Courses/list.png")} alt="img"/>
                <p>Showing {courses?.length} results</p>
              </div>
              <div className="head-right">
                
                <form className="nosubmit">
                  <input
                    className="nosubmit1"
                    type="search"
                    placeholder="Search our courses"
                    value={searchQuery}
                    onChange={onChange}
                  />
                </form>
              </div>
            </div>
            <div className="body-left-content">
              {courses && courses.length > 0 && courses.map((item,index) => (
                
                  <div className="course-info" key={item.id}>
                    <div className="course-info-left">
                      <img
                        src={BACKEND_URL+ item.attributes.Course_img.data?.attributes?.formats.thumbnail.url}
                        alt="online" onClick={()=>navigate(`/courses/${item.id}`)}
                      />
                    </div>
                    <div className="course-info-right">
                      <h1 onClick={()=>navigate(`/courses/${item.id}`)}>{item.attributes.Title}</h1>
                      <p>{item.attributes.Course_description}</p>
                      <div className="course-info-bottom">
                        <img src={require("../images/Courses/user.png")} alt="user"/>
                        <p>{item.attributes.instructor.data.attributes.Name}</p>
                        <p>Lectures {item.attributes.Lectures}</p>
                        <p>{item.attributes.Students_enrolled}</p>
                        <p>{item.attributes.Price!==0? `${rupee}${" "}${item.attributes.Price}`: "Free"}</p>
                        
                      </div>
                    </div>

                    <hr />
                  </div>
              ))}
            </div>
          </div>
          <aside className="c-body-right">
            <div className="course-categories">
            <form>
                <h3 className="filter-title">Course Categories</h3>
                <div className="checkbox-container">
                <div key="all">
                  <label>
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={selectedCategory === 0}
                      onChange={() => setSelectedCategory(0)}
                    />{" "}
                    All Categories
                  </label>
                </div>
                  {category &&
                    category.length > 0 &&
                    category.map((item) => (
                      <div key={item.id}>
                        <label>
                          <input
                            type="radio"
                            name="category"
                            value={item.id}
                            checked={selectedCategory === item.id}
                            onChange={() => setSelectedCategory(item.id)}
                          />{" "}
                          {item.attributes.title}
                        </label>
                      </div>
                    ))}
                </div>
              </form>
              <form >
                <h3 className="filter-title">Instructors</h3>
                <div className="checkbox-container">
                <div key="all">
                  <label>
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={selectedInstructor === 0}
                      onChange={() => setSelectedInstructor(0)}
                    />{" "}
                    All Instructors
                  </label>
                </div>
                {instructors &&
                  instructors.length > 0 &&
                  instructors.map((item) => (
                    <div key={item.id}>
                      <label>
                        <input
                          type="radio"
                          name="instructor"
                          value={item.id}
                          checked={selectedInstructor === item.id}
                          onChange={() => setSelectedInstructor(item.id)}
                        />{" "}
                        {item.attributes.Name} ({item.attributes.courses.data.length})
                      </label>
                    </div>
                  ))}
                </div>

                <h3 className="filter-title">Price</h3>
                <div className="checkbox-container">
                  <label htmlFor="all">
                    <input
                      type="radio"
                      id="all"
                      name="price"
                      value="All"
                      checked={selectedPrice === -1}
                      onChange={() => setSelectedPrice(-1)}
                    />
                    All
                  </label>

                  <label htmlFor="free">
                    <input
                      type="radio"
                      id="free"
                      name="price"
                      value="Free"
                      checked={selectedPrice === 0}
                      onChange={() => setSelectedPrice(0)}
                    />
                    Free
                  </label>

                  <label htmlFor="paid">
                    <input
                      type="radio"
                      id="paid"
                      name="price"
                      value="Paid"
                      checked={selectedPrice === 1}
                      onChange={() => setSelectedPrice(1)}
                    />
                    Paid
                  </label>
                </div>
                <button>Filter Results</button>
              </form>
            </div>
            <div className="latest-course-section">
              <h3 className="filter-title">Latest Courses</h3>

              <div className="latest-c-container">
                <div className="latest-course">
                  <div className="latest-c-left">
                    <img src={require("../images/Courses/teach-online.jpg")}  alt="img"/>
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
          </aside>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Courses;
