import React, { useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import "../Styles/Recommendation.css";

import Destination1 from "../assets/singapore.jpeg";
import Destination2 from "../assets/london.jpg";
import Destination3 from "../assets/Destination3.png";
import Destination4 from "../assets/australia.jpg";
import Destination5 from "../assets/india.jpg";
import Destination6 from "../assets/dubai.jpg";
import info1 from "../assets/info1.png";
import info2 from "../assets/info2.png";
import info3 from "../assets/info3.png";
import staycation from "../assets/stay1.mp4";

function Recommendation() {

  const data = [
    {
      image: Destination1,
      title: "Singapore",
      subTitle: "Singapore, officialy thr Republic of Singapore, is a",
      cost: "38,800",
      duration: "Approx 6 night trip",
    },
    {
      image: Destination2,
      title: "London",
      subTitle: "London, the capital of England and the United",
      cost: "38,800",
      duration: "Approx 1 night 2 day trip",
    },
    {
      image: Destination3,
      title: "Paris",
      subTitle: "Paris, France's capital, is a major European city and a",
      cost: "45,500",
      duration: "Approx 2 night trip",
    },
    {
      image: Destination4,
      title: "Australia",
      subTitle: "Australia is a country in the",
      cost: "24,100",
      duration: "Approx 10 night trip",
    },
    {
      image: Destination5,
      title: "India",
      subTitle: "India, occupies the greater part of South Asia",
      cost: "95,400",
      duration: "Approx 2 night 2 day trip",
    },
    {
      image: Destination6,
      title: "Dubai",
      subTitle: "Dubai, city in the United Arab Emirates",
      cost: "38,800",
      duration: "Approx 3 night 2 day trip",
    },
  ];



  const navigate = useNavigate();
  const [selectedTitle, setSelectedTitle] = useState("");

  const handleTitleClick = (title) => {
    // Store the selected title in state
    localStorage.setItem("selectedTitle", title);
    setSelectedTitle(title);
    navigate(`/About`);
  };

  return (
    <section id="recommendation" className="recommendation">

      <a href="/about">
  <video loop autoPlay muted={true} style={{ width:'100%',height:'50%' ,borderRadius:'50px'}}>
  <source src={staycation} type="video/mp4" />
</video>
</a>
          <div className="title">
        <h2 style={{marginTop:"4%"}}>Our Top Recommendations</h2>
        </div>

      <div className="recommendationBox">
        {data.map((item) => {
          return (
            <div className="box">
              <div className="image">

                <Link to="/about" onClick={() => handleTitleClick(item.title)}>
                  <img src={item.image} alt="image" />
                </Link>
              </div>
              <h3>{item.title}</h3>


              <div className="price">
                <div>
                  <img src={info1} alt="image" />
                  <img src={info2} alt="image" />
                  <img src={info3} alt="image" />

                </div>
              </div>

              <div className="details">
                <p>{item.duration}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Recommendation;
