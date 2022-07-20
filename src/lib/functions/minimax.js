import isMovesLeft from '$lib/functions/isMovesLeft.js';
import evaluate from '$lib/functions/evaluate';

export default function minimax(board, depth, isMax) {
	let player = 'x',
		opponent = 'o';

	let score = evaluate(board);

	// If Maximizer has won the game
	// return its evaluated score
	// subtract depth so the faster option is chosen
	if (score == 10) return score - depth;

	// If Minimizer has won the game
	// return its evaluated score
	// add depth so the faster option is chosen
	if (score == -10) return score + depth;

	// If there are no more moves and
	// no winner then it is a tie
	if (isMovesLeft(board) == false) return 0;

	// If maximizer's turn
	if (isMax) {
		let best = -1000;

		// Traverse all cells
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				// Check if cell is empty
				if (board[i][j] == '') {
					// Make the move
					board[i][j] = opponent;

					// Call minimax recursively
					// and choose the maximum value
					best = Math.max(best, minimax(board, depth + 1, false));

					// Undo the move
					board[i][j] = '';
				}
			}
		}
		return best;
	}

	// If minimizer's turn
	else {
		let best = 1000;

		// Traverse all cells
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				// Check if cell is empty
				if (board[i][j] == '') {
					// Make the move
					board[i][j] = player;

					// Call minimax recursively and choose minimum value
					best = Math.min(best, minimax(board, depth + 1, true));

					// Undo the move
					board[i][j] = '';
				}
			}
		}
		return best;
	}
}
