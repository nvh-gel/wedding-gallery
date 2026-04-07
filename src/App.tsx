import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import './App.css'

// ─── Types ────────────────────────────────────────────────────────────────────
type Photo = { id: number; src: string; alt: string; caption: string }
type Album = { id: string; title: string; subtitle: string; photos: Photo[] }

// ─── Data ─────────────────────────────────────────────────────────────────────
const albums: Album[] = [
	{
		id: 'church',
		title: 'In The Church',
		subtitle: 'May God bless our marriage',
		photos: [
			{
				id: 1,
				src: 'https://picsum.photos/seed/wed-cer1/900/600',
				alt: 'Ceremony',
				caption: 'A moment of pure love',
			},
			{
				id: 2,
				src: 'https://picsum.photos/seed/wed-cer2/600/900',
				alt: 'The Vows',
				caption: 'Forever begins here',
			},
			{
				id: 3,
				src: 'https://picsum.photos/seed/wed-cer3/900/600',
				alt: 'The Ring',
				caption: 'The symbol of eternity',
			},
			{
				id: 4,
				src: 'https://picsum.photos/seed/wed-cer4/600/900',
				alt: 'The Kiss',
				caption: 'Sealed with a kiss',
			},
			{
				id: 5,
				src: 'https://picsum.photos/seed/wed-cer5/900/600',
				alt: 'Together',
				caption: 'Together forever',
			},
			{
				id: 6,
				src: 'https://picsum.photos/seed/wed-cer6/600/900',
				alt: 'Joy',
				caption: 'Little moments of joy',
			},
		],
	},
	{
		id: 'ceremony',
		title: 'The Ceremony',
		subtitle: 'Embraced by the love of our close ones',
		photos: [
			{
				id: 7,
				src: 'https://picsum.photos/seed/wed-rec1/900/600',
				alt: 'Hall',
				caption: 'Elegance in every corner',
			},
			{
				id: 8,
				src: 'https://picsum.photos/seed/wed-rec2/600/900',
				alt: 'Table',
				caption: 'A feast for the senses',
			},
			{
				id: 9,
				src: 'https://picsum.photos/seed/wed-rec3/900/600',
				alt: 'Cake',
				caption: 'Sweet beginnings',
			},
			{
				id: 10,
				src: 'https://picsum.photos/seed/wed-rec4/600/900',
				alt: 'Toasts',
				caption: 'Words from the heart',
			},
			{
				id: 11,
				src: 'https://picsum.photos/seed/wed-rec5/900/600',
				alt: 'Guests',
				caption: 'Surrounded by love',
			},
			{
				id: 12,
				src: 'https://picsum.photos/seed/wed-rec6/600/900',
				alt: 'Flowers',
				caption: 'Beauty in bloom',
			},
		],
	},
	{
		id: 'partyDL',
		title: 'The Party',
		subtitle: 'Celebrate our marriage with family & friends',
		photos: [
			{
				id: 13,
				src: 'https://picsum.photos/seed/wed-por1/900/600',
				alt: 'Portrait',
				caption: 'In your eyes, my home',
			},
			{
				id: 14,
				src: 'https://picsum.photos/seed/wed-por2/600/900',
				alt: 'Portrait',
				caption: 'Side by side',
			},
			{
				id: 15,
				src: 'https://picsum.photos/seed/wed-por3/900/600',
				alt: 'Portrait',
				caption: 'Golden hour love',
			},
			{
				id: 16,
				src: 'https://picsum.photos/seed/wed-por4/600/900',
				alt: 'Portrait',
				caption: 'Forever in frame',
			},
			{
				id: 17,
				src: 'https://picsum.photos/seed/wed-por5/900/600',
				alt: 'Portrait',
				caption: 'Written in the stars',
			},
			{
				id: 18,
				src: 'https://picsum.photos/seed/wed-por6/600/900',
				alt: 'Portrait',
				caption: 'Love in bloom',
			},
		],
	},
	{
		id: 'lovenest',
		title: 'Our Love Nest',
		subtitle: 'Moment of joy and happiness in our sweet home',
		photos: [
			{
				id: 19,
				src: 'https://picsum.photos/seed/wed-dan1/900/600',
				alt: 'First Dance',
				caption: 'Our first dance as one',
			},
			{
				id: 20,
				src: 'https://picsum.photos/seed/wed-dan2/600/900',
				alt: 'Dance',
				caption: 'Spinning into forever',
			},
			{
				id: 21,
				src: 'https://picsum.photos/seed/wed-dan3/900/600',
				alt: 'Dance',
				caption: 'Music in our hearts',
			},
			{
				id: 22,
				src: 'https://picsum.photos/seed/wed-dan4/600/900',
				alt: 'Dance',
				caption: 'Every step together',
			},
			{
				id: 23,
				src: 'https://picsum.photos/seed/wed-dan5/900/600',
				alt: 'Dance',
				caption: 'Joy in motion',
			},
			{
				id: 24,
				src: 'https://picsum.photos/seed/wed-dan6/600/900',
				alt: 'Dance',
				caption: 'The night was ours',
			},
		],
	},
	{
		id: 'celebration',
		title: 'Just Married',
		subtitle: 'Sweet drinks and dances to celebrate our marriage',
		photos: [
			{
				id: 19,
				src: 'https://picsum.photos/seed/wed-dan1/900/600',
				alt: 'First Dance',
				caption: 'Our first dance as one',
			},
			{
				id: 20,
				src: 'https://picsum.photos/seed/wed-dan2/600/900',
				alt: 'Dance',
				caption: 'Spinning into forever',
			},
			{
				id: 21,
				src: 'https://picsum.photos/seed/wed-dan3/900/600',
				alt: 'Dance',
				caption: 'Music in our hearts',
			},
			{
				id: 22,
				src: 'https://picsum.photos/seed/wed-dan4/600/900',
				alt: 'Dance',
				caption: 'Every step together',
			},
			{
				id: 23,
				src: 'https://picsum.photos/seed/wed-dan5/900/600',
				alt: 'Dance',
				caption: 'Joy in motion',
			},
			{
				id: 24,
				src: 'https://picsum.photos/seed/wed-dan6/600/900',
				alt: 'Dance',
				caption: 'The night was ours',
			},
		],
	},
]

