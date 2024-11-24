<!-- src/lib/components/PianoDashboard.svelte -->
<script lang="ts">
	import {
		calculatePracticeTimeByGenre,
		calculateTotalPracticeTime,
		createPracticeTimeHistory,
		getPieceProgressChart,
		getRepertoireByStatus
	} from '../utils/piano-stats';
	import type { PieceStatus } from '../data/piano';
	import { practiceSessions } from '../data/piano';

	const totalTime = calculateTotalPracticeTime(30); // Last 30 days
	const genreTimes = calculatePracticeTimeByGenre(30);
	const practiceHistory = createPracticeTimeHistory(7); // Last 7 days
	const repertoire = getRepertoireByStatus();

	// Sort recent sessions by date
	$: sortedSessions = [...practiceSessions]
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 5);

	const statusTypes: PieceStatus[] = ['Active', 'Paused', 'Completed'];
</script>

<div class="dashboard">
	<!-- Overview Stats -->
	<div class="stats-grid">
		<div class="stat-box">
			<h3>Last 30 Days</h3>
			<div class="stat-value">
				{Math.floor(totalTime / 60)}h {totalTime % 60}m
			</div>
		</div>

		<!-- Practice Time Distribution -->
		<div class="stat-box">
			<h3>Genre Distribution</h3>
			<div class="genre-distribution">
				{#each Object.entries(genreTimes) as [genre, time]}
					<div class="genre-bar">
						<div class="label">{genre}</div>
						<div class="bar" style="width: {(time / totalTime) * 100}%">
							{Math.floor(time / 60)}h {Math.round(time % 60)}m
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Practice History -->
		<div class="stat-box">
			<h3>Last 7 Days</h3>
			<div class="history-chart">
				{#each practiceHistory as { date, duration }}
					<div class="day-bar">
						<div class="label">
							{new Date(date).toLocaleDateString(undefined, { weekday: 'short' })}
						</div>
						<div class="bar" style="width: {Math.min(duration / 180, 100)}%">
							{Math.floor(duration / 60)}h {duration % 60}m
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Repertoire Status -->
	<div class="repertoire-section">
		<h3>Current Repertoire</h3>
		<div class="repertoire-grid">
			{#each statusTypes as status}
				{#if repertoire[status]?.length}
					<div class="repertoire-group">
						<h4>{status}</h4>
						{#each repertoire[status] as piece}
							<div class="piece-card">
								<div class="piece-header">
									<span class="piece-name">{piece.name}</span>
									<span class="piece-genre">{piece.genre}</span>
								</div>
								<div class="progress-bar">
									{getPieceProgressChart(piece.name)}
								</div>
								{#if piece.lastPracticed}
									<div class="last-practiced">
										Last: {new Date(piece.lastPracticed).toLocaleDateString()}
									</div>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			{/each}
		</div>
	</div>

	<!-- Recent Sessions -->
	<div class="sessions-section">
		<h3>Recent Sessions</h3>
		<div class="sessions-list">
			{#each sortedSessions as session}
				<div class="session-card">
					<div class="session-header">
						<span class="date">
							{new Date(session.date).toLocaleDateString()}
							({session.duration}min)
						</span>
					</div>
					<div class="pieces-list">
						{#each session.pieces as { piece, focusAreas }}
							<div class="piece-entry">
								<span class="piece-name">{piece}</span>
								<div class="focus-areas">
									{#each focusAreas as area}
										<span class="focus-tag">{area}</span>
									{/each}
								</div>
							</div>
						{/each}
					</div>
					{#if session.goals}
						<div class="goals">
							{#if session.goals.achieved.length}
								<div class="achieved">
									✓ {session.goals.achieved.join(', ')}
								</div>
							{/if}
							{#if session.goals.inProgress?.length}
								<div class="in-progress">
									→ {session.goals.inProgress.join(', ')}
								</div>
							{/if}
						</div>
					{/if}
					{#if session.notes}
						<div class="notes">{session.notes}</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.dashboard {
		background: var(--color-background);
		color: var(--color-text);
		padding: 1rem;
		font-family: inherit;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.stat-box {
		border: 1px solid var(--color-primary);
		padding: 1rem;
		border-radius: 4px;
	}

	.stat-value {
		font-size: 2rem;
		color: var(--color-primary);
	}

	.genre-distribution,
	.history-chart {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.genre-bar,
	.day-bar {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.bar {
		background: var(--color-primary);
		height: 20px;
		display: flex;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-background);
		font-size: 0.8rem;
		transition: width 0.3s ease;
	}

	.repertoire-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1rem;
	}

	.piece-card {
		border: 1px solid var(--color-secondary);
		padding: 1rem;
		margin-bottom: 1rem;
		border-radius: 4px;
	}

	.piece-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}

	.session-card {
		border: 1px solid var(--color-secondary);
		padding: 1rem;
		margin-bottom: 1rem;
		border-radius: 4px;
	}

	.focus-tag {
		background: var(--color-secondary);
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		margin-right: 0.5rem;
		font-size: 0.8rem;
	}

	.goals {
		margin-top: 0.5rem;
		font-size: 0.9rem;
	}

	.achieved {
		color: var(--color-success);
	}

	.in-progress {
		color: var(--color-info);
	}

	.notes {
		margin-top: 0.5rem;
		font-style: italic;
		color: var(--color-info);
	}

	h3 {
		margin: 0 0 1rem 0;
		color: var(--color-primary);
	}

	h4 {
		margin: 0 0 0.5rem 0;
		color: var(--color-secondary);
	}
</style>
