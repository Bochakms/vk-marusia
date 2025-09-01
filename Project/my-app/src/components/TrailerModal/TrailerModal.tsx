// components/TrailerModal/TrailerModal.tsx
import { useState, useRef, useEffect } from "react";
import styles from "./TrailerModal.module.scss";
import { SpriteIcon } from "../SpriteIcon/SpriteIcon";

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  trailerYouTubeId: string;
  title: string;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({
  isOpen,
  onClose,
  trailerYouTubeId,
  title,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const mouseMoveTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    // Слушаем сообщения от YouTube iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.youtube.com") return;

      try {
        const data = JSON.parse(event.data);
        if (data.event === "onStateChange") {
          // 0: ended, 1: playing, 2: paused
          setIsPaused(data.info === 2 || data.info === 0);
        }
      } catch (error) {
        console.log(error);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
      window.removeEventListener("message", handleMessage);

      if (mouseMoveTimeout.current) {
        clearTimeout(mouseMoveTimeout.current);
      }
    };
  }, [isOpen, onClose]);

  const getYouTubeUrl = () => {
    // Включаем стандартные контролы YouTube и автопаузу при клике
    return `https://www.youtube.com/embed/${trailerYouTubeId}?autoplay=1&controls=1&modestbranding=1&rel=0&enablejsapi=1`;
  };

  const handleIframeLoad = () => {
    // YouTube API автоматически управляет состоянием
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрыть"
        >
          <SpriteIcon name="icon-close" width={24} height={24} />
        </button>

        <div className={styles.videoWrapper}>
          <iframe
            ref={iframeRef}
            className={styles.youtubeIframe}
            src={getYouTubeUrl()}
            title={`Трейлер: ${title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            onLoad={handleIframeLoad}
          />

          {/* Показываем название только на паузе */}
          {isPaused && (
            <div className={styles.videoTitle}>
              <h3>{title}</h3>
              <p>Нажмите для продолжения воспроизведения</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
