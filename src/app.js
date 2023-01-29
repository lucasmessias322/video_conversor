const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

// Array para armazenar os vídeos a serem convertidos
const videoQueue = [];

// Variável para indicar se há um processo de conversão atualmente
let currentProcessing = false;

// Função para converter vídeos para o formato mp4 e criar uma imagem .png da parte principal do vídeo
const convertToMp4 = (inputFile, outputFile, imageFile) => {
  ffmpeg(path.resolve(__dirname, "..", "videos_for_convert", inputFile))
    .outputOptions("-c:v", "libx264") // codec de vídeo
    .outputOptions("-c:a", "aac") // codec de áudio
    .outputOptions("-strict", "-2") // opções de compatibilidade
    .outputOptions("-movflags", "faststart") // opção para permitir que o vídeo comece a ser reproduzido antes de ser completamente baixado
    .screenshots({
      count: 1,
      filename: path.resolve(__dirname, "..", "thumbs", imageFile),
      size: "1280x720",
    })
    .save(path.resolve(__dirname, "..", "converted", outputFile)) // salva o arquivo convertido
    .on("end", () => {
      // evento chamado quando a conversão é concluída
      console.log(`Conversão concluída: ${path.basename(inputFile)}`);
      currentProcessing = false;
      processNextVideo();
    })
    .on("error", (err) => {
      console.error(
        `Erro ao converter o arquivo ${path.basename(inputFile)}: ${
          err.message
        }`
      );
      currentProcessing = false;
      processNextVideo();
    });
};

// Função para processar o próximo vídeo na fila de conversão
const processNextVideo = () => {
  // verifica se existe algum vídeo na fila e se não há nenhum processo de conversão atualmente
  if (videoQueue.length > 0 && !currentProcessing) {
    currentProcessing = true; // indica que há um processo de conversão em andamento
    const nextVideo = videoQueue.shift(); // retira o próximo vídeo da fila
    convertToMp4(
      nextVideo.inputFile,
      nextVideo.outputFile,
      nextVideo.imageFile
    ); // inicia a conversão
  }
};

const addVideoToQueue = (inputFile, outputFile, imageFile) => {
  videoQueue.push({ inputFile, outputFile, imageFile });
  processNextVideo();
};

addVideoToQueue(
  "file_example_MOV_480_700kB.mov",
  "videoConverted.mp4",
  "thumbs"
);
