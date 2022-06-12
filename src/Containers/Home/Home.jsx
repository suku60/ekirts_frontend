import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { connect } from "react-redux";
import { ANIMATIONSLOG } from "../../redux/types";

import './Home.css';

import Form from '../../Components/Form/Form';
import AbsoluteBackground from '../../Components/AbsoluteBackground/AbsoluteBackground';
import GameTitle from '../../Components/GameTitle/GameTitle';

const Home = (props) => {

  let navigate = useNavigate();

  const [formState, setFormState] = useState("none");
  const [formType, setFormType] = useState(undefined);

  const [bgAnimationStateContainer, setBgAnimationStateContainer] = useState(props.userOptions.animations);

  const [animationTextIndicator, setAnimationTextIndicator] = useState("on");

  useEffect(() => {

    if(props.passport?.token){
      navigate("/lobbies");
  }

  });

  useEffect(() => {
  },[]);
 

  const showForm = (loginOrRegisterForm) => {

    setFormType(loginOrRegisterForm);

    if (!formState) {
      setFormState(true);

    }else{
      setFormState(false);

    }
  }

  const backgroundAnimState = () => {

    if(bgAnimationStateContainer){
      props.dispatch({type: ANIMATIONSLOG, payload: false})
      setBgAnimationStateContainer(false);
      setAnimationTextIndicator("off");
    }else{
      setBgAnimationStateContainer(true);
      props.dispatch({type: ANIMATIONSLOG, payload: true})
      setAnimationTextIndicator("on");
    }

  }
  
  return (
    <div className="box_basic_container home" id='animReverseFade'>
      <AbsoluteBackground bgAnimationState={bgAnimationStateContainer}/>
      <Form displayFromParent={formState} formType={formType}/>
      <div className="box_home_container">
        <h1 className="welcome_text" id="animItemFromTopToBottom">
          </h1>
          <GameTitle/>
        {/* <h2 className="welcome_subtext subtext_join centered_content">JOIN THE GAME</h2> */}
        <div className="button centered_content" onClick={()=>{showForm("login")}}>login</div>
        <div className="button register_btn centered_content" onClick={()=>{showForm("register")}}>register</div>
        <div className="animation_btn centered_content" onClick={()=>{backgroundAnimState()}}>animations {animationTextIndicator}</div>

      </div>
    </div>
  )
}

export default connect((state) => ({
  passport: state.passport,
  userOptions: state.userOptions
}))(Home);