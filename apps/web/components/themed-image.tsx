interface ThemedImageProps {
  keywords: string // comma-separated tags, e.g. "medical,india"
  lock: number // deterministic image selector (same image every load)
  alt: string
  width: number
  height: number
  className?: string
  rounded?: string
  eager?: boolean
  tint?: "soft" | "strong" | "none"
  grayscale?: boolean
}

// Keyword-themed placeholder photography via LoremFlickr, wrapped in a brand-lime
// overlay so mixed stock still coheres with the theme. `lock` keeps the image
// stable across reloads. Swap for owned medical stock (drop files in /public)
// before launch for full control and licensing certainty.
export function ThemedImage({
  keywords,
  lock,
  alt,
  width,
  height,
  className = "",
  rounded = "rounded-2xl",
  eager = false,
  tint = "soft",
  grayscale = false,
}: ThemedImageProps) {
  // `/all` = match ALL tags (not any), so the photo actually fits its context.
  const src = `https://loremflickr.com/${width}/${height}/${keywords}/all?lock=${lock}`
  return (
    <figure className={`relative overflow-hidden border ${rounded} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        className={`h-full w-full object-cover ${grayscale ? "grayscale" : ""}`}
      />
      {tint !== "none" && (
        <>
          <span
            aria-hidden
            className={`pointer-events-none absolute inset-0 ${tint === "strong" ? "bg-primary/25" : "bg-primary/12"}`}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/50 via-transparent to-transparent"
          />
        </>
      )}
    </figure>
  )
}
