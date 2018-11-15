import React from 'react';
import {newMatch} from '../services/homeServices'

const Home = () =>{
    
    return(
        <div>
            <div>
                <h2>HOME</h2>
            </div>
            <div>
                <button onClick={(e) => newMatch()}>Gioca</button>
            </div>
        </div>
    )
}

export default Home;