import type { ImagePayload, MapPayload, StorymapBlocks, StorymapTemplate } from "@/types/storymap.types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const mdForImage = (p: ImagePayload) => {
  const alt = p.source.alt ?? "";
  const url = p.source.url ?? "";
  const cap = p.caption ? `\n*${p.caption}*` : "";
  return `![${alt}](${url})${cap}\n`;
};

export const mdForMap = (p: MapPayload, title?: string) => {
  const ims = p.initial_map_state ?? { latitude: "", longitude: "", zoom: "" };
  const layers = (p.layers ?? [])
    .map(l => `{id:"${l.layer_id}",visible:${String(!!l.visible)}}`)
    .join(", ");
  const style = p.base_style ?? "";
  return [
    "```storymap",
    `{map title="${title ?? ""}" lat=${ims.latitude} lng=${ims.longitude} zoom=${ims.zoom} style="${style}" layers=[${layers}]}`,
    "```",
    "",
  ].join("\n");
};

export const mdForBlock = (b: StorymapBlocks, level = 2): string => {
  switch (b.type) {
    case "text":
      return b.payload.content + "\n";
    case "image":
      return mdForImage(b.payload) + "\n";
    case "map":
      return mdForMap(b.payload) + "\n";
      case "cover": {
        const coverData = b.payload;
        const backgroundImage = coverData.cover_blocks.find(block => block.type === "image")?.payload;
        const textBlock = coverData.cover_blocks.find(block => block.type === "text")?.payload;
        
        if (backgroundImage?.source?.url) {
          return [
            `<div style="position: relative; background-image: url('${backgroundImage.source.url}'); background-size: cover; background-position: center; min-height: 400px; padding: 2rem; display: flex; align-items: center; justify-content: center;">`,
            `<div style="position: relative; z-index: 1; text-align: center; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.7);">`,
            textBlock?.content ? `<h1 style="font-size: 3rem; margin: 0;">${textBlock.content}</h1>` : "",
            `</div>`,
            `</div>`,
            ""
          ].join("\n");
        }
        
        return [
          "<!-- COVER START -->",
          ...b.payload.cover_blocks.map(cb => mdForBlock(cb, level)),
          "<!-- COVER END -->",
          "",
        ].join("\n");
      }
    case "narrative": {
      const title = b.payload.narrative_title ?? "Narrative";
      const h = "#".repeat(Math.min(level, 6));
      return [`${h} ${title}\n`, ...b.payload.narrative_blocks.map(nb => mdForBlock(nb, level + 1))].join("");
    }
    case "sidecar": {
      const h = "#".repeat(Math.min(level, 6));
      const parts: string[] = [];
      parts.push(`${h} Sidecar\n\n`);
      parts.push(mdForMap(b.payload.map_config, "sidecar-map"));
      b.payload.cards.forEach((card, i) => {
        const hh = "#".repeat(Math.min(level + 1, 6));
        parts.push(`${hh} Card ${i + 1}\n\n`);
        parts.push(card.payload.content + "\n");
        if (card.map_command?.type === "TOGGLE_LAYER") {
          const { layer_id, visible } = card.map_command.payload;
          parts.push(`> Map toggle: layer \`${layer_id}\` → visible=${visible}\n\n`);
        }
      });
      return parts.join("");
    }
    default:
      return `<!-- Unhandled block type: ${(b as any).type} -->\n`;
  }
};

export const storymapToMarkdown = (t: StorymapTemplate): string => {
  const frontmatter = [
    "---",
    `Title: ${t.presentation_title}`,
    "Exported: true",
    "---",
    "",
  ].join("\n");
  const title = `# ${t.presentation_title}\n\n`;
  const body = t.presentation_blocks.map(b => mdForBlock(b, 2)).join("\n");
  return frontmatter + title + body;
}

export const downloadMarkdown = (filename: string, md: string) => {
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename.endsWith(".md") ? filename : `${filename}.md`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(a.href);
}
