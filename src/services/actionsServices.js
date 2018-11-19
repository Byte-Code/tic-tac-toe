import {calculateWinner,countEl} from '../utility/utility';

import {loadGameDataRequest,
        loadGameData,
        updateStateBoard,
        loadGameDataSuccess
} from '../actions/actions';

import {addPlayerO,
        initMatchOnServer,
        addNewBoard
} from './crudServices'

import {urlDB} from '../services/firebaseService';

//Legge i dati di un Match su DB 
export const readDataMatch = () => {
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

//Aggiorna DB e stato 
export const updateDBandState = (urlMatch,json) => {
    return dispatch => {
        const userId = localStorage.getItem('userId');  
        if(userId !== json.playerX && json.playerO === undefined){
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
            dispatch(loadGameData(json.board,json.playerX,json.playerO,userId));
        }        
    }
}

//Aggiorna il Match
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

//Permette di effettuare una mossa
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

//Verifica se può essere effettuata una mossa e nel caso aggiorna la board
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
            console.log('partita finita');
        }       
    }
}