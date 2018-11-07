import React from 'react';
import IncludeBoard from './IncludeBoard'
import {calculateWinner} from '../utility/utility'

//Componente che contiene l'intero gioco
class Game extends React.Component {    

    render() {       
      const history = this.props.history;             //Prende la history completa
      const current = history[this.props.stepNumber]; //Current contiene la History alla mossa stepNumber     
      const winner = calculateWinner(current.squares); 
  
      const moves = history.map((step, move) => {                   
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.props.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
  
      //Setta la label che visualizza il prossimo segno a muovere
      let status;
      if (winner) {
        status = "Winner: " + winner;        
      } else {
        status = "Next player: " + (this.props.xIsNext ? "X" : "O");
      }
      
      return (
        <IncludeBoard squares={current.squares}  
                      onClick={(i) => this.props.makeMove(i,current.squares)} 
                      status={status}
                      moves={moves}
       />
      );
    }
}

export default Game


