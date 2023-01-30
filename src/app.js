const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const os = require("os");
const mapDirectory = require("./mapDirectory");

mapDirectory();

const videosForConvertData = require("../databases/videosForConvert.json");

const videoQueue = [...videosForConvertData];
let currentProcessing = false;
let maxParallelProcess = os.cpus().length;
let timeTaken;

const convertToMp4 = (inputFile, outputFile, imageFile) => {
  console.log(`Started converting video: ${path.basename(inputFile)}`);
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
      console.log(`Generating screenshot for ${path.basename(inputFile)}`);
    })
    .save(path.resolve(__dirname, "..", "converted", outputFile))
    .on("end", () => {
      timeTaken = Date.now() - startTime;
      console.log(`
Conversion completed: ${path.basename(inputFile)} in ${timeTaken}ms
`);
      processQueue();
    })
    .on("error", (err) => {
      console.error(`
Error converting file ${path.basename(inputFile)}: ${err.message}
`);
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
      console.log(
        `Estimated time remaining: ${
          (videoQueue.length * timeTaken) / 1000
        } seconds`
      );
    }
  }
};

videoQueue.forEach((video, index) => {
  if (index < maxParallelProcess) {
    convertToMp4(video.inputFile, video.outputFile, video.imageFile);
  }
});
