export const SITE_NAME = "My Journal"; // change me
export const SITE_TAGLINE = "Notes, journals, photos and videos.";
export const KINDS = ["blog", "journal", "article", "image", "video"] as const;
export type Kind = (typeof KINDS)[number];
