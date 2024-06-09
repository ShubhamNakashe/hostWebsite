import Classes from "../Styles/Hero.module.css";
import Banner from "../assets/wave.mp4";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import Multiselect from "multiselect-react-dropdown";
import NavBar from "./NavBar";
import Service from "./Service";
import Recommendation from "./Recommendation";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import HospMap from "./HospMap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReviewAdd from "./ReviewAdd";
import Reviewview from "./Reviewview";
import Loader from './Loader'
import Alert from "./Alert";
import port from "./port";
import web from "./port";


function Hero() {
  const user = JSON.parse(localStorage.getItem("currentuser"));
  const navigate = useNavigate();
  const queryParamsRef = useRef();
  const daysRef = useRef();
  const maxPeopleRef = useRef();
  const attRef = useRef();
  const cuisineRef = useRef();
  const foodRef = useRef();
  const budgetRef = useRef();
  const [loading, setLoading] = useState(false);
  const [selectedAttractions, setSelectedAttractions] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [searchDest, setSearchDest] = useState([]);
  const [text, setText] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showLocationAlert, setshowLocationAlert] = useState(false);

  const [searchIti, setSearchIti] = useState({
    destination: "",
    numberofPeople: 0,
    attractions: [],
    cuisine: [],
  });

  // const[searchDest,setSearchDest]=useState("");

  const [attractions, setAttraction] = useState([
    "Historical",
    "Architecture",
    "Entertainment",
    "Adventorous",
    "Nature",
    "Sports",
    "Literature",
  ]);
  const [cuisine, setCuisine] = useState([
    "Indian",
    "Italian",
    "Mexican",
    "Thai",
    "French",
    "Korean",
  ]);

      const fetchData = async () => {
        setLoading(true);
        try {
          const queryParams = queryParamsRef.current.value;
          const days = daysRef.current.value;
          const maxPeople = maxPeopleRef.current.value;
          const budget = budgetRef.current.value;
          const selectedAttractions = attRef.current.getSelectedItems();
          const selectedCuisines = cuisineRef.current.getSelectedItems();

          setSearchIti({
            destination: queryParamsRef.current.value, // No need for parseString if it's a simple string
            numberofPeople: parseInt(maxPeopleRef.current.value),
            attractions: selectedAttractions,
            cuisine: selectedCuisines,
          });
    
          // const response = await fetch(`http://localhost:${port}/api/gemini/generatePlan`, {
          const response = await fetch(`${web}/api/gemini/generatePlan`, {

            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              queryParams,
              days,
              maxPeople,
              attractions,
              budget,
              selectedAttractions,
              selectedCuisines,
            }),
          });
          const data = await response.text();
          console.log("data",data);
          const responseData = JSON.parse(data);
          console.log("responseData", responseData);
          
          if (responseData.success) {
            setText(responseData.generatedPlan);
            localStorage.setItem("generatedPlan", responseData.generatedPlan);
            navigate('/Generatedplan');
          } else {
            console.error('Error generating plan:', responseData.error);
          }
          
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
    
      const handleSearchClick = () => {
        // e.preventDefault();
        if (!user) {
          setShowAlert(true); // Show alert if no user is logged in
          return;
        }
        const locationInput = queryParamsRef.current.value.trim();
        if (locationInput === '') {
          // alert('Please enter a location before searching.');
          setshowLocationAlert(true);
          return;
        }
        localStorage.setItem("destination", locationInput); 
        setSearchDest(locationInput);
        fetchData();  
      };
      const redirectToLogin = () => {
        navigate('/login');
      };
    
    const saveItinerary = async (username, searchIti) => {
    try {
      // const response = await fetch(`http://localhost:${port}/api/itinerary/saveItinerary`, {
      const response = await fetch(`${web}/api/itinerary/saveItinerary`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          searchIti: {
            destination: queryParamsRef.current.value,  // Update here as well
            numberofPeople: parseInt(maxPeopleRef.current.value),
            attractions: selectedAttractions,
            cuisine: selectedCuisines,
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Search information saved successfully');
      } else {
        console.error('Failed to save search information:', data.msg);
      }
    } catch (error) {
      console.error('Error saving search information:', error);
    }
  };

  useEffect(() => {
    if (searchIti) {
      const currentUser = JSON.parse(localStorage.getItem('currentuser'));
      if (currentUser) {
        saveItinerary(currentUser.username, searchIti);
      }
    }
  }, [searchIti]);




  return (
    <>
      <NavBar />



      <section id="hero" className={Classes.heroContainer}>
      {showAlert && (
          <Alert
            message="Login to search Itinerary"
            onClose={() => setShowAlert(false)}
            onConfirm={redirectToLogin}
          />
        )}
        {showLocationAlert && (
          <Alert
            message="Please enter a location before searching."
            onClose={() => setshowLocationAlert(false)}
            onConfirm={() => setshowLocationAlert(false)}
          />
        )}
        <div className={Classes.heroimage}>
          {/* <img src={Banner} alt="" /> */}
          <video loop autoPlay muted={true} width="100%">
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        <div className={Classes.content}>
          <div className={Classes.title}>
            <h1 >
              <div style={{ width: 693, height: 111, left: -95, top: 54,marginTop:"5%", position: 'absolute', color: 'white', fontSize: 96, fontFamily: 'Merriweather', fontWeight: '700', wordWrap: 'break-word' }}>Let's</div>
              <div style={{ width: 693, height: 111, left: 120, top: 54,marginTop:"5%", position: 'absolute', color: 'white', fontSize: 96, fontFamily: 'Merriweather', fontWeight: '700', wordWrap: 'break-word' }}>Tr</div>
              <div style={{ width: 694, height: 111, left: 230, top: 54,marginTop:"5%", position: 'absolute', color: 'aliceblue', fontSize: 96, fontFamily: 'Merriweather', fontWeight: '700', wordWrap: 'break-word' }}>AI</div>
              <div style={{ width: 694, height: 111, left: 350, top: 54,marginTop:"5%", position: 'absolute', color: 'white', fontSize: 96, fontFamily: 'Merriweather', fontWeight: '700', wordWrap: 'break-word' }}>vel</div>

              {/* <span className={Classes.nickName}>RoamMate</span> */}
            </h1>
          
          </div>

          {(!user) && (
            <div className={Classes.bookingContainer} style={{top:"40%",maxWidth:"30%",marginTop:"10%",marginRight:"50%"}} >
              <div className={Classes.search}  style={{width:"40%",maxWidth:"100%"}}>
              <label>
                  Location<span className={Classes.mandatory}> * </span>
                </label>
                <input type="text" placeholder="" ref={queryParamsRef}  />
              </div>
              <button onClick={handleSearchClick}>Search</button>
            </div>
          )}{(user)&&(
          <div className={Classes.bookingContainer} style={{marginTop:"10%"}}>
            <div className={Classes.search} >
            <label>
                  Location<span className={Classes.mandatory}> * </span>
                </label>
              <input type="text" placeholder="" ref={queryParamsRef}/>
            </div>

            <div className={Classes.search}>
              <label>Budget</label>
              <input type="text" ref={budgetRef} />
            </div>

            <div className={Classes.search}>
              <label>No. of People</label>
              <input type="number" ref={maxPeopleRef} />
            </div>
            <div className={Classes.search}>
              <label>No. of Days</label>
              <input type="number" ref={daysRef} />
            </div>




            <div className={Classes.search}>
              <label>Attraction</label>
              <Multiselect
                ref={attRef}
                isObject={false}
                options={attractions}
                placeholder="Select"
                showCheckbox
                onRemove={(event) => {
                  console.log(event);
                  const updatedSelectedAttractions = attRef.current.getSelectedItems();
                  setSelectedAttractions(updatedSelectedAttractions);
                }}
                onSelect={(event) => {
                  console.log(event);
                  const updatedSelectedAttractions = attRef.current.getSelectedItems();
                  setSelectedAttractions(updatedSelectedAttractions);
                }} />
            </div>
            <div className={Classes.search}>
              <label>Food</label>
              <select
                ref={foodRef}
                placeholder="Select">
                <option value="vegetarian">Veg</option>
                <option value="non-vegetarian">Non-veg</option>
                <option value="vegan">Vegan</option>

              </select>
            </div>
            <div className={`${Classes.search}  `}>
  <label>Cuisine</label>
  <Multiselect
    
    ref={cuisineRef}
    isObject={false}
    options={cuisine}
    placeholder="Select"
    showCheckbox
    onRemove={(event) => {
      console.log(event);
      const updatedSelectedCuisines = cuisineRef.current.getSelectedItems();
      setSelectedCuisines(updatedSelectedCuisines);
    }}
    onSelect={(event) => {
      console.log(event);
      const updatedSelectedCuisines = cuisineRef.current.getSelectedItems();
      setSelectedCuisines(updatedSelectedCuisines);
    }}
  />
</div>



            <button onClick={handleSearchClick}>Search</button>


          </div>
)}

</div>
</section>
    <Container>
    {loading ? (
      <Loader /> 
    ) : (
     null

     
    )}

     </Container>
      <Service />
      <Testimonials />
      <Recommendation />
      <HospMap />
      <ReviewAdd />
      <Reviewview />
      <Footer />

    </>
  );
}

export default Hero;