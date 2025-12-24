const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "";

export const revalidateSeconds = 600; // ISR window

function joinUrl(base: string, path: string) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  if (!base) return path;
  try {
    const u = new URL(base);
    return `${u.origin}${path.startsWith("/") ? path : `/${path}`}`;
  } catch {
    return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
  }
}

export function mediaUrl(path?: string | null) {
  return joinUrl(BASE_URL, path || "");
}

export async function fetchJSON<T>(endpoint: string, opts?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  const res = await fetch(url, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(opts?.headers || {}),
    },
    next: { revalidate: revalidateSeconds },
  });
  if (!res.ok) {
    throw new Error(`Strapi request failed ${res.status}: ${await res.text()}`);
  }
  return (await res.json()) as T;
}

export async function getHomePage(locale: string) {
  return fetchJSON<unknown>(`/api/home-page?locale=${encodeURIComponent(locale)}`);
}

export async function getPageBySlug(slug: string, locale: string = "en") {
  const queryParams = new URLSearchParams({
    "filters[slug][$eq]": slug,
    "locale": locale,
  });
  
  const queryString = `${queryParams.toString()}&populate[content_sections][populate]=*&populate[sidebar_sections][populate]=*&populate[forms][populate]=*&populate[featured_image]=*`;
  
  return fetchJSON<PageResponse>(`/api/pages?${queryString}`);
}
