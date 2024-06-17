import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import signin_image from "../assets/signin_image.png";
import axios from 'axios';
import Classes from "../Styles/trylogin.module.css"
import Alert from './Alert';
import login from './Login';
import port from "./port";

function Register() {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [ipAddress, setIpAddress] = useState("");
  const navigate = useNavigate();
  const [UserType, setUserType] = useState("");
  const [showSuccessAlert,setshowSuccessAlert] = useState(false);
  const [showAlert,setshowAlert] = useState(false);
  const [showErrorAlert,setshowErrorAlert] = useState(false);

  useEffect(() => {
    // Fetch user's IP address when the component mounts
    const fetchIpAddress = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setIpAddress(response.data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIpAddress();
  }, []);

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Username:", credentials.username);
    console.log("Email:", credentials.email);
    console.log("Password:", credentials.password);
    console.log("IP Address:", ipAddress);

    const url = `${port}/api/auth/createUser?username=${credentials.username}&email=${credentials.email}&password=${credentials.password}&ipAddress=${credentials.ipAddress}&UserType=${UserType}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (json.success) {
        
        setshowSuccessAlert(true);
       
      } else {
        setshowAlert(true);
       
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setshowErrorAlert(true);
      
    }
  };
  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <section id='login' className={Classes.MainDiv}>
      {showSuccessAlert && (
        <Alert
          message="Successfully Registered !!"
          onClose={() => setshowSuccessAlert(false)}
          onConfirm={redirectToLogin}
        />
      )}
      {showAlert && (
        <Alert
          message="User Already exists !!"
          onClose={() => setshowAlert(false)}
          // onConfirm={redirectToRegsiter}
        />
      )}
      {showErrorAlert && (
        <Alert
          message="An error occurred during registration. Please try again later."
          onClose={() => setshowErrorAlert(false)}
          // onConfirm={redirectToRegsiter}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className={Classes.logincontainer}>
          <div className={Classes.imagesectionbackground}>
            <img src={signin_image} alt="signin image" />
            <div className={Classes.quotesection}>
              "Sign up—because life's too short for boring destinations and
              missed adventures!!"
            </div>
          </div>

          <div className={Classes.textsection}>
            <div className={Classes.welcomemessage}>
              Welcome <br />
              Back
            </div>
            <div className={Classes.inputsection}>
              <div className={Classes.usernameinput}>
                <div className={Classes.emaillabel}>Username</div>
                <div>
                  <input
                    type="text"
                    className={Classes.emailinputbox}
                    placeholder="Enter Username"
                    name="username"
                    id="username"
                    aria-label="default input example"
                    value={credentials.username}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>

              <div className={Classes.emailinput}>
                <div className={Classes.emaillabel}>Email</div>
                <div>
                  <input
                    type="text"
                    className={Classes.emailinputbox}
                    placeholder="Enter Username"
                    name="email"
                    id="email"
                    aria-label="default input example"
                    value={credentials.email}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>

              <div className={Classes.passwordsection}>
                <div className={Classes.passwordlabel}>
                  <div className={Classes.passwordinput}>Password</div>
                  <div>
                    <div className={Classes.passwordeyeicon}></div>
                    <input
                      type="password"
                      className={Classes.passwordinputbox}
                      placeholder="Enter Password"
                      name="password"
                      id="password"
                      aria-label="default input example"
                      value={credentials.password}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
                <div>
                  <button className={Classes.registerpgbutton} type="submit">
                    Register
                  </button>
                
              </div>
              <div className={Classes.signin} >Already on Roammate ??<a href="/login"> Sign in</a></div>
            </div>
            
          </div>
        </div>
      </form>
    </section>
  );
}

export default Register;
