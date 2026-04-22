/**
 * Policies index page — `/policies`
 *
 * Displays links to the store's legal / policy pages (refund, privacy,
 * and terms of service).  Individual policy detail pages are served by
 * the `[slug]` dynamic route.
 *
 * @module pages/policies
 */

import Link from "next/link";

/** Policy page link definitions. */
const policies = [
  { href: "/policies/refund-policy", label: "Refund Policy" },
  { href: "/policies/privacy-policy", label: "Privacy Policy" },
  { href: "/policies/terms-of-service", label: "Terms of Service" },
];

/**
 * Render the policies index page.
 *
 * @returns A themed card listing clickable links to each policy page.
 */
const Page = () => {
  return (
    <div className="section color-set-5 bg-[var(--surface)]">
      <div className="policy-card">
        <h1 className="flex font-governor text-3D text-5xl text-[var(--text)]">
          Policies
        </h1>
        <p className="mt-3 text-lg">View our store policies below.</p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          {policies.map((policy) => (
            <Link key={policy.href} href={policy.href} className="policy-label">
              {policy.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
