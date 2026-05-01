import Link from "next/link";

export default function Custom500() {
  return (
    <div className="section bg-[var(--surface)] flex flex-col items-center justify-center p-40">
      <div className="holepunch bg-sage-meadow-300 p-20">
        <h1 className="font-governor text-sage-meadow-900 py-10 text-4xl text-3D">
          Page not Found
        </h1>
        <div className="rect-button-container color-set-1 mx-auto">
          <Link className="rect-button-top font-change" href="/">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
