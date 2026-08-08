import { useRef, useState } from "react";
import Reveal from "../common/Reveal";
import styles from "./SolutionDemo.module.css";

export default function SolutionDemo({ content, fallbackPoster }) {
  const { title, videoSrc, posterSrc } = content || {};
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const poster = posterSrc || fallbackPoster;

  const toggle = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      try {
        await video.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  if (!content) return null;

  return (
    <Reveal as="section" id="demo" className={styles.section} aria-label={title}>
      <div className={`${styles.header} revealHead`}>
        <h2>{title}</h2>
      </div>
      <div className={styles.frame}>
        {videoSrc ? (
          <video
            ref={videoRef}
            className={styles.video}
            poster={poster}
            playsInline
            preload="metadata"
            onEnded={() => setPlaying(false)}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : poster ? (
          <img className={styles.poster} src={poster} alt="" />
        ) : null}
        <button type="button" className={styles.play} onClick={toggle} aria-label={playing ? "Pause demo" : "Play demo"}>
          <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
          <span>{playing ? "Pause" : "Watch Demo"}</span>
        </button>
      </div>
    </Reveal>
  );
}
