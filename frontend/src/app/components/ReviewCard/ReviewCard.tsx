import styles from "./ReviewCard.module.css";

type ReviewCardProps = {
  reviewText: string;
  authorName: string;
  authorSubtitle: string;
  authorImage: string;
};

export default function ReviewCard({
  reviewText,
  authorName,
  authorSubtitle,
  authorImage,
}: ReviewCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.review}>
        <p className={`${styles.reviewText} montserrat-light`}>
          <span
            className={`${styles.quotes} ${styles.quotesTop} oswald-medium`}
          >
            “
          </span>
          {reviewText}
          <span
            className={`${styles.quotes} ${styles.quotesBottom} oswald-medium`}
          >
            ”
          </span>
        </p>
      </div>
      <div className={styles.authorInfo}>
        <img
          className={styles.authorImage}
          src={authorImage}
          alt={authorName}
        />

        <p className={`${styles.authorName} montserrat-bold`}>{authorName}</p>
        <p className={`${styles.authorSubtitle} oswald-medium`}>
          {authorSubtitle}
        </p>
      </div>
    </div>
  );
}
