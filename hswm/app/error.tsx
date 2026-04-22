/**
 * Next.js error boundary page.
 *
 * This **client component** is rendered by Next.js whenever an unhandled
 * error is thrown during rendering of a page or layout in the app
 * directory.  It displays a "Nothing Here" message with a link back to
 * the home page.
 *
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/error}
 * @module error
 */

"use client";

import Link from "next/link";

/**
 * Render the global error fallback UI.
 *
 * @param props        - Error boundary props injected by Next.js.
 * @param props.error  - The error that was thrown.  Includes an optional
 *                       `digest` string for server-side error tracing.
 * @param props.reset  - Callback to attempt re-rendering the errored
 *                       segment (currently unused in the template).
 * @returns A centered error message with a "Return Home" button.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="section bg-[var(--surface)] flex flex-col items-center justify-center p-40">
      <div className="holepunch bg-sage-meadow-300 p-20">
        <h1 className="font-governor text-sage-meadow-900 py-10 text-4xl text-3D">
          Nothing Here
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
