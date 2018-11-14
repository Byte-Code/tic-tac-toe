import React from 'react';
import IncludeBoard from './IncludeBoard';
import {calculateWinner} from '../utility/utility';
import {firebaseDB} from '../utility/firebaseService';
import fetch from 'cross-fetch';
import {initState} from '../actions/actions'
import uuidv1 from 'uuid/v1';

//Componente che contiene l'intero gioco
class Game extends React.Component {
  
  componentWillMount(){  
    localStorage.setItem('gameName',this.props.match.params.gameName);       
    const idUser= localStorage.getItem('userId'); 
    if(idUser===null){  
      localStorage.setItem('userId',uuidv1());      
    }    
    const intervalId =  setInterval(this.props.initAppAndUpdate,5000);   
  }
     
  render() {
        
      //return(<div></div>)
      /*
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
      */      
           
      const board = (this.props.game === undefined ? Array(9).fill(null) : this.props.game.board);      
      return (
        <div>            
          <IncludeBoard board={board}  
                        //onClick={(i) => this.props.makeMove(i,board,idUser)}                       
                        //status={status}
                        //moves={moves}
          />
        </div>
      );
    }
    
    }


export default Game
