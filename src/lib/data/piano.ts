// src/lib/data/piano.ts

export type Genre = 'Classical' | 'Jazz' | 'Musical Theatre';
export type PieceStatus = 'Active' | 'Completed' | 'Paused';

export interface Piece {
	name: string;
	composer?: string;
	show?: string; // For musical theatre pieces
	genre: Genre;
	status: PieceStatus;
	progress: number; // 0-10
	dateStarted: string;
	dateCompleted?: string;
	lastPracticed?: string;
	notes?: string;
	// Could be useful for pieces performed or for reference recordings
	performances?: Array<{
		date: string;
		venue?: string;
		notes?: string;
	}>;
}

export interface PracticeSession {
	id: string;
	date: string;
	startTime: string; // e.g., "19:00"
	duration: number; // in minutes
	pieces: {
		piece: string; // References name from Piece
		focusAreas: string[];
		progress?: string[];
		challenges?: string[];
		techniques?: string[]; // e.g., "Scales", "Arpeggios", "Sight-reading"
	}[];
	goals?: {
		achieved: string[];
		inProgress?: string[];
	};
	resources?: {
		type: 'Sheet Music' | 'Book' | 'Video' | 'Recording' | 'Other';
		name: string;
		notes?: string;
	}[];
	mood?: string;
	physicalState?: string;
	notes?: string;
}

// Example data
export const pieces: Piece[] = [
	{
		name: 'Nocturne Op. 9 No. 2',
		composer: 'Chopin',
		genre: 'Classical',
		status: 'Active',
		progress: 7,
		dateStarted: '2024-01-15',
		lastPracticed: '2024-03-23'
	},
	{
		name: 'Prelude in C Major',
		composer: 'Bach',
		genre: 'Classical',
		status: 'Completed',
		progress: 10,
		dateStarted: '2023-11-01',
		dateCompleted: '2024-02-15',
		lastPracticed: '2024-02-15',
		performances: [
			{
				date: '2024-02-15',
				venue: 'Student Recital',
				notes: 'Well received, good control of tempo'
			}
		]
	},
	{
		name: 'Autumn Leaves',
		genre: 'Jazz',
		status: 'Active',
		progress: 8,
		dateStarted: '2024-02-01',
		lastPracticed: '2024-03-23'
	},
	{
		name: 'Defying Gravity',
		show: 'Wicked',
		genre: 'Musical Theatre',
		status: 'Paused',
		progress: 6,
		dateStarted: '2024-01-01',
		lastPracticed: '2024-03-01',
		notes: 'On hold until summer season'
	}
];

export const practiceSessions: PracticeSession[] = [
	{
		id: '2024-03-23-1',
		date: '2024-03-23',
		startTime: '19:00',
		duration: 150, // 2.5 hours
		pieces: [
			{
				piece: 'Nocturne Op. 9 No. 2',
				focusAreas: ['Dynamics in mm. 1-16', 'Pedaling technique'],
				progress: ['Dynamics improving', 'Better control of rubato'],
				challenges: ['Hand tension during fast passages'],
				techniques: ['Pedaling', 'Dynamics', 'Expression']
			},
			{
				piece: 'Autumn Leaves',
				focusAreas: ['ii-V-I progressions', 'Voice leading'],
				progress: ['Comfortable in 6 keys'],
				challenges: ['Voice leading in bridge'],
				techniques: ['Improvisation', 'Chord Voicings']
			}
		],
		goals: {
			achieved: ['Complete Nocturne run-through without stops', 'ii-V-I in 6 keys'],
			inProgress: ['Memorize Autumn Leaves changes', 'Develop dynamic contrasts in Nocturne']
		},
		resources: [
			{
				type: 'Book',
				name: 'The Jazz Piano Book',
				notes: 'Chapter on voice leading'
			},
			{
				type: 'Recording',
				name: 'Rubinstein Nocturne recording',
				notes: 'Reference for rubato'
			}
		],
		mood: 'Focused and energetic',
		physicalState: 'Good posture maintained, no tension',
		notes: 'Productive session with good balance between pieces.'
	}
];
