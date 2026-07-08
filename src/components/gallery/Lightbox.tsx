"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import type { GalleryPhoto } from "@/lib/gallery";

type LightboxProps = {
  photos: GalleryPhoto[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
};

const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Fullscreen lightbox overlay with keyboard navigation (ArrowLeft/Right/Escape).
 * Clicking the backdrop closes the lightbox.
 * Swipe is not implemented — keeping the component focused and simple.
 */
export function Lightbox({ photos, currentIndex, onClose, onNext, onPrev }: LightboxProps) {
  const photo = photos[currentIndex];
  const total = photos.length;
  const ta = useTranslations("a11y");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Rendered through a portal to document.body (see return) so the overlay
  // escapes any transformed ancestor (e.g. the GSAP Reveal on the homepage). A
  // `transform` on a parent creates a stacking/containing context, which
  // otherwise scopes `position: fixed` to that parent instead of the viewport —
  // letting page content and sibling thumbnails bleed over the lightbox.

  // Arrow key navigation + Tab focus trap (Escape is handled in useLightbox)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev]);

  // On open: move focus into the dialog and make the rest of the page inert
  // (unreachable by Tab/screen readers). On close: undo both and restore
  // focus to the thumbnail that opened the lightbox.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const madeInert: HTMLElement[] = [];

    for (const child of Array.from(document.body.children)) {
      if (child === dialogRef.current || !(child instanceof HTMLElement) || child.inert) continue;
      child.inert = true;
      madeInert.push(child);
    }

    closeButtonRef.current?.focus();

    return () => {
      madeInert.forEach((el) => {
        el.inert = false;
      });
      previouslyFocused?.focus();
    };
  }, []);

  if (!photo || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={ta("lightboxLabel", { alt: photo.alt })}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 py-6">
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label={ta("closeLightbox")}
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <CloseIcon width={24} height={24} />
        </button>

        {/* Previous button */}
        <button
          onClick={onPrev}
          aria-label={ta("prevPhoto")}
          className="absolute top-1/2 left-2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-4"
        >
          <ChevronLeftIcon width={28} height={28} />
        </button>

        {/* Next button */}
        <button
          onClick={onNext}
          aria-label={ta("nextPhoto")}
          className="absolute top-1/2 right-2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-4"
        >
          <ChevronRightIcon width={28} height={28} />
        </button>

        {/* Image */}
        <div className="relative flex max-h-[calc(100vh-6rem)] max-w-[calc(100vw-7rem)] items-center justify-center sm:max-w-[calc(100vw-8rem)]">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            {...(photo.blurDataURL
              ? { placeholder: "blur" as const, blurDataURL: photo.blurDataURL }
              : {})}
            className="h-auto max-h-[calc(100vh-6rem)] max-w-full object-contain"
            sizes="(min-width: 1024px) 80vw, 90vw"
            priority
          />
        </div>

        {/* Counter */}
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/50">
          {currentIndex + 1} / {total}
        </p>
      </div>
    </div>,
    document.body,
  );
}
