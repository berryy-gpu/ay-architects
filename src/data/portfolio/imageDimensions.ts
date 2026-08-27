/**
 * Real pixel dimensions for every photo currently referenced by the
 * portfolio data (heroImage + galleryImages), measured directly from the
 * source JPEGs — not estimated. This is what lets the masonry grid and the
 * project-detail slider size each image at its own true aspect ratio with
 * zero cropping and zero layout shift, instead of guessing or measuring in
 * the browser after the fact. Re-measure and update an entry if its source
 * photo is ever replaced.
 */
export const IMAGE_DIMENSIONS: Record<string, { width: number; height: number }> = {
  "/images/interiors/bathroom/Luxury Floating Vanity Bathroom-01.jpeg": { width: 1086, height: 1448 },
  "/images/interiors/bathroom/Modern Spa Bathroom Suite-01.jpeg": { width: 1600, height: 900 },
  "/images/interiors/bathroom/Contemporary Dark Stone Bathroom-01.jpeg": { width: 704, height: 989 },
  "/images/interiors/bathroom/Contemporary Dark Stone Bathroom-02.jpeg": { width: 1600, height: 900 },
  "/images/interiors/bathroom/Minimal Contemporary Bathroom-01.jpeg": { width: 1195, height: 941 },
  "/images/interiors/bathroom/Minimal Contemporary Bathroom-02.jpeg": { width: 551, height: 941 },
  "/images/interiors/bathroom/Premium Walk-In Bathroom-01.jpeg": { width: 859, height: 1115 },
  "/images/interiors/bathroom/Premium Walk-In Bathroom-02.jpeg": { width: 1024, height: 1280 },
  "/images/interiors/bathroom/Premium Walk-In Bathroom-03.jpeg": { width: 1037, height: 1280 },
  "/images/interiors/bathroom/Premium Walk-In Bathroom-04.jpeg": { width: 858, height: 1280 },
  "/images/interiors/bathroom/Premium Walk-In Bathroom-05.jpeg": { width: 1280, height: 1017 },
  "/images/interiors/bathroom/Luxurious Bathroom-01.jpeg": { width: 1483, height: 1061 },
  "/images/interiors/bathroom/Luxurious Bathroom-02.jpeg": { width: 676, height: 941 },
  "/images/interiors/bathroom/Luxurious Bathroom-03.jpeg": { width: 1085, height: 1450 },
  "/images/interiors/bathroom/Luxurious Bathroom-04.jpeg": { width: 1483, height: 1061 },
  "/images/interiors/bathroom/Luxurious Bathroom-05.jpeg": { width: 1084, height: 1451 },
  "/images/interiors/bathroom/Luxurious Bathroom-06.jpeg": { width: 1085, height: 1450 },
  "/images/interiors/bathroom/Luxurious Bathroom-07.jpeg": { width: 1600, height: 900 },

  "/images/interiors/bedroom/Minimal Contemporary Bedroom-01.jpeg": { width: 1024, height: 1280 },
  "/images/interiors/bedroom/Minimal Contemporary Bedroom-02.jpeg": { width: 1173, height: 1086 },
  "/images/interiors/bedroom/Elegant Minimal Master Bedroom-01.jpeg": { width: 1448, height: 1086 },
  "/images/interiors/bedroom/Elegant Minimal Master Bedroom-02.jpeg": { width: 1445, height: 1088 },
  "/images/interiors/bedroom/Modern TV & Vanity Suite-01.jpeg": { width: 1600, height: 900 },
  "/images/interiors/bedroom/Modern TV & Vanity Suite-02.jpeg": { width: 979, height: 928 },
  "/images/interiors/bedroom/Modern TV & Vanity Suite-03.jpeg": { width: 1067, height: 871 },
  "/images/interiors/bedroom/Luxury Statement Bedroom-01.jpeg": { width: 1402, height: 1122 },
  "/images/interiors/bedroom/Luxury Statement Bedroom-02.jpeg": { width: 1274, height: 1122 },
  "/images/interiors/bedroom/Luxury Statement Bedroom-03.jpeg": { width: 1077, height: 955 },
  "/images/interiors/bedroom/Designer Media Feature Wall-01.jpeg": { width: 1280, height: 720 },
  "/images/interiors/bedroom/Designer Media Feature Wall-02.jpeg": { width: 1280, height: 805 },
  "/images/interiors/bedroom/Luxury Cane Wardrobe-01.jpeg": { width: 1280, height: 788 },
  "/images/interiors/bedroom/Luxury Cane Wardrobe-02.jpeg": { width: 1280, height: 854 },
  "/images/interiors/bedroom/Premium Master Suite-01.jpeg": { width: 1280, height: 720 },
  "/images/interiors/bedroom/Premium Master Suite-02.jpeg": { width: 888, height: 899 },

  "/images/interiors/diningroom/Luxury Classical Dining Hall-01.jpeg": { width: 1280, height: 960 },
  "/images/interiors/diningroom/Luxury Classical Dining Hall-02.jpeg": { width: 1280, height: 960 },
  "/images/interiors/diningroom/Grand Living & Dining Suite-01.jpeg": { width: 1280, height: 960 },
  "/images/interiors/diningroom/Grand Living & Dining Suite-02.jpeg": { width: 1280, height: 1024 },
  "/images/interiors/diningroom/Contemporary Luxury Dining Lounge-01.jpeg": { width: 1600, height: 900 },
  "/images/interiors/diningroom/Contemporary Luxury Dining Lounge-02.jpeg": { width: 1036, height: 551 },
  "/images/interiors/diningroom/Modern Elegant Dining Space-01.jpeg": { width: 1280, height: 1162 },
  "/images/interiors/diningroom/Modern Elegant Dining Space-02.jpeg": { width: 1136, height: 1024 },
  "/images/interiors/diningroom/Modern Elegant Dining Space-03.jpeg": { width: 1280, height: 854 },

  "/images/interiors/kitchen/Luxury Marble Island Kitchen-01.jpeg": { width: 1493, height: 1054 },
  "/images/interiors/kitchen/Luxury Marble Island Kitchen-02.jpeg": { width: 1448, height: 1086 },
  "/images/interiors/kitchen/Luxury Marble Island Kitchen-03.jpeg": { width: 1501, height: 1047 },
  "/images/interiors/kitchen/Midnight Blue Designer Kitchen-01.jpeg": { width: 1448, height: 1086 },
  "/images/interiors/kitchen/Midnight Blue Designer Kitchen-02.jpeg": { width: 731, height: 902 },
  "/images/interiors/kitchen/Minimal Walnut Kitchen-01.jpeg": { width: 1126, height: 1086 },
  "/images/interiors/kitchen/Minimal Walnut Kitchen-02.jpeg": { width: 1564, height: 941 },
  "/images/interiors/kitchen/Minimal Walnut Kitchen-03.jpeg": { width: 877, height: 1086 },
  "/images/interiors/kitchen/Elegant Gloss Kitchen-01.jpeg": { width: 1445, height: 1088 },
  "/images/interiors/kitchen/Elegant Gloss Kitchen-02.jpeg": { width: 1448, height: 1086 },

  "/images/interiors/office/Executive Director Office-01.jpeg": { width: 1280, height: 720 },
  "/images/interiors/office/Executive Director Office-02.jpeg": { width: 1280, height: 720 },
  "/images/interiors/office/Executive Director Office-03.jpeg": { width: 1280, height: 720 },
  "/images/interiors/office/Executive Director Office-04.jpeg": { width: 1280, height: 942 },
  "/images/interiors/office/Executive Director Office-05.jpeg": { width: 1280, height: 720 },
  "/images/interiors/office/Executive Office Lounge-01.jpeg": { width: 1045, height: 1086 },
  "/images/interiors/office/Executive Office Lounge-02.jpeg": { width: 1280, height: 906 },
  "/images/interiors/office/Executive Office Lounge-03.jpeg": { width: 532, height: 1280 },

  "/images/interiors/tvlounge/Classic Luxury Family Lounge-01.jpeg": { width: 1373, height: 941 },
  "/images/interiors/tvlounge/Classic Luxury Family Lounge-02.jpeg": { width: 1600, height: 734 },
  "/images/interiors/tvlounge/Classic Luxury Family Lounge-03.jpeg": { width: 1174, height: 904 },
  "/images/interiors/tvlounge/Marble Feature TV Wall-01.jpeg": { width: 1399, height: 1124 },
  "/images/interiors/tvlounge/Marble Feature TV Wall-02.jpeg": { width: 1221, height: 1122 },
  "/images/interiors/tvlounge/Marble Feature TV Wall-03.jpeg": { width: 1375, height: 1086 },
  "/images/interiors/tvlounge/Warm Contemporary Living Lounge-01.jpeg": { width: 1600, height: 900 },
  "/images/interiors/tvlounge/Warm Contemporary Living Lounge-02.jpeg": { width: 1104, height: 784 },
  "/images/interiors/tvlounge/Luxury Marble Media Lounge-01.jpeg": { width: 1551, height: 897 },
  "/images/interiors/tvlounge/Luxury Marble Media Lounge-02.jpeg": { width: 1600, height: 900 },
  "/images/interiors/tvlounge/Luxury Marble Media Lounge-3.jpeg": { width: 1600, height: 907 },

  "/images/architectural-plans/architecturalplan-01.jpeg": { width: 1206, height: 1533 },
  "/images/architectural-plans/architecturalplan-02.jpeg": { width: 889, height: 1280 },
  "/images/architectural-plans/architecturalplan-03.jpeg": { width: 1206, height: 1532 },
  "/images/architectural-plans/architecturalplan-04.jpeg": { width: 1142, height: 1467 },
  "/images/architectural-plans/architecturalplan-05.jpeg": { width: 1206, height: 1373 },
  "/images/architectural-plans/architecturalplan-06.jpeg": { width: 1193, height: 1542 },

  "/images/elevations/Casa Aurelia-01.jpeg": { width: 1600, height: 900 },
  "/images/elevations/Casa Aurelia-02.jpeg": { width: 1469, height: 1071 },
  "/images/elevations/Casa Aurelia-03.jpeg": { width: 1537, height: 1023 },
  "/images/elevations/Obsidian House.jpeg": { width: 1600, height: 900 },
  "/images/elevations/The Axis.jpeg": { width: 1086, height: 1448 },
  "/images/elevations/The Black Frame-01.jpeg": { width: 1533, height: 1600 },
  "/images/elevations/The Black Fram.jpeg": { width: 1227, height: 1282 },
  "/images/elevations/The Grand Facade.jpeg": { width: 1024, height: 1536 },
  "/images/elevations/The Modernist.jpeg": { width: 1600, height: 900 },
  "/images/elevations/The Monolith.jpeg": { width: 1330, height: 1182 },
  "/images/elevations/The Pavilion.jpeg": { width: 1536, height: 1024 },
  "/images/elevations/The Stone House.jpeg": { width: 1341, height: 1173 },
  "/images/elevations/The Threshold-01.jpeg": { width: 1537, height: 1023 },
  "/images/elevations/The Threshold-02.jpeg": { width: 1537, height: 1023 },
  "/images/elevations/The Threshold-03.jpeg": { width: 1537, height: 1023 },

  "/images/exlusives/obsidian lobby-01.jpeg": { width: 698, height: 1280 },
  "/images/exlusives/obsidian lobby-02.jpeg": { width: 1280, height: 640 },
  "/images/exlusives/obsidian lobby-03.jpeg": { width: 1280, height: 720 },
  "/images/exlusives/obsidian lobby-04.jpeg": { width: 1280, height: 720 },
  "/images/exlusives/swimmimng pool-01.jpeg": { width: 1280, height: 929 },
  "/images/exlusives/swimmimng pool-02.jpeg": { width: 1033, height: 941 },
  "/images/exlusives/swimmimng pool-03.jpeg": { width: 1280, height: 822 },
  "/images/exlusives/swimmimng pool-04.jpeg": { width: 1280, height: 720 },
  "/images/exlusives/swimmimng pool-05.jpeg": { width: 720, height: 1280 },
  "/images/exlusives/warm welcome lobby-01.jpeg": { width: 621, height: 1280 },
  "/images/exlusives/warm welcome lobby-02.jpeg": { width: 591, height: 905 },
  "/images/exlusives/warm welcome lobby-03.jpeg": { width: 526, height: 845 },
  "/images/exlusives/polar pop cafe-01.jpeg": { width: 1448, height: 1086 },
  "/images/exlusives/polar pop cafe-02.jpeg": { width: 1158, height: 1358 },
  "/images/exlusives/polar pop cafe-03.jpeg": { width: 1600, height: 900 },
  "/images/exlusives/polar pop cafe-04.jpeg": { width: 1086, height: 1448 },
};

const FALLBACK_RATIO = 4 / 3;

/** width / height for a known image path; a sane landscape default otherwise. */
export function getImageRatio(src: string): number {
  const dims = IMAGE_DIMENSIONS[src];
  return dims ? dims.width / dims.height : FALLBACK_RATIO;
}

export function getImageDimensions(src: string): { width: number; height: number } {
  return IMAGE_DIMENSIONS[src] ?? { width: 1200, height: 900 };
}
