import HeroBanner from "../HeroBanner";
import Button from "../Button";

const Page = () => {
  return (
    <main className="page-shell">
      <HeroBanner message="Contact Us" />
      <div className="grid gap-6 md:grid-cols-2">
        <section className="section-card">
          <h3 className="info-title">Contact Information</h3>
          <p>4910 Underwood Ave</p>
          <p>Omaha. NE 68132</p>
          <br />
          <p>Phone: 402-504-4021</p>
          <p>Email: info@howardstreetwine.com</p>
          <br />
          <h3 className="info-title !text-lg !mb-2">Hours</h3>
          <p>Monday-Saturday: 10:00 AM - 7:30 PM</p>
          <p>Sunday: 12:00 PM - 6:00 PM</p>
        </section>

        <section className="section-card">
          <h3 className="info-title">Send us a message</h3>
          <div>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="filter-label !text-sm !normal-case">
                  Name
                </label>
                <input
                  placeholder="Name"
                  className="form-field"
                  type="text"
                  id="name"
                  name="name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="filter-label !text-sm !normal-case">
                  Email
                </label>
                <input
                  placeholder="Email"
                  className="form-field"
                  type="text"
                  id="email"
                  name="email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="filter-label !text-sm !normal-case"
                >
                  Message
                </label>
                <input
                  placeholder="Message"
                  className="form-field"
                  type="text"
                  id="message"
                  name="message"
                />
              </div>
              <Button
                buttonText="Submit"
                type="submit"
                className="btn-brand self-start"
              />
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;
