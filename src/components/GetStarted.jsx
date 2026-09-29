export default function GetStarted({ onStart }) {
  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col bg-white md:flex-row">
      <div className="relative flex min-h-[45vh] flex-1 overflow-hidden bg-brand md:min-h-[100dvh] md:flex-[1.2]">
        <svg
          className="absolute left-0 top-0 h-24 w-32 text-white/25 md:h-32 md:w-40"
          viewBox="0 0 120 80"
          fill="none"
        >
          <path
            d="M0 40 L15 25 L30 40 L45 25 L60 40 L75 25 L90 40 L105 25 L120 40"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M0 55 L15 40 L30 55 L45 40 L60 55 L75 40 L90 55 L105 40 L120 55"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
        <svg
          className="absolute bottom-8 right-0 h-20 w-28 text-white/20 md:bottom-16 md:right-8"
          viewBox="0 0 120 80"
          fill="none"
        >
          <path
            d="M0 40 L15 55 L30 40 L45 55 L60 40 L75 55 L90 40 L105 55 L120 40"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-b from-brand to-brand-dark/90" />
      </div>

      <div className="flex flex-1 flex-col justify-center px-8 py-10 md:max-w-md md:px-12 lg:max-w-lg lg:px-16">
        <h1 className="text-[26px] font-bold leading-tight text-gray-900 md:text-3xl">
          Manage What To Do
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-gray-500 md:text-base">
          The best way to manage what you have to do, don&apos;t forget your plans
        </p>
        <button
          type="button"
          onClick={onStart}
          className="mt-10 w-full rounded-2xl bg-brand py-4 text-base font-semibold text-white shadow-fab transition hover:bg-brand-dark active:scale-[0.99] md:mt-12"
        >
          Get Started
        </button>
      </div>
    </div>
  )
}
