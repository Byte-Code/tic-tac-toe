import {urlDB} from '../services/firebaseService';
import {   
    updateMatch,    
    updateMove,
    loadGameDataRequest    
 } from '../services/actionsServices';

//Inizializza e Aggiorna 
export const initAppAndUpdate = () => {
    return dispatch => {           
        dispatch(loadGameDataRequest());
        const gameName = localStorage.getItem('gameName');
        const urlMatch =  urlDB+"/Matches/"+gameName;        
        return fetch(urlMatch+".json")
        .then( 
                    (response) => response.json(),
                    (error) => console.log(error)
                )
        .then(
            (json) =>  {                     
                dispatch(updateMatch(json, urlMatch))                    
            }                                
        )        
    }            
}

export const move = (i) => {
    return (dispatch) => {
        dispatch(loadGameDataRequest());  
        const gameName = localStorage.getItem('gameName');              
        const urlMatch =  urlDB+"/Matches/"+gameName;         
        return fetch(urlMatch+".json")
        .then( 
            (response) => response.json(),          
            (error) => console.log(error)
        )
        .then(
            (json) => dispatch(updateMove(i,json,urlMatch))
        )
    }
}




        
        

