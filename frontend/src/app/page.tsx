import FeedbackBanner from "./components/FeedbackBanner/FeedbackBanner";

import IndexHeader from "./components/IndexHeader/IndexHeader";
import LatestPostsSection from "./components/LatestPostsSection/LatestPostsSection";

import Nav from "./components/Nav/Nav";
import UserReviews from "./components/UserReviews/UserReviews";

export default function HomePage() {
  return (
    <div>
      <>
        <Nav />
        <IndexHeader />
        <UserReviews />
        <LatestPostsSection />
        <FeedbackBanner />
      </>
    </div>
  );
}
