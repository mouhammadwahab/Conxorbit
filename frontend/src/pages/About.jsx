import { useEffect, useRef, useState } from "react";
import SEO from "../components/common/SEO";
import { CTABand } from "../components/common/PageHero";
import Reveal from "../components/common/Reveal";
import SectionBadge from "../components/common/SectionBadge";
import PageShell from "../components/layout/PageShell/PageShell";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import { aboutContent } from "../content/siteContent";
import styles from "./About.module.css";

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function GraphicOrbit() {
  return (
    <svg className={styles.cardArt} viewBox="0 0 280 200" fill="none" aria-hidden="true">
      <ellipse cx="140" cy="110" rx="110" ry="36" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      <ellipse cx="140" cy="110" rx="82" ry="26" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
      <ellipse cx="140" cy="110" rx="52" ry="16" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="140" cy="110" r="4" fill="#f3c969" />
      <circle cx="48" cy="100" r="2.5" fill="#f3c969" opacity="0.9" />
      <circle cx="230" cy="118" r="2.5" fill="#8a9e5c" />
      <circle cx="160" cy="78" r="2" fill="#f3c969" />
      <circle cx="100" cy="140" r="2" fill="#8a9e5c" />
    </svg>
  );
}

function GraphicRays() {
  return (
    <svg className={styles.cardArt} viewBox="0 0 280 200" fill="none" aria-hidden="true">
      {Array.from({ length: 11 }, (_, i) => {
        const x = 40 + i * 20;
        return (
          <g key={x}>
            <line x1={x} y1="180" x2={140 + (x - 140) * 0.15} y2="40" stroke="currentColor" strokeWidth="1.2" opacity={0.45 + (i % 3) * 0.15} />
            <circle cx={x} cy={160 - (i % 4) * 28} r="2.2" fill={i % 2 ? "#f3c969" : "#8a9e5c"} />
          </g>
        );
      })}
    </svg>
  );
}

function GraphicFlow() {
  return (
    <svg className={styles.cardArt} viewBox="0 0 280 200" fill="none" aria-hidden="true">
      <path
        d="M20 150C60 150 70 80 120 80C170 80 180 150 230 140C250 136 260 120 270 100"
        stroke="currentColor"
        strokeWidth="1.3"
        opacity="0.65"
      />
      <path
        d="M30 170C80 170 90 110 140 110C190 110 200 60 250 70"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.5"
      />
      <path d="M40 120C90 120 100 50 160 55C200 58 220 90 260 90" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      <circle cx="120" cy="80" r="2.5" fill="#f3c969" />
      <circle cx="230" cy="140" r="2.5" fill="#8a9e5c" />
      <circle cx="160" cy="55" r="2" fill="#f3c969" />
      <circle cx="250" cy="70" r="2" fill="#8a9e5c" />
      <circle cx="90" cy="170" r="2" fill="#f3c969" />
    </svg>
  );
}

const GRAPHICS = {
  orbit: GraphicOrbit,
  rays: GraphicRays,
  flow: GraphicFlow,
};

