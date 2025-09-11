import axios from "axios";

export interface ContentItem {
  id: string;
  creator: string;
  title: string;
  pricingOption: 0 | 1 | 2; // 0=Paid, 1=Free, 2=View Only
  price?: number;
  thumbnailUrl: string;
}

export const fetchAllContents = async (): Promise<ContentItem[]> => {
  const res = await axios.get(
    "https://closet-recruiting-api.azurewebsites.net/api/data"
  );
  const data = res.data as any[];

  return data.map((d) => ({
    id: String(d.id ?? d._id ?? Math.random()),
    creator: d.creator ?? d.userName ?? "Unknown",
    title: d.title ?? "Untitled",
    pricingOption:
      typeof d.pricingOption === "number" ? d.pricingOption : 1, // default Free
    price: typeof d.price === "number" ? d.price : undefined,
    thumbnailUrl:
      d.imagePath ??
      d.thumbnailUrl ??
      d.thumbnail ??
      d.image ??
      `https://via.placeholder.com/400x400.png?text=${encodeURIComponent(
        d.title ?? "Item"
      )}`,
  }));
};
