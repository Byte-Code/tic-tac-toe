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
    const intervalId =  setInterval(this.props.initAppAndUpdate,1000);   
  }

  verifyMove = () => {
    const userId= localStorage.getItem('userId');
    return( 
      (this.props.game!== undefined) && 
      ((this.props.game.playerX !==null) && (this.props.game.playerO !== null))&&            
      ((userId!=undefined) && (this.props.userId==userId))
      )       
  }

  player () {
    const userId= localStorage.getItem('userId');
    if(this.props.game!== undefined){
      if(this.props.game.playerX===userId) { return 'X' }
      if(this.props.game.playerO===userId) { return 'O' }
      return 'Spettatore'
    }
  }
     
  render() {   
    
    const gameUndefined = this.props.game === undefined;
    console.log(gameUndefined)
    if(!gameUndefined){
      const board = this.props.game.board;  
      const winner = calculateWinner(board);

      //Setta la label che visualizza il player o il vincitore 
      let status;
      if (winner) {
        status = "Winner: " + winner;        
      } 
      else {
        status = "Player " +this.player();;
      } 


      const canMove = this.verifyMove();            
      return (
        <div>            
          <IncludeBoard board={board}  
                        onClick={ (canMove) ? (i) => this.props.move(i) : (e) => alert('Non è possibile effettuare giocate')  }                                            
                        status={status}                      
          />
        </div>
      );  
    }
    
    return (
      <div> 
        Prevedere schermata di caricamento
      </div>
      );
    
    
  }
    
}


export default Game
