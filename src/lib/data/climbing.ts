// src/lib/data/climbing.ts
export interface ClimbingSession {
	id: string;
	date: string;
	location: string;
	timeOnWall: number; // minutes
	partners: string[];
	grades: Record<string, number>;
	notes?: string;
}

export const climbingSessions: ClimbingSession[] = [
	{
		id: '2024-11-23',
		date: '2024-11-23',
		location: 'Movement Baker',
		timeOnWall: 9 + 54 / 60,
		partners: ['Josh'],
		grades: {
			'5.9': 1,
			'5.10': 4
		}
	}
];
