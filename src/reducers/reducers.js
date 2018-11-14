import {
    LOAD_GAME_DATE_REQUEST,
    LOAD_GAME_DATE_SUCCESS,
    LOAD_GAME_DATE_FAILURE, 
    MAKE_MOVE,
    HACK_STATE
} from '../utility/actionsServices';


export const reducers = (state = {}, actions) => {        
    switch (actions.type){  
        case LOAD_GAME_DATE_REQUEST:               
            if(state.game !== undefined){                                                         
                return Object.assign({}, state,{   
                    game: {...state.game},
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
                        game:
                            { 
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
                        game:
                            { 
                                board: state.game.board,
                                playerX: state.game.playerX,
                                playerO: actions.playerO
                            },
                        userId:  state.userId, 
                        isFetching: false                                              
                    })
                }   
                
                return state
                                                         
        case LOAD_GAME_DATE_FAILURE:             
            return Object.assign({}, state,{                                                     
                isFetching: false        
            }); 
                        
        case HACK_STATE:
            return Object.assign({}, state,{                                                     
                game: {
                    board: actions.board,
                    playerX: actions.playerX,
                    playerO: actions.playerO                    
                },
                userId: actions.userId, 
                isFetching: false          
            });
                
            
        case MAKE_MOVE: 
            if((state.game.playerX === state.userId) || (state.game.playerO === state.userId)){
                return Object.assign({}, state,{ 
                
                });
            }            
            return state;                 
        /*       
        case JUMP_TO:     
            //Carica la history dello step selezionato                  
            return Object.assign({}, state,{ });                                   
        */    
    default: return state;
    }
}

export default reducers