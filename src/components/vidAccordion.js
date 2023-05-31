import React, { useState,useContext,useEffect } from "react";

import { Context } from "../Context/context";
import "./Accordian.css";
import { useParams } from "react-router-dom";
import { getToken } from "../helpers";
import { API,BACKEND_URL } from "../constant";


const VidAccordion = (props) => {
    const {id} = useParams();

    
    const {setSelectedVideo,number,setNumber,user} = useContext(Context);
    const userId = user?.id

    
   const [completedData, setCompletedData]= useState({});
   

    // const progressId = props?.progressId
    // console.log(progressId)


    const handleVideoSelection = (videoUrl) => {
        setSelectedVideo(BACKEND_URL+videoUrl);
        
      };
      
      
 
  const [activeIndex, setActiveIndex] = useState(null);

    
    
  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const progressApiCall= async()=>{
  
    try {
      const response = await fetch(`${API}/progresses?populate=*&[filters][course][id]=${id}&[filters][users_permissions_user][id]=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
      });
      const data = await response.json();
      setCompletedData(data);
    } catch (error) {
      console.error(error);
    }
    
   }





 const isComplete = (valId) => {
    return completedData?.data?.[0]?.attributes.lectures.some((item) => {
      return item.video_id === valId;
    });
  };

 

 
 
  const completedApiCall= async(videoId)=>{
    const dataObj = {
        completed:true,
        video_id:videoId
    }
        const lectures = [...props.progress[0].attributes.lectures]
        
        lectures.push(dataObj);

        let updatedProgress = ((lectures.length)/(props.totalLectures))*100
        updatedProgress=Number.parseInt(updatedProgress);
        
    const progress={
        data:{
            progress:updatedProgress,
            lectures: lectures
        }
    }

    
   
    await fetch(`${API}/progresses/${props.progressId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${getToken()}`
      },
      body: JSON.stringify(progress)
    })
    .then(response => response.json())
    
    .catch(error => console.error(error));
    
   }


   useEffect(() => {
    
      progressApiCall();
    
    
  }, [number]);

 


  return (
    <div className="accordion-container">
        <h2>Curriculum</h2>
        {props.data?.length>0? (props.data?.map((item, index) => (
        <div key={index}>
          <button
            className={`accordion ${activeIndex === index ? "active" : ""}`}
            onClick={() => handleAccordionClick(index)}
          >
            {item.lecture_title}
          </button>
          <div
            className="panel"
            style={{
              maxHeight: activeIndex === index ? "500px" : "0",
            }}
          >
            
                {item.lectures.map((val,ind)=>(
                  <div key={ind}>
                  <p style={{cursor:"pointer"}} onClick={()=>handleVideoSelection(val.lecture_video.data.attributes.url)}>
                    {val.title}{" "}{isComplete(val.id)? (<img src={require("../images/check.png")} style={{float:"right"}} alt="img" />):(<button style={{float:"right",border:"none",padding:"5px 10px",cursor:"pointer",backgroundColor:"#fab606",borderRadius:2}} onClick={()=>completedApiCall(val.id)}>mark as complete</button>)}
                  </p>
                  <hr style={{margin:"10px 0"}}/>
                  </div>
                ))}
            
          </div>
        </div>
      ))):(<div>No Curriculum Found</div>)}
      
      
    </div>
  );
};



export default VidAccordion;
