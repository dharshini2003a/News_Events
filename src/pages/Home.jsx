import { Link } from "react-router-dom";
import { newsList, formatDate } from "../data/newsData";

export default function Home() {
  const latest = newsList[0];
  const strip = newsList.slice(1, 5);

  return (
    <div className="container page-content">
      <div className="quote-banner">
        <blockquote>
          "Intelligence and capability are not enough. There must be the joy of
          doing something beautiful."
          <cite>— Dr. G. Venkataswamy</cite>
        </blockquote>
        <img src="/images/hero-1.svg" alt="Aravind Eye Care campus" />
      </div>

      <div className="home-grid">
        <aside className="quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Awards &amp; Accolades</a></li>
            <li><a href="#">Special Events</a></li>
            <li><a href="#">CME held at Aravind Eye Hospital</a></li>
            <li><a href="#">Conferences Attended Elsewhere</a></li>
            <li><Link to="/current-news">News and Events</Link></li>
            <li><a href="#">Human Resource Development</a></li>
            <li><a href="#">LAICO Happenings</a></li>
            <li><a href="#">Internal Capacity Building</a></li>
            <li><a href="#">Training Programmes</a></li>
            <li><a href="#">Publications</a></li>
            <li><a href="#">Monthly Patient Statistics</a></li>
            <li><a href="#">Aurolab News</a></li>
          </ul>
        </aside>

        <div>
          <h3 className="section-title">Latest Highlights</h3>
          <article className="highlight-feature">
            <img src={latest.thumbnail} alt={latest.title} />
            <div className="hf-body">
              <h2>{latest.title}</h2>
              <p>{latest.shortDescription}</p>
              <Link className="btn-readmore" to={`/current-news/${latest.id}`}>
                Read More
              </Link>
            </div>
          </article>

          <div className="thumb-strip">
            {strip.map((n) => (
              <Link key={n.id} to={`/current-news/${n.id}`}>
                <figure>
                  <img src={n.thumbnail} alt={n.title} />
                  <figcaption>{n.title}</figcaption>
                </figure>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
