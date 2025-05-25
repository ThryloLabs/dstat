#!/usr/bin/env node

import { Command } from "commander";
import { analyzeDirectory } from "../lib/analyze.js";

if (process.env.THRY_CLI !== "1") {
  console.error("⛔ Please run this command via: thry <command>");
  console.error("For example: thry dstat");
  process.exit(1);
}

const program = new Command();

program
  .name("dstat")
  .description(
    `Analyze directory size, structure, and file stats.

Defaults:
  • Directory: current working directory (.)
  • Tree depth: unlimited
  • Gitignore: enabled
  • Default ignores: node_modules, .git, dist, build, .next, .vercel, .cache

Examples:
  $ dstat . -t -d 2
  $ dstat src --ext --exclude node_modules,build
  $ dstat . -o report.md -c`
  )
  .argument("[dir]", "Target directory", ".")
  .allowUnknownOption(true)
  .enablePositionalOptions()
  .option("-t, --tree", "Show directory structure tree")
  .option("-d, --depth <n>", "Max depth for tree output", parseInt)
  .option("-e, --exclude <list>", "Exclude folders (comma-separated)")
  .option("-x, --ext", "Show stats by file extension")
  .option("-i, --include-hidden", "Include dotfiles and hidden folders")
  .option("-g, --gitignore", "Respect .gitignore (default: true)", true)
  .option(
    "--no-default-ignore",
    "Disable built-in ignore rules like node_modules, .git, etc."
  )
  .option("-j, --json", "Output stats in JSON format")
  .option("-c, --copy", "Copy final report to clipboard")
  .option("-o, --output <file>", "Export the report to a file (e.g. stats.md)")
  .action((dir, options) => {
    analyzeDirectory(dir || ".", options);
  });

program.parse(process.argv);
