import {connect} from 'react-redux';
import Game from '../components/Game';
import {readDataMatch,move} from '../services/actionsServices';

/* 
Wrappa il componente Game e permette di usare le proprietà in mapStateToProps
e le actions definite in actions.js
*/
const mapStateToProps = (state) => ({     
    game: state.game,     
    userId: state.userId         
})

const GameContainers = connect(
    mapStateToProps,
    {                  
        readDataMatch: readDataMatch, 
        move : move
            
    }
  )(Game)
  
  export default GameContainers