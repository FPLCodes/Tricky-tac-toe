<script>
	class Move {
		constructor() {
			let row, col;
		}
	}

	function isMovesLeft() {
		for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (board[i][j] == '') return true;

		return false;
	}

	function evaluate(board) {
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

	function minimax(board, depth, isMax) {
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
		if (isMovesLeft() == false) return 0;

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

	// Initialising variables
	let player = 'x',
		opponent = 'o';

	let board = [
		['', '', ''],
		['', '', ''],
		['', '', '']
	];

	let xScore = 0,
		oScore = 0;

	let winner = '';

	let xStyle = 'color: #D8A7B1;',
		oStyle = 'color: #A9C9C9';

	// Players move
	function handleClick(row, col) {
		if (winner === '' && board[row][col] === '') {
			board[row][col] = 'x';
			checkForWin();

			if (winner === '') {
				botMove();
				checkForWin();
			}
		}
	}

	function botMove() {
		let bestMove = findBestMove(board);

		// If bestMove is default value, it's a draw
		// Otherwise make move as usual
		if (bestMove.row === -1) winner = 'none';
		else if (winner === '') board[bestMove.row][bestMove.col] = 'o';
	}

	function checkForWin() {
		let score = evaluate(board);

		if (winner === '') {
			if (score === -10) {
				winner = 'X';
				xScore++;
			} else if (score === 10) {
				winner = 'O';
				oScore++;
			}
		}
	}

	function resetBoard() {
		board = [
			['', '', ''],
			['', '', ''],
			['', '', '']
		];
		winner = '';
	}
</script>

<div class="main">
	<div class="board">
		<div class="score">
			<h2>X: {xScore}</h2>
			<h2>O: {oScore}</h2>
		</div>
		<div class="row">
			<div
				style="border-top: none; border-left: none"
				class="box"
				on:click={() => handleClick(0, 0)}
			>
				{#if board[0][0] === 'x'}
					<p style={xStyle}>{board[0][0]}</p>
				{:else}
					<p style={oStyle}>{board[0][0]}</p>
				{/if}
			</div>

			<div style="border-top: none;" class="box" on:click={() => handleClick(0, 1)}>
				{#if board[0][1] === 'x'}
					<p style={xStyle}>{board[0][1]}</p>
				{:else}
					<p style={oStyle}>{board[0][1]}</p>
				{/if}
			</div>

			<div
				style="border-top: none; border-right: none"
				class="box"
				on:click={() => handleClick(0, 2)}
			>
				{#if board[0][2] === 'x'}
					<p style={xStyle}>{board[0][2]}</p>
				{:else}
					<p style={oStyle}>{board[0][2]}</p>
				{/if}
			</div>
		</div>

		<div class="row">
			<div style="border-left: none;" class="box" on:click={() => handleClick(1, 0)}>
				{#if board[1][0] === 'x'}
					<p style={xStyle}>{board[1][0]}</p>
				{:else}
					<p style={oStyle}>{board[1][0]}</p>
				{/if}
			</div>

			<div class="box" on:click={() => handleClick(1, 1)}>
				{#if board[1][1] === 'x'}
					<p style="color: #D8A7B1">{board[1][1]}</p>
				{:else}
					<p style="color: #A9C9C9">{board[1][1]}</p>
				{/if}
			</div>

			<div style="border-right: none;" class="box" on:click={() => handleClick(1, 2)}>
				{#if board[1][2] === 'x'}
					<p style={xStyle}>{board[1][2]}</p>
				{:else}
					<p style={oStyle}>{board[1][2]}</p>
				{/if}
			</div>
		</div>

		<div class="row">
			<div
				style="border-bottom: none; border-left: none"
				class="box"
				on:click={() => handleClick(2, 0)}
			>
				{#if board[2][0] === 'x'}
					<p style={xStyle}>{board[2][0]}</p>
				{:else}
					<p style={oStyle}>{board[2][0]}</p>
				{/if}
			</div>

			<div style="border-bottom: none;" class="box" on:click={() => handleClick(2, 1)}>
				{#if board[2][1] === 'x'}
					<p style="color: #D8A7B1">{board[2][1]}</p>
				{:else}
					<p style="color: #A9C9C9">{board[2][1]}</p>
				{/if}
			</div>

			<div
				style="border-bottom: none; border-right: none"
				class="box"
				on:click={() => handleClick(2, 2)}
			>
				{#if board[2][2] === 'x'}
					<p style={xStyle}>{board[2][2]}</p>
				{:else}
					<p style={oStyle}>{board[2][2]}</p>
				{/if}
			</div>
		</div>
	</div>

	<div class="bottom">
		<h1 style="margin-top: 3rem; cursor: pointer" on:click={() => resetBoard()}>RESET</h1>
		{#if winner === 'X' || winner === 'O'}
			<h1 style="text-align: center; margin-top: 2rem;">{winner} wins!</h1>
		{:else if winner === 'none'}
			<h1 style="text-align: center; margin-top: 2rem;">Draw!</h1>
		{/if}
	</div>
</div>

<style>
	.score {
		display: flex;
		gap: 6rem;
		justify-content: center;
		margin-bottom: 4rem;
		font-size: 2rem;
	}

	.board {
		line-height: 0px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.row {
		display: flex;
		text-align: center;
	}

	.box {
		border: solid 0.25rem;
		width: 6rem;
		height: 6rem;
		padding-bottom: 6px;
		font-size: 6rem;
		font-weight: 500;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.25s;
		cursor: default;
		animation: load 0.8s;
		animation-iteration-count: 1;
	}

	.box:hover {
		background-color: #b6e2d3;
	}

	@keyframes load {
		from {
			width: 0;
			opacity: 0;
		}
		to {
			width: 6rem;
			opacity: 1;
		}
	}

	.bottom {
		text-align: center;
	}
</style>
