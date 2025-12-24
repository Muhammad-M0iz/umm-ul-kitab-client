import { NavigationItem } from "@/types/navigation";

export async function getNavigation(): Promise<NavigationItem[]> {
  try {
    const res = await fetch('https://admin.jamiaurwatulwusqa.com/api/navigation?locale=en', { 
      next: { revalidate: 3600 } 
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch navigation');
    }
    
    return res.json();
  } catch (error) {
    console.error("Error fetching navigation:", error);
    return [];
  }
}
