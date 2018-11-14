import React from 'react';
import Board from './Board'
import '../index.css';

//Componente che include la Board
const IncludeBoard = (props) =>{
    return (
    <div className="game">
        <div className="game-board">
            <Board
                board={props.board}
                //onClick={props.onClick}
            />
        </div>
        {/*
        <div className="game-info">
            <div>{props.status}</div>
            <ol>{props.moves}</ol>
        </div>
        */}
    </div>
    )
}

export default IncludeBoard