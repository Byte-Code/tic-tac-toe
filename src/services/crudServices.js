const board = {0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:""};

//Inizializza Match
export const initMatchOnServer =  (urlMatch) =>{    
    const userId = localStorage.getItem('userId');         
    return fetch(urlMatch+".json", {
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
export const addPlayerO = (urlMatch) =>{
    const userId = localStorage.getItem('userId');                  
    return fetch(urlMatch+".json", {
        method: "PATCH",
        headers:{            
                "Content-Type": "application/json; charset=utf-8",                            
        },
        body: JSON.stringify({playerO: userId})
    })
    .then( 
        (response) => response.json(),
    )
    .catch(
        (error) => error 
    );    
}

//Scrive una nuova board sul DB
export const addNewBoard = (urlMatch,newBoard) =>{                
    return fetch(urlMatch+".json", {
        method: "PATCH",
        headers:{            
                "Content-Type": "application/json; charset=utf-8",                            
        },
        body: JSON.stringify({board:newBoard})
    })
    .then( 
        (response) => response.json(),
    )
    .catch(
        (error) => error 
    );    
}