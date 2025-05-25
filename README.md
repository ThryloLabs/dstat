# 📊 dstat — Directory Statistics CLI

**A fast, elegant CLI to analyze directory size, structure, and file statistics.**  
Built by [Thrylo Labs](https://github.com/ThryloLabs).

![npm](https://img.shields.io/npm/v/@thrylolabs/dstat)
![license](https://img.shields.io/npm/l/@thrylolabs/dstat)
![issues](https://img.shields.io/github/issues/ThryloLabs/dstat)

---

## 🚀 Overview

`dstat` is a CLI utility that helps you understand what’s taking up space in your project directories. It gives you:

- 📁 Directory structure (Markdown-ready)
- 📦 File size stats (total, by extension, by folder)
- 🧠 Smart ignores (respects `.gitignore`, ignores `node_modules`, etc.)
- ✨ Optional JSON output, export to Markdown, and clipboard copy

---

## 📦 Installation

Make sure `thry` is installed first.

```bash
npm install -g @thrylolabs/thry
```

Install `dstat`.

```bash
thry install dstat
```

---

## 🧑‍💻 Usage

```bash
thry dstat [directory] [options]
```

### Options

| Flag                   | Description                                    |
| ---------------------- | ---------------------------------------------- |
| `-t, --tree`           | Show directory structure tree                  |
| `-d, --depth <n>`      | Max depth for tree output                      |
| `-e, --exclude <list>` | Exclude folders (comma-separated)              |
| `-x, --ext`            | Show stats by file extension                   |
| `-i, --include-hidden` | Include dotfiles and hidden folders            |
| `-g, --gitignore`      | Respect `.gitignore` (default: enabled)        |
| `-j, --json`           | Output stats in JSON format                    |
| `-c, --copy`           | Copy final report to clipboard                 |
| `-o, --output <file>`  | Export the report to a file (e.g., `stats.md`) |
| `-h, --help`           | Show help message                              |

---

## 🌿 Examples

```bash
# Basic stats of current directory
thry dstat .

# Show tree structure with depth of 2
thry dstat . -t -d 2

# Exclude common folders and show extension stats
thry dstat . -e node_modules,.git -x

# Export report to Markdown file
thry dstat . -o report.md

# Copy summary to clipboard
thry dstat . -c
```

---

## 📂 Sample Output

```bash
📊 Directory Stats for ./my-project

📁 Total Size: 3.1 MB
📄 Total Files: 182

🔡 Extension Breakdown:
  .js     → 45 files, 700 KB
  .ts     → 80 files, 1.3 MB
  .json   → 12 files, 200 KB

🗂 Tree (Depth 2)
my-project/
├── src/
│   ├── index.ts
│   └── utils.ts
├── public/
│   └── index.html
└── README.md
```

---

## 🛠 Built With

- TypeScript
- `commander` for CLI parsing
- `fs-extra`, `globby`, `ignore`, `chalk`
- `clipboardy` for copy feature
- `pretty-bytes` for human-readable sizes

---

## 🧠 About Thrylo Labs

> Thrylo Labs builds fast, elegant, developer-first tools that push the boundaries of what's possible in modern computing.

Check out our work: [https://github.com/ThryloLabs](https://github.com/ThryloLabs)

---

## 📄 License

MIT © Thrylo Labs
