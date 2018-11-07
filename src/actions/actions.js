export const MAKE_MOVE = 'MAKE_MOVE'
export const JUMP_TO = 'JUMP_TO'

//Azione che permetti di effettuare una mossa
export const makeMove = (i,squares) => ({
    type: MAKE_MOVE,
    i,
    squares
})

//Azione che permette di effettuare un Jump nella history
export const jumpTo = (step) => ({
    type: JUMP_TO,
    step
})


