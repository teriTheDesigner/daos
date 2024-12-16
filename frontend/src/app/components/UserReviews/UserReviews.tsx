import ReviewCard from "../ReviewCard/ReviewCard";
import styles from "./UserReviews.module.css";
import sofieImg from "../../assets/sofie.png";
import anittaImg from "../../assets/anitta.png";

export default function UserReviews() {
  return (
    <section className={`${styles.section} outer-grid`}>
      <div className="inner-grid">
        <h2 className={`${styles.h2} oswald-medium`}>
          Det siger vores brugere
        </h2>
        <div className={styles.reviewsDiv}>
          <ReviewCard
            authorImage="/sofie.png"
            authorName="Sofie"
            authorSubtitle="Fra kvartetten Klassisk Amok"
            reviewText="Musik Samspil hjalp os med at finde sammen. Først var det meningen, at vi bare skulle mødes en enkelt gang, men det var bare så fedt, at nu mødes vi hver anden uge!"
          />{" "}
          <ReviewCard
            authorImage="/anitta.png"
            authorName="Anitta"
            authorSubtitle="Koordinator i VirumOrkestret"
            reviewText="Musik Samspil hjalp os med at finde sammen. Først var det meningen, at vi bare skulle mødes en enkelt gang, men det var bare så fedt, at nu mødes vi hver anden uge!"
          />
          <ReviewCard
            authorImage="/sofie.png"
            authorName="Sofie"
            authorSubtitle="Fra kvartetten Klassisk Amok"
            reviewText="Vi stod over for at mangle både en trompetist og en fløjtenist til vores nytårskoncert - men med Musik Samspil fandt vi assistenter i løbet af få timer. Noget der ellers kan holde mig søvnløs i flere nætter!"
          />
        </div>
      </div>
    </section>
  );
}
