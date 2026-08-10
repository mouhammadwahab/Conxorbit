import Reveal from "../common/Reveal";
import styles from "./FacadeComplexity.module.css";

function BlueprintBuilding() {
  return (
    <svg className={styles.blueprint} viewBox="0 0 280 360" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="facadeFace" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(90, 107, 59, 0.22)" />
          <stop offset="100%" stopColor="rgba(12, 28, 32, 0.55)" />
        </linearGradient>
        <linearGradient id="facadeSide" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(184, 137, 61, 0.18)" />
          <stop offset="100%" stopColor="rgba(8, 18, 22, 0.7)" />
        </linearGradient>
        <linearGradient id="facadeRoof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(212, 176, 106, 0.35)" />
          <stop offset="100%" stopColor="rgba(90, 107, 59, 0.2)" />
        </linearGradient>
      </defs>

      {/* Ground plane */}
      <ellipse cx="140" cy="330" rx="110" ry="18" stroke="rgba(160,190,200,0.18)" strokeWidth="1" />

      {/* Dimension tick above */}
      <path d="M78 42h124M78 38v8M202 38v8" stroke="rgba(196,208,178,0.35)" strokeWidth="1" />

      {/* Isometric massing */}
      <path
        d="M140 58 L210 98 L210 278 L140 318 L70 278 L70 98 Z"
        fill="url(#facadeFace)"
        stroke="rgba(180,210,220,0.45)"
        strokeWidth="1.2"
      />
      <path
        d="M140 58 L210 98 L140 138 L70 98 Z"
        fill="url(#facadeRoof)"
        stroke="rgba(212,176,106,0.45)"
        strokeWidth="1.1"
      />
      <path
        d="M140 138 L210 98 L210 278 L140 318 Z"
        fill="url(#facadeSide)"
        stroke="rgba(180,210,220,0.35)"
        strokeWidth="1"
        opacity="0.9"
      />

      {/* Curtain-wall grid on front face */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((row) => (
        <path
          key={`h-${row}`}
          d={`M78 ${118 + row * 22} L140 ${138 + row * 22} L202 ${118 + row * 22}`}
          stroke="rgba(180,210,220,0.28)"
          strokeWidth="0.9"
        />
      ))}
      {[0, 1, 2].map((col) => (
        <path
          key={`v-${col}`}
          d={`M${94 + col * 23} ${108 + col * 8} L${94 + col * 23} ${288 + col * 8}`}
          stroke="rgba(180,210,220,0.28)"
          strokeWidth="0.9"
        />
      ))}

      {/* Accent bands */}
      <path
        d="M82 184 L140 204 L198 184 L198 202 L140 222 L82 202 Z"
        fill="rgba(20,40,48,0.55)"
        stroke="rgba(184,137,61,0.35)"
        strokeWidth="0.8"
      />
      <path
        d="M82 250 L140 270 L198 250 L198 268 L140 288 L82 268 Z"
        fill="rgba(20,40,48,0.45)"
        stroke="rgba(184,137,61,0.28)"
        strokeWidth="0.8"
      />

      {/* Anchor nodes for callouts */}
      <circle cx="70" cy="130" r="3.5" fill="#d4b06a" />
      <circle cx="70" cy="210" r="3.5" fill="#d4b06a" />
      <circle cx="70" cy="280" r="3.5" fill="#d4b06a" />
      <circle cx="210" cy="130" r="3.5" fill="#d4b06a" />
      <circle cx="210" cy="210" r="3.5" fill="#d4b06a" />
      <circle cx="210" cy="280" r="3.5" fill="#d4b06a" />
    </svg>
  );
}

export default function FacadeComplexity({ content }) {
  if (!content) return null;
  const { eyebrow, title, body, left = [], right = [] } = content;

  return (
    <Reveal as="section" className={styles.section} aria-label={eyebrow || title}>
      <div className={styles.inner}>
        <div className={`${styles.header} revealHead`}>
          {eyebrow ? (
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowRule} aria-hidden="true" />
              {eyebrow}
            </p>
          ) : null}
          <h2 className={styles.title}>{title}</h2>
          {body ? <p className={styles.body}>{body}</p> : null}
        </div>

        <div className={styles.stage}>
          <ul className={`${styles.side} ${styles.sideLeft}`}>
            {left.map((item) => (
              <li key={item.label} className={`${styles.callout} cardReveal`}>
                <div className={styles.copy}>
                  <strong>{item.label}</strong>
                  <span>{item.detail}</span>
                </div>
                <span className={styles.leader} aria-hidden="true" />
              </li>
            ))}
          </ul>

          <div className={`${styles.center} cardReveal`}>
            <BlueprintBuilding />
          </div>

          <ul className={`${styles.side} ${styles.sideRight}`}>
            {right.map((item) => (
              <li key={item.label} className={`${styles.callout} cardReveal`}>
                <span className={styles.leader} aria-hidden="true" />
                <div className={styles.copy}>
                  <strong>{item.label}</strong>
                  <span>{item.detail}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
