import minimax from '$lib/functions/minimax';

export default function findBestMove(board) {
	class Move {
		constructor() {
			let row, col;
		}
	}

	let opponent = 'o';

	let bestVal = -1000;
	let bestMove = new Move();
	bestMove.row = -1;
	bestMove.col = -1;

	// Traverse all cells and evaluate
	// minimax function for all empty cells.
	// Return the cell with optimal value.
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			// Check if cell is empty
			if (board[i][j] == '') {
				// Make the move
				board[i][j] = opponent;

				// compute evaluation function for this move.
				let moveVal = minimax(board, 0, false);

				// Undo the move
				board[i][j] = '';

				// If the value of the current move
				// is more than the best value, then
				// update best
				if (moveVal > bestVal) {
					bestMove.row = i;
					bestMove.col = j;
					bestVal = moveVal;
				}
			}
		}
	}
	return bestMove;
}
