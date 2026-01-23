export function getVisualImageWidth(asset, ratio = 0.5) {
  const width =
    asset?.file?.details?.image?.width ||
    asset?.details?.image?.width

  if (!width) return null

  return Math.round(width * ratio)
}
