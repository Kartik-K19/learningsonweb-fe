import React, { useRef,useState,useEffect,useContext } from 'react';

import '../styles/video.css'

import { getToken } from '../helpers';
import VidAccordion from '../components/vidAccordion';
import { Context } from "../Context/context";
import { useParams } from 'react-router-dom';
import { API, BACKEND_URL } from '../constant';



function Video() {
  const {id} = useParams();

  const {selectedVideo,setSelectedVideo,number,setnumber,user} = useContext(Context)

  
  const userId = user?.id;
  // console.log(userId)
  const [progressId, setProgressId] = useState(-1);
 
  const [course, setCourse] = useState({});
  const [progressData, setProgressData] = useState(null);


  const makeApiCall = async ()=>{
    await fetch(`${API}/courses/${id}?populate=videos.lectures.lecture_video`)
   .then((response) => response.json())
   .then( (data) =>{setCourse(data)
    if(data.data.attributes.videos && data.data.attributes.videos!==0 ){
    const selectedVideoUrl = BACKEND_URL+data?.data?.attributes.videos[0]?.lectures[0].lecture_video.data.attributes.url;
    setSelectedVideo(selectedVideoUrl);
    }
  })

 }
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
    setProgressData(data);
  } catch (error) {
    console.error(error);
  }
  
 }

 
 useEffect(() => {

  makeApiCall();
 
  
}, [id]);

useEffect(() => {
  if (course && course.data) {
    progressApiCall();
  }
}, [course,number]);

useEffect(() => {
  if (progressData) {
    setProgressId(progressData?.data?.[0]?.id);
    
  }
}, [progressData,number]);



let totalLectures = 0;

course.data?.attributes.videos.map((item,index)=>{
   
    totalLectures += item.lectures.length;
    
})




 
    const videoRef = useRef(null);

    const playVideo = () => {
      videoRef.current.play();
    };
  
    const pauseVideo = () => {
      videoRef.current.pause();
    };

    const vid = require("../images/Sand.mp4")
    
    
  return (
    <>
    <section className="vid-class">
    
  </section>
        
            <div className='vid-container'>
            <div className='vid-left' onClick={()=>setnumber((val)=>val+1)}>
                <VidAccordion data={course.data?.attributes.videos} progressId={progressId} progress={progressData?.data} totalLectures = {totalLectures}/>
            </div>
            <div className='vid-right'>

            <div className='v-player'>
              

                    {/* <VideoPlayer selectedVideo ={selectedVideo.toString()}></VideoPlayer> */}
                    {selectedVideo && (
                        <video
                          key={selectedVideo}
                          width="640"
                          height="360"
                          controls
                          ref={videoRef}
                        >
                          <source src={selectedVideo} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                     )}
                    
            </div>

            
            
            </div>

        </div>
    </>
  )
}

export default Video