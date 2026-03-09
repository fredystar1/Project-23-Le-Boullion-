import Link from "next/link";

const policies = [
  { href: "/policies/refund-policy", label: "Refund Policy" },
  { href: "/policies/privacy-policy", label: "Privacy Policy" },
  { href: "/policies/terms-of-service", label: "Terms of Service" },
];

const Page = () => {
  return (
    <main className="page-shell py-12">
      <div className="mx-auto max-w-3xl rounded-2xl border border-umber-300/40 bg-parchment-100/80 p-8 shadow-sm">
        <h1 className="font-change text-3xl text-merlot-700 sm:text-4xl">
          Policies
        </h1>
        <p className="mt-3 text-sm text-umber-700 sm:text-base">
          View our store policies below.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          {policies.map((policy) => (
            <Link
              key={policy.href}
              href={policy.href}
              className="policy-button"
            >
              {policy.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