function GlowHero({ glowHero }) {
  const trackRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState(0);

  // Circle r=160 → circumference ≈ 1005; arc ≈ 32% of ring
  const r = 160;
  const c = 2 * Math.PI * r;
  const arc = c * 0.32;
  const gap = c - arc;

  useEffect(() => {
    if (reduced) {
      setPhase(1);
      return undefined;
    }

    const track = trackRef.current;
    if (!track) return undefined;

    const onScroll = () => {
      const rect = track.getBoundingClientRect();
      const total = track.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setPhase(0);
        return;
      }
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = scrolled / total;
      setPhase(progress >= 0.45 ? 1 : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  return (
    <section ref={trackRef} className={styles.glowTrack} aria-label="About">
      <div className={styles.glowSticky}>
        <div className={styles.glowNoise} aria-hidden="true" />
        <div className={styles.glowSideLeft} aria-hidden="true" />
        <div className={styles.glowSideRight} aria-hidden="true" />

        <div className={styles.glowDecorLeft} aria-hidden="true">
          <svg viewBox="0 0 120 360" fill="none">
            <ellipse cx="60" cy="180" rx="48" ry="140" stroke="rgba(184,137,61,0.22)" strokeWidth="1.2" />
            <ellipse cx="60" cy="180" rx="32" ry="96" stroke="rgba(90,107,59,0.28)" strokeWidth="1" strokeDasharray="4 8" />
            <circle cx="60" cy="52" r="3" fill="#f3c969" opacity="0.85" />
            <circle cx="108" cy="180" r="2.5" fill="#8a9e5c" opacity="0.7" />
            <circle cx="60" cy="308" r="2.5" fill="#b8893d" opacity="0.75" />
            <path d="M60 52L108 180" stroke="rgba(243,201,105,0.15)" strokeWidth="1" />
            <path d="M108 180L60 308" stroke="rgba(138,158,92,0.15)" strokeWidth="1" />
          </svg>
        </div>
        <div className={styles.glowDecorRight} aria-hidden="true">
          <svg viewBox="0 0 120 360" fill="none">
            <ellipse cx="60" cy="180" rx="48" ry="140" stroke="rgba(184,137,61,0.22)" strokeWidth="1.2" />
            <ellipse cx="60" cy="180" rx="32" ry="96" stroke="rgba(90,107,59,0.28)" strokeWidth="1" strokeDasharray="4 8" />
            <circle cx="60" cy="52" r="3" fill="#f3c969" opacity="0.85" />
            <circle cx="12" cy="180" r="2.5" fill="#8a9e5c" opacity="0.7" />
            <circle cx="60" cy="308" r="2.5" fill="#b8893d" opacity="0.75" />
            <path d="M60 52L12 180" stroke="rgba(243,201,105,0.15)" strokeWidth="1" />
            <path d="M12 180L60 308" stroke="rgba(138,158,92,0.15)" strokeWidth="1" />
          </svg>
        </div>

        <div className={styles.glowRingWrap} aria-hidden="true">
          <svg className={styles.glowRingSvg} viewBox="0 0 400 400" fill="none">
            <defs>
              <linearGradient id="aboutArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5a6b3b" stopOpacity="0.15" />
                <stop offset="25%" stopColor="#8a9e5c" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#f3c969" stopOpacity="1" />
                <stop offset="75%" stopColor="#b8893d" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#5a6b3b" stopOpacity="0.2" />
              </linearGradient>
              <filter id="aboutArcGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <circle
              cx="200"
              cy="200"
              r={r}
              stroke="rgba(184,137,61,0.28)"
              strokeWidth="1.75"
            />
            <circle
              cx="200"
              cy="200"
              r={r}
              stroke="rgba(90,107,59,0.18)"
              strokeWidth="3"
              opacity="0.7"
            />

            <g className={styles.glowArcSpin}>
              <circle
                cx="200"
                cy="200"
                r={r}
                stroke="url(#aboutArcGrad)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${arc} ${gap}`}
                filter="url(#aboutArcGlow)"
                opacity="0.55"
              />
              <circle
                cx="200"
                cy="200"
                r={r}
                stroke="url(#aboutArcGrad)"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeDasharray={`${arc} ${gap}`}
                filter="url(#aboutArcGlow)"
              />
            </g>
          </svg>
        </div>

        <div className={styles.glowCopySlot}>
          <div
            className={`${styles.glowPhase} ${styles.glowPhaseIntro} ${
              phase === 0 ? styles.glowPhaseActive : ""
            }`}
            aria-hidden={phase !== 0}
          >
            <span className={styles.glowRule} aria-hidden="true" />
            <p className={styles.glowEyebrow}>{glowHero.phase1.eyebrow}</p>
            <h1 className={styles.glowIntroTitle}>
              <span>{glowHero.phase1.titleLine1}</span>
              <span>{glowHero.phase1.titleLine2}</span>
            </h1>
          </div>
          <p
            className={`${styles.glowPhase} ${styles.glowPhaseTitle} ${
              phase === 1 ? styles.glowPhaseActive : ""
            }`}
          >
            {glowHero.phase2}
          </p>
        </div>
      </div>
    </section>
  );
}

function OfferSection({ offer }) {
  return (
    <Reveal as="section" className={styles.offer} aria-label={offer.badge}>
      <div className={`${styles.offerHead} revealHead`}>
        <span className={styles.offerBadge}>
          <span aria-hidden="true">✦</span> {offer.badge}
        </span>
        <h2>{offer.title}</h2>
      </div>
      <div className={styles.offerGrid}>
        {offer.pillars.map((pillar) => {
          const Art = GRAPHICS[pillar.graphic] || GraphicOrbit;
          return (
            <article key={pillar.title} className={`${styles.offerCard} interactiveCard cardReveal`}>
              <div className={styles.offerArt}>
                <Art />
              </div>
              <div className={styles.offerCopy}>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </div>
            </article>
          );
        })}
      </div>
    </Reveal>
  );
}

function StorySection({ story }) {
  return (
    <Reveal as="section" className={styles.story} aria-label={story.eyebrow}>
      <div className={`${styles.storyInner} revealHead`}>
        <div className={styles.storyHead}>
          <span className={styles.storyEyebrow}>
            <span className={styles.storyRule} aria-hidden="true" />
            {story.eyebrow}
          </span>
          <h2>{story.title}</h2>
        </div>

        <div className={styles.storyProse}>
          {(story.opening || []).map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
        </div>

        {story.pullQuote ? (
          <blockquote className={styles.storyPull}>
            <p>{story.pullQuote}</p>
          </blockquote>
        ) : null}

        <div className={styles.storyProse}>
          {(story.body || []).map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
        </div>

        {story.closing ? (
          <p className={styles.storyClosing}>
            <span className={styles.storyClosingRule} aria-hidden="true" />
            {story.closing}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
      />
    </svg>
  );
}

function TeamSection({ team }) {
  const { title, members = [] } = team;

  return (
    <Reveal as="section" className={styles.founders} aria-label={title}>
      <h2 className={styles.foundersTitle}>{title}</h2>
      <ul className={styles.founderGrid}>
        {members.map((member) => (
          <li key={member.name} className={`${styles.founderCard} interactiveCard cardReveal`}>
            <div className={styles.founderHit}>
              <div className={`${styles.portrait} mediaZoom`}>
                {member.image ? (
                  <img src={member.image} alt="" />
                ) : (
                  <span className={styles.portraitInitials}>{initials(member.name)}</span>
                )}
                {member.linkedin ? (
                  <a
                    className={styles.linkedinBtn}
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <LinkedInIcon />
                  </a>
                ) : null}
              </div>
              <div className={styles.founderInfo}>
                <span className={styles.founderName}>{member.name}</span>
                <span className={styles.founderRole}>{member.role}</span>
              </div>
            </div>
            <div className={styles.quotePanel}>
              <p className={styles.quoteText}>“{member.quote}”</p>
              <p className={styles.quoteAuthor}>{member.quoteAuthor}</p>
            </div>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function ValuesSection({ values }) {
  return (
    <Reveal as="section" className={`${styles.values} toneDark`} aria-label={values.eyebrow}>
      <div className={styles.valuesInner}>
        <div className="revealHead">
          <SectionBadge as="p">{values.eyebrow}</SectionBadge>
          <h2>{values.title}</h2>
        </div>
        <div className={styles.valuesGrid}>
          {values.items.map((item) => (
            <article key={item.title} className={`${styles.valueCard} interactiveCard cardReveal`}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export default function About() {
  const { meta, glowHero, offer, story, team, values } = aboutContent;

  return (
    <PageShell atmosphere="about">
      <SEO title={meta.title} description={meta.description} path="/about" />
      <GlowHero glowHero={glowHero} />
      <OfferSection offer={offer} />
      <StorySection story={story} />
      <TeamSection team={team} />
      <ValuesSection values={values} />
      <CTABand
        title="Want to work with us?"
        body="Tell us what you’re building. We’ll reply from the founder inbox with a clear next step."
        href="/book-discovery"
        label="Start a project"
      />
    </PageShell>
  );
}