// Deterministic petal data — stable across re-renders
const PETALS = Array.from({ length: 22 }, (_, i) => ({
	id: i,
	left: `${3 + (i * 4.3) % 93}%`,
	delay: `${(i * 0.7) % 12}s`,
	duration: `${10 + (i * 1.1) % 14}s`,
	size: 8 + (i % 4) * 3,
	variant: i % 3,
}))

// ─── Floating Petals ──────────────────────────────────────────────────────────
function FloatingPetals() {
	return (
		<div className="petals-container" aria-hidden="true">
			{PETALS.map(p => (
				<span
					key={p.id}
					className={`petal petal-v${p.variant}`}
					style={{
						left: p.left,
						width: p.size,
						height: p.size,
						animationDelay: p.delay,
						animationDuration: p.duration,
					}}
				/>
			))}
		</div>
	)
}

// ─── Sparkle Trail ────────────────────────────────────────────────────────────
function SparkleTrail() {
	const containerRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const container = containerRef.current
		if (!container) return
		let lastT = 0
		const onMove = (e: MouseEvent) => {
			const now = Date.now()
			if (now - lastT < 38) return
			lastT = now
			const count = 2 + Math.floor(Math.random() * 2)
			for (let i = 0; i < count; i++) {
				const el = document.createElement('span')
				el.className = 'sparkle'
				el.style.left = `${e.clientX}px`
				el.style.top  = `${e.clientY}px`
				const angle = Math.random() * Math.PI * 2
				const dist  = 10 + Math.random() * 22
				el.style.setProperty('--tx', `${Math.cos(angle) * dist}px`)
				el.style.setProperty('--ty', `${Math.sin(angle) * dist}px`)
				el.style.setProperty('--sz', `${2 + Math.random() * 5}px`)
				el.style.setProperty('--delay', `${i * 40}ms`)
				container.appendChild(el)
				setTimeout(() => el.remove(), 750)
			}
		}
		window.addEventListener('mousemove', onMove)
		return () => window.removeEventListener('mousemove', onMove)
	}, [])
	return <div ref={containerRef} className="sparkle-container" aria-hidden="true" />
}

