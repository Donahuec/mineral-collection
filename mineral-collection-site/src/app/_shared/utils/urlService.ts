import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export function urlFor(source: any, width?: number, height?: number): ImageUrlBuilder | null {
    const { projectId, dataset } = client.config();
    let builder = projectId && dataset && source
      ? imageUrlBuilder({ projectId, dataset }).image(source)
      : null;
    if (!builder) return null;
    if (width) builder = builder.width(width);
    if (height) builder = builder.height(height);
    return builder;
}
    