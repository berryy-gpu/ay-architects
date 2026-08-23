import Image, { type ImageProps } from "next/image";

/**
 * Drop-in replacement for next/image on portfolio photography — renders the
 * image exactly as configured (fill, object-fit, sizes, priority, etc. all
 * pass through untouched) and overlays the AY monogram in the bottom-right
 * corner. Relies on the caller's existing `position: relative` wrapper (every
 * current call site already has one for `fill`), so it renders as a sibling
 * of the image rather than introducing its own wrapper that could disturb
 * that layout.
 */
export function WatermarkedImage({ alt, ...props }: ImageProps) {
  return (
    <>
      <Image alt={alt} {...props} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-10"
        style={{
          right: "clamp(12px, 2vw, 24px)",
          bottom: "clamp(12px, 2vw, 24px)",
          width: "clamp(56px, 6vw, 100px)",
        }}
      >
        <Image
          src="/ay-watermark.png"
          alt=""
          width={500}
          height={500}
          className="h-auto w-full opacity-75"
        />
      </div>
    </>
  );
}
