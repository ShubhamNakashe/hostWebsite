
import React from "react";
import Classes from "../Styles/Footer.module.css";
import vesitLogo from "../assets/vesitlogo.png";
import attoLogo from "../assets/attologo.png";

function Footer() {
  return (
    <footer className={Classes.footerContainer}>
      <div className={Classes.footer}>
        <div className={Classes.logoContainer}>
          <img src={vesitLogo} alt="VESIT Logo" className={Classes.logo} />
        </div>
        <div className={Classes.textContainer}>
          <p className={Classes.about}>About <span className={Classes.span1}>Roam</span><span className={Classes.span2}>Mate</span></p>
          <p>Developed by Soham Shetye, Prajakta Upadhye, Shravani Pore, and Shubham Nakashe of VESIT college under the guidance of HoD Shalu Chopra for Atto Infotech.</p>
        </div>
        <div className={Classes.logoContainer}>
          <img src={attoLogo} alt="Atto Logo" className={Classes.logo} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;

