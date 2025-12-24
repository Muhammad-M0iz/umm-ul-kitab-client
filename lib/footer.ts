import { FooterData } from "@/types/footer";

export async function getFooterData(): Promise<FooterData | null> {
  try {
    // Using deep populate to ensure we get all nested components and relations
    const query = "populate[contact]=*&populate[Quicklinks][populate]=menu_items.page_link&populate[importantLinks][populate]=links";
    const res = await fetch(`https://admin.jamiaurwatulwusqa.com/api/footer?${query}`, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch footer data');
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return null;
  }
}
