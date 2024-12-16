import styles from "./PostingCard.module.css";

interface PostingCardProps {
  title?: string;
  author?: string;
  instrument?: string;
  date?: string;
  location?: string;
  description?: string;
}

export default function PostingCard({
  title,
  author,
  instrument,
  date,
  location,
  description,
}: PostingCardProps) {
  return (
    <div className={`${styles.card} `}>
      <div className={`${styles.cardLayout} `}>
        <h6 className={`${styles.h6} montserrat-bold`}>{title}</h6>
        {description && (
          <p className="montserrat-regular mt-1 text-xs text-gray-400">
            {description}
          </p>
        )}
        <div className={`${styles.info} montserrat-regular`}>
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13.887"
              height="13.887"
              viewBox="0 0 13.887 13.887"
            >
              <path
                id="author-icon"
                d="M24.095,13.887H10.207a1.47,1.47,0,0,1,.233-.971A6.9,6.9,0,0,1,13.2,11.138a11.1,11.1,0,0,1,3.954-.851,11.1,11.1,0,0,1,3.954.851,6.906,6.906,0,0,1,2.757,1.778,1.515,1.515,0,0,1,.233.971ZM17.152,8.358a3.731,3.731,0,0,1-2.679-1.13A3.868,3.868,0,0,1,13.362,4.5V3.858a3.868,3.868,0,0,1,1.11-2.728,3.742,3.742,0,0,1,5.359,0,3.868,3.868,0,0,1,1.11,2.728V4.5a3.868,3.868,0,0,1-1.11,2.728A3.731,3.731,0,0,1,17.152,8.358Z"
                transform="translate(-10.207)"
                fill="#777"
              />
            </svg>
            &nbsp;&nbsp;&nbsp;{author}
          </p>
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10.384"
              height="14.833"
              viewBox="0 0 10.384 14.833"
            >
              <path
                id="instrument-icon"
                d="M21.517,2.009,17.206,3.185a1.483,1.483,0,0,0-1.092,1.431v5.406c0,1.85-4.45.483-4.45,4.346a2.479,2.479,0,0,0,2.57,2.465c2.611,0,3.364-1.984,3.364-4.186V7.024L21.676,5.8a.462.462,0,0,0,.371-.452V2.443A.443.443,0,0,0,21.517,2.009Z"
                transform="translate(-11.664 -2)"
                fill="#777"
              />
            </svg>
            &nbsp;&nbsp;&nbsp;{instrument}
          </p>
        </div>
      </div>
      <p className={`${styles.dateLocation} montserrat-regular`}>
        {date} • {location}
      </p>
    </div>
  );
}
