import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

import { LOGOUT } from "../../redux/types";
import { connect } from "react-redux";

const Sidebar = (props) => {

    let navigate = useNavigate();

    const [sidebarDisplay, setSidebarDisplay] = useState("flex");

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
    },[sidebarDisplay, props.passport?.token]);

    const logout = () => {
      props.dispatch({ type: LOGOUT });
      navigate("/home")
    }

  return (
            <ul style={{display: sidebarDisplay}} 
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
            <li onClick={()=>{logout()}}> 
              <p className='logout_text li_text'>Logout</p>
            </li>
            </ul>
    )
}

export default connect((state) => ({
  passport: state.passport
}))(Sidebar);