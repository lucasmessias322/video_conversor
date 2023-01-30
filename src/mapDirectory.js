const fs = require("fs");
const path = require("path");

module.exports = async function mapDirectory() {
  const dirpath = path.resolve(__dirname, "..", "videos_for_convert");

  const files = fs.readdirSync(dirpath);

  const fileObjs = files.map((file, i) => ({
    id: i,
    inputFile: file,
    outputFile: `${file.split(".")[0]}_converted.mp4`,
    imageFile: `${file.split(".")[0]}`,
  }));
  fs.writeFileSync(
    path.resolve(__dirname, "..", "databases", "videosForConvert.json"),
    JSON.stringify(fileObjs)
  );
};
