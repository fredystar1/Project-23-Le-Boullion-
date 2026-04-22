/**
 * About page — `/about`
 *
 * Static placeholder page for the "About Howard Street Wine Merchant"
 * section.  Currently displays lorem-ipsum content and is not linked
 * in the main navigation.
 *
 * @module pages/about
 */

/**
 * Render the About page.
 *
 * @returns A `<main>` element with a hero banner and placeholder body text.
 */
const Page = () => {
  return (
    <main className="page-shell">
      <section className="hero-banner">
        <h1 className="hero-message">About Howard Street Wine Merchant</h1>
      </section>
      <section className="section-card max-w-4xl mx-auto">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </section>
    </main>
  );
};

export default Page;
