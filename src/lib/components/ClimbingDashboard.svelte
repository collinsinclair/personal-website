<!-- src/lib/components/ClimbingDashboard.svelte -->
<script lang="ts">
	import { climbingSessions } from '../data/climbing';
	import {
		calculateGradeDistribution,
		calculateTotalClimbs,
		calculateTotalTime,
		getMostFrequentPartners
	} from '../utils/climbing-stats';

	const totalClimbs = calculateTotalClimbs();
	const totalTime = calculateTotalTime();
	const gradeDistribution = calculateGradeDistribution();
	const frequentPartners = getMostFrequentPartners();

	// Sort sessions by date descending
	$: sortedSessions = [...climbingSessions].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
</script>

<div class="dashboard">
	<div class="stats-grid">
		<div class="stat-box">
			<h3>Total Climbs</h3>
			<div class="stat-value">{totalClimbs}</div>
		</div>

		<div class="stat-box">
			<h3>Total Time</h3>
			<div class="stat-value">{Math.round(totalTime / 60)}h {totalTime % 60}m</div>
		</div>

		<div class="stat-box">
			<h3>Grade Distribution</h3>
			<div class="grade-bars">
				{#each Object.entries(gradeDistribution) as [grade, count]}
					<div class="grade-bar">
						<div class="label">{grade}</div>
						<div class="bar" style="width: {count * 20}px">{count}</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="stat-box">
			<h3>Frequent Partners</h3>
			<ul class="partner-list">
				{#each frequentPartners as { name, sessions }}
					<li>{name} ({sessions} sessions)</li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="sessions-list">
		<h3>Recent Sessions</h3>
		<div class="sessions">
			{#each sortedSessions.slice(0, 5) as session}
				<div class="session-card">
					<div class="session-header">
						<span class="date">{new Date(session.date).toLocaleDateString()}</span>
						<span class="location">{session.location}</span>
					</div>
					<div class="session-grades">
						{#each Object.entries(session.grades) as [grade, count]}
							<span class="grade-tag">{grade}: {count}</span>
						{/each}
					</div>
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

	.grade-bars {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.grade-bar {
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
	}

	.session-card {
		border: 1px solid var(--color-secondary);
		padding: 1rem;
		margin-bottom: 1rem;
		border-radius: 4px;
	}

	.session-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}

	.grade-tag {
		background: var(--color-secondary);
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		margin-right: 0.5rem;
		font-size: 0.8rem;
	}

	.notes {
		margin-top: 0.5rem;
		font-style: italic;
		color: var(--color-info);
	}
</style>
