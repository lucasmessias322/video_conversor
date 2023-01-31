const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const os = require("os");
const mapDirectory = require("./mapDirectory");

mapDirectory();

const videosForConvertData = require("../databases/videosForConvert.json");

function msConversion(millis) {
  const sec = Math.floor(millis / 1000);
  const hrs = Math.floor(sec / 3600);
  const min = Math.floor((sec - hrs * 3600) / 60);
  const seconds = sec % 60;

  const hourStr = hrs > 0 ? `${hrs}:` : "";
  const minuteStr = `${String(min).padStart(2, "0")}:`;
  const secondStr = `${String(seconds).padStart(2, "0")}`;

  return `${hourStr}${minuteStr}${secondStr}`;
}

const videoQueue = [...videosForConvertData];
let currentProcessing = false;
let maxParallelProcess = os.cpus().length;
let timeTaken;
let totalTime = 0;

const convertToMp4 = (inputFile, outputFile, imageFile) => {
  console.log(`Convertendo video: ${path.basename(inputFile)}`);
  const startTime = Date.now();
  ffmpeg(path.resolve(__dirname, "..", "videos_for_convert", inputFile))
    .outputOptions("-c:v", "libx264")
    .outputOptions("-c:a", "aac")
    .outputOptions("-strict", "-2")
    .outputOptions("-movflags", "faststart")
    .outputOptions("-threads", maxParallelProcess)
    .outputOptions("-crf", "22")
    .outputOptions("-preset", "fast")
    .screenshots({
      count: 1,
      filename: path.resolve(__dirname, "..", "thumbs", imageFile),
      size: "1280x720",
    })
    .on("filenames", (filenames) => {
      console.log(`Gerando imagen para ${path.basename(inputFile)}`);
    })
    .save(path.resolve(__dirname, "..", "converted", outputFile))
    .on("end", () => {
      timeTaken = Date.now() - startTime;
      totalTime += timeTaken;
      console.log(`Conversão de video completa: ${path.basename(
        inputFile
      )} in ${msConversion(timeTaken)}
`);
      processQueue();
    })
    .on("error", (err) => {
      console.error(
        `Error converting file ${path.basename(inputFile)}: ${err.message}`
      );
      processQueue();
    });
};

const processQueue = () => {
  currentProcessing = false;
  if (videoQueue.length > 0) {
    if (!currentProcessing) {
      currentProcessing = true;
      const nextVideo = videoQueue.shift();
      convertToMp4(
        nextVideo.inputFile,
        nextVideo.outputFile,
        nextVideo.imageFile
      );
      console.log("------------------------------------------------");
      console.log(
        `------[ Tempo estimado restante: ${msConversion(
          videoQueue.length * timeTaken
        )} ]`
      );
      console.log("------------------------------------------------");
    }
  }
};

for (let i = 0; i < maxParallelProcess; i++) {
  if (videoQueue.length > 0) {
    const nextVideo = videoQueue.shift();
    convertToMp4(
      nextVideo.inputFile,
      nextVideo.outputFile,
      nextVideo.imageFile
    );
  }
}
