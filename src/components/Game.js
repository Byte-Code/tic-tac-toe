import React from 'react';
import IncludeBoard from './IncludeBoard';
import {calculateWinner} from '../utility/utility';
import uuidv1 from 'uuid/v1';

//Componente che contiene l'intero gioco
class Game extends React.Component {
  
  componentWillMount(){  
    localStorage.setItem('gameName',this.props.match.params.gameName);       
    const userId= localStorage.getItem('userId'); 
    if(userId===null){  
      localStorage.setItem('userId',uuidv1());      
    }    
    const intervalId =  setInterval(this.props.readDataMatch,1000);   
  }

  symbolPlayer () {
    const userId= localStorage.getItem('userId');
    if(this.props.game!== undefined){
      if(this.props.game.playerX===userId) { return 'X' }
      if(this.props.game.playerO===userId) { return 'O' }
      return 'Spettatore'
    }
  }
     
  render() {   
    
    const gameUndefined = this.props.game === undefined;
    
    if(!gameUndefined){
      const board = this.props.game.board;  
      const winner = calculateWinner(board);

      //Setta la label che visualizza il player o il vincitore 
      let status;
      if (winner) {
        status = "Winner: " + winner;        
      } 
      else {
        status = "Player " +this.symbolPlayer();
      }                 
      return (
        <div>            
          <IncludeBoard board={board}  
                        onClick={ (i) => this.props.move(i) }                                            
                        status={status}                      
          />
        </div>
      );  
    }
    
    return (
      <div> 
        ...load
      </div>
      );
    
  }
    
}


export default Game
