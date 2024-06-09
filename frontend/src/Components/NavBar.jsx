import React, { useState } from "react";
import Classes from "../Styles/NavBar.module.css";
import About from "./About";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  const [toggle, setToggle] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const user = JSON.parse(localStorage.getItem("currentuser"));

  function logout() {
    localStorage.removeItem("currentuser");
    window.location.href = "/Login";
  }

  return (
    <>
      <nav className={Classes.Navbar}>
        <div className={Classes.brand}>
          <h1 className={Classes.NavLogo}>
            Roam <span>Mate</span>
          </h1>

          <div className={Classes.hamburger}>
            {toggle ? (
              <FontAwesomeIcon
                icon={faClose}
                className={Classes.menuIcon}
                onClick={() => setToggle(false)}
              />
            ) : (
              <FontAwesomeIcon
                className={Classes.menuIcon}
                icon={faBars}
                onClick={() => setToggle(true)}
              />
            )}
          </div>
        </div>

        <ul className={toggle ? Classes.open : ""}>
          <li>
            <a onClick={()=> localStorage.removeItem("selectedTitle")}  href="/#hero">Home</a>
          </li>
          <li>
          <a onClick={()=> localStorage.removeItem("selectedTitle")}  href="/#testimonials">Weather</a>
          </li>
          <li>
            <a onClick={()=> localStorage.removeItem("selectedTitle")}  href="/About">Hotels</a>
          </li>
          <li>
          <a onClick={()=> localStorage.removeItem("selectedTitle")}  href="/Rest1">Restaurants</a>
          </li>

          <li>
          <a onClick={()=> localStorage.removeItem("selectedTitle")}  href="/#location">Services</a>
          </li>

          <li>
          <a onClick={()=> localStorage.removeItem("selectedTitle")}  href="/BookmarkedItineraries">Saved-Itineraries</a>
          </li>
        
        </ul>
        {user ? (
              <div className={Classes.NavBtnMain}>
                
                  <button className={Classes.NavBtn}>
                    {user.username}
                    </button>
                    <a href="/">
                  <button className={Classes.NavBtn} onClick={logout}>
                    Log Out
                  </button>
                  </a>  

              </div>
            ) : (
              <div className={Classes.NavBtnMain}>
                <a href="/Login"><button className={Classes.NavBtn}>Sign In</button></a>
                
              </div>
            )}

        
      </nav>
    </>
  );
}

export default NavBar;
