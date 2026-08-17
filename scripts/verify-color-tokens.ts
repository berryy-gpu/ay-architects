import { ALL_PROJECTS } from "@/data/portfolio";
import { hasColorToken } from "@/lib/colorTokens";

let misses = 0;

for (const project of ALL_PROJECTS) {
  for (const name of project.colorPalette) {
    if (!hasColorToken(name)) {
      misses++;
      console.log(`MISS: "${name}" (${project.slug})`);
    }
  }
}

if (misses === 0) {
  console.log(
    `OK: every color name across ${ALL_PROJECTS.length} projects resolves in the token map.`
  );
  process.exit(0);
} else {
  console.log(`FAILED: ${misses} unresolved color name(s).`);
  process.exit(1);
}
