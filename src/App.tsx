import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { albums, PETALS, type Photo, type Album } from './data'
import AlbumDetailPage from './pages/AlbumDetail'

// ─── Floating Petals ──────────────────────────────────────────────────────────
export function FloatingPetals() {
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
export function SparkleTrail() {
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
export function ProgressBar() {
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
export function Lightbox({
	photo, onClose, onPrev, onNext, index, total,
}: {
	photo: Photo; onClose: () => void; onPrev: () => void; onNext: () => void
	index: number; total: number
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
		return () => { window.removeEventListener('keydown', h); document.body.style.overflow = '' }
	}, [onClose, onPrev, onNext])

	const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
	const handleTouchEnd = (e: React.TouchEvent) => {
		if (touchStartX.current === null) return
		const delta = e.changedTouches[0].clientX - touchStartX.current
		if (Math.abs(delta) > 48) delta < 0 ? onNext() : onPrev()
		touchStartX.current = null
	}

	return (
		<div className="lightbox" onClick={onClose} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
			<button className="lb-btn lb-close" onClick={onClose} aria-label="Close">✕</button>
			<span className="lb-counter">{index + 1} / {total}</span>
			<button className="lb-btn lb-prev" onClick={e => { e.stopPropagation(); onPrev() }} aria-label="Previous">‹</button>
			<div className="lb-content" onClick={e => e.stopPropagation()}>
				<img src={photo.src} alt={photo.alt} className="lb-img" />
				<p className="lb-caption">{photo.caption}</p>
			</div>
			<button className="lb-btn lb-next" onClick={e => { e.stopPropagation(); onNext() }} aria-label="Next">›</button>
		</div>
	)
}

// ─── Album Section ────────────────────────────────────────────────────────────
export function AlbumSection({
	album, onPhotoClick, preview = false,
}: {
	album: Album; onPhotoClick: (p: Photo) => void; preview?: boolean
}) {
	const ref = useRef<HTMLElement>(null)
	const displayPhotos = preview ? album.photos.slice(0, 3) : album.photos

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
				{displayPhotos.map((photo, i) => (
					<div
						key={photo.id}
						className={`photo-card anim-item${i % 3 === 1 ? ' tall' : ''}`}
						style={{ transitionDelay: `${i * 0.09}s` }}
						onClick={() => onPhotoClick(photo)}
						role="button" tabIndex={0}
						onKeyDown={e => e.key === 'Enter' && onPhotoClick(photo)}
						aria-label={`View: ${photo.caption}`}
					>
						<img src={photo.src} alt={photo.alt} loading="lazy"
							onLoad={e => (e.currentTarget.closest('.photo-card') as HTMLElement | null)?.classList.add('img-loaded')}
						/>
						<div className="photo-overlay">
							<span className="overlay-star">✦</span>
							<span className="overlay-caption">{photo.caption}</span>
						</div>
						<div className="photo-shine" />
					</div>
				))}
			</div>

			{preview && (
				<div className="view-more-wrap anim-item">
					<Link to={`/album/${album.id}`} className="view-more-btn">
						<span>View all {album.photos.length} photos</span>
						<span className="view-more-arrow">→</span>
					</Link>
				</div>
			)}
		</section>
	)
}

// ─── Home Page ────────────────────────────────────────────────────────────────
function HomePage() {
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
		() => activeAlbum === 'all' ? albums : albums.filter(a => a.id === activeAlbum),
		[activeAlbum]
	)
	const currentIndex = useMemo(
		() => lightboxPhoto ? allPhotos.findIndex(p => p.id === lightboxPhoto.id) : 0,
		[lightboxPhoto, allPhotos]
	)

	const handleNavClick = useCallback((id: string) => {
		setActiveAlbum(id)
		setTimeout(() => galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40)
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
					<p className="hero-tagline">A love story, beautifully told in photographs</p>
				</div>
				<div className="hero-scroll">
					<span className="scroll-label">Scroll to explore</span>
					<span className="scroll-line" />
				</div>
			</header>

			{/* Sticky navigation */}
			<nav className="album-nav">
				{([{ id: 'all', title: 'All Albums' }, ...albums] as { id: string; title: string }[]).map(a => (
					<button
						key={a.id}
						className={`nav-btn${activeAlbum === a.id ? ' active' : ''}`}
						onClick={() => handleNavClick(a.id)}
					>
						{a.title}
					</button>
				))}
			</nav>

			{/* Gallery */}
			<main className="gallery-main" ref={galleryRef}>
				{filtered.map(album => (
					<AlbumSection key={album.id} album={album} onPhotoClick={openLightbox} preview />
				))}
			</main>

			{/* Footer */}
			<footer className="wg-footer">
				<div className="footer-ornament">✦ &nbsp; ✦ &nbsp; ✦</div>
				<p className="footer-quote">"Two hearts, one love story"</p>
				<p className="footer-credits">From Hien &amp; Hoan</p>
				<p className="footer-credits">Thank you for being an important part of our journey</p>
			</footer>

			<button
				className={`back-to-top${showBackTop ? ' visible' : ''}`}
				onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				aria-label="Back to top"
			>↑</button>

			{lightboxPhoto && (
				<Lightbox
					photo={lightboxPhoto} onClose={closeLightbox}
					onPrev={prevPhoto} onNext={nextPhoto}
					index={currentIndex} total={allPhotos.length}
				/>
			)}
		</div>
	)
}

// ─── App (Router) ─────────────────────────────────────────────────────────────
export default function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/album/:albumId" element={<AlbumDetailPage />} />
		</Routes>
	)
}
