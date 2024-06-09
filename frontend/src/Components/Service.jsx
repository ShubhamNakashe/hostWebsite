
import React from "react";
import Classes from "../Styles/Services.module.css";
import service1 from "../assets/service1.png";
import service2 from "../assets/travel.png";
import service3 from "../assets/hotel1.png";
import service4 from "../assets/cloud1.png";

function Service() {
  const data = [
    {
      icon: service1,
      title: "Get Best Prices",
      subTitle:
        "Unlock Your Journey Unbeatable Travel Plans, Unbelievable Prices. Explore More, Spend Less, Your Journey to the Best Prices Begins Here!",
    },
    {
      icon: service2,
      title: "AI GENERATED TRAVEL ITINERARY",
      subTitle:
        "Elevate your travel planning with our cutting-edge AI-generated itineraries!Tailored to your preferences, our service ensures a seamless and personalized journey for an unforgettable travel experience.",
      link: "#hero",
    },
    {
      icon: service3,
      title: "SEAMLESS HOTEL BOOKING",
      subTitle:
        "Unlock seamless travel experiences with our hassle-free hotel booking service!Explore a world of comfort and convenience at your fingertips book your stay effortlessly on our website today.",
    },
    {
      icon: service4,
      title: "WEATHER FORECAST",
      subTitle:
        "Stay one step ahead of the elements! Plan your days with confidence using our accurate and up-to-the-minute weather forecast service available on our website.",
    },
  ];

  return (
    <section id="service" className={Classes.service}>
      {data.map((item, index) => {
        return (
          <div className={Classes.services} key={index} style={{marginTop:"5%"}}>
            <div className={Classes.icon}>
              <a href={item.link}>
                <img src={item.icon} alt="" />
              </a>
            </div>
            <h3>{item.title}</h3>
            <p>{item.subTitle}</p>
          </div>
        );
      })}
    </section>
  );
}

export default Service;
