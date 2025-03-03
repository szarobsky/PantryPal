import React, { useState, useEffect } from 'react';
import 'primereact/resources/primereact.min.css';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import './Landing.css'; 
import Logo from '../assets/Logo.png';
import MiniLogo from '../assets/MiniLogo.png';
import { auth, provider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ThemeSwitcher from '../SwitchTheme';

//Landing page component
const Landing = () => {
    const [visibleGoal, setVisibleGoal] = useState(false);
    const [visibleAbout, setVisibleAbout] = useState(false);
    const [visibleNotes, setVisibleNotes] = useState(false);
    const [csrfToken, setCsrfToken] = useState(''); 
    const navigate = useNavigate(); 

    //Function to get the CSRF token from the cookies
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Check if this cookie string begins with the name we want
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    //Fetch CSRF token from backend
    useEffect(() => {
        const  fetchCsrfToken = async () => {
            fetch('https://inventorykh2024-backend-fta8gwhqhwgqfchv.eastus-01.azurewebsites.net/api/csrf-token/', { credentials: 'include' })
                .then(response => response.json())
                .then(data => setCsrfToken(data.csrftoken))
                .catch(error => console.error('Error fetching CSRF token:', error));
        };
        fetchCsrfToken();
    }, []);

    //Function to handle Google login
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            let user = result.user;
            const firebase_uid = user.uid;  
            let csrf = getCookie('csrftoken')
            if (csrf === null) {
                csrf = csrfToken;
            }
            const getUser = async () => {
                if (firebase_uid) {
                    try {
                        const newUser = {'firebase_uid': firebase_uid, 'items': []};
                        const response = await fetch('https://inventorykh2024-backend-fta8gwhqhwgqfchv.eastus-01.azurewebsites.net/user/', {
                            method: 'POST',
                            headers: {
                                'X-CSRFToken': csrf,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(newUser),
                            credentials: 'include' 
                        });
                        let data = await response.text();

                        // Attempt to parse the response as JSON
                        try {
                            const jsonData = JSON.parse(data); 
                            data = jsonData;
                        } catch (error) {
                            console.error('Error parsing JSON:', error);
                        }
                    } catch (error) {
                        console.error("Error fetching items:", error);
                    }
                };
            }
            getUser();
            
            //Redirect to home page
            navigate('/home', { state: {firebase_uid, csrfToken} });
        } catch (error) {
        console.error("Error signing in with Google:", error);
        }
    };

    //Start content for the toolbar
    const startContent = (
        <div className="flex flex-wrap align-items-center gap-3">
            <img src={MiniLogo} alt="Logo" className="landing-mini-logo" />
        </div>
    );

    //End content for the toolbar
    const endContent = (
        <React.Fragment>
            <div className="flex align-items-center gap-2">
                <Button label="Login" onClick={handleGoogleLogin} />
                <ThemeSwitcher />
            </div>
        </React.Fragment>
    );

    //Render the landing page
    return (
        <div className="landing-container">
            <Toolbar start={startContent} end={endContent} className="toolbar" />
            <div className='landing-center'>
                <img src={Logo} alt="Logo" className="landing-logo"/>
                <div>
                    <Button className='landing-button' onClick={() => setVisibleGoal(true)}>Our Goal</Button>
                    <Button className='landing-button' onClick={() => setVisibleNotes(true)}>Notes</Button>
                    <Button className='landing-button' onClick={() => setVisibleAbout(true)}>About Us</Button>
                </div>
            </div>
            <Dialog header="Our Goal" visible={visibleGoal} position={'left'} style={{ width: '70vw' }} onHide={() => setVisibleGoal(false)} draggable={false} resizable={false}>
                <p className="m-0">
                    Do you ever open your fridge or pantry and find that food you had forgotten about is now expired? PantryPal can help by providing a simple and easy to use inventory management system for people keep track of their soon-to-expire foods. This can help reduce food waste and save you money by helping you remember what you have in your pantry.
                </p>
            </Dialog>
            <Dialog header="About Us" visible={visibleAbout} position={'right'} style={{ width: '70vw' }} onHide={() => setVisibleAbout(false)} draggable={false} resizable={false}>
                <p className="m-0">
                    This project was made by students of the University of Central Florida for the Knight Hacks VII hackathon in 2024.
                </p>
                <p>
                    This was our first hackathon for the 3 of us and we learned a lot about it, especially about React, Django, and MongoDB.
                </p>
                <p>
                    This project is now being continued on by Sean Zarobsky.
                </p>
                <a href="http://www.seanzarobsky.com">www.seanzarobsky.com</a>
            </Dialog>
            <Dialog header="Notes" visible={visibleNotes} position={'top'} style={{ width: '70vw' }} onHide={() => setVisibleNotes(false)} draggable={false} resizable={false}>
                <p className="m-0">
                We (the developers) are not legally responsible for any lost data or any other issues that may arise from using PantryPal.
                </p>
                <p>
                    The recipes provided by PantryPal are generated by OpenAI's ChatGPT 4o-mini model. The recipes are not guaranteed to be accurate or safe to eat. Please use your best judgement when following the recipes provided by PantryPal.
                </p>
                <p>
                    The barcode scanner feature is powered by the Open Food Facts API. PantryPal is not responsible for any incorrect or missing data from the Open Food Facts API.
                </p>
                <p>
                    If you want to use PantryPal without dates, just leave the default value (01/01/2024 11:59PM).
                </p>
                <p>
                    In order to get PantryPal to work on Safari mobile, you must enable cross-site tracking. This is because we use cookies to store the CSRF token from the server. PantryPal has only been extensively tested on Google Chrome (Windows) and Safari (iOS).
                </p>
            </Dialog>
        </div>
    );
};

//Export the Landing component
export default Landing;