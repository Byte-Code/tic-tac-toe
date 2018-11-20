import {urlDB} from '../config/firebaseConfig';

const board = {0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:""};
const urlMatch = urlDB+"/Matches/";

//Inizializza Match
export const putMatchData =  (gameName,userId) =>{                 
    return fetch(urlMatch+gameName+".json", {
        method: "PUT",
        headers:{            
                "Content-Type": "application/json; charset=utf-8",                            
        },
        body: JSON.stringify({board, playerX:userId})
    })
    .then( 
        (response) => response.json(),
    )
    .catch(
        (error) => error 
    );
}

//Aggiunge il playerO sul DB
export const patchData = (gameName,propertyName,objToPatch) =>{                     
    return fetch(urlMatch+gameName+".json", {
        method: "PATCH",
        headers:{            
                "Content-Type": "application/json; charset=utf-8",                            
        },
        body: JSON.stringify({[propertyName]: objToPatch})
    })
    .then( 
        (response) => response.json(),
    )
    .catch(
        (error) => error 
    );    
}

export const getMatchDetail = (gameName) => {
    return fetch(urlMatch+gameName+".json");
}