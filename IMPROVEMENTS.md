# Site improvements summary

This document summarizes the design and consistency improvements applied across the site, and lists optional next steps.

## Changes applied

### Fonts & colors
- **SectionHeader strapline**: Updated from `text-blue-700` to `text-primary` so section labels use the brand pink/rose.
- **404 & Error pages**: Replaced hardcoded grays with design tokens (`text-foreground`, `text-muted-foreground`, `border-input`, `bg-muted`) for consistency and dark-mode readiness.
- **Footer**: Footer links and copyright use `text-muted-foreground` / `hover:text-foreground`; social icons use `text-muted-foreground hover:text-primary`.
- **StatsSection & StatsSection2**: Stat labels and secondary text use `text-muted-foreground` and `text-foreground`; divider uses `border-border`.
- **HeroSection2, FeaturesSection, Products, OrderSection, ValentinePromo, TestimonialsSection**: Body and secondary text use `text-muted-foreground` or `text-foreground` where appropriate.
- **Navbar**: Mobile dropdown links use `text-muted-foreground`, `hover:bg-muted`, `hover:text-foreground` for consistency.
- **TestimonialsSection**: Card background uses `bg-muted/50` and `border-border`.

### Images
- **Products**: Replaced three Unsplash image URLs with local product images:
  - Bread Loaves → `/products/sravs-bakes-37.jpeg`
  - Brownies → `/products/sravs-bakes-07.jpeg`
  - Birthday Party Orders → `/products/sravs-bakes-03.jpeg`
- **ValentinePromo**: Removed the `.webm` video source (only `.mp4` exists in `public/products/`), so the video element no longer requests a missing file.

## Optional next steps (implemented)

1. **Next.js `Image` component**  
   **Done.** Hero carousel, Gallery, FeaturesSection, Products, HeroSection2, and ValentinePromo now use `next/image` with `fill` and appropriate `sizes` for better LCP and lazy loading.

2. **Footer social links**  
   **Done.** Social URLs are configurable via `src/lib/siteConfig.js` (`SOCIAL_LINKS`) and optional env vars `NEXT_PUBLIC_FACEBOOK_URL` and `NEXT_PUBLIC_INSTAGRAM_URL`. Set to empty string to hide a link. Replace with your real profile URLs when ready.

3. **Testimonials**  
   **Done.** Unsplash avatars removed; testimonials use `avatar: null` with `alt={name}` so the Avatar component shows initials (e.g. “ML”, “JT”, “SK”). When you have real reviews, add `avatar: "/path/to/photo.jpg"` and optionally update names/roles.

4. **Legal pages**  
   **Done.** Privacy and Terms now use `prose prose-neutral prose-headings:text-foreground prose-p:text-muted-foreground` and `text-muted-foreground` for “Last updated” for full design-token alignment.

5. **ValentinePromo visibility**  
   **Done.** End date is configured in `src/lib/siteConfig.js` via `VALENTINE_PROMO_END_MONTH` and `VALENTINE_PROMO_END_DAY`. Set `VALENTINE_PROMO_END_MONTH` to `null` to always show the promo; otherwise it hides after that date each year.

---

**Config file:** `src/lib/siteConfig.js` — edit social URLs, Valentine promo end date, and (optionally) use `NEXT_PUBLIC_FACEBOOK_URL` / `NEXT_PUBLIC_INSTAGRAM_URL` in `.env.local` to override social links without changing code.
