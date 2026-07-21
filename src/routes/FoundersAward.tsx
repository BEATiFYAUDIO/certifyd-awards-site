import { useEffect } from 'react';
import { foundersAward } from '../data/awards';

const pageTitle = "The Vassal Benford Founders' Award | Certifyd Awards";
const pageDescription = 'The highest non-competitive honor presented by the Certifyd Awards, recognizing a lifetime of leadership, creativity, innovation, mentorship, and service to creators and culture.';
const canonicalUrl = 'https://awards.certifyd.me/founders-award';

function setMeta(selector: string, attribute: 'content' | 'href', value: string, create: () => HTMLMetaElement | HTMLLinkElement) {
  const existing = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  const element = existing ?? create();
  element.setAttribute(attribute, value);
  if (!existing) document.head.appendChild(element);
}

function useFoundersAwardMeta() {
  useEffect(() => {
    document.title = pageTitle;
    setMeta('meta[name="description"]', 'content', pageDescription, () => {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      return meta;
    });
    setMeta('link[rel="canonical"]', 'href', canonicalUrl, () => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      return link;
    });
    [
      ['og:title', pageTitle],
      ['og:description', pageDescription],
      ['og:url', canonicalUrl],
      ['og:image', 'https://awards.certifyd.me/media/certifyd-awards-music-note-20260715.webp'],
    ].forEach(([property, content]) => {
      setMeta(`meta[property="${property}"]`, 'content', content, () => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', property);
        return meta;
      });
    });
  }, []);
}

export function FoundersAward() {
  useFoundersAwardMeta();

  return (
    <>
      <section className="standard-title-hero">
        <div className="standard-title-hero-content">
          <span className="eyebrow">The Highest Honor</span>
          <h1>The Vassal Benford Founders&apos; Award</h1>
          <p className="lead">Honoring those whose vision, leadership, and lifelong contribution have shaped the future of creators and culture.</p>
          <div className="hero-actions">
            <span className="status-pill preview">Non-competitive honor</span>
            <a className="secondary-action" href="#purpose">Explore the purpose of the award</a>
          </div>
        </div>
      </section>

      <section id="purpose" className="page-section standard-page-content">
        <div className="principle-grid">
          <article className="glass-card">
            <span className="eyebrow">Purpose</span>
            <h2>A Lifetime of Impact</h2>
            <p>The Vassal Benford Founders&apos; Award exists to recognize an extraordinary lifetime of contribution to creators, music, culture, and the broader creative community.</p>
            <p>It honors people whose leadership, creativity, innovation, mentorship, and service helped make creative independence more possible for others.</p>
          </article>

          <article className="glass-card">
            <span className="eyebrow">Honorary Distinction</span>
            <h2>Not a Competitive Category</h2>
            <p>The Vassal Benford Founders&apos; Award is separate from competitive Certifyd Awards categories. It is not ranked, voted on, scored, or compared against annual nominees.</p>
            <p>It may be presented only in exceptional circumstances, when the contribution is broad, durable, and clearly meaningful to creators and culture.</p>
          </article>
        </div>

        <div className="content-section">
          <div className="section-heading">
            <span className="eyebrow">Recognition Scope</span>
            <h2>Who This Honor Recognizes</h2>
          </div>
          <div className="principle-grid">
            {foundersAward.eligibility.map((label) => (
              <article className="glass-card" key={label}>
                <h3>{label}</h3>
              </article>
            ))}
          </div>
        </div>

        <div className="principle-grid">
          <article className="glass-card">
            <span className="eyebrow">Governance</span>
            <h2>Selection and Accountability</h2>
            <p>Recipients will be selected through a formal Certifyd Awards Council review process.</p>
            <ul>
              <li>Review must consider lifetime impact, not short-term popularity.</li>
              <li>Recognition must be explainable and connected to creator benefit.</li>
              <li>Selection must remain independent from public voting and competitive scoring.</li>
              <li>Any recipient announcement must include a clear public citation.</li>
            </ul>
          </article>

          <article className="glass-card">
            <span className="eyebrow">Award Values</span>
            <h2>The principles behind the honor.</h2>
            <ul>
              {foundersAward.values.map((value) => <li key={value}>{value}</li>)}
            </ul>
          </article>
        </div>

        <div className="principle-grid">
          <article className="glass-card">
            <span className="eyebrow">Award Inscription</span>
            <h2>Presented with purpose.</h2>
            <blockquote>
              <p>The Vassal Benford Founders&apos; Award</p>
              <p>For a lifetime of leadership, creativity, innovation, mentorship, and service in advancing creators, music, culture, and creative independence.</p>
              <p>Certifyd Awards</p>
            </blockquote>
          </article>

          <article className="glass-card">
            <span className="eyebrow">Future Recipient Archive</span>
            <h2>No recipient has been announced.</h2>
            <p>This honor will be presented only when an extraordinary lifetime of contribution merits recognition.</p>
            <p>Some creators make great work. Others make it possible for generations of creators to do the same.</p>
          </article>
        </div>
      </section>
    </>
  );
}
