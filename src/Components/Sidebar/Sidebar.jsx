import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = (props) => {

    let navigate = useNavigate();

  return (
            <ul>
            { props.sidebarData.map(sidebar => {
              return ( 
                <li key={sidebar.zIndex} style={{zIndex: sidebar.zIndex}}
                onClick={()=>{navigate(sidebar.path)}}>
                  <p className='li_text'>{sidebar.name}</p>
                </li>
                )
            })}
            </ul>
    )
}
export default Sidebar;