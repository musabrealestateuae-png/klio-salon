import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import { useEffect, useRef, useState } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────
interface Product {
  name: string
  era?: string
  country?: string
  price?: string
  category?: string
  image?: string
  description?: string
  featured?: boolean
  sold?: boolean
}

interface HomepageData {
  heroTitle?: string
  heroTitleItalic?: string
  heroTitleEnd?: string
  heroDescription?: string
  foundedYear?: string
  location?: string
  aboutTitle?: string
  aboutTitleItalic?: string
  aboutBody?: string
  yearsExperience?: string
  piecesCurated?: string
  countriesSourced?: string
  testimonialText?: string
  testimonialAuthor?: string
  address?: string
  city?: string
  hours?: string
  email?: string
  phone?: string
}

interface Props {
  homepage: HomepageData
  products: Product[]
}

// ── SVG Placeholders per category ────────────────────────────────────────────
function PlaceholderSVG({ category, large }: { category?: string; large?: boolean }) {
  const cls = large ? 'prod-svg-lg' : 'prod-svg'
  if (category === 'Clocks') return (
    <svg className={cls} viewBox="0 0 150 150">
      <circle cx="75" cy="70" r="45" /><circle cx="75" cy="70" r="38" />
      <circle cx="75" cy="70" r="4" style={{ fill: '#b8985a', stroke: 'none' }} />
      <line x1="75" y1="32" x2="75" y2="70" strokeWidth="1.2" /><line x1="75" y1="70" x2="100" y2="70" strokeWidth="1" />
      <rect x="60" y="115" width="30" height="20" rx="1" /><line x1="75" y1="115" x2="75" y2="135" strokeWidth="0.8" />
    </svg>
  )
  if (category === 'Silverware') return (
    <svg className={cls} viewBox="0 0 150 150">
      <ellipse cx="75" cy="75" rx="50" ry="60" /><ellipse cx="75" cy="45" rx="20" ry="12" />
      <path d="M55 45 L25 75 M95 45 L125 75" /><ellipse cx="75" cy="105" rx="50" ry="12" />
    </svg>
  )
  if (category === 'Furniture') return (
    <svg className={cls} viewBox="0 0 150 150">
      <rect x="20" y="60" width="110" height="70" rx="2" /><rect x="10" y="55" width="130" height="10" rx="1" />
      <rect x="40" y="130" width="70" height="12" rx="1" /><rect x="50" y="142" width="50" height="8" />
    </svg>
  )
  if (category === 'Paintings') return (
    <svg className={cls} viewBox="0 0 150 150">
      <rect x="8" y="10" width="64" height="80" rx="2" /><path d="M20 30 C30 25 50 35 60 30 C55 50 45 65 40 75 C35 65 25 50 20 30Z" />
    </svg>
  )
  // Default / Porcelain
  return (
    <svg className={cls} viewBox="0 0 200 280">
      <path d="M100 20 C80 20 60 35 55 60 C48 85 45 95 42 120 C36 155 30 175 35 210 C40 240 65 260 100 260 C135 260 160 240 165 210 C170 175 164 155 158 120 C155 95 152 85 145 60 C140 35 120 20 100 20Z" />
      <path d="M55 60 C45 60 35 68 35 78 C35 88 45 92 55 90" /><path d="M145 60 C155 60 165 68 165 78 C165 88 155 92 145 90" />
      <ellipse cx="100" cy="20" rx="18" ry="8" /><path d="M82 20 C82 10 90 5 100 5 C110 5 118 10 118 20" />
    </svg>
  )
}

// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ product, large }: { product: Product; large?: boolean }) {
  return (
    <div className="product-card">
      <div className="product-img">
        <div className="product-img-inner">
          {product.image
            ? <img src={product.image} alt={product.name} />
            : <PlaceholderSVG category={product.category} large={large} />
          }
        </div>
        <div className="product-overlay">
          <button className="overlay-btn">View Details</button>
        </div>
        {product.sold && <div className="sold-badge">Sold</div>}
      </div>
      <div className="product-info">
        <p className="product-era">{product.era}{product.country ? ` · ${product.country}` : ''}</p>
        <p className="product-name">{product.name}</p>
        <p className="product-price">{product.sold ? 'Sold' : (product.price || 'Price upon request')}</p>
      </div>
    </div>
  )
}

// ── Category counts helper ────────────────────────────────────────────────────
function getCatCount(products: Product[], cat: string) {
  return products.filter(p => p.category === cat).length
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function Home({ homepage, products }: Props) {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4)
  const [tIdx, setTIdx] = useState(0)
  const fadeRefs = useRef<(HTMLElement | null)[]>([])

  // Scroll animations
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    fadeRefs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const addFade = (el: HTMLElement | null, i: number) => { fadeRefs.current[i] = el }

  // Testimonial auto-rotate
  useEffect(() => {
    const t = setInterval(() => setTIdx(i => (i + 1) % 3), 5000)
    return () => clearInterval(t)
  }, [])

  const testimonials = [
    {
      text: homepage.testimonialText || 'KLIO found us a Louis XVI console that had been in the same French family for 200 years. The documentation, the care, the story — everything was extraordinary.',
      author: homepage.testimonialAuthor || '— Private Collector',
    },
    { text: 'The authentication process at KLIO is unlike any other salon. Every piece comes with a story that makes it truly irreplaceable.', author: '— Interior Designer, Astana' },
    { text: 'I have been collecting antiques for 30 years. KLIO consistently presents pieces of exceptional rarity and quality.', author: '— Estate Collector' },
  ]

  const categories = [
    { name: 'Furniture', bg: 'linear-gradient(135deg, #d4cabc, #b8aa98)' },
    { name: 'Porcelain', bg: 'linear-gradient(135deg, #c8d4d8, #aabcc2)' },
    { name: 'Silverware', bg: 'linear-gradient(135deg, #d8cfc4, #c2b8a8)' },
    { name: 'Paintings', bg: 'linear-gradient(135deg, #d0ccc4, #b8b4ac)' },
  ]

  return (
    <>
      <Head>
        <title>KLIO — Antique Salon</title>
        <meta name="description" content="A curated sanctuary of exceptional antiques — each piece handpicked for its historical significance and beauty." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@200;300;400&display=swap" rel="stylesheet" />
      </Head>

      {/* NAV */}
      <nav>
        <div className="nav-inner">
          <a href="#" className="nav-logo">KL<span>I</span>O</a>
          <ul className="nav-links">
            <li><a href="#collection">Collection</a></li>
            <li><a href="#categories">Categories</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#inventory">Inventory</a></li>
          </ul>
          <a href="#contact" className="nav-cta">Visit Salon</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <p className="hero-eyebrow">
            {homepage.location || 'Astana, Kazakhstan'} · Est. {homepage.foundedYear || '2003'}
          </p>
          <h1 className="hero-title">
            {homepage.heroTitle || 'Rare &'}<br />
            <em>{homepage.heroTitleItalic || 'Beautiful'}</em><br />
            {homepage.heroTitleEnd || 'Antiques'}
          </h1>
          <p className="hero-desc">
            {homepage.heroDescription || 'A curated sanctuary of exceptional antiques — each piece handpicked for its historical significance, beauty, and enduring elegance.'}
          </p>
          <div className="hero-actions">
            <a href="#collection" className="btn-primary">Explore Collection</a>
            <a href="#about" className="btn-link">Our Story</a>
          </div>
          <div className="hero-scroll">Scroll</div>
        </div>
        <div className="hero-right">
          <div className="hero-img-wrap">
            <div className="hero-img-placeholder">
              <svg width="200" height="280" viewBox="0 0 200 280" fill="none" style={{ opacity: 0.25 }}>
                <path d="M100 20 C80 20 60 35 55 60 C48 85 45 95 42 120 C36 155 30 175 35 210 C40 240 65 260 100 260 C135 260 160 240 165 210 C170 175 164 155 158 120 C155 95 152 85 145 60 C140 35 120 20 100 20Z" stroke="#8a8078" strokeWidth="1.5" fill="none" />
                <path d="M55 60 C45 60 35 68 35 78 C35 88 45 92 55 90" stroke="#8a8078" strokeWidth="1.2" fill="none" />
                <path d="M145 60 C155 60 165 68 165 78 C165 88 155 92 145 90" stroke="#8a8078" strokeWidth="1.2" fill="none" />
                <path d="M65 130 C80 125 120 125 135 130" stroke="#b8985a" strokeWidth="0.8" fill="none" />
                <ellipse cx="100" cy="20" rx="18" ry="8" stroke="#8a8078" strokeWidth="1.2" fill="none" />
              </svg>
            </div>
          </div>
          <p className="hero-caption">XVIII Century Collection</p>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-strip">
        <div className="marquee-inner">
          {['Furniture','Porcelain','Silverware','Paintings','Clocks','Jewellery','Tapestries','Sculptures',
            'Furniture','Porcelain','Silverware','Paintings','Clocks','Jewellery','Tapestries','Sculptures'].map((item, i) => (
            <span className="marquee-item" key={i}>{item} <span className="marquee-dot">·</span></span>
          ))}
        </div>
      </div>

      {/* FEATURED COLLECTION */}
      <section className="featured" id="collection">
        <div className="section-inner">
          <div className="featured-header fade-up" ref={el => addFade(el as HTMLElement, 0)}>
            <div>
              <p className="section-label">Featured Pieces</p>
              <h2 className="section-title">Current <em>Collection</em></h2>
            </div>
            <a href="#inventory" className="btn-link" style={{ color: 'var(--mid)' }}>View All Pieces</a>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="featured-grid fade-up" ref={el => addFade(el as HTMLElement, 1)}>
              {featuredProducts.map((product, i) => (
                <ProductCard key={i} product={product} large={i === 0} />
              ))}
            </div>
          ) : (
            <div className="fade-up" ref={el => addFade(el as HTMLElement, 1)}
              style={{ padding: '80px', textAlign: 'center', background: 'var(--warm-white)', border: '1px dashed var(--rule)' }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: 'var(--muted)', fontStyle: 'italic' }}>
                No featured products yet
              </p>
              <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '12px' }}>
                Go to <strong>/admin</strong> and mark products as &ldquo;Show on Homepage&rdquo;
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-left fade-up" ref={el => addFade(el as HTMLElement, 2)}>
              <p className="section-label">Our Heritage</p>
              <h2 className="about-title">
                {homepage.aboutTitle || 'Where History'}<br />
                Finds a <em>{homepage.aboutTitleItalic || 'New Home'}</em>
              </h2>
              <p className="about-body">
                {homepage.aboutBody || 'KLIO was founded with a singular passion: to preserve and share the beauty of historical objects. Our salon brings together collectors, historians, and lovers of beauty in a space where every object tells a story spanning centuries.\n\nWe source our pieces from estate sales, private collections, and auction houses across Europe and Asia. Each item is authenticated, carefully restored where necessary, and presented with full provenance documentation.'}
              </p>
              <a href="#contact" className="btn-primary">Visit the Salon</a>
              <div className="about-stats">
                <div>
                  <p className="stat-num">{homepage.yearsExperience || '20+'}
                  </p>
                  <p className="stat-label">Years of Excellence</p>
                </div>
                <div>
                  <p className="stat-num">{homepage.piecesCurated || '1 200'}</p>
                  <p className="stat-label">Pieces Curated</p>
                </div>
                <div>
                  <p className="stat-num">{homepage.countriesSourced || '48'}</p>
                  <p className="stat-label">Countries Sourced</p>
                </div>
              </div>
            </div>
            <div className="about-right fade-up" ref={el => addFade(el as HTMLElement, 3)}>
              <div className="about-img-frame">
                <svg width="160" height="200" viewBox="0 0 160 200" fill="none" style={{ opacity: 0.12 }}>
                  <rect x="20" y="20" width="120" height="160" rx="2" stroke="#faf8f4" strokeWidth="1.2" />
                  <rect x="30" y="30" width="100" height="140" rx="1" stroke="#b8985a" strokeWidth="0.6" />
                  <path d="M80 60 C60 80 60 120 80 140 C100 120 100 80 80 60Z" stroke="#faf8f4" strokeWidth="1" />
                </svg>
              </div>
              <div className="about-quote">
                <p>&ldquo;Every antique carries within it the soul of an era — a quiet witness to lives lived fully.&rdquo;</p>
                <cite>— Founder, KLIO Salon</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories" id="categories">
        <div className="section-inner">
          <div className="fade-up" ref={el => addFade(el as HTMLElement, 4)}>
            <p className="section-label">Browse</p>
            <h2 className="section-title">Shop by <em>Category</em></h2>
          </div>
          <div className="cat-grid fade-up" ref={el => addFade(el as HTMLElement, 5)}>
            {categories.map((cat) => (
              <a key={cat.name} href={`#inventory`} className="cat-card" style={{ textDecoration: 'none' }}>
                <div className="cat-bg" style={{ background: cat.bg }} />
                <div className="cat-overlay" />
                <div className="cat-info">
                  <p className="cat-name">{cat.name}</p>
                  <p className="cat-count">{getCatCount(products, cat.name)} pieces</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FULL INVENTORY */}
      {products.length > 0 && (
        <section className="inventory" id="inventory">
          <div className="section-inner">
            <div className="fade-up" ref={el => addFade(el as HTMLElement, 6)}>
              <p className="section-label">All Pieces</p>
              <h2 className="section-title">Full <em>Inventory</em></h2>
            </div>
            <div className="inventory-grid fade-up" ref={el => addFade(el as HTMLElement, 7)}>
              {products.map((product, i) => (
                <ProductCard key={i} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROCESS */}
      <section className="process">
        <div className="section-inner">
          <div className="fade-up" style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }} ref={el => addFade(el as HTMLElement, 8)}>
            <p className="section-label" style={{ justifyContent: 'center' }}>How It Works</p>
            <h2 className="section-title">Our <em>Acquisition</em> Process</h2>
          </div>
          <div className="process-grid fade-up" ref={el => addFade(el as HTMLElement, 9)}>
            {[
              { n: '01', title: 'Discovery', body: 'Our experts travel across Europe and Asia attending estate sales, auctions, and private viewings to source exceptional pieces.', icon: <><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></> },
              { n: '02', title: 'Authentication', body: 'Every piece undergoes rigorous authentication by certified specialists. We document full provenance and historical lineage.', icon: <><path d="M9 12l2 2 4-4"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/></> },
              { n: '03', title: 'Restoration', body: 'Where needed, master craftspeople carefully restore pieces using period-appropriate techniques and materials.', icon: <><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></> },
              { n: '04', title: 'New Home', body: 'Pieces find their new custodians through our salon, private consultations, and bespoke interior commissions.', icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></> },
            ].map(step => (
              <div className="process-step" key={step.n}>
                <span className="step-num">{step.n}</span>
                <div className="step-icon">
                  <svg viewBox="0 0 24 24">{step.icon}</svg>
                </div>
                <p className="step-title">{step.title}</p>
                <p className="step-body">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="testimonial">
        <div className="testimonial-inner fade-up" ref={el => addFade(el as HTMLElement, 10)}>
          <div className="testimonial-mark">&ldquo;</div>
          <p className="testimonial-text">{testimonials[tIdx].text}</p>
          <p className="testimonial-author">{testimonials[tIdx].author}</p>
          <div className="testimonial-dots">
            {testimonials.map((_, i) => (
              <button key={i} className={`t-dot${tIdx === i ? ' active' : ''}`} onClick={() => setTIdx(i)} aria-label={`Testimonial ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        <div className="newsletter-inner fade-up" ref={el => addFade(el as HTMLElement, 11)}>
          <h2>Stay <em>Connected</em></h2>
          <p>Receive curated previews of new acquisitions, salon events, and exclusive collector insights.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button type="button">Subscribe</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact">
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <a href="#" className="footer-brand-logo">KL<span>I</span>O</a>
              <p className="footer-brand-tagline">Antique Salon · {homepage.city || 'Astana, Kazakhstan'}. Where history meets its next chapter.</p>
              <div className="footer-social">
                <a href="#" className="social-icon">IG</a>
                <a href="#" className="social-icon">FB</a>
                <a href="#" className="social-icon">PX</a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Collection</h4>
              <ul>
                {['Furniture','Porcelain','Silverware','Paintings','Clocks','Jewellery'].map(c => (
                  <li key={c}><a href="#inventory">{c}</a></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Salon</h4>
              <ul>
                {['About KLIO','Our Experts','Appraisal Services','Interior Consulting','Auctions'].map(l => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li><a href="#">{homepage.address || 'ul. Kenesary 40'}</a></li>
                <li><a href="#">{homepage.city || 'Astana, Kazakhstan'}</a></li>
                <li><a href="#">{homepage.hours || 'Tue – Sat · 11–19h'}</a></li>
                <li><a href={`mailto:${homepage.email}`}>{homepage.email || 'info@klio-salon.kz'}</a></li>
                <li><a href={`tel:${homepage.phone}`}>{homepage.phone || '+7 7172 000 000'}</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} KLIO Antique Salon. All rights reserved.</p>
            <p>Privacy Policy · Terms of Service</p>
          </div>
        </div>
      </footer>
    </>
  )
}

// ── DATA FETCHING ─────────────────────────────────────────────────────────────
export async function getStaticProps() {
  // Read homepage content
  const homepagePath = path.join(process.cwd(), 'content', 'homepage.json')
  let homepage: HomepageData = {}
  try {
    homepage = JSON.parse(fs.readFileSync(homepagePath, 'utf8'))
  } catch {}

  // Read all products
  const productsDir = path.join(process.cwd(), 'content', 'products')
  let products: Product[] = []
  try {
    const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.json'))
    products = files.map(file => {
      try {
        return JSON.parse(fs.readFileSync(path.join(productsDir, file), 'utf8'))
      } catch {
        return null
      }
    }).filter(Boolean)
  } catch {}

  return { props: { homepage, products } }
}
