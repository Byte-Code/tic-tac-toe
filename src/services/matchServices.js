import {calculateWinner,countEl} from '../utility/utility';

import {loadGameDataRequest,
        loadGameData,        
        loadGameDataSuccess,
        makeMove
} from '../actions/actions';

import {patchData,
        putMatchData,   
        getMatchDetail
} from './crudServices'

//Legge i dati di un Match su DB 
export const readDataMatch = () => {
    return dispatch => {           
        dispatch(loadGameDataRequest());
        const gameName = localStorage.getItem('gameName');  
        const userId = localStorage.getItem('userId');         
        return getMatchDetail(gameName)
        .then( 
                (response) => response.json(),
                (error) => console.log(error)
            )
        .then(
            (json) =>  {                     
                dispatch(checkMatchStatus(json, gameName, userId))                    
            }                                
        )        
    }            
}

//Aggiorna il Match
export const checkMatchStatus = (json, gameName, userId) => {        
    return dispatch => {                
        if(json===null){                         
            putMatchData(gameName, userId)
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
            dispatch(updateMatchDatails(gameName,json, userId ));                 
        }        
    }
}    

//Aggiorna DB e stato 
export const updateMatchDatails = (gameName,json, userId) => {
    return dispatch => {         
        if(userId !== json.playerX && json.playerO === undefined){
            patchData(gameName,'playerO',userId)
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

//Verifica se può essere effettuata una mossa e nel caso aggiorna la board
export const executeMove = (i,game) => {
    return dispatch => {        
        const gameName = localStorage.getItem('gameName');
        const userId = localStorage.getItem('userId');                   
        if (!calculateWinner(game.board) && (game.board[i]==="")) { 
                    
            const numX = countEl(game.board,'X');     
            const numO = countEl(game.board,'O');    
            if((game.playerX === userId) && (numX===numO)){        
                game.board[i] = 'X';  
                dispatch(updateBoard(gameName, game.board));             
                          
            }                 
            if((game.playerO === userId) && (numO<numX)){
                game.board[i] = 'O';       
                dispatch(updateBoard(gameName, game.board));                           
            }                        
        } 
    }
}

export const updateBoard = (gameName,board) => {
    return dispatch => {
        patchData(gameName,'board',board).
        then(
            response => dispatch(makeMove(board)),
            error => console.log(error)
        )         
    }
}