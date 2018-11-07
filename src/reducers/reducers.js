import {MAKE_MOVE,JUMP_TO} from '../actions/actions';
import {calculateWinner} from '../utility/utility';
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'

//Stato iniziale
const initializeHistory = { history:[ { squares: Array(9).fill(null) } ],
                            stepNumber:0,
                            xIsNext:true
                        }
                        
const gameReducer = (state = initializeHistory, actions) => {        
    switch (actions.type){        
        case MAKE_MOVE: 
            //Verifico se ho terminato la partita o cerca di cliccare su di una casella
            //già occupata
            if (calculateWinner(actions.squares) || actions.squares[actions.i]) {
                return Object.assign({}, state)
            }
            const history = state.history.slice(0, state.stepNumber + 1); //carica tutta la history     
            const current = history[history.length - 1];  //prende l'ultima square della history
            const squares = current.squares.slice();      //copia l'ultima square della history  
            squares[actions.i] = state.xIsNext ? "X" : "O";
            return Object.assign({}, state,{                
                history: history.concat([
                    {
                    squares: squares
                    }
                ]),
                stepNumber: state.stepNumber+1,
                xIsNext: !state.xIsNext
            });            
        case JUMP_TO:     
            //Carica la history dello step selezionato       
            const newHistory = state.history.slice(0, actions.step + 1);
            return Object.assign({}, state,{                
                history: newHistory,
                stepNumber: actions.step,
                xIsNext: (actions.step % 2) === 0
            });                                   
    default: return state;
    }
}


// Add firebase to reducers
const reducers = combineReducers({
    firebase: firebaseReducer,
    gameReducer
  })

  export default reducers