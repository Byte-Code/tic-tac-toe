import {
    LOAD_GAME_DATE_REQUEST,
    LOAD_GAME_DATE_SUCCESS,
    LOAD_GAME_DATE_FAILURE, 
    UPDATE_STATE_BOARD,
    LOAD_GAME_DATA
} from '../actions/actions';


export const reducers = (state = {}, actions) => {        
    switch (actions.type){  
        case LOAD_GAME_DATE_REQUEST:               
            if(state.game !== undefined){                                                         
                return Object.assign({}, state,{   
                    game: {
                        ...state.game
                    },
                    userId:  state.userId, 
                    isFetching: true
                })         
            }                 
            else{
                return Object.assign({}, state,{ 
                    isFetching: true
                })    
            }
                                           
        case LOAD_GAME_DATE_SUCCESS:                    
                if(state.userId===undefined){                                                                                        
                    return Object.assign({}, state,{                
                        game: { 
                                board: Array(9).fill(null),
                                playerX: actions.playerX,
                                playerO: actions.playerO
                            },
                        userId:  ( actions.playerO===null ? actions.playerX : actions.playerO), 
                        isFetching: false                                              
                    })
                }

                //Aggiorno lo state dell'utente X con i dati di playerO 
                if((state.userId===state.game.playerX)&&(state.game.playerO===null)){
                    return Object.assign({}, state,{                
                        game: { 
                                board: state.game.board,
                                playerX: state.game.playerX,
                                playerO: actions.playerO
                            },
                        userId:  state.userId, 
                        isFetching: false                                              
                    })
                }   
                
                return state
                
        case UPDATE_STATE_BOARD:             
                return Object.assign({}, state,{ 
                    game:{
                            board: actions.board,
                            playerX: state.game.playerX,
                            playerO: state.game.playerO
                        },
                    userId:  state.userId, 
                    isFetching: false                                              
                });

        case LOAD_GAME_DATE_FAILURE:             
            return Object.assign({}, state,{                                                     
                isFetching: false        
            });         
                        
        case LOAD_GAME_DATA:
            return Object.assign({}, state,{                                                     
                game: {
                    board: actions.board,
                    playerX: actions.playerX,
                    playerO: actions.playerO                    
                },
                userId: actions.userId, 
                isFetching: false          
            });                            
                         
    default: return state;
    }
}

export default reducers