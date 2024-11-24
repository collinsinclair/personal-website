// src/lib/utils/climbing-stats.ts
import { climbingSessions } from '../data/climbing';

export function calculateTotalClimbs(): number {
	return climbingSessions.reduce((total, session) => {
		return total + Object.values(session.grades).reduce((a, b) => a + b, 0);
	}, 0);
}

export function calculateGradeDistribution(): Record<string, number> {
	const distribution: Record<string, number> = {};

	climbingSessions.forEach((session) => {
		Object.entries(session.grades).forEach(([grade, count]) => {
			distribution[grade] = (distribution[grade] || 0) + count;
		});
	});

	return distribution;
}

export function calculateTotalTime(): number {
	return climbingSessions.reduce((total, session) => total + session.timeOnWall, 0);
}

export function getMostFrequentPartners(
	limit: number = 5
): Array<{ name: string; sessions: number }> {
	const partnerCounts: Record<string, number> = {};

	climbingSessions.forEach((session) => {
		session.partners.forEach((partner) => {
			partnerCounts[partner] = (partnerCounts[partner] || 0) + 1;
		});
	});

	return Object.entries(partnerCounts)
		.map(([name, sessions]) => ({ name, sessions }))
		.sort((a, b) => b.sessions - a.sessions)
		.slice(0, limit);
}

export function createGradePyramid(): string {
	const distribution = calculateGradeDistribution();
	const grades = Object.keys(distribution).sort().reverse();
	let pyramid = '';

	grades.forEach((grade) => {
		const count = distribution[grade];
		pyramid += `${grade.padStart(4)}  ${'█'.repeat(count)}\n`;
	});

	return pyramid;
}