// ─── Reading Progress ─────────────────────────────────────────────────────────
function ProgressBar() {
	const [pct, setPct] = useState(0)
	useEffect(() => {
		const onScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = document.documentElement
			setPct((scrollTop / (scrollHeight - clientHeight)) * 100)
		}
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])
	return <div className="progress-bar" style={{ width: `${pct}%` }} aria-hidden="true" />
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
	photo,
	onClose,
	onPrev,
	onNext,
	index,
	total,
}: {
	photo: Photo
	onClose: () => void
	onPrev: () => void
	onNext: () => void
	index: number
	total: number
}) {
	const touchStartX = useRef<number | null>(null)

	useEffect(() => {
		const h = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
			if (e.key === 'ArrowLeft') onPrev()
			if (e.key === 'ArrowRight') onNext()
		}
		window.addEventListener('keydown', h)
		document.body.style.overflow = 'hidden'
		return () => {
			window.removeEventListener('keydown', h)
			document.body.style.overflow = ''
		}
	}, [onClose, onPrev, onNext])

	const handleTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.touches[0].clientX
	}
	const handleTouchEnd = (e: React.TouchEvent) => {
		if (touchStartX.current === null) return
		const delta = e.changedTouches[0].clientX - touchStartX.current
		if (Math.abs(delta) > 48) {
			if (delta < 0) {
				onNext()
			} else {
				onPrev()
			}
		}
		touchStartX.current = null
	}

	return (
		<div
			className="lightbox"
			onClick={onClose}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
		>
			<button
				className="lb-btn lb-close"
				onClick={onClose}
				aria-label="Close"
			>
				✕
			</button>
			<span className="lb-counter">{index + 1} / {total}</span>
			<button
				className="lb-btn lb-prev"
				onClick={e => {
					e.stopPropagation()
					onPrev()
				}}
				aria-label="Previous"
			>
				‹
			</button>
			<div className="lb-content" onClick={e => e.stopPropagation()}>
				<img src={photo.src} alt={photo.alt} className="lb-img" />
				<p className="lb-caption">{photo.caption}</p>
			</div>
			<button
				className="lb-btn lb-next"
				onClick={e => {
					e.stopPropagation()
					onNext()
				}}
				aria-label="Next"
			>
				›
			</button>
		</div>
	)
}

