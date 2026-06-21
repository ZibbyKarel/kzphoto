"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLightbox } from "@/hooks/useLightbox";
import { Lightbox } from "@/components/gallery/Lightbox";
import { Reveal } from "@/components/animations/Reveal";
import type { GalleryPhoto } from "@/lib/gallery";

type GalleryPreviewGridProps = {
  photos: GalleryPhoto[];
};

/**
 * Homepage preview grid — clicking a photo opens it in the lightbox in place,
 * rather than navigating to the full gallery page. Reuses the gallery's
 * useLightbox + Lightbox so behaviour matches the standalone gallery.
 *
 * Client component (lightbox state on click); the server parent resolves the
 * photos and passes them in.
 */
export function GalleryPreviewGrid({ photos }: GalleryPreviewGridProps) {
  const lb = useLightbox();
  const ta = useTranslations("a11y");

  const handleNext = () => lb.next(photos.length);
  const handlePrev = () => lb.prev(photos.length);

  return (
    <>
      {/*
       * w-full is load-bearing: this grid sits inside a Stack
       * (flex flex-col items-start), which does NOT stretch its children
       * horizontally. Without w-full the grid shrink-wraps to its content; with
       * `fill` images (no intrinsic width) that collapses the tracks to 0 and
       * the photos vanish.
       */}
      <Reveal stagger={0.07} className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            onClick={() => lb.open(index)}
            className="group focus-visible:outline-accent-strong block cursor-zoom-in overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2"
            aria-label={ta("openPhoto", { alt: photo.alt })}
          >
            <div className="relative aspect-square overflow-hidden">
              {/* `fill` (absolute inset-0), matching Hero/About.
               * Requires the box to have real dimensions — see the
               * w-full note on the grid above. */}
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                {...(photo.blurDataURL
                  ? { placeholder: "blur" as const, blurDataURL: photo.blurDataURL }
                  : {})}
                loading="lazy"
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
              />
            </div>
          </button>
        ))}
      </Reveal>

      {lb.openIndex !== null && (
        <Lightbox
          photos={photos}
          currentIndex={lb.openIndex}
          onClose={lb.close}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </>
  );
}
