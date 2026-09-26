import Image from "next/image";
import { FiArrowDownRight } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="border-b border-line bg-ink">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        {/* Left — copy */}
        <div>
          <p className="display text-sm tracking-[0.3em] text-acid">
            WORKOUT LIBRARY
          </p>

          <h1 className="display mt-4 text-4xl text-white sm:text-5xl lg:text-6xl">
            Train with intent. Log every set.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          {/* Anchor link — scrolls to the library on this same page */}
          <a
            href="#library"
            className="display mt-8 inline-flex items-center gap-2 rounded-full bg-acid px-7 py-3 text-sm text-ink transition hover:brightness-110"
          >
            Browse Workouts
            <FiArrowDownRight className="text-lg" />
          </a>
        </div>

        {/* Right — banner */}
        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-acid/10 blur-3xl" />

          <Image
            src="/banner.png"
            alt="Athlete training on a gym machine"
            width={740}
            height={740}
            priority
            className="h-auto w-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
