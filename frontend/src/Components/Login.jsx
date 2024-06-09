import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signin_image from "../assets/signin_image.png";
import { GoogleLogin } from "@react-oauth/google";
import "../Styles/Login.module.css"; // Import the external CSS file
import googleicon_img from "../assets/googleicon_img.png";
import Classes from "../Styles/Login.module.css";
import Alert from "./Alert";
import port from "./port";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const navigate = useNavigate();

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `http://localhost:${port}/api/auth/Login?username=${credentials.username}&password=${credentials.password}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
    });
    try {
      const json = await response.json();
      console.log(json);

      if (json.success) {
        const currentuser = {
          username: credentials.username,
          password: credentials.password,
        };
        localStorage.setItem("currentuser", JSON.stringify(currentuser));
        console.log(json);

        const { lastLogin } = json.user;
        const loginInfo = {
          lastLogin,
        };

        localStorage.setItem("loginInfo", JSON.stringify(loginInfo));

        // navigate("/Home");
        if (
          credentials.username === "User" &&
          credentials.password === "admin"
        ) {
          window.open("/Homeadmin", "_blank");
        } else {
          // <a href="/Hero"></a>
          navigate("/");
        }
      } else {
        setError("Please enter valid credentials.");
        setShowAlert(true);

      }
    } catch {
      console.error("Error during login:", error);
      // alert("An error occurred during login. Please try again later.");
      setShowErrorAlert(true);
    }

  };
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    if (credentialResponse.credential) {
      try {
        const profileResponse = await fetch(
          `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${credentialResponse.credential}`
        );
        const profileData = await profileResponse.json();
  
        console.log("User's Email:", profileData.email);
  
        if (profileData.name) {
          const userName = profileData.name;
          const password = profileData.password;
  
          console.log("User's Name:", userName);
          console.log("password",password)
          const currentUser = {
            username: userName,
            password: userName, // Set an empty password or generate a random one
          };
  
          localStorage.setItem("currentuser", JSON.stringify(currentUser));
        }  else {
          console.warn("User's name not available in JWT payload.");
        }
  
        // Now fetch the user profile using your server as a proxy
        const serverResponse = await fetch(
          `http://localhost:${port}/api/auth/googleUser?email=${profileData.email}&username=${profileData.name}&password=${profileData.email}&ipAddress=${profileData.email}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        const serverData = await serverResponse.json();
  
        if (serverData.success) {
          const { username } = serverData;
  
          // Check if the user was newly registered
          const isNewlyRegistered = serverResponse.status === 201;
  
          console.log(`User ${isNewlyRegistered ? 'registered' : 'logged in'} successfully. Username: ${username}`);
          navigate("/");
          // Modify console for registration
          if (isNewlyRegistered) {
            console.log(`User registered successfully. Username: ${username}`);
          } else {
            console.log(`User logged in successfully. Username: ${username}`);
          }
        } else {
          console.error('Error fetching user profile:', serverData.msg);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    } else {
      console.error('Credentials are undefined in the response.');
    }
  };
  
  return (
    <>
      <section id='login' className={Classes.MainDiv}> 
     
        <div className={Classes.logincontainer}>
          {showAlert && (
        <Alert
          message="Please enter valid credentials"
          onClose={() => setShowAlert(false)}
          // onConfirm={redirectToLogin}
        />
      )}
          {showErrorAlert && (
        <Alert
          message="An error occurred during login. Please try again later."
          onClose={() => setShowAlert(false)}
          // onConfirm={redirectToLogin}
        />
      )}
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
                 Back</div>

                 <div className={Classes.inputsection}>
                 <form onSubmit={handleSubmit}>
       
                  <div>
              <div className={Classes.emailinput} >
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
              <div className={Classes.passwordsection}>
                <div className={Classes.passwordlabel}>
                  <div className={Classes.passwordinput}>Password</div>
                  <div>
                    <div className={Classes.passwordeyeicon}>
                      {/* Eye icon for password visibility */}
                    </div>
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
              </div>
              <button className={Classes.signinbutton} type="submit">
                 Sign In
               </button>
              </form>
              

              <div className={Classes.allbuttons}>
          
         
               <div className={Classes.orlabel}>Or</div>
        
  
           <div>
                  <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={() => {
                      console.log("Google Login Failed");
                    }}
                  >
                    <img
                      className={Classes.googleimage}
                      src={googleicon_img}
                      alt="Google"
                    />
                    <div className={Classes.googlelabel}>Sign in with Google</div>
                  </GoogleLogin>
                </div>
          
          <div className={Classes.Registerbuttonsection}>
          <a href="/Register">
            <button className={Classes.registerbutton}type="submit">
              Register as new user
            </button>
          </a>
      </div>
          </div>
            </div>
          </div>
         
        </div>
      </section>
    </>
  );
}


export var credentials;
export default Login;
