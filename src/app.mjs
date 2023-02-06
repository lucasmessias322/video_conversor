import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import mapDirectory from "./msConversion.mjs";
import msConversion from "./msConversion.mjs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const unlinkAsync = promisify(fs.unlink);
const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);

//mapeia o diretorio
mapDirectory();

// importar a lista de videos para conversão
import videosForConvertData from "../temp/videosForConvert.json" assert { type: "json" };

// função para converter os videos
async function convertVideos() {
  const videoList = [...videosForConvertData];
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
