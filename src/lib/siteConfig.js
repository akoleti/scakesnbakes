/**
 * Site-wide config: social links, promo dates, etc.
 * Update these when you have real URLs or want to change behavior.
 */

/** Replace with your real profile URLs when ready. Use empty string to hide a link. */
export const SOCIAL_LINKS = {
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com",
};

/** Valentine promo is shown until this date (month 0 = Jan, 1 = Feb). Set to null to always show the promo. */
export const VALENTINE_PROMO_END_MONTH = 1; // February
export const VALENTINE_PROMO_END_DAY = 15;

export function getValentinePromoEndDate() {
  if (VALENTINE_PROMO_END_MONTH == null) return null;
  return new Date(new Date().getFullYear(), VALENTINE_PROMO_END_MONTH, VALENTINE_PROMO_END_DAY);
}
