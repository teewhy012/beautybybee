"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    setDone(true);
  }

  if (done) {
    return (
      <p className="mx-auto mt-8 max-w-md rounded-full bg-white/90 px-6 py-3.5 text-sm font-medium text-espresso">
        Welcome to the hive — check your inbox for a little hello.
      </p>
    );
  }

  return (
    <form
      className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
      onSubmit={handleSubmit}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="h-12 flex-1 rounded-full border border-espresso/20 bg-white/90 px-5 text-sm outline-none transition-colors placeholder:text-cocoa/70 focus:border-espresso/50"
      />
      <button
        type="submit"
        className="h-12 rounded-full bg-espresso px-7 text-sm font-medium text-cream transition-colors hover:bg-cocoa"
      >
        Sign me up
      </button>
    </form>
  );
}