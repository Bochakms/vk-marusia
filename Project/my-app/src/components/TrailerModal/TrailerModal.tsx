import { useRef } from "react";
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
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const getYouTubeUrl = () => {
    return `https://www.youtube.com/embed/${trailerYouTubeId}?autoplay=1`;
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
          />
        </div>
      </div>
    </div>
  );
};
