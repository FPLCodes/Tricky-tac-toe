<script>
	class Move {
		constructor() {
			let row, col;
		}
	}

	function isMovesLeft(board) {
		for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (board[i][j] == '') return true;

		return false;
	}

	function evaluate(b) {
		// Checking all rows for X or O victory.
		for (let row = 0; row < 3; row++) {
			if (b[row][0] == b[row][1] && b[row][1] == b[row][2]) {
				if (b[row][0] == player) return +10;
				else if (b[row][0] == opponent) return -10;
			}
		}

		// Checking all columns for X or O victory.
		for (let col = 0; col < 3; col++) {
			if (b[0][col] == b[1][col] && b[1][col] == b[2][col]) {
				if (b[0][col] == player) return +10;
				else if (b[0][col] == opponent) return -10;
			}
		}

		// Checking all diagonals for X or O victory.
		if (b[0][0] == b[1][1] && b[1][1] == b[2][2]) {
			if (b[0][0] == player) return +10;
			else if (b[0][0] == opponent) return -10;
		}

		if (b[0][2] == b[1][1] && b[1][1] == b[2][0]) {
			if (b[0][2] == player) return +10;
			else if (b[0][2] == opponent) return -10;
		}

		// If draw, return 0
		return 0;
	}

	function minimax(board, depth, isMax) {
		// If there are no more moves and
		// no winner then it is a tie
		if (isMovesLeft(board) == false) return 0;

		let score = evaluate(board);

		// If Maximizer has won the game
		// return its evaluated score
		// subtract depth so the faster option is chosen
		if (score == 10) return score - depth;

		// If Minimizer has won the game
		// return its evaluated score
		// add depth so the faster option is chosen
		if (score == -10) return score - depth;
		``;
		// If maximizer's turn
		if (isMax) {
			let best = -1000;

			// Traverse all cells
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					// Check if cell is empty
					if (board[i][j] == '') {
						// Make the move
						board[i][j] = player;

						// Call minimax recursively
						// and choose the maximum value
						best = Math.max(best, minimax(board, depth + 1, !isMax));

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
						board[i][j] = opponent;

						// Call minimax recursively and choose minimum value
						best = Math.min(best, minimax(board, depth + 1, !isMax));

						// Undo the move
						board[i][j] = '';
					}
				}
			}
			return best;
		}
	}

	function findBestMove(board) {
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
					board[i][j] = player;

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

	// Initialising variables
	let player = 'x',
		opponent = 'o';

	let board = [
		['', '', ''],
		['', '', ''],
		['', '', '']
	];

	let firstTurn = true;
	let winner = '';

	// Players move
	function handleClick(row, col) {
		if (winner === '' && board[row][col] === '') {
			board[row][col] = 'x';
			botMove(row, col);
			checkForWin();
		}
	}

	function botMove(row, col) {
		if (firstTurn) {
			// This is just to add some 'randomness' to the game

			// Get random position for bot
			// if its the first turn
			let botRow = Math.floor(Math.random() * 3);
			let botCol = Math.floor(Math.random() * 3);

			// If the position is the same as the player,
			// get new position
			while (botRow === row || botCol === col) {
				botRow = Math.floor(Math.random() * 3);
				botCol = Math.floor(Math.random() * 3);
			}

			board[botRow][botCol] = 'o';
			firstTurn = false;
		} else {
			// If its not first turn then use the algorithm
			let bestMove = findBestMove(board);

			// If bestMove is default value then it's a draw
			if (bestMove.row === -1) winner = 'none';
			else board[bestMove.row][bestMove.col] = 'o';
		}
	}

	function checkForWin() {
		let score = evaluate(board);
		if (score === 10) winner = 'X';
		else if (score === -10) winner = 'O';
	}

	function resetBoard() {
		board = [
			['', '', ''],
			['', '', ''],
			['', '', '']
		];
		firstTurn = true;
		winner = '';
	}
</script>

<div class="main">
	<div class="board">
		<div class="row">
			<div
				style="border-top: none; border-left: none"
				class="box"
				on:click={() => handleClick(0, 0)}
			>
				{board[0][0]}
			</div>

			<div style="border-top: none;" class="box" on:click={() => handleClick(0, 1)}>
				{board[0][1]}
			</div>

			<div
				style="border-top: none; border-right: none"
				class="box"
				on:click={() => handleClick(0, 2)}
			>
				{board[0][2]}
			</div>
		</div>

		<div class="row">
			<div style="border-left: none;" class="box" on:click={() => handleClick(1, 0)}>
				{board[1][0]}
			</div>

			<div class="box" on:click={() => handleClick(1, 1)}>
				{board[1][1]}
			</div>

			<div style="border-right: none;" class="box" on:click={() => handleClick(1, 2)}>
				{board[1][2]}
			</div>
		</div>

		<div class="row">
			<div
				style="border-bottom: none; border-left: none"
				class="box"
				on:click={() => handleClick(2, 0)}
			>
				{board[2][0]}
			</div>

			<div style="border-bottom: none;" class="box" on:click={() => handleClick(2, 1)}>
				{board[2][1]}
			</div>

			<div
				style="border-bottom: none; border-right: none"
				class="box"
				on:click={() => handleClick(2, 2)}
			>
				{board[2][2]}
			</div>
		</div>
	</div>

	<div>
		<h1 style="text-align: center; margin-top: 6rem;" on:click={() => resetBoard()}>Reset</h1>
		{#if winner === 'X' || winner === 'O'}
			<h1 style="text-align: center; margin-top: 6rem;">{winner} won</h1>
		{:else if winner === 'none'}
			<h1 style="text-align: center; margin-top: 6rem;">Draw</h1>
		{/if}
	</div>
</div>

<style>
	.main {
		font-family: 'Roboto';
	}

	.board {
		margin-top: 40%;
		line-height: 0px;
		font-size: 28px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.row {
		display: flex;
		text-align: center;
	}

	.box {
		border: solid;
		width: 4.5rem;
		height: 4.5rem;
		font-size: 38px;
		font-weight: bold;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
