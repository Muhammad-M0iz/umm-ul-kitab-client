import { FeaturedImageSection } from "@/types/page";
import { mediaUrl } from "@/lib/strapi";
import Image from "next/image";

export default function FeaturedImage({ data }: { data: FeaturedImageSection }) {
  if (!data.image?.url) return null;

  return (
    <div className="bg-white rounded-[2rem] p-2 shadow-sm border border-secondary/50 mb-8">
      <div className="relative rounded-[1.8rem] overflow-hidden aspect-[16/9] mb-0">
        <Image
          src={mediaUrl(data.image.url)}
          alt={data.image.alternativeText || "Featured Image"}
          fill
          className="object-cover"
        />
        {/* Overlay is hidden because we don't have the text data in the component yet. 
            If we had title/subtitle fields, we would render them here. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0"></div>
      </div>
    </div>
  );
}
