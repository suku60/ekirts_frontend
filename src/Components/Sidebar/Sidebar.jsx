import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

import { connect } from "react-redux";
import { LOGOUT, LOBBYLOG, ISUSERJOININGLOBBY } from "../../redux/types";

import Form from '../Form/Form';

const Sidebar = (props) => {


    let navigate = useNavigate();

    const [sidebarDisplay, setSidebarDisplay] = useState("flex");

    const [formState, setFormState] = useState("none");

    useEffect(()=> {
        if(!props.passport?.token){
            setSidebarDisplay("none")
        }else{
            setSidebarDisplay("flex")
        }
    },[]);

    useEffect(()=> {
        if(!props.passport?.token){
            setSidebarDisplay("none")
        }else{
            setSidebarDisplay("flex")
        }
        
    },[sidebarDisplay, props.passport?.token, props.lobby.lobbyData.length]);

    const logout = () => {
      props.dispatch({ type: LOGOUT });
      navigate("/home")
    }

    const showForm = () => {

      console.log(formState)
      if (!formState) {
        console.log("noformstate")
        setFormState(true);
      }else{
        setFormState(false);
      }
    }

  return (
    <div className="box_sidebar">
      <Form displayFromParent={formState}/>
      <ul className=" italic_text" style={{display: sidebarDisplay}} 
            id="animItemFromTopToBottom">

            { props.sidebarData.map(sidebar => {
                        
                return ( 
                  <li 
                  key={sidebar.zIndex} 
                  style={{zIndex: sidebar.zIndex}}
                  onClick={()=>{navigate(sidebar.path)}}>
                  <p className='li_text'>{sidebar.name}</p>
                </li>
                )
              
            })}
            <li className="new_lobby_button" onClick={()=>{showForm()}}> 
              <p className='logout_text li_text'>NEW LOBBY</p>
            </li>
            <li onClick={()=>{logout()}}> 
              <p className='logout_text li_text'>Logout</p>
            </li>
            </ul>
    </div>
            
    )
}

export default connect((state) => ({
  passport: state.passport,
  lobby: state.lobby,
}))(Sidebar);