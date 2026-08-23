export interface JustifiedItem {
  ratio: number;
}

export interface JustifiedRow<T> {
  items: T[];
  height: number;
}

interface JustifiedLayoutOptions {
  containerWidth: number;
  targetRowHeight: number;
  gutter: number;
}

/**
 * Packs items into rows by their real aspect ratio so each completed row
 * fills the container width edge-to-edge at one consistent (computed)
 * height — the "sometimes 3 across, sometimes 2 across" justified-gallery
 * rhythm, not a fixed-column grid. The trailing row is only stretched to
 * fill the width if it's already reasonably full; a sparse last row (e.g.
 * one item after a category filter) just renders at the target height
 * instead of being blown up to fill an entire row by itself.
 */
export function computeJustifiedRows<T extends JustifiedItem>(
  items: T[],
  { containerWidth, targetRowHeight, gutter }: JustifiedLayoutOptions
): JustifiedRow<T>[] {
  if (containerWidth <= 0 || items.length === 0) return [];

  const rows: JustifiedRow<T>[] = [];
  let currentRow: T[] = [];
  let currentRowWidth = 0;

  const finalize = (row: T[], rowWidthAtTarget: number): JustifiedRow<T> => {
    const gutterWidth = (row.length - 1) * gutter;
    const scale = (containerWidth - gutterWidth) / rowWidthAtTarget;
    return { items: row, height: targetRowHeight * scale };
  };

  for (const item of items) {
    const itemWidthAtTarget = item.ratio * targetRowHeight;
    const gutterWidth = currentRow.length * gutter;

    if (
      currentRow.length > 0 &&
      currentRowWidth + itemWidthAtTarget + gutterWidth > containerWidth
    ) {
      rows.push(finalize(currentRow, currentRowWidth));
      currentRow = [];
      currentRowWidth = 0;
    }

    currentRow.push(item);
    currentRowWidth += itemWidthAtTarget;
  }

  if (currentRow.length > 0) {
    const gutterWidth = (currentRow.length - 1) * gutter;
    const fillRatio = (currentRowWidth + gutterWidth) / containerWidth;
    rows.push(
      fillRatio > 0.55
        ? finalize(currentRow, currentRowWidth)
        : { items: currentRow, height: targetRowHeight }
    );
  }

  return rows;
}
