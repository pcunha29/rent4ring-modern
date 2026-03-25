export const BASE_URL = "https://rent4ring.de";

export const LOCALES = ["en", "de"] as const;
export const DEFAULT_LOCALE = "en";

export function alternatesWithXDefault(path: string) {
  return {
    canonical: `${BASE_URL}${path}`,
    languages: {
      en: `${BASE_URL}/en${path === "" ? "" : path}`,
      de: `${BASE_URL}/de${path === "" ? "" : path}`,
      "x-default": `${BASE_URL}/${DEFAULT_LOCALE}${path === "" ? "" : path}`,
    },
  };
}

export function localeAlternates(locale: string, path: string) {
  const localePath = path ? `/${path}` : "";
  return {
    canonical: `${BASE_URL}/${locale}${localePath}`,
    languages: {
      en: `${BASE_URL}/en${localePath}`,
      de: `${BASE_URL}/de${localePath}`,
      "x-default": `${BASE_URL}/${DEFAULT_LOCALE}${localePath}`,
    },
  };
}
