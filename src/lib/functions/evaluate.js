export default function evaluate(board) {
	let player = 'x',
		opponent = 'o';

	// Checking all rows for X or O victory.
	for (let row = 0; row < 3; row++) {
		if (board[row][0] == board[row][1] && board[row][1] == board[row][2]) {
			if (board[row][0] == opponent) return +10;
			else if (board[row][0] == player) return -10;
		}
	}

	// Checking all columns for X or O victory.
	for (let col = 0; col < 3; col++) {
		if (board[0][col] == board[1][col] && board[1][col] == board[2][col]) {
			if (board[0][col] == opponent) return +10;
			else if (board[0][col] == player) return -10;
		}
	}

	// Checking all diagonals for X or O victory.
	if (board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
		if (board[0][0] == opponent) return +10;
		else if (board[0][0] == player) return -10;
	}

	if (board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
		if (board[0][2] == opponent) return +10;
		else if (board[0][2] == player) return -10;
	}

	// If draw, return 0
	return 0;
}
