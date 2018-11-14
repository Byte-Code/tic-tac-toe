import {connect} from 'react-redux'
import Game from '../components/Game'
import {makeMove} from '../utility/actionsServices'
import * as actions from '../actions/actions'

/* 
Wrappa il componente Game e permette di usare le proprietà in mapStateToProps
e le actions definite in actions.js
*/
const mapStateToProps = (state) => ({     
    game: state.game            
})

const GameContainers = connect(
    mapStateToProps,
    {          
        //jumpTo: actions.jumpTo,   
        initAppAndUpdate: actions.initAppAndUpdate, 
        makeMove : makeMove
            
    }
  )(Game)
  
  export default GameContainers