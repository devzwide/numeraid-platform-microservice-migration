import { useEffect, useState } from "react";

const heroImages = [
  {
    src: "https://i.pinimg.com/1200x/a5/3a/ce/a53ace526291f7d8f05544e91237fa19.jpg",
    alt: "Student learning mathematics with confidence",
  },
  {
    src: "https://i.pinimg.com/1200x/57/2b/f9/572bf9b8a0ac7390934f5dd78f9746bd.jpg",
    alt: "Student working through a mathematics problem",
  },
  {
    src: "https://i.pinimg.com/1200x/d3/c5/08/d3c50833fb353e8142f203b62e875acd.jpg",
    alt: "Student learning mathematics in a supportive environment",
  },
];

const features = [
  {
    title: "Step-by-step guidance",
    description:
      "Clear examples and helpful prompts turn a difficult problem into something manageable.",
    image:
      "https://i.pinimg.com/1200x/be/57/ca/be57cab38b125c95635cc7103a38cab6.jpg",
    alt: "Student reviewing a math problem with supportive explanation",
  },
  {
    title: "Learning that adapts",
    description:
      "Tools and practice are designed around how learners think, not just how fast they move.",
    image:
      "https://i.pinimg.com/1200x/0b/cf/74/0bcf7404be523bc5c8b704f47fa008d8.jpg",
    alt: "Student interacting with personalized learning tools",
  },
  {
    title: "Confidence over pressure",
    description:
      "Small wins and steady practice help numbers feel less intimidating and more understandable.",
    image:
      "https://i.pinimg.com/1200x/ee/b5/58/eeb5582d75de4838c474d93db464df97.jpg",
    alt: "Student building confidence through repeated learning practice",
  },
];

const supportingPoints = [
  "For students and families",
  "Built around everyday numeracy",
  "Practical support that feels personal",
];

const HomePage = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroImages.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="overflow-hidden bg-[#F8F7FC] text-[#17152B] antialiased">
      <section className="mx-auto grid w-[calc(100%-1.5rem)] max-w-7xl grid-cols-1 items-center gap-10 py-12 md:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        <div className="relative z-10">
          <span className="mb-5 inline-flex items-center rounded-full bg-[#EEE9FF] px-3.5 py-2 text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-[#6D4AFF]">
            Learn numbers with confidence
          </span>

          <h1 className="max-w-2xl text-4xl font-black leading-[0.94] tracking-[-0.06em] text-[#17152B] sm:text-5xl lg:text-[4.25rem]">
            Making numbers
            <span className="block text-[#6D4AFF]">easier to understand.</span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-[#6F6C7F] sm:text-base sm:leading-8">
            Numeraid helps students, families, and learning communities build
            confidence with numbers through clear guidance, calm support, and
            practical tools.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => scrollTo("get-started")}
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#6D4AFF] px-6 font-bold text-white shadow-[0_12px_30px_rgba(109,74,255,0.25)] transition hover:-translate-y-0.5 hover:bg-[#5135D4] hover:shadow-[0_18px_34px_rgba(109,74,255,0.3)] focus:outline-none focus:ring-4 focus:ring-[#6D4AFF]/20"
            >
              Get started
              <span aria-hidden="true">→</span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo("about")}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#E8E6F0] bg-white px-6 font-bold text-[#17152B] transition hover:-translate-y-0.5 hover:border-[#6D4AFF] hover:text-[#6D4AFF] focus:outline-none focus:ring-4 focus:ring-[#6D4AFF]/20"
            >
              Learn more
            </button>
          </div>

          <ul className="mt-7 flex flex-wrap items-center gap-3 text-sm text-[#6F6C7F]">
            {supportingPoints.map((point) => (
              <li
                key={point}
                className="inline-flex items-center gap-2 rounded-full border border-[#E8E6F0] bg-white px-3 py-1.5"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#EEE9FF] text-[10px] font-bold text-[#6D4AFF]">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="relative overflow-hidden rounded-4xl border border-[#E8E6F0] bg-white p-3 shadow-[0_28px_60px_rgba(35,27,75,0.12)]">
            <div className="relative aspect-[0.92] overflow-hidden rounded-3xl bg-[#DDD9E8]">
              {heroImages.map((image, index) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                    index === activeSlide
                      ? "scale-100 opacity-100"
                      : "scale-[1.04] opacity-0"
                  }`}
                />
              ))}

              <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/35" />

              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                  Confident learning
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 p-3 shadow-[0_18px_40px_rgba(35,27,75,0.12)] backdrop-blur-md sm:left-auto sm:right-4">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#6D4AFF] text-lg text-white">
              ✦
            </div>

            <div>
              <div className="text-sm font-semibold text-[#17152B]">
                Learn at your pace
              </div>
              <div className="text-xs text-[#6F6C7F]">
                Small steps. Real progress.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="mx-auto w-[calc(100%-1.5rem)] max-w-7xl border-t border-[#E8E6F0] py-16 sm:py-20"
      >
        <div className="mb-5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#6D4AFF]">
          About Numeraid
        </div>

        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12 lg:gap-20">
          <h2 className="max-w-xl text-3xl font-black leading-tight tracking-tighter text-[#17152B] sm:text-4xl lg:text-[3.1rem]">
            Mathematics should feel clear, not intimidating.
          </h2>

          <div className="space-y-5 text-sm leading-7 text-[#6F6C7F] sm:text-base sm:leading-8">
            <p>
              Dyscalculia can make numbers feel confusing even when a learner is
              capable and motivated. Numeraid is designed to remove friction and
              make the process feel calmer, more structured, and easier to follow.
            </p>

            <p>
              We combine approachable explanations, supportive routines, and
              guided practice so people can understand why a solution works, not
              just memorize the answer.
            </p>

            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#E8E6F0] bg-white p-4">
                <div className="mb-2 text-sm font-semibold text-[#17152B]">
                  Built for real learning
                </div>
                <p className="text-sm leading-6 text-[#6F6C7F]">
                  Support that respects different learning styles and confidence levels.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E8E6F0] bg-white p-4">
                <div className="mb-2 text-sm font-semibold text-[#17152B]">
                  Practical by design
                </div>
                <p className="text-sm leading-6 text-[#6F6C7F]">
                  Focused guidance that helps learners move forward with clarity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="mx-auto w-[calc(100%-1.5rem)] max-w-7xl py-8 pb-20 sm:pb-24"
      >
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#6D4AFF]">
              How it helps
            </div>

            <h2 className="text-3xl font-black leading-tight tracking-tighter text-[#17152B] sm:text-4xl lg:text-[3.1rem]">
              Calm support for the way people actually learn.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-[#6F6C7F] sm:text-base">
            Progress is built through understanding, repetition, and confidence — not pressure.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group overflow-hidden rounded-[1.75rem] border border-[#E8E6F0] bg-white transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(35,27,75,0.09)]"
            >
              <div className="aspect-[1.25] overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6 sm:p-7">
                <h3 className="mb-2 text-xl font-bold tracking-tight text-[#17152B]">
                  {feature.title}
                </h3>
                <p className="text-sm leading-6 text-[#6F6C7F]">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="get-started"
        className="relative isolate mx-auto mb-16 grid min-h-88 w-[calc(100%-1.5rem)] max-w-7xl place-items-center overflow-hidden rounded-4xl bg-[#6D4AFF] px-5 py-16 text-white shadow-[0_28px_60px_rgba(109,74,255,0.22)] sm:rounded-[2.5rem] sm:py-20"
      >
        <div className="absolute -bottom-24 -left-20 -z-10 h-56 w-56 rounded-full bg-white/10" />
        <div className="absolute -right-10 -top-20 -z-10 h-44 w-44 rounded-full bg-white/10" />
        <div className="absolute bottom-8 right-28 -z-10 h-14 w-14 rounded-full bg-white/15" />

        <div className="max-w-2xl text-center">
          <div className="mb-5 text-xs font-extrabold uppercase tracking-[0.12em] text-white/70">
            Ready when you are
          </div>

          <h2 className="text-3xl font-black leading-none tracking-tighter sm:text-5xl lg:text-[3.6rem]">
            Take the next step
            <span className="block text-white/70">with confidence.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/80 sm:text-base lg:text-lg">
            From the first challenge to the next milestone, Numeraid gives people
            the support they need to keep moving forward with clarity.
          </p>

          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-6 font-bold text-[#6D4AFF] transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30"
          >
            Join Numeraid
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto grid w-[calc(100%-1.5rem)] max-w-7xl gap-8 border-t border-[#E8E6F0] py-16 sm:py-20 md:grid-cols-[0.9fr_1.1fr] md:gap-12 lg:gap-16"
      >
        <div>
          <div className="mb-5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#6D4AFF]">
            Get in touch
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-tighter text-[#17152B] sm:text-4xl lg:text-[3.1rem]">
            We’re here to help.
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-7 text-[#6F6C7F] sm:text-base">
            Whether you’re exploring the platform or looking for support with a
            learning challenge, we’re ready to help you take the next step.
          </p>
        </div>

        <div className="grid gap-4">
          <a
            href="mailto:support@numeraid.com"
            className="rounded-2xl border border-[#E8E6F0] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#6D4AFF] hover:shadow-[0_12px_28px_rgba(35,27,75,0.06)]"
          >
            <span className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#6D4AFF]">
              Email
            </span>
            <span className="text-base font-medium text-[#17152B]">
              support@numeraid.com
            </span>
          </a>

          <a
            href="tel:+15551234567"
            className="rounded-2xl border border-[#E8E6F0] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#6D4AFF] hover:shadow-[0_12px_28px_rgba(35,27,75,0.06)]"
          >
            <span className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#6D4AFF]">
              Phone
            </span>
            <span className="text-base font-medium text-[#17152B]">
              +1 (555) 123-4567
            </span>
          </a>

          <address className="rounded-2xl border border-[#E8E6F0] bg-white p-5 not-italic">
            <span className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#6D4AFF]">
              Address
            </span>
            <span className="text-base font-medium text-[#17152B]">
              123 Learning Lane
              <br />
              Education City, SA
            </span>
          </address>
        </div>
      </section>
    </main>
  );
};

export default HomePage;