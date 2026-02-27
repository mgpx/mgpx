import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Importa os "renderers" do github-readme-stats
import { renderTopLanguages } from "../grs/src/cards/top-languages-card.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ajuste aqui se quiser
const username = process.env.GH_USER || "mgpx";
const theme = "tokyonight";
const layout = "compact";

async function main() {
  // O projeto usa env vars para token/cache internamente ao buscar dados do GitHub
  // GH_TOKEN vem do workflow
  if (!process.env.GH_TOKEN) {
    console.warn("WARN: GH_TOKEN não definido. Pode bater rate limit.");
  }

  const svg = await renderTopLanguages(username, {
    layout,
    theme,
  });

  await fs.mkdir(path.join(__dirname, "..", "dist"), { recursive: true });
  await fs.writeFile(path.join(__dirname, "..", "dist", "top-langs.svg"), svg, "utf8");
  console.log("Generated dist/top-langs.svg");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
