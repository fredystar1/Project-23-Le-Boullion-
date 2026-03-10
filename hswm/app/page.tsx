export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero-banner">
        <h1 className="hero-message">
          Thoughtfully selected wines with classic charm and modern ease.
        </h1>

        <p className="mx-auto max-w-2xl text-base text-white/90 sm:text-lg">
          Discover bottles for weekdays, celebrations, and cellar-worthy
          moments.
        </p>

        <button className="action-button">Browse Selection</button>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <article className="section-card">
          <h2 className="info-title">Curated Selection</h2>
          <p className="section-subtitle !mt-0 !text-left">
            Seasonal picks from trusted producers, selected for character and
            balance.
          </p>
        </article>

        <article className="section-card">
          <h2 className="info-title">Pairing Guidance</h2>
          <p className="section-subtitle !mt-0 !text-left">
            Clear, practical recommendations that make pairing food and wine
            approachable.
          </p>
        </article>

        <article className="section-card">
          <h2 className="info-title">Local Expertise</h2>
          <p className="section-subtitle !mt-0 !text-left">
            In-store insight from Omaha wine professionals who know your taste.
          </p>
        </article>
      </section>
    </main>
  );
}