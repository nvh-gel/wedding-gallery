// ─── Types ────────────────────────────────────────────────────────────────────
export type Photo = { id: number; src: string; alt: string; caption: string }
export type Album = {
	id: string
	title: string
	subtitle: string
	coverSrc?: string
	/** IDs of the 5 photos shown as highlights on the homepage */
	highlightIds: number[]
	photos: Photo[]
}

// ─── Albums ───────────────────────────────────────────────────────────────────
export const albums: Album[] = [
	{
		id: 'church',
		title: 'In The Church',
		subtitle: 'May God bless our marriage',
		highlightIds: [1, 2, 3, 5, 6],
		photos: [
			{ id: 1,  src: 'https://picsum.photos/seed/wed-cer1/900/600',  alt: 'Ceremony', caption: 'A moment of pure love' },
			{ id: 2,  src: 'https://picsum.photos/seed/wed-cer2/600/900',  alt: 'The Vows', caption: 'Forever begins here' },
			{ id: 3,  src: 'https://picsum.photos/seed/wed-cer3/900/600',  alt: 'The Ring', caption: 'The symbol of eternity' },
			{ id: 4,  src: 'https://picsum.photos/seed/wed-cer4/600/900',  alt: 'The Kiss', caption: 'Sealed with a kiss' },
			{ id: 5,  src: 'https://picsum.photos/seed/wed-cer5/900/600',  alt: 'Together', caption: 'Together forever' },
			{ id: 6,  src: 'https://picsum.photos/seed/wed-cer6/600/900',  alt: 'Joy',     caption: 'Little moments of joy' },
		],
	},
	{
		id: 'ceremony',
		title: 'The Ceremony',
		subtitle: 'Embraced by the love of our close ones',
		highlightIds: [7, 9, 10, 11, 12],
		photos: [
			{ id: 7,  src: 'https://picsum.photos/seed/wed-rec1/900/600',  alt: 'Hall',    caption: 'Elegance in every corner' },
			{ id: 8,  src: 'https://picsum.photos/seed/wed-rec2/600/900',  alt: 'Table',   caption: 'A feast for the senses' },
			{ id: 9,  src: 'https://picsum.photos/seed/wed-rec3/900/600',  alt: 'Cake',    caption: 'Sweet beginnings' },
			{ id: 10, src: 'https://picsum.photos/seed/wed-rec4/600/900',  alt: 'Toasts',  caption: 'Words from the heart' },
			{ id: 11, src: 'https://picsum.photos/seed/wed-rec5/900/600',  alt: 'Guests',  caption: 'Surrounded by love' },
			{ id: 12, src: 'https://picsum.photos/seed/wed-rec6/600/900',  alt: 'Flowers', caption: 'Beauty in bloom' },
		],
	},
	{
		id: 'partyDL',
		title: 'The Party',
		subtitle: 'Celebrate our marriage with family & friends',
		highlightIds: [13, 14, 15, 17, 18],
		photos: [
			{ id: 13, src: 'https://picsum.photos/seed/wed-por1/900/600',  alt: 'Portrait', caption: 'In your eyes, my home' },
			{ id: 14, src: 'https://picsum.photos/seed/wed-por2/600/900',  alt: 'Portrait', caption: 'Side by side' },
			{ id: 15, src: 'https://picsum.photos/seed/wed-por3/900/600',  alt: 'Portrait', caption: 'Golden hour love' },
			{ id: 16, src: 'https://picsum.photos/seed/wed-por4/600/900',  alt: 'Portrait', caption: 'Forever in frame' },
			{ id: 17, src: 'https://picsum.photos/seed/wed-por5/900/600',  alt: 'Portrait', caption: 'Written in the stars' },
			{ id: 18, src: 'https://picsum.photos/seed/wed-por6/600/900',  alt: 'Portrait', caption: 'Love in bloom' },
		],
	},
	{
		id: 'lovenest',
		title: 'Our Love Nest',
		subtitle: 'Moment of joy and happiness in our sweet home',
		highlightIds: [19, 20, 22, 23, 24],
		photos: [
			{ id: 19, src: 'https://picsum.photos/seed/wed-dan1/900/600',  alt: 'Home',    caption: 'Our first dance as one' },
			{ id: 20, src: 'https://picsum.photos/seed/wed-dan2/600/900',  alt: 'Home',    caption: 'Spinning into forever' },
			{ id: 21, src: 'https://picsum.photos/seed/wed-dan3/900/600',  alt: 'Home',    caption: 'Music in our hearts' },
			{ id: 22, src: 'https://picsum.photos/seed/wed-dan4/600/900',  alt: 'Home',    caption: 'Every step together' },
			{ id: 23, src: 'https://picsum.photos/seed/wed-dan5/900/600',  alt: 'Home',    caption: 'Joy in motion' },
			{ id: 24, src: 'https://picsum.photos/seed/wed-dan6/600/900',  alt: 'Home',    caption: 'The night was ours' },
		],
	},
	{
		id: 'celebration',
		title: 'Just Married',
		subtitle: 'Sweet drinks and dances to celebrate our marriage',
		highlightIds: [25, 26, 28, 29, 30],
		photos: [
			{ id: 25, src: 'https://picsum.photos/seed/wed-jm1/900/600',   alt: 'Dance',   caption: 'Our first dance as one' },
			{ id: 26, src: 'https://picsum.photos/seed/wed-jm2/600/900',   alt: 'Dance',   caption: 'Spinning into forever' },
			{ id: 27, src: 'https://picsum.photos/seed/wed-jm3/900/600',   alt: 'Dance',   caption: 'Music in our hearts' },
			{ id: 28, src: 'https://picsum.photos/seed/wed-jm4/600/900',   alt: 'Dance',   caption: 'Every step together' },
			{ id: 29, src: 'https://picsum.photos/seed/wed-jm5/900/600',   alt: 'Dance',   caption: 'Joy in motion' },
			{ id: 30, src: 'https://picsum.photos/seed/wed-jm6/600/900',   alt: 'Dance',   caption: 'The night was ours' },
		],
	},
]

// ─── Deterministic petal data ─────────────────────────────────────────────────
export const PETALS = Array.from({ length: 22 }, (_, i) => ({
	id: i,
	left: `${3 + (i * 4.3) % 93}%`,
	delay: `${(i * 0.7) % 12}s`,
	duration: `${10 + (i * 1.1) % 14}s`,
	size: 8 + (i % 4) * 3,
	variant: i % 3,
}))
