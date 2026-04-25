const fs = require("fs");
const path = require("path");

const dir = "./src";

const regex = /[ãáàâéêíóôõúç]/i;

function scan(folder) {
  const files = fs.readdirSync(folder);

  files.forEach((file) => {
    const fullPath = path.join(folder, file);

    if (fs.statSync(fullPath).isDirectory()) {
      scan(fullPath);
    } else {
      const content = fs.readFileSync(fullPath, "utf-8");

      if (regex.test(content)) {
        console.log("⚠️ Portuguese detected:", fullPath);
      }
    }
  });
}

scan(dir);