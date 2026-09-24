export function cloudinaryUrl(
  publicId: string,
  options: { width?: number; height?: number; crop?: "fill" | "limit" } = {},
) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) return "";

  const transformations = [
    "f_auto",
    "q_auto:eco",
    options.crop ? `c_${options.crop}` : "c_limit",
    options.width ? `w_${options.width}` : "",
    options.height ? `h_${options.height}` : "",
    options.crop === "fill" ? "g_auto" : "",
  ]
    .filter(Boolean)
    .join(",");

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}`;
}
