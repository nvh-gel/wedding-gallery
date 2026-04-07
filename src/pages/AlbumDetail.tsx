import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { albums, type Photo } from '../data'
import { FloatingPetals, SparkleTrail, ProgressBar, Lightbox } from '../App'

export default function AlbumDetailPage() {
	const { albumId } = useParams<{ albumId: string }>()
	const album = albums.find(a => a.id === albumId)

	const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null)
	const [showBackTop, setShowBackTop] = useState(false)
	const heroRef = useRef<HTMLDivElement>(null)
	const gridRef = useRef<HTMLDivElement>(null)

	// Parallax hero
	useEffect(() => {
		const onScroll = () => {
			if (heroRef.current)
				heroRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`
			setShowBackTop(window.scrollY > 400)
		}
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	// Scroll-reveal for detail cards
	useEffect(() => {
		const targets = gridRef.current?.querySelectorAll<HTMLElement>('.detail-card') ?? []
		const io = new IntersectionObserver(
			es => es.forEach(e => e.isIntersecting && e.target.classList.add('in-view')),
			{ threshold: 0.08 }
		)
		targets.forEach(t => io.observe(t))
		return () => io.disconnect()
	}, [album])

	const photos = album?.photos ?? []

	const currentIndex = useMemo(
		() => lightboxPhoto ? photos.findIndex(p => p.id === lightboxPhoto.id) : 0,
		[lightboxPhoto, photos]
	)

	const openLightbox = useCallback((p: Photo) => setLightboxPhoto(p), [])
	const closeLightbox = useCallback(() => setLightboxPhoto(null), [])
	const prevPhoto = useCallback(() => {
		if (!lightboxPhoto) return
		const i = photos.findIndex(p => p.id === lightboxPhoto.id)
		setLightboxPhoto(photos[(i - 1 + photos.length) % photos.length])
	}, [lightboxPhoto, photos])
	const nextPhoto = useCallback(() => {
		if (!lightboxPhoto) return
		const i = photos.findIndex(p => p.id === lightboxPhoto.id)
		setLightboxPhoto(photos[(i + 1) % photos.length])
	}, [lightboxPhoto, photos])

	if (!album) {
		return (
			<div className="wg detail-not-found">
				<FloatingPetals />
				<div className="not-found-body">
					<p className="not-found-icon">✦</p>
					<h2>Album not found</h2>
					<Link to="/" className="detail-back-btn">← Back to Gallery</Link>
				</div>
			</div>
		)
	}

	const coverSrc = album.photos[0]?.src ?? ''

	return (
		<div className="wg detail-page">
			<ProgressBar />
			<FloatingPetals />
			<SparkleTrail />

			{/* Back button */}
			<Link to="/" className="detail-back-btn">
				<span className="detail-back-arrow">←</span>
				<span>Back to Gallery</span>
			</Link>

			{/* Hero banner */}
			<header className="detail-hero">
				<div
					className="detail-hero-bg"
					ref={heroRef}
					style={{ backgroundImage: `url(${coverSrc})` }}
				/>
				<div className="detail-hero-vignette" />
				<div className="detail-hero-body">
					<p className="hero-badge">✦ Wedding Gallery ✦</p>
					<div className="detail-hero-deco" />
					<h1 className="detail-hero-title">{album.title}</h1>
					<div className="detail-hero-deco" />
					<p className="detail-hero-subtitle">{album.subtitle}</p>
				</div>
			</header>

			{/* Photo count */}
			<div className="detail-main">
				<p className="detail-count">{photos.length} photographs</p>

				{/* Masonry grid */}
				<div className="detail-grid" ref={gridRef}>
					{photos.map((photo, i) => (
						<div
							key={photo.id}
							className="detail-card"
							style={{ animationDelay: `${i * 0.06}s` }}
							onClick={() => openLightbox(photo)}
							role="button"
							tabIndex={0}
							onKeyDown={e => e.key === 'Enter' && openLightbox(photo)}
							aria-label={`View: ${photo.caption}`}
						>
							<img src={photo.src} alt={photo.alt} loading="lazy" />
							<div className="photo-overlay">
								<span className="overlay-star">✦</span>
								<span className="overlay-caption">{photo.caption}</span>
							</div>
							<div className="photo-shine" />
						</div>
					))}
				</div>

				{/* Bottom ornament */}
				<div className="detail-footer-ornament">
					<div className="deco-line" />
					<span className="detail-footer-star">✦</span>
					<div className="deco-line" />
				</div>
			</div>

			{/* Footer */}
			<footer className="wg-footer">
				<div className="footer-ornament">✦ &nbsp; ✦ &nbsp; ✦</div>
				<p className="footer-quote">"Two hearts, one love story"</p>
				<p className="footer-credits">From Hien &amp; Hoan</p>
			</footer>

			{/* Back to top */}
			<button
				className={`back-to-top${showBackTop ? ' visible' : ''}`}
				onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				aria-label="Back to top"
			>↑</button>

			{lightboxPhoto && (
				<Lightbox
					photo={lightboxPhoto} onClose={closeLightbox}
					onPrev={prevPhoto} onNext={nextPhoto}
					index={currentIndex} total={photos.length}
				/>
			)}
		</div>
	)
}
