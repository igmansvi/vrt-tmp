#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const argProjectName = process.argv[2];
const cwd = process.cwd();

let targetDir;
let projectName;

if (!argProjectName) {
  projectName = "vrt-app";
  targetDir = path.join(cwd, projectName);
} else if (argProjectName === "." || argProjectName === "./") {
  targetDir = cwd;
  projectName = path.basename(cwd);
} else {
  projectName = argProjectName;
  targetDir = path.join(cwd, projectName);
}

if (argProjectName !== "." && argProjectName !== "./") {
  if (fs.existsSync(targetDir)) {
    console.error(`Directory ${projectName} already exists`);
    process.exit(1);
  }
} else {
  const existing = fs.readdirSync(targetDir);
  if (existing.length > 0) {
    console.error(`Current directory is not empty`);
    process.exit(1);
  }
}

const templateDir = path.join(__dirname, "template");

fs.mkdirSync(targetDir, { recursive: true });

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const files = fs.readdirSync(src);
  files.forEach((file) => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

copyDir(templateDir, targetDir);

const pkgPath = path.join(targetDir, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
pkg.name = projectName;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

process.chdir(targetDir);

console.log(`\nCreating project in ${targetDir}\n`);

try {
  console.log("Installing dependencies...\n");
  execSync("npm install", { stdio: "inherit" });
  console.log(`\nProject created successfully!\n`);
  console.log(`To start developing:\n`);
  if (argProjectName === "." || argProjectName === "./") {
    console.log(`  npm run dev\n`);
  } else {
    console.log(`  cd ${projectName}`);
    console.log(`  npm run dev\n`);
  }
} catch (error) {
  console.error("Failed to install dependencies", error);
  process.exit(1);
}
