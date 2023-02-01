const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);
const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);
const mapDirectory = require("./mapDirectory");

//mapeia o diretorio
mapDirectory();

// importar a lista de videos para conversão
const videosForConvertData = require("../temp/videosForConvert.json");

// converte a lista para um array de objetos
const videoList = [...videosForConvertData];

// função para formatar o tempo
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

// função para converter os videos
async function convertVideos() {
  // marcar o tempo de início
  const startTime = Date.now();

  // loop para converter cada vídeo da lista
  for (const video of videoList) {
    console.log(`---Converting video: ${video.inputFile}`);

    // promessa para garantir que o vídeo será convertido antes de passar para o próximo
    await new Promise((resolve) => {
      ffmpeg(
        path.resolve(__dirname, "..", "videos_for_convert", video.inputFile)
      )
        .outputOptions("-c:v", "libx264")
        .outputOptions("-c:a", "aac")
        .outputOptions("-strict", "-2")
        .outputOptions("-movflags", "faststart")
        .outputOptions("-threads", "2")
        .outputOptions("-crf", "22")
        .outputOptions("-preset", "fast")
        // evento para mostrar quando a conversão terminar
        .on("end", () => {
          console.log(`Finished converting video: ${video.inputFile}`);
          resolve();
        })
        .save(path.resolve(__dirname, "..", "converted", video.outputFile));
    });
  }

  console.log("=========> [ All videos converted! ] <=========");
  console.log("============================================");

  // loop para gerar imagem de cada vídeo convertido
  for (const video of videoList) {
    console.log(`---Generating image for video: ${video.inputFile}`);
    // promessa para garantir que a imagem será gerada antes de passar
    await new Promise((resolve) => {
      ffmpeg(path.resolve(__dirname, "..", "converted", video.outputFile))
        .on("end", () => {
          console.log(
            `Finished generating image for video: ${video.outputFile}`
          );
          resolve();
        })
        .screenshots({
          count: 1,

          filename: path.resolve(__dirname, "..", "thumbs", video.imageFile),
          size: "1280x720",
        });
    });
  }

  console.log("All images generated!");

  const endTime = Date.now();
  console.log("------------------------------------------------");
  console.log(`------[ Elapsed time: ${msConversion(endTime - startTime)} ]`);
}

convertVideos();
