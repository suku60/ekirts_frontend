import React, { useEffect, useState }from 'react';
import Notification from '../../Components/Notification/Notification';
import axios from 'axios';

import './Lobbies.css';
import { getValue } from '@testing-library/user-event/dist/utils';

const Lobbies = () => {

  const [memes, setMemes] = useState([]);
  const [page, setPage] = useState(1);

  const [notificationDisplay, setNotificationDisplay] = useState("none");
  const [customMsg, setCustomMsg] = useState("");

  const [star, setStar] = useState("");

  useEffect(() => {
  });

  useEffect(() => {
  },[]);

  // Local functions
  const loadMore = () => {
    getMemes(page + 1);
  }
 

  // Services
  const getMemes = async (page) => {
    console.log("working")

    if(memes.length === 0){

      try {
        
        console.log("inside try")
        let memesResult = await axios.get(`https://socialmeme.herokuapp.com/posts/get10?page=${page}`);

        setMemes(memesResult.data)
        
        console.log("result:", memesResult.data)
        // try later: what happens if we get less than 10 memes. 
        
      } catch (error) {
        
        setNotificationDisplay("flex");
        setCustomMsg("Something went wrong, please try again later");
        console.log(error)
      }  
    }

  }

  getMemes();
  console.log("memes?", memes, typeof(memes))

  return (
    <div className="box_basic_container Lobbies" id='animItemFallingFromTop'>
      <Notification notificationDisplay={notificationDisplay} customMsg={customMsg}/>
      <div className="board left_content">
        {memes?.map(memeObject => {
           return (
             <div className="card" key={memeObject._id}>
                <div className="container_card_img">
                  <img className='img_meme' src={memeObject.img} alt={memeObject.title} />
                </div>
                <div className="container_card_data">
                  data here
                </div>                                 
             </div>
             )
        })}
      </div>
    </div>
  )
}

export default Lobbies;