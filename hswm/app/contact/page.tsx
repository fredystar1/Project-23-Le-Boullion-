import HeroBanner from "../HeroBanner";
import Button from "../Button";

const Page = () => {
  return (
    <div>
      <HeroBanner message="Contact Us" />
      <div className="flex justify-center p-6 gap-4">
        <div className="rounded outline-4 p-3 outline-primary ">
          <h3 className="text-center font-bold">Contact Information</h3>
          <p>4910 Underwood Ave</p>
          <p>Omaha. NE 68132</p>
          <br />
          <p>Phone: 402-504-4021</p>
          <p>Email: info@howardstreetwine.com</p>
          <br />
          <h3 className="text-center">Hours</h3>
          <p>Monday-Saturday: 10:00 AM - 7:30 PM</p>
          <p>Sunday: 12:00 PM - 6:00 PM</p>
        </div>

        <div className="rounded outline-4 p-3 outline-primary">
          <h3 className="text-center font-bold">Send us a message</h3>
          <div>
            <form className="flex flex-col gap-4">
              <div className="flex gap-2">
                <label htmlFor="name">Name</label>
                <input
                  placeholder="Name"
                  className="bg-gray-200 outline-1 outline-black"
                  type="text"
                  id="name"
                  name="name"
                />
              </div>
              <div className="flex gap-2">
                <label htmlFor="email">Email</label>
                <input
                  placeholder="Email"
                  className="bg-gray-200 outline-1 outline-black"
                  type="text"
                  id="email"
                  name="email"
                />
              </div>
              <div className="flex gap-2">
                <label htmlFor="message">Message</label>
                <input
                  placeholder="Message"
                  className="bg-gray-200 outline-1 outline-black"
                  type="text"
                  id="message"
                  name="message"
                />
              </div>
              <Button
                buttonText="Submit"
                type="submit"
                className="bg-secondary rounded text-textcolor outline-4 outline-primary"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
