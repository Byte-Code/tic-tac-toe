import React from 'react';
import '../index.css';

//Componente del singolo riquadro della scacchiera
const Square = (props) => {
    return (
      /*
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    */
      <button className="square" onClick={props.onClick}>
          {props.value}
      </button>
    );
  }

export default Square  