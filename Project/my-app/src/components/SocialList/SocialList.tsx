import styles from "./SocialList.module.scss";
import { SpriteIcon } from "../SpriteIcon/SpriteIcon";

export const SocialList = () => {
  return (
    <div className={styles.socialList}>
      <a href="#" className={styles.socialList__link} aria-label="Ссылка на VK">
        <SpriteIcon
          className={styles.socialList__icon}
          name="icon-vk"
          width={19}
          height={10}
        />
      </a>
      <a
        href="#"
        className={styles.socialList__link}
        aria-label="Ссылка на YouTube"
      >
        <SpriteIcon
          className={styles.socialList__icon}
          name="icon-youtube"
          width={16}
          height={11}
        />
      </a>
      <a href="#" className={styles.socialList__link} aria-label="Ссылка на OK">
        <SpriteIcon
          className={styles.socialList__icon}
          name="icon-ok"
          width={11}
          height={18}
        />
      </a>
      <a
        href="#"
        className={styles.socialList__link}
        aria-label="Ссылка на Telegram"
      >
        <SpriteIcon
          className={styles.socialList__icon}
          name="icon-tg"
          width={16}
          height={13}
        />
      </a>
    </div>
  );
};
