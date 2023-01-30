const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const videosForConvertData = require("../databases/videosForConvert.json");

let videoQueue = [...videosForConvertData];
let currentProcessing = false;

const convertToMp4 = (inputFile, outputFile, imageFile) => {
  ffmpeg(path.resolve(__dirname, "..", "videos_for_convert", inputFile))
    .outputOptions("-c:v", "libx264")
    .outputOptions("-c:a", "aac")
    .outputOptions("-strict", "-2")
    .outputOptions("-movflags", "faststart")
    .screenshots({
      count: 1,
      filename: path.resolve(__dirname, "..", "thumbs", imageFile),
      size: "1280x720",
    })
    .save(path.resolve(__dirname, "..", "converted", outputFile))
    .on("end", () => {
      console.log(`Conversion completed: ${path.basename(inputFile)}`);
      currentProcessing = false;
      processNextVideo();
    })
    .on("error", (err) => {
      console.error(
        `Error converting file ${path.basename(inputFile)}: ${err.message}`
      );
      currentProcessing = false;
      processNextVideo();
    });
};

const processNextVideo = () => {
  if (videoQueue.length > 0 && !currentProcessing) {
    currentProcessing = true;
    const nextVideo = videoQueue.shift();
    convertToMp4(
      nextVideo.inputFile,
      nextVideo.outputFile,
      nextVideo.imageFile
    );
  }
};

const addVideoToQueue = (inputFile, outputFile, imageFile) => {
  videoQueue.push({ inputFile, outputFile, imageFile });
  processNextVideo();
};

videoQueue.forEach((video) =>
  addVideoToQueue(video.inputFile, video.outputFile, video.imageFile)
);
