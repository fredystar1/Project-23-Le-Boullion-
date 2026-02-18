export default function ContactPage() {
  return (
    <main className="relative">
      {/* Title + subtitle */}
      <section className="relative">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h1 className="hswm-title text-5xl md:text-6xl font-semibold">
            Contact Us
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-black/70">
            We’d love to hear from you. Please fill out the form below or reach
            out directly using the contact information provided.
          </p>
        </div>

        {/* Main 2-column card */}
        <div className="mx-auto max-w-5xl px-6 pb-20">
          <div className="grid overflow-hidden border border-black/10 bg-white/40 backdrop-blur-sm md:grid-cols-2">
            {/* Left column */}
            <div className="border-b border-black/10 p-10 md:border-b-0 md:border-r">
              <h2 className="text-2xl font-semibold">Contact Information</h2>

              <div className="mt-6 space-y-2 text-black/70">
                <p>4910 Underwood Ave,</p>
                <p>Omaha, NE 68132</p>
              </div>

              <div className="mt-8 space-y-3 text-black/80">
                <p className="flex items-center gap-3">
                  <span className="inline-block h-7 w-7 rounded-full border border-black/10 bg-white/60" />
                  402-504-4021
                </p>
                <p className="flex items-center gap-3">
                  <span className="inline-block h-7 w-7 rounded-full border border-black/10 bg-white/60" />
                  info@howardstreetwine.com
                </p>
              </div>

              <div className="mt-10 border-t border-black/10 pt-8">
                <h3 className="text-2xl font-semibold">Hours</h3>
                <div className="mt-4 space-y-2 text-black/70">
                  <p>Monday - Saturday:</p>
                  <p>10:00 AM - 7:30 PM</p>
                  <p className="mt-4">Sunday: 12:00 PM - 6:00 PM</p>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="p-10">
              <h2 className="text-2xl font-semibold">Send Us Your Questions</h2>

              <form className="mt-6 space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-black/70">
                      Name
                    </label>
                    <input
                      className="w-full border border-black/10 bg-white/60 px-4 py-3 outline-none focus:border-black/30"
                      placeholder="Name"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-black/70">
                      Phone
                    </label>
                    <input
                      className="w-full border border-black/10 bg-white/60 px-4 py-3 outline-none focus:border-black/30"
                      placeholder="Phone"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-black/70">
                    Message
                  </label>
                  <textarea
                    className="h-40 w-full resize-none border border-black/10 bg-white/60 px-4 py-3 outline-none focus:border-black/30"
                    placeholder="Message"
                  />
                </div>

                <button
                  type="button"
                  className="w-full bg-[#7b5a3a] py-4 text-sm tracking-widest text-white hover:bg-[#6a4d33]"
                >
                  SEND
                </button>
              </form>
            </div>
          </div>

          {/* Footer-like section */}
          <div className="mt-16 grid gap-10 border-t border-black/10 pt-12 md:grid-cols-3">
            <div>
              <h4 className="text-sm tracking-widest text-black/70">ABOUT US</h4>
              <div className="mt-4 space-y-2 text-black/70">
                <p>4910 Underwood Ave, Omaha, NE 68132</p>
                <p>Mon - Sat: 10:00 AM - 7:30 PM</p>
                <p>Sun: 12:00 PM - 6:00 PM</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm tracking-widest text-black/70">
                QUICK LINKS
              </h4>
              <div className="mt-4">
                <div className="flex items-center border border-black/10 bg-white/50">
                  <input
                    className="w-full bg-transparent px-4 py-3 outline-none"
                    placeholder="Email"
                  />
                  <div className="px-4 py-3 text-black/60">→</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm tracking-widest text-black/70">SOCIAL</h4>
              <div className="mt-4 space-y-2 text-black/70">
                <p>Facebook</p>
                <p>Twitter</p>
                <p>Instagram</p>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-black/10 pt-6 text-center text-xs text-black/60">
            © 2026, Howard Street Wine Merchant · Refund policy · Privacy policy ·
            Terms of service
          </div>
        </div>
      </section>
    </main>
  );
}
