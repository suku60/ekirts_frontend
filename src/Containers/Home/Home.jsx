import React, { useState} from 'react';
import './Home.css';

import Form from '../../Components/Form/Form';

const Home = () => {

  const [formState, setFormState] = useState("none");
  const [formType, setFormType] = useState(undefined);

  const showForm = (loginOrRegisterForm) => {

    setFormType(loginOrRegisterForm);

    if (!formState) {
      setFormState(true);

    }else{
      setFormState(false);

    }
  }

  return (
    <div className="box_basic_container home" id='animReverseFade'>
      <div className="background_sides"></div>
      <div className="background_cover"></div>
      <Form displayFromParent={formState} formType={formType}/>
      <div className="box_home_container">
        <h1 className="welcome_text">EKIRTS GAME</h1>
        <h2 className="welcome_subtext subtext_join">JOIN THE GAME</h2>
        <div className="temporaryBtn centered_content" onClick={()=>{showForm("login")}}>login</div>
        <div className="temporaryBtn btn_register centered_content" onClick={()=>{showForm("register")}}>register</div>
      </div>
    </div>
  )
}

export default Home;