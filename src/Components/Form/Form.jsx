import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { validateInputs } from '../../utilities';
import axios from 'axios';

import './Form.css';
import Notification from '../Notification/Notification';
import Loader from '../Loader/Loader';


// REDUX
import { connect } from 'react-redux';
import { LOGIN, LOBBYLOG } from '../../redux/types';
import { deployURL, mainURL, localURl } from '../../environments';


const Form = (props) => {

  let navigate = useNavigate();

  // validations variables
  let validationsError;
  let passwordLenghtError;
  let wrongPasswordError;

  // Hooks
  const [formType, setFormType] = useState(props.formType || undefined);
  const [formDisplay, setFormDisplay] = useState("none");
  
  const [notificationDisplay, setNotificationDisplay] = useState("none");
  const [customMsg, setCustomMsg] = useState("");

  const [loaderDisplay, setLoaderDisplay] = useState("none");

  const [userData, setUserData] = useState({});


  useEffect(() => {

  },[]);

  useEffect(() => {

    setFormDisplay(props.displayFromParent);
    setFormType(props.formType);

    if(props.formType === "login"){

      setUserData({
        username: "",
        password: ""
      });
    }

    if(props.formType === "register"){

      setUserData({
        birthdate: "",
        email: "",
        username: "",
        password: "",
        passwordConfirmation: ""
      });
    }

    if(!props.formType){
      setUserData({
        lobbyName: "",
        privateGame: false,
        playersSize: 4,
        turnSecondsTimer: 8,
        gameMaxMinutesTimer: 30,
      })
    }
    // if(customMsg !== ""){

    //   setTimeout(() => {
    //     setCustomMsg("");
    //   }, 3000);
    // }

  },[props.displayFromParent, props.formType, customMsg]);

  // Handler function
  const fillForm = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  // Services
  const Login = async () => {

    let fieldsToValidate = Object.entries(userData);
    let error = "";

    setCustomMsg("");


    // Validating inputs
    for (let element of fieldsToValidate) {

      error = validateInputs(element[0], element[1]);

      if (error !== "ok") {
        setCustomMsg("Fields cannot be empty");

        validationsError = true;

        return

      } else if (error === "ok") {
        setCustomMsg("");

        validationsError = false;
      }
    }

    let body = {
      username: userData.username,
      password: userData.password
    }

    let loginResult;

    if (!validationsError && !wrongPasswordError && !passwordLenghtError) {
      
      setLoaderDisplay("flex")

      try {

        loginResult = await axios.post(`${mainURL}/users/login`, body)
        // console.log("we're getting this from database:", loginResult)

        if (loginResult.data.token) {
          setCustomMsg(`Welcome to the family ${loginResult.data.user.username}!
          You will be redirected to Lobbies`);

          props.dispatch({ type: LOGIN, payload: loginResult.data });

          setTimeout(() => {
            navigate("/Lobbies")
            
          }, 1800)

        } else {

          setCustomMsg("Wrong username or password");

          setTimeout(() => {
           setLoaderDisplay("none");
          }, 3000);
        }
      } catch (loginError) {

        if(loginError.response.status === 401 || 400){
        
          setCustomMsg("Wrong username or password");
        
        }else{

          setCustomMsg("There has been a problem with the server, please try again later");
          
        }
         
        setTimeout(() => {
          setLoaderDisplay("none");
        }, 500);

        setTimeout(() => {
          setCustomMsg("");
        }, 3000);

          
      }
    }

  }

  const Register = async () => {

    let fieldsToValidate = Object.entries(userData);
    let error = "";

    setCustomMsg("");


    // Validating inputs
    for (let element of fieldsToValidate) {

      error = validateInputs(element[0], element[1]);

      if (error !== "ok") {
        setCustomMsg("Fields cannot be empty");

        validationsError = true;

        return

      } else if (error === "ok") {
        setCustomMsg("");

        validationsError = false;
      }
    }

    let body = {
          birthdate: userData.birthdate + " 00:00:00",
          username: userData.username,
          password: userData.password,
          email: userData.email
    }

    let registerResult;

    if (!validationsError && !wrongPasswordError && !passwordLenghtError) {
      
      setLoaderDisplay("flex")

      try {

        registerResult = await axios.post(`${mainURL}/users/create`, body)

        if(!registerResult?.data?.user){

          setTimeout(() => {
            setCustomMsg(registerResult?.data?.msg)
              setTimeout(() => {
                setLoaderDisplay("none");
              }, 1500);
            }, 1000);
          


        }else{

          setCustomMsg(`Welcome to the family ${registerResult.data.user.username}!
          Please log in to confirm your account`);

          setTimeout(() => {
            navigate("/lobbies")
            setLoaderDisplay("none");
            }, 3500);


        }

      } catch (registerError) {
          setCustomMsg("There has been a problem with the server, please try again later");

        setTimeout(() => {
          setLoaderDisplay("none");
        }, 500);

        setTimeout(() => {
          setCustomMsg("");
        }, 3000);

      }
    }

  }

  const createLobby = async () => {

    setLoaderDisplay("flex");

    let dataBody = {
      lobbyName: userData.lobbyName,
      ownerId: props.passport.user.id,
      privateGame: userData.privateGame,
      playersSize: userData.playersSize,
      turnSecondsTimer: userData.turnSecondsTimer,
      gameMaxMinutesTimer: userData.gameMaxMinutesTimer,
    }

    if(!dataBody.lobbyName){

      setCustomMsg("You must choose a name for your lobby");
      setLoaderDisplay("none");

    }else{

      try  {

        let config = {
          headers: { Authorization: `Bearer ${props?.passport?.token}` }
      };

        let newLobbyResponse = await axios.post(`https://cryptic-citadel-48065.herokuapp.com/lobbies/create`, dataBody, config);

        if(!newLobbyResponse?.data?.lobby){

          setCustomMsg("Lobbyname already in use");

        }else{

          props.dispatch({ type: LOBBYLOG, payload: newLobbyResponse.data.lobby });
  

        }

      }catch(errorDisplay) {

      setCustomMsg("Lobby creation failed");

      }
    }
};

  // this has to be refactored soon 
switch(formType){

  case "register":
  return (
    <div className='box_form centered_content' id="animReverseFade" style={{display: formDisplay}}>
      <Loader loaderState={loaderDisplay}/>  
      <Notification notificationDisplay={notificationDisplay} customMsg={customMsg}/>
      <div className="form_container" id="animItemFromBottomToTop">
        <button className="close_form_button centered_content" onClick={()=>{setFormDisplay("none")}}>ⓧ</button>
        <form className='centered_content'>
          <h1>Create your account</h1>
          <input 
          onChange={(e) => { fillForm(e) }} 
          type="text" 
          name="email" 
          placeholder="email" 
          required/>
          <input 
          onChange={(e) => { fillForm(e) }} 
          type="date" 
          name="birthdate" 
          placeholder="birthdate" 
          required/>
          <input 
          onChange={(e) => { fillForm(e) }} 
          type="text" 
          name="username" 
          placeholder="username" 
          required/>
          <input 
          onChange={(e) => { fillForm(e) }} 
          type="password" 
          name="password" 
          placeholder="password" 
          required/>
          <input 
          onChange={(e) => { fillForm(e) }} 
          type="password" 
          name="passwordConfirmation" 
          placeholder="confirm your password" 
          required/>
          <p>By clicking Register, you'll agree you are over 18 and our <a href="https://blank.page/">Privacy Policy</a>.</p>
          <div 
            className='form_button centered_children' 
            onClick={() => Register()}>Register</div>
        </form>
      </div>
    </div>
  )

  case "login":
    return (
      <div className='box_form centered_content' id="animReverseFade" style={{display: formDisplay}}>
        <Loader loaderState={loaderDisplay}/>
        <Notification notificationDisplay={notificationDisplay} customMsg={customMsg}/>
        <div className="form_container" id="animItemFromBottomToTop">
          <button 
          className="close_form_button centered_content" 
          onClick={()=>{setFormDisplay("none")}}>ⓧ</button>
          <form className='centered_content'>
            <h1>Login with your account</h1>
            <input 
          onChange={(e) => { fillForm(e) }} 
            type="text" 
            name="username" 
            placeholder="username" 
            required/>
            <input 
          onChange={(e) => { fillForm(e) }} 
            type="password"
             name="password" 
            placeholder="password" 
            required/>
            <div 
            className='form_button centered_children' 
            onClick={() => Login()}>Login</div>
          </form>
        </div>
      </div>
    )

  // default is the same as register form now. We'll use this for
  // making the form of "new meme post"
  
  default:
  return (
    <div className='box_form centered_content' id="animReverseFade" style={{display: formDisplay}}>
      <Loader loaderState={loaderDisplay}/>
      <Notification notificationDisplay={notificationDisplay} customMsg={customMsg}/>
      <div className="form_container" id="animItemFromBottomToTop">
        <button 
        className="close_form_button centered_content" 
        onClick={()=>{setFormDisplay("none")}}>ⓧ</button>
        <form className='centered_content'>
          <h1>New lobby</h1>
          <input 
          onChange={(e) => { fillForm(e) }} 
          className='input_lobbyName' 
          type="name" 
          placeholder="name of your lobby" 
          name="lobbyName"
          required/>
          <input 
          onChange={(e) => { fillForm(e) }} 
          className='input_playersSize' 
          type="number" 
          placeholder="max players allowed" 
          name="playersSize"
          required/>
          <input 
          onChange={(e) => { fillForm(e) }} 
          className='input_turnSecondsTimer' 
          type="number" 
          placeholder="seconds/turn" 
          name="turnSecondsTimer"
          required/>
          <input 
          onChange={(e) => { fillForm(e) }} 
          className='input_gameMaxMinutesTimes' 
          type="number" 
          placeholder=" minutes max game duration" 
          name="gameMaxMinutesTimer"
          required/>
          <div className="container_private_input">
            Private <input 
            onChange={(e) => { fillForm(e) }} 
            className='input_private' 
            type="checkbox" 
            placeholder="private" 
            name="privateGame"
            required/>
          </div>
          <button 
          className='form_button centered_children' 
          onClick={()=>createLobby()}>CREATE</button>
        </form>
      </div>
    </div>
  )
 }
}

export default connect((state) => ({
  passport: state.passport,
  lobby: state.lobby
}))(Form);