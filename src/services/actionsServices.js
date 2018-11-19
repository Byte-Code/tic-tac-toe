import {calculateWinner,countEl} from '../utility/utility';
import {loadGameData,
        updateStateBoard,
        loadGameDataSuccess
} from '../actions/actions'

const board = {0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:""};

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
        //console.log('updateDBandState - json', json);
        //console.log('updateDBandState - idUser ',userId);            
        if(userId === json.playerX){
            if(json.playerO!==undefined){               
               dispatch(loadGameData(json.board,json.playerX,json.playerO,json.playerX)); 
               //dispatch(updateStateBoard(json.board));
            }                                           
        }
        else{        
            if(json.playerO===undefined){                 
                addPlayerO(urlMatch)
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
                   dispatch(loadGameData(json.board,json.playerX,json.playerO,json.playerO)); 
                   //dispatch(updateStateBoard(json.board));
                }
                else{
                    //spettatore
                    dispatch(loadGameData(json.board,json.playerX,json.playerO,userId));
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

export const updateMove = (i,json,urlMatch) => {
    return dispatch => {        
        const userId = localStorage.getItem('userId');           
        if (calculateWinner(json.board)===null) { 
                    
            const numX = countEl(json.board,'X');     
            const numO = countEl(json.board,'O');    
            if((json.playerX === userId) && (numX==numO) && (json.board[i]=="")){        
                json.board[i] = 'X';               
                addNewBoard(urlMatch,json.board)
                .then(
                    (data) => {
                        console.log('nuova board X ',data);
                        dispatch(updateStateBoard(data))
                    },
                    (error) => console.log(error)
                )            
            }    
            else{ 
                if((json.playerO === userId) && (numO<numX) && (json.board[i]=="")){
                    json.board[i] = 'O';               
                    addNewBoard(urlMatch,json.board)
                    .then(
                        (data) => {
                            console.log('nuova board O ',data);
                            dispatch(updateStateBoard(data))
                        },
                        (error) => console.log(error)
                    )  
                }
            }            
        } 
        else{
            console.log('non è possibile effettuare mosse');
        }       
    }
}