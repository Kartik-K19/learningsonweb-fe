import React,{useState,useEffect} from "react";
import Title from "../components/Title";
import Footer from "../components/Footer";
import "../styles/blog_info.css";
import CommentSection from "../components/CommentSection";
import { useParams, useNavigate } from "react-router-dom";
import { API,BACKEND_URL } from "../constant";

function Blog_info() {

  const {id} = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({});
  const[loading,setLoading] = useState(0);
  const[comments,setComments] = useState({});
  const makeApiCall = async ()=>{
    await fetch(`${API}/blogs/${id}?populate=*`)
   .then((response) => response.json())
   .then((data) => setBlog(data));
   

 }


 const handleChildStateChange = (newState) => {
  
  setLoading(newState);
};
 const makeDeepCall = async ()=>{
  await fetch(`${API}/blogs/${id}?populate=comment.users_permissions_user`)
  .then((response) => response.json())
  .then((data) => setComments(data));
}

 useEffect(()=>{
  makeApiCall();
  makeDeepCall();
  // console.log(loading)
 },[loading])

 


 const timestamp = blog.data?.attributes.publishedAt;

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
    <>
      <Title title={blog.data?.attributes.title} />

      <section>
        <div className="b-container">
          <div className="b-left">
            <div className="b-info-head">
              <img src={BACKEND_URL+blog.data?.attributes.image.data.attributes.formats.medium?.url} alt="img" />
              <div className="c-sum">
                <div className="b-sum-info">
                  <h4>Posted By</h4>
                  <p>{blog.data?.attributes.instructor.data?.attributes.Username}</p>
                </div>
                <div className="b-sum-info">
                  <h4>Categories</h4>
                  <p>{blog.data?.attributes.category.data.attributes.title}</p>
                </div>
                <div className="b-sum-info">
                  <h4>Date</h4>
                  <p>{day}/{monthIndex + 1}/{year}</p>
                </div>
                <div className="b-sum-info">
                  <h4>Comments</h4>
                  <p>{blog.data?.attributes.comment.length}</p>
                </div>
              </div>
            </div>
            <div className="b-overview">
              <p>
                {blog.data?.attributes.description}
              </p>
            </div>
            <h2>Comments</h2>
        <CommentSection comments={comments.data?.attributes.comment} loading={handleChildStateChange}/>
          </div>
          <div className="c-right">
            <aside className="b-body-right">
              <div className="latest-course-section">
                <h3 className="filter-title">Latest Courses</h3>

                <div className="latest-c-container">
                  <div className="latest-course">
                    <div className="latest-c-left">
                      <img
                        src={require("../images/Courses/teach-online.jpg")}
                      />
                    </div>
                    <div className="latest-c-right">
                      <h4>How to teach an online course</h4>
                      <p>Free</p>
                    </div>
                  </div>
                  <div className="latest-course">
                    <div className="latest-c-left">
                      <img
                        src={require("../images/Courses/teach-online.jpg")}
                      />
                    </div>
                    <div className="latest-c-right">
                      <h4>How to teach an online course</h4>
                      <p>Free</p>
                    </div>
                  </div>
                  <div className="latest-course">
                    <div className="latest-c-left">
                      <img
                        src={require("../images/Courses/teach-online.jpg")}
                      />
                    </div>
                    <div className="latest-c-right">
                      <h4>How to teach an online course</h4>
                      <p>Free</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="latest-course-section">
                <h3 className="filter-title">Latest Posts</h3>

                <div className="latest-c-container">
                  <div className="latest-course">
                    <div className="latest-c-left">
                      <img
                        src={require("../images/Courses/teach-online.jpg")}
                      />
                    </div>
                    <div className="latest-c-right">
                      <h4>How to teach an online course</h4>
                    </div>
                  </div>
                  <div className="latest-course">
                    <div className="latest-c-left">
                      <img
                        src={require("../images/Courses/teach-online.jpg")}
                      />
                    </div>
                    <div className="latest-c-right">
                      <h4>How to teach an online course</h4>
                    </div>
                  </div>
                  <div className="latest-course">
                    <div className="latest-c-left">
                      <img
                        src={require("../images/Courses/teach-online.jpg")}
                      />
                    </div>
                    <div className="latest-c-right">
                      <h4>How to teach an online course</h4>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        
        
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Blog_info;
