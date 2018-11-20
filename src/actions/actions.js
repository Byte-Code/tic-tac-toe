export const LOAD_GAME_DATE_REQUEST = 'LOAD_GAME_DATE_REQUEST';
export const LOAD_GAME_DATE_SUCCESS = 'LOAD_GAME_DATE_SUCCESS';
export const LOAD_GAME_DATE_FAILURE = 'LOAD_GAME_DATE_FAILURE';
export const LOAD_GAME_DATA = 'LOAD_GAME_DATA';
export const UPDATE_STATE_BOARD = 'UPDATE_STATE_BOARD'

export const loadGameDataRequest = () =>({
    type: LOAD_GAME_DATE_REQUEST     
});

export const loadGameDataSuccess = (playerX,playerO) => ({
    type: LOAD_GAME_DATE_SUCCESS,    
    playerX,
    playerO
});

export const loadGameDataError = () => ({
    type: LOAD_GAME_DATE_FAILURE
});

export const loadGameData = (board, playerX, playerO, userId) =>({
    type: LOAD_GAME_DATA,
    board,
    playerX,
    playerO,
    userId
});

export const makeMove = (board) => ({
    type: UPDATE_STATE_BOARD,
    board
});






        
        

