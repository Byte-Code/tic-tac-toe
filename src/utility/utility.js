//Funzione che verifica se esiste un vincitore
export function calculateWinner(squares) {
    const lines = [
      //Combinazioni vincenti  
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]; //Decostruct
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}

export const countEl = (array,el) => {
  var count = 0;
  for(var i = 0; i < array.length; ++i){
      if(array[i] === el)
          count++;
  }
  return count;
}