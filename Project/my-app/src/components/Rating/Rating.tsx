import React from "react";
import styles from "./Rating.module.scss";
import { SpriteIcon } from "../SpriteIcon/SpriteIcon";

export type RatingSize = "small" | "medium";
export type RatingColor = "red" | "grey" | "green" | "gold";

export interface RatingProps {
  value?: number;
  size?: RatingSize;
  className?: string;
}

const getRatingColor = (value?: number): RatingColor => {
  if (value === undefined || value === null) return "red";

  if (value < 5) return "red";
  if (value < 7) return "grey";
  if (value < 8) return "green";
  return "gold";
};

export const Rating: React.FC<RatingProps> = ({
  value,
  size = "medium",
  className,
  ...rest
}) => {
  const color = getRatingColor(value);

  const ratingClasses = [
    styles.rating,
    styles[`rating--${size}`],
    styles[`rating--${color}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={ratingClasses} {...rest}>
      <SpriteIcon
        name={"icon-ratingStar"}
        width={size == "medium" ? 16 : 10}
        height={size == "medium" ? 16 : 10}
        className={styles.rating__icon}
      ></SpriteIcon>
      <span className={styles.rating__value}>
        {value
          ? value.toLocaleString("ru-RU", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })
          : "—"}
      </span>
    </div>
  );
};
