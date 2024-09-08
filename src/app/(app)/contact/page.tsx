export default function ContactPage() {
  return (
    <form className="mx-auto space-y-4">
      <div className="flex w-full items-center gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="flex h-10 w-full rounded-md px-3 py-2 text-sm ring-offset-primary file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="flex h-10 w-full rounded-md px-3 py-2 text-sm ring-offset-primary file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <textarea
        name="message"
        placeholder="Message"
        className="flex h-40 w-full rounded-md px-3 py-2 text-sm ring-offset-primary file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />

      <button
        type="submit"
        className="group/button relative mx-auto block items-center justify-center overflow-hidden rounded-md bg-primary px-8 py-2 font-normal font-semibold text-background transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
      >
        Send
        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
          <div className="relative h-full w-8 bg-white/20" />
        </div>
      </button>
    </form>
  )
}
