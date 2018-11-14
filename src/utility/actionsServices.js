export const LOAD_GAME_DATE_REQUEST = 'LOAD_GAME_DATE_REQUEST';
export const LOAD_GAME_DATE_SUCCESS = 'LOAD_GAME_DATE_SUCCESS';
export const LOAD_GAME_DATE_FAILURE = 'LOAD_GAME_DATE_FAILURE';
export const HACK_STATE = 'HACK_STATE';

export const MAKE_MOVE = 'MAKE_MOVE';
export const JUMP_TO = 'JUMP_TO';

export const loadGameDataRequest = () =>({
    type: LOAD_GAME_DATE_REQUEST     
});

export const loadGameDataSuccess = (playerX,playerO) => ({
    type: LOAD_GAME_DATE_SUCCESS,    
    playerX,
    playerO
});

export const loadGameDataError = () => ({
    type: LOAD_GAME_DATE_FAILURE
});

export const hackState = (board, playerX, playerO, userId) =>({
    type: HACK_STATE,
    board,
    playerX,
    playerO,
    userId
})

//Azione che permetti di effettuare una mossa
export const makeMove = (i,board) => ({
    type: MAKE_MOVE,
    i,
    board
})

/*
//Azione che permette di effettuare un Jump nella history
export const jumpTo = (step) => ({
    type: JUMP_TO,
    step
})
*/

const board ={0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:""}

//Aggiunge il playerO sul DB
export const addPlayerOonDB = (urlMatch) =>{
    const userId = localStorage.getItem('userId');         
    console.log('addPlayerOonDB - userId ',userId);
    console.log('addPlayerOonDB - urlMatch ',urlMatch);    
    
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

//Aggiorna DB e stato 
export const updateDBandState = (urlMatch,json) => {
    return dispatch => {
        const userId = localStorage.getItem('userId');
        console.log('updateDBandState - json', json);
        console.log('updateDBandState - idUser ',userId);            
        if(userId === json.playerX){
            if(json.playerO!==undefined){
                //simulo lo stato corretto per playerX la prima volta quanndo deve aggiornare playerO  
                dispatch(hackState(json.board,json.playerX,null,json.playerX));                                                             
                dispatch(loadGameDataSuccess(json.playerX,json.playerO))
            }                                           
        }
        else{        
            if(json.playerO===undefined){                 
                addPlayerOonDB(urlMatch)
                .then(
                    (data) => {                        
                        dispatch(loadGameDataSuccess(json.playerX,data.playerO));                        
                    },
                    (error) => {                        
                        console.log(error)
                    }                                
                )                                                       
            }
            else{
                if(json.playerO === userId){
                    //simulo lo stato corretto per playerO
                    dispatch(hackState(json.board,json.playerX,json.playerO,json.playerO));                    
                }
            }                
        }
    }
}

//Aggiorna il match
export const updateMatch = (json, urlMatch) => {        
    return dispatch => {                
        if(json===null){                         
            initMatchOnServer(urlMatch)
                .then(
                    (data) => {                        
                        dispatch(loadGameDataSuccess(data.playerX,null));                        
                    },
                    (error) => {                        
                        console.log(error)
                    }                                
                )                                                                                       
            }
        else{            
            dispatch(updateDBandState(urlMatch,json ));                 
        }        
    }
}    