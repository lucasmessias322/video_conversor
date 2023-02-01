const fs = require("fs");
const path = require("path");

module.exports = async function mapDirectory() {
  console.log(
    `Mapando pasta videos_for_convert e gerando arquivo videosForConvert.json `
  );
  const dirpath = path.resolve(__dirname, "..", "videos_for_convert");

  const files = fs.readdirSync(dirpath);

  const fileObjs = files.map((file, i) => ({
    id: i,
    inputFile: file,
    outputFile: `${file.split(".")[0]}_converted.mp4`,
    imageFile: `${file.split(".")[0]}`,
  }));

  // Criar pasta "temp" se não existir
  if (!fs.existsSync(path.resolve(__dirname, "..", "temp"))) {
    fs.mkdirSync(path.resolve(__dirname, "..", "temp"));
  }

  fs.writeFileSync(
    path.resolve(__dirname, "..", "temp", "videosForConvert.json"),
    JSON.stringify(fileObjs)
  );
};