// ─── Album Section ────────────────────────────────────────────────────────────
function AlbumSection({
	album,
	onPhotoClick,
}: {
	album: Album
	onPhotoClick: (p: Photo) => void
}) {
	const ref = useRef<HTMLElement>(null)
	useEffect(() => {
		const targets = ref.current?.querySelectorAll<HTMLElement>('.anim-item') ?? []
		const io = new IntersectionObserver(
			es => es.forEach(e => e.isIntersecting && e.target.classList.add('in-view')),
			{ threshold: 0.1 }
		)
		targets.forEach(t => io.observe(t))
		return () => io.disconnect()
	}, [])

	return (
		<section className="album-section" ref={ref}>
			<div className="album-header anim-item">
				<div className="deco-line" />
				<h2 className="album-title">{album.title}</h2>
				<p className="album-subtitle">{album.subtitle}</p>
				<div className="deco-line" />
			</div>
			<div className="photo-grid">
				{album.photos.map((photo, i) => (
					<div
						key={photo.id}
						className={`photo-card anim-item${
							i % 3 === 1 ? ' tall' : ''
						}`}
						style={{ transitionDelay: `${i * 0.09}s` }}
						onClick={() => onPhotoClick(photo)}
						role="button"
						tabIndex={0}
						onKeyDown={e => e.key === 'Enter' && onPhotoClick(photo)}
						aria-label={`View: ${photo.caption}`}
					>
						<img
						src={photo.src}
						alt={photo.alt}
						loading="lazy"
						onLoad={e =>
							(e.currentTarget.closest('.photo-card') as HTMLElement | null)
								?.classList.add('img-loaded')
						}
					/>
						<div className="photo-overlay">
							<span className="overlay-star">✦</span>
							<span className="overlay-caption">{photo.caption}</span>
						</div>
						<div className="photo-shine" />
					</div>
				))}
			</div>
		</section>
	)
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
	const [activeAlbum, setActiveAlbum] = useState('all')
	const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null)
	const [showBackTop, setShowBackTop] = useState(false)
	const heroParallaxRef = useRef<HTMLDivElement>(null)
	const galleryRef = useRef<HTMLElement>(null)

	useEffect(() => {
		const onScroll = () => {
			if (heroParallaxRef.current)
				heroParallaxRef.current.style.transform = `translateY(${window.scrollY * 0.45}px)`
			setShowBackTop(window.scrollY > 600)
		}
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	const allPhotos = useMemo(() => albums.flatMap(a => a.photos), [])
	const filtered = useMemo(
		() =>
			activeAlbum === 'all'
				? albums
				: albums.filter(a => a.id === activeAlbum),
		[activeAlbum]
	)

	const currentIndex = useMemo(
		() => (lightboxPhoto ? allPhotos.findIndex(p => p.id === lightboxPhoto.id) : 0),
		[lightboxPhoto, allPhotos]
	)

	const handleNavClick = useCallback((id: string) => {
		setActiveAlbum(id)
		setTimeout(() => {
			galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}, 40)
	}, [])

	const openLightbox = useCallback((p: Photo) => setLightboxPhoto(p), [])
	const closeLightbox = useCallback(() => setLightboxPhoto(null), [])
	const prevPhoto = useCallback(() => {
		if (!lightboxPhoto) return
		const i = allPhotos.findIndex(p => p.id === lightboxPhoto.id)
		setLightboxPhoto(allPhotos[(i - 1 + allPhotos.length) % allPhotos.length])
	}, [lightboxPhoto, allPhotos])
	const nextPhoto = useCallback(() => {
		if (!lightboxPhoto) return
		const i = allPhotos.findIndex(p => p.id === lightboxPhoto.id)
		setLightboxPhoto(allPhotos[(i + 1) % allPhotos.length])
	}, [lightboxPhoto, allPhotos])

	return (
		<div className="wg">
			<ProgressBar />
			<FloatingPetals />
			<SparkleTrail />

			{/* Hero */}
			<header className="hero">
				<div className="hero-bg" ref={heroParallaxRef} />
				<div className="hero-vignette" />
				<div className="hero-body">
					<p className="hero-badge">♥ 2026 ♥</p>
					<h1 className="hero-title">
						<span className="hero-name">Hien</span>
						<span className="hero-amp">&amp;</span>
						<span className="hero-name">Hoan</span>
					</h1>
					<p className="hero-date">March 28, 2026 · Da Lat</p>
					<p className="hero-date">April 11, 2026 · Ho Chi Minh City</p>
					<p className="hero-tagline">
						A love story, beautifully told in photographs
					</p>
				</div>
				<div className="hero-scroll">
					<span className="scroll-label">Scroll to explore</span>
					<span className="scroll-line" />
				</div>
			</header>

			{/* Sticky navigation */}
			<nav className="album-nav">
				{([{ id: 'all', title: 'All Albums' }, ...albums] as {
					id: string
					title: string
				}[]).map(a => (
					<button
						key={a.id}
						className={`nav-btn${
							activeAlbum === a.id ? ' active' : ''
						}`}
						onClick={() => handleNavClick(a.id)}
					>
						{a.title}
					</button>
				))}
			</nav>

			{/* Gallery */}
			<main className="gallery-main" ref={galleryRef}>
				{filtered.map(album => (
					<AlbumSection
						key={album.id}
						album={album}
						onPhotoClick={openLightbox}
					/>
				))}
			</main>

			{/* Footer */}
			<footer className="wg-footer">
				<div className="footer-ornament">✦ &nbsp; ✦ &nbsp; ✦</div>
				<p className="footer-quote">"Two hearts, one love story"</p>
				<p className="footer-credits">
					From Hien &amp; Hoan
				</p>
				<p className="footer-credits">
					Thank you for being an important part of our journey
				</p>
			</footer>

			{/* Back to top */}
			<button
				className={`back-to-top${showBackTop ? ' visible' : ''}`}
				onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				aria-label="Back to top"
			>
				↑
			</button>

			{lightboxPhoto && (
				<Lightbox
					photo={lightboxPhoto}
					onClose={closeLightbox}
					onPrev={prevPhoto}
					onNext={nextPhoto}
					index={currentIndex}
					total={allPhotos.length}
				/>
			)}
		</div>
	)
}
