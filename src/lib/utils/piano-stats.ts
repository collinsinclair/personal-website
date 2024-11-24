// src/lib/utils/piano-stats.ts
import type { Genre, Piece, PieceStatus } from '../data/piano';
import { pieces, practiceSessions } from '../data/piano';

// Time-based statistics
export function calculateTotalPracticeTime(days?: number): number {
	let filteredSessions = practiceSessions;
	if (days) {
		const cutoff = new Date();
		cutoff.setDate(cutoff.getDate() - days);
		filteredSessions = practiceSessions.filter((session) => new Date(session.date) >= cutoff);
	}
	return filteredSessions.reduce((total, session) => total + session.duration, 0);
}

export function calculatePracticeTimeByGenre(days?: number): Record<Genre, number> {
	const genreTimes: Record<Genre, number> = {
		Classical: 0,
		Jazz: 0,
		'Musical Theatre': 0
	};

	let filteredSessions = practiceSessions;
	if (days) {
		const cutoff = new Date();
		cutoff.setDate(cutoff.getDate() - days);
		filteredSessions = practiceSessions.filter((session) => new Date(session.date) >= cutoff);
	}

	filteredSessions.forEach((session) => {
		session.pieces.forEach((practiced) => {
			const piece = pieces.find((p) => p.name === practiced.piece);
			if (piece) {
				// Split time evenly between pieces practiced in the session
				const timePerPiece = session.duration / session.pieces.length;
				genreTimes[piece.genre] += timePerPiece;
			}
		});
	});

	return genreTimes;
}

export function createPracticeTimeHistory(
	days: number = 7
): Array<{ date: string; duration: number }> {
	const history: Record<string, number> = {};
	const now = new Date();

	// Initialize all dates with 0 minutes
	for (let i = 0; i < days; i++) {
		const date = new Date(now);
		date.setDate(date.getDate() - i);
		history[date.toISOString().split('T')[0]] = 0;
	}

	// Fill in actual practice times
	practiceSessions.forEach((session) => {
		const sessionDate = session.date;
		if (history[sessionDate] !== undefined) {
			history[sessionDate] += session.duration;
		}
	});

	return Object.entries(history)
		.map(([date, duration]) => ({ date, duration }))
		.reverse();
}

// Repertoire analysis
export function getRepertoireByStatus(): Record<PieceStatus, Piece[]> {
	return pieces.reduce(
		(acc, piece) => {
			if (!acc[piece.status]) {
				acc[piece.status] = [];
			}
			acc[piece.status].push(piece);
			return acc;
		},
		{} as Record<PieceStatus, Piece[]>
	);
}

export function getPieceProgressChart(pieceName: string): string {
	const piece = pieces.find((p) => p.name === pieceName);
	if (!piece) return '';

	const CHART_WIDTH = 10;
	const filledBlocks = Math.round((piece.progress / 10) * CHART_WIDTH);
	return `[${'■'.repeat(filledBlocks)}${' '.repeat(CHART_WIDTH - filledBlocks)}] ${piece.progress}/10`;
}

export function getMostPracticedPieces(
	days: number = 30,
	limit: number = 5
): Array<{ name: string; minutes: number }> {
	const cutoff = new Date();
	cutoff.setDate(cutoff.getDate() - days);

	const pieceTimes: Record<string, number> = {};

	practiceSessions
		.filter((session) => new Date(session.date) >= cutoff)
		.forEach((session) => {
			const timePerPiece = session.duration / session.pieces.length;
			session.pieces.forEach((practiced) => {
				pieceTimes[practiced.piece] = (pieceTimes[practiced.piece] || 0) + timePerPiece;
			});
		});

	return Object.entries(pieceTimes)
		.sort(([, a], [, b]) => b - a)
		.slice(0, limit)
		.map(([name, minutes]) => ({ name, minutes }));
}

// Goal tracking
export function getRecentGoalProgress(limit: number = 5): Array<{
	achieved: string[];
	inProgress: string[];
	date: string;
}> {
	return practiceSessions
		.filter((session) => session.goals)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, limit)
		.map((session) => ({
			achieved: session.goals?.achieved || [],
			inProgress: session.goals?.inProgress || [],
			date: session.date
		}));
}

// Common challenges
export function getCommonChallenges(days: number = 30): string[] {
	const cutoff = new Date();
	cutoff.setDate(cutoff.getDate() - days);

	const challengeCounts: Record<string, number> = {};

	practiceSessions
		.filter((session) => new Date(session.date) >= cutoff)
		.forEach((session) => {
			session.pieces.forEach((practiced) => {
				practiced.challenges?.forEach((challenge) => {
					challengeCounts[challenge] = (challengeCounts[challenge] || 0) + 1;
				});
			});
		});

	return Object.entries(challengeCounts)
		.sort(([, a], [, b]) => b - a)
		.map(([challenge]) => challenge);
}
