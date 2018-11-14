import {urlDB} from '../utility/firebaseService';
import {   
    updateMatch,    
    loadGameDataRequest    
 } from '../utility/actionsServices';

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



        
        

