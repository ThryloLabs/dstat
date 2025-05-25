import fs from "fs-extra";
import path from "path";
import { globby } from "globby";
import prettyBytes from "pretty-bytes";
import chalk from "chalk";
import clipboard from "clipboardy";

const DEFAULT_IGNORES = [
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  ".vercel",
  ".cache",
];

export async function analyzeDirectory(dir, options) {
  const target = path.resolve(dir);
  const excludeList = [
    ...(options.defaultIgnore === false ? [] : DEFAULT_IGNORES),
    ...(options.exclude || "").split(",").filter(Boolean),
  ];

  const allPaths = await globby(["**/*"], {
    cwd: target,
    dot: options.includeHidden,
    gitignore: options.gitignore,
    ignore: excludeList,
    onlyFiles: false,
  });

  let totalSize = 0;
  let fileCount = 0;
  const extStats = {};
  const folderTree = {};

  for (const relPath of allPaths) {
    const absPath = path.join(target, relPath);
    const stats = await fs.stat(absPath);
    const isFile = stats.isFile();
    const size = stats.size;

    if (isFile) {
      totalSize += size;
      fileCount++;

      if (options.ext) {
        const ext = path.extname(relPath) || "<no-ext>";
        extStats[ext] = extStats[ext] || { count: 0, size: 0 };
        extStats[ext].count++;
        extStats[ext].size += size;
      }
    }

    if (options.tree) buildTree(folderTree, relPath.split("/"));
  }

  const lines = [];
  lines.push(chalk.cyan(`📊 Directory Stats for ${dir}`));
  lines.push(`📄 Total Files: ${fileCount}`);
  lines.push(`📦 Total Size: ${prettyBytes(totalSize)}`);

  if (options.ext && Object.keys(extStats).length > 0) {
    lines.push(`\n🔡 Extension Breakdown:`);
    for (const [ext, { count, size }] of Object.entries(extStats)) {
      lines.push(`  ${ext.padEnd(6)} → ${count} files, ${prettyBytes(size)}`);
    }
  }

  if (options.tree && options.depth !== 0) {
    lines.push(`\n🗂 Tree${options.depth ? ` (Depth ${options.depth})` : ""}`);
    lines.push(renderTree(folderTree, options.depth ?? Infinity));
  }

  const output = lines.join("\n");

  if (options.json) {
    console.log(
      JSON.stringify({ totalFiles: fileCount, totalSize, extStats }, null, 2)
    );
  } else {
    console.log(output);
  }

  if (options.output) {
    await fs.outputFile(options.output, output);
    console.log(chalk.green(`\n💾 Report saved to ${options.output}`));
  }

  if (options.copy) {
    clipboard.writeSync(output);
    console.log(chalk.green("📋 Report copied to clipboard"));
  }
}

function buildTree(tree, parts) {
  const part = parts.shift();
  if (!part) return;
  if (!tree[part]) tree[part] = {};
  buildTree(tree[part], parts);
}

function renderTree(node, depth, prefix = "", currentDepth = 0) {
  if (currentDepth >= depth) return "";
  const entries = Object.entries(node);
  return entries
    .map(([name, child], i) => {
      const connector = i === entries.length - 1 ? "└── " : "├── ";
      const childStr = renderTree(
        child,
        depth,
        prefix + (i === entries.length - 1 ? "    " : "│   "),
        currentDepth + 1
      );
      return `${prefix}${connector}${name}\n${childStr}`;
    })
    .join("");
}
