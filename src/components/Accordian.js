import React, { useState } from "react";
import "./Accordian.css";
import { useNavigate,useParams } from "react-router-dom";


const Accordion = ({data}) => {
  const navigate = useNavigate();
  const {id} = useParams();

  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);

  };

  return (
    <div className="accordion-container">
      <h2>Cirriculum</h2>
      {data?.map((item, index) => (
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
                  <p style={{cursor:"pointer"}} onClick={()=>navigate(`/courses/${id}/lessons`)}>
                     {val.title}
                  </p>
                  <hr style={{margin:"10px 0"}}/>
                  </div>
                ))}
            
          </div>
        </div>
      ))}
    </div>
  );
};

const accordionData = [
  {
    title: "Section 1",
    content: [
      {
      lecture:"create-accordion",
      },
      {
      lecture:"create-video",
      },
    ]
  },
  {
    title: "Section 2",
    content: [
      {
      lecture:"create-accordion",
      },
      {
        lecture:"create-video",
      },
    ]
  },
  {
    title: "Section 3",
    content: [
      {
      lecture:"create-accordion",
      },
      {
        lecture:"create-video",
      },
    ]
  },
  {
    title: "Section 4",
    content: [
      {
      lecture:"create-accordion",
      },
      {
        lecture:"create-video",
      },
    ]
  },
  {
    title: "Section 5",
    content: [
      {
      lecture:"create-accordion",
      },
      {
        lecture:"create-video",
      },
    ]
  },
  
];

export default Accordion;
