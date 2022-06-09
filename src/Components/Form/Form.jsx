import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { validateInputs } from '../../utilities';
import axios from 'axios';

import './Form.css';
import Notification from '../Notification/Notification';
import Loader from '../Loader/Loader';


// REDUX
import { connect } from 'react-redux';
import { LOGIN } from '../../redux/types';
import { deployURL, developmentURL, localURl } from '../../environments';

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

    if(customMsg !== ""){

      setTimeout(() => {
        setCustomMsg("");
      }, 3000);
    }

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
      
      console.log("entro en la segynda?")
      setLoaderDisplay("flex")

      try {

        loginResult = await axios.post(`${developmentURL}/users/login`, body)
        console.log("we're getting this from database:", loginResult)

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

        if(loginError.response.status === 401){
        
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

          
        console.log("Server error", loginError)
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
      
      console.log("entro en la segynda?")
      setLoaderDisplay("flex")

      try {

        registerResult = await axios.post(`${developmentURL}/users/create`, body)
        console.log("we're getting this from database:", registerResult)

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

        console.log("Server error", registerError)
      }
    }

  }

  console.log("userData", userData)
  
  // this has to be refactored soon 
switch(formType){

  case "register":
  return (
    <div className='box_form centered_content' id="animReverseFade" style={{display: formDisplay}}>
      <Loader loaderState={loaderDisplay}/>  
      <Notification notificationDisplay={notificationDisplay} customMsg={customMsg}/>
      <div className="form_container" id="animItemComingFromBottom">
        <button className="close_form_button centered_content" onClick={()=>{setFormDisplay("none")}}>X</button>
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
            className='form_button' 
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
        <div className="form_container" id="animItemComingFromBottom">
          <button 
          className="close_form_button centered_content" 
          onClick={()=>{setFormDisplay("none")}}>X</button>
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
            className='form_button' 
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
      <div className="form_container" id="animItemComingFromBottom">
        <button 
        className="close_form_button centered_content" 
        onClick={()=>{setFormDisplay("none")}}>X</button>
        <form className='centered_content'>
          <h1>Create your account DEFAULT</h1>
          <input 
          onChange={(e) => { fillForm(e) }} 
          type="text" 
          name="email" 
          placeholder="email" 
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
          name="confirmation" 
          placeholder="confirm your password" 
          required/>
          <p>By clicking Register, you'll agree you are over 18 and our <a href="https://blank.page/">Privacy Policy</a>.</p>
          <button 
          className='form_button' 
          onClick={()=>{}}>Register</button>
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