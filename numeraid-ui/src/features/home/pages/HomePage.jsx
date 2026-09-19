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
    title: "Step-by-Step Help",
    description:
      "Clear, guided solutions that help you understand problems at your own pace.",
    image:
      "https://i.pinimg.com/1200x/be/57/ca/be57cab38b125c95635cc7103a38cab6.jpg",
  },
  {
    title: "Personalized Tools",
    description:
      "Interactive exercises and adaptive features designed around the way you learn.",
    image:
      "https://i.pinimg.com/1200x/0b/cf/74/0bcf7404be523bc5c8b704f47fa008d8.jpg",
  },
  {
    title: "Confidence Building",
    description:
      "Build confidence through focused practice designed to make mathematics feel less overwhelming.",
    image:
      "https://i.pinimg.com/1200x/ee/b5/58/eeb5582d75de4838c474d93db464df97.jpg",
  },
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
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="mx-auto grid min-h-128 w-[calc(100%-1.5rem)] max-w-295 grid-cols-1 items-center gap-8 py-12 md:grid-cols-[1.05fr_0.95fr] md:gap-10 lg:gap-14 lg:py-16">
        {/* Hero Content */}
        <div className="relative z-10">
          <span className="mb-5 inline-flex items-center rounded-full bg-[#EEE9FF] px-4 py-2 text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-[#6D4AFF]">
            Learn numbers with confidence
          </span>

          <h1 className="max-w-3xl text-4xl font-black leading-[0.96] tracking-tighter sm:text-5xl md:text-[3.2rem] lg:text-[4.25rem]">
            Making numbers
            <span className="block text-[#6D4AFF]">
              easier to understand.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-[#6F6C7F] sm:text-base sm:leading-8">
            Numeraid is your digital companion for overcoming dyscalculia,
            building mathematical confidence, and making everyday numbers
            easier to navigate.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => scrollTo("get-started")}
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#6D4AFF] px-6 font-bold text-white shadow-[0_12px_30px_rgba(109,74,255,0.25)] transition hover:-translate-y-0.5 hover:bg-[#5135D4] hover:shadow-[0_16px_36px_rgba(109,74,255,0.32)] focus:outline-none focus:ring-4 focus:ring-[#6D4AFF]/20"
            >
              Get started
              <span aria-hidden="true">→</span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo("about")}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#E8E6F0] bg-white px-6 font-bold text-[#17152B] transition hover:-translate-y-0.5 hover:border-[#6D4AFF] focus:outline-none focus:ring-4 focus:ring-[#6D4AFF]/20"
            >
              Learn more
            </button>
          </div>

          {/* Trust statement */}
          <div className="mt-6 flex items-center gap-3 text-sm text-[#6F6C7F]">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#6D4AFF] text-xs font-bold text-white">
              ✓
            </span>

            <span>
              Designed to make learning feel less overwhelming
            </span>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative">
          <div className="relative aspect-[0.9] overflow-hidden rounded-4xl bg-[#DDD9E8] shadow-[0_26px_60px_rgba(35,27,75,0.16)]">
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

            {/* Image overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/40" />

            {/* Slider controls */}
            <div className="absolute bottom-5 left-5 flex items-center gap-2">
              {heroImages.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Show slide ${index + 1}`}
                  aria-current={index === activeSlide}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    index === activeSlide
                      ? "w-7 bg-white"
                      : "w-2 bg-white/60 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Floating card */}
          <div className="absolute -bottom-6 left-1/2 flex w-[calc(100%-2rem)] max-w-60 -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/70 bg-white/95 p-3.5 shadow-[0_18px_40px_rgba(35,27,75,0.16)] backdrop-blur-md sm:left-auto sm:right-4 sm:translate-x-0">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#6D4AFF] text-white">
              ✦
            </div>

            <div>
              <strong className="block text-sm">
                Learn at your pace
              </strong>

              <span className="text-xs text-[#6F6C7F]">
                Small steps. Real progress.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ABOUT
      ====================================================== */}
      <section
        id="about"
        className="mx-auto w-[calc(100%-1.5rem)] max-w-295 border-t border-[#E8E6F0] py-16 sm:py-20"
      >
        <div className="mb-5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#6D4AFF]">
          About Numeraid
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-20">
          <h2 className="max-w-xl text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
            Mathematics shouldn't feel like a barrier.
          </h2>

          <div className="space-y-4 text-sm leading-7 text-[#6F6C7F] sm:text-base sm:leading-8">
            <p>
              Dyscalculia is a learning difference that can affect how people
              understand numbers, quantities, and mathematical concepts.
            </p>

            <p>
              Numeraid provides tailored tools, step-by-step explanations, and
              engaging exercises designed to make learning more accessible and
              less stressful.
            </p>

            <p>
              Whether you're preparing for an exam or looking for support with
              everyday numbers, Numeraid is designed to help you build
              understanding and confidence one step at a time.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURES
      ====================================================== */}
      <section className="mx-auto w-[calc(100%-1.5rem)] max-w-295 py-8 pb-20 sm:pb-24">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#6D4AFF]">
              Why Numeraid?
            </div>

            <h2 className="text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              Tools designed around
              <span className="block text-[#6D4AFF]">
                how you learn.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-[#6F6C7F] sm:text-base">
            Learning mathematics is not about rushing to the answer. It's
            about understanding the journey.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group overflow-hidden rounded-3xl border border-[#E8E6F0] bg-white transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(35,27,75,0.1)]"
            >
              <div className="aspect-[1.3] overflow-hidden">
                <img
                  src={feature.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-7">
                <h3 className="mb-3 text-xl font-bold tracking-tight">
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

      {/* =====================================================
          CTA
      ====================================================== */}
      <section
        id="get-started"
        className="relative isolate mx-auto mb-16 grid min-h-88 w-[calc(100%-1.5rem)] max-w-295 place-items-center overflow-hidden rounded-4xl bg-[#6D4AFF] px-5 py-16 text-white sm:rounded-[2.25rem] sm:py-20"
      >
        {/* Decorative circles */}
        <div className="absolute -bottom-24 -left-20 -z-10 h-56 w-56 rounded-full bg-white/10" />
        <div className="absolute -right-10 -top-20 -z-10 h-44 w-44 rounded-full bg-white/10" />
        <div className="absolute bottom-8 right-28 -z-10 h-14 w-14 rounded-full bg-white/15" />

        <div className="max-w-2xl text-center">
          <div className="mb-5 text-xs font-extrabold uppercase tracking-[0.12em] text-white/70">
            Ready when you are
          </div>

          <h2 className="text-3xl font-black leading-none tracking-tighter sm:text-5xl lg:text-6xl">
            Take the next step
            <span className="block text-white/70">
              with confidence.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/80 sm:text-base lg:text-lg">
            From your first assignment to your final exam, Numeraid gives you
            tools designed to help you understand numbers and keep moving
            forward.
          </p>

          <button
            type="button"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-6 font-bold text-[#6D4AFF] transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30"
          >
            Join Numeraid
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      {/* =====================================================
          CONTACT
      ====================================================== */}
      <section
        id="contact"
        className="mx-auto grid w-[calc(100%-1.5rem)] max-w-295 gap-8 border-t border-[#E8E6F0] py-16 sm:py-20 md:grid-cols-2 md:gap-12 lg:gap-20"
      >
        <div>
          <div className="mb-5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#6D4AFF]">
            Get in touch
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
            We're here to help.
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-7 text-[#6F6C7F] sm:text-base">
            Have a question about Numeraid? Reach out and our team will be
            happy to help.
          </p>
        </div>

        <div className="grid gap-4">
          <a
            href="mailto:support@numeraid.com"
            className="rounded-2xl border border-[#E8E6F0] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#6D4AFF]"
          >
            <span className="mb-1 block text-xs font-extrabold uppercase tracking-wider text-[#6D4AFF]">
              Email
            </span>

            <span>support@numeraid.com</span>
          </a>

          <a
            href="tel:+15551234567"
            className="rounded-2xl border border-[#E8E6F0] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#6D4AFF]"
          >
            <span className="mb-1 block text-xs font-extrabold uppercase tracking-wider text-[#6D4AFF]">
              Phone
            </span>

            <span>+1 (555) 123-4567</span>
          </a>

          <address className="rounded-2xl border border-[#E8E6F0] bg-white p-5 not-italic">
            <span className="mb-1 block text-xs font-extrabold uppercase tracking-wider text-[#6D4AFF]">
              Address
            </span>

            <span>
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