import PostingCard from "../PostingCard/PostingCard";
import styles from "./LatestPostsSection.module.css";

export default function LatestPostsSection() {
  const posts = [
    {
      title:
        "Violinist søges som afløser til C. Debussy projekt med orkester i Århus",
      author: "Aarhus Amatørsymfoniorkester",
      instrument: "Violin",
      date: "3. marts",
      location: "8100 Aarhus C",
    },
    {
      title: "Cellist søges til kammermusikprojekt",
      author: "Københavns Kammermusikforening",
      instrument: "Cello",
      date: "10. april",
      location: "2100 København Ø",
    },
    {
      title: "Bratschist søges til sommermusikfestival i Odense",
      author: "Odense Musikfestival",
      instrument: "Bratsch",
      date: "15. juni",
      location: "5000 Odense C",
    },
    {
      title: "Fløjtenist søges til ensembleprojekt i Aalborg",
      author: "Aalborg Ensemble",
      instrument: "Fløjte",
      date: "25. maj",
      location: "9000 Aalborg",
    },
    {
      title: "Trompetist søges til barokorkesterprojekt",
      author: "Copenhagen Baroque Orchestra",
      instrument: "Trompet",
      date: "30. september",
      location: "1300 København K",
    },
    {
      title: "Kontrabassist søges til jazzensemble",
      author: "Aarhus Jazz Orchestra",
      instrument: "Kontrabas",
      date: "8. august",
      location: "8000 Aarhus C",
    },
  ];

  return (
    <section className={`${styles.section} outer-grid`}>
      <div className={`inner-grid`}>
        <h2 className={`${styles.h2} oswald-medium`}>Seneste Opslag</h2>
        <div className={styles.postsLayout}>
          {posts.map((post, index) => (
            <PostingCard
              key={index}
              title={post.title}
              author={post.author}
              instrument={post.instrument}
              date={post.date}
              location={post.location}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
