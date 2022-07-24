<script>
	// Importing components
	import XDraw from '$lib/components/XDraw.svelte';
	import ODraw from '$lib/components/ODraw.svelte';

	// Importing functions
	import evaluate from '$lib/functions/evaluate';
	import findBestMove from '$lib/functions/findBestMove';

	// Initialising variables
	let board = [
		['', '', ''],
		['', '', ''],
		['', '', '']
	];

	let xScore = 0,
		oScore = 0;

	let winner = '';

	let canClick = '';

	// Players move
	function handleClick(row, col) {
		if (winner === '' && board[row][col] === '') {
			board[row][col] = 'x';
			canClick = 'pointer-events:none';
			setTimeout(() => {
				canClick = '';
			}, 1200);
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

<div class="container">
	<div class="score">
		<div class="score-card">
			<h2 style="color: #D8A7B1;">X: {xScore}</h2>
		</div>
		<div class="score-card">
			<h2 style="color: #A9C9C9">O: {oScore}</h2>
		</div>
	</div>
	<div class="board" style={canClick}>
		<div class="row">
			<div
				style="border-top: none; border-left: none"
				class="box"
				on:click={() => handleClick(0, 0)}
			>
				{#if board[0][0] === 'x'}
					<XDraw />
				{:else if board[0][0] === 'o'}
					<ODraw />
				{/if}
			</div>

			<div style="border-top: none;" class="box" on:click={() => handleClick(0, 1)}>
				{#if board[0][1] === 'x'}
					<XDraw />
				{:else if board[0][1] === 'o'}
					<ODraw />
				{/if}
			</div>

			<div
				style="border-top: none; border-right: none"
				class="box"
				on:click={() => handleClick(0, 2)}
			>
				{#if board[0][2] === 'x'}
					<XDraw />
				{:else if board[0][2] === 'o'}
					<ODraw />
				{/if}
			</div>
		</div>

		<div class="row">
			<div style="border-left: none;" class="box" on:click={() => handleClick(1, 0)}>
				{#if board[1][0] === 'x'}
					<XDraw />
				{:else if board[1][0] === 'o'}
					<ODraw />
				{/if}
			</div>

			<div class="box" on:click={() => handleClick(1, 1)}>
				{#if board[1][1] === 'x'}
					<XDraw />
				{:else if board[1][1] === 'o'}
					<ODraw />
				{/if}
			</div>

			<div style="border-right: none;" class="box" on:click={() => handleClick(1, 2)}>
				{#if board[1][2] === 'x'}
					<XDraw />
				{:else if board[1][2] === 'o'}
					<ODraw />
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
					<XDraw />
				{:else if board[2][0] === 'o'}
					<ODraw />
				{/if}
			</div>

			<div style="border-bottom: none;" class="box" on:click={() => handleClick(2, 1)}>
				{#if board[2][1] === 'x'}
					<XDraw />
				{:else if board[2][1] === 'o'}
					<ODraw />
				{/if}
			</div>

			<div
				style="border-bottom: none; border-right: none"
				class="box"
				on:click={() => handleClick(2, 2)}
			>
				{#if board[2][2] === 'x'}
					<XDraw />
				{:else if board[2][2] === 'o'}
					<ODraw />
				{/if}
			</div>
		</div>
	</div>

	<div style="text-align: center;">
		{#if winner === 'X' || winner === 'O'}
			<h1 style="text-align: center; margin-top: 1.3rem;">{winner} wins!</h1>
		{:else if winner === 'none'}
			<h1 style="text-align: center; margin-top: 1.3rem;">Draw!</h1>
		{/if}
		<h1 class="reset" on:click={() => resetBoard()}>RESET</h1>
	</div>
</div>

<style>
	.score {
		display: flex;
		gap: 3.5rem;
		margin-bottom: 3.5rem;
		font-size: 2.3rem;
	}

	.score-card {
		background-color: #f9eae3;
		border: solid 4px #d98491;
		border-radius: 0.75rem;
		width: 9rem;
		height: 7rem;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
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
		width: 7rem;
		height: 7rem;
		padding-bottom: 6px;
		font-size: 6.5rem;
		font-weight: 500;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.25s;
		cursor: default;
		animation: load 0.8s ease-in-out;
		animation-iteration-count: 1;
	}

	.box:hover {
		background-color: #d6e8e2;
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

	.reset {
		margin-top: 3rem;
		cursor: pointer;
		border: solid 3px;
		border-radius: 6px;
		transition: ease-in;
		transition-duration: 0.1s;
	}

	.reset:hover {
		background-color: #fdc4c4;
	}
</style>
