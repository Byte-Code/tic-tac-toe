import {connect} from 'react-redux'
import Game from '../components/Game'
import {makeMove, jumpTo} from '../actions/actions'

/* 
Wrappa il componente Game e permette di usare le proprietà in mapStateToProps
e le actions definite in actions.js
*/

const mapStateToProps = (state) => ({ 
    history: state.history,
    stepNumber: state.stepNumber,
    xIsNext: state.xIsNext
})

const GameContainers = connect(
    mapStateToProps,
    {
        makeMove: makeMove, 
        jumpTo: jumpTo
    }
  )(Game)
  
  export default GameContainers