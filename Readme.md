# Documentação

Este código é uma implementação de uma fila de conversão de vídeo que usa a biblioteca "fluent-ffmpeg" e "path" do Node.js. Ele tem as seguintes funcionalidades:

Armazena vídeos a serem convertidos em um array chamado "videoQueue".
Utiliza a função "convertToMp4" para converter os vídeos para o formato mp4 e criar uma imagem .png da parte principal do vídeo. Essa função usa a biblioteca "fluent-ffmpeg" para fazer a conversão e as opções de saída especificadas garantem compatibilidade e melhor performance ao reproduzir o vídeo.
A função "processNextVideo" é chamada sempre que um vídeo é concluído ou há um erro na conversão. Ela verifica se há algum vídeo na fila e se não há nenhum processo de conversão atualmente, e se ambas as condições forem atendidas, inicia a conversão do próximo vídeo na fila.
A função "addVideoToQueue" é usada para adicionar um vídeo à fila de conversão. Ela recebe como parâmetros o arquivo de entrada, o arquivo de saída e o nome da imagem a ser criada.
No final do código, é chamado a função "addVideoToQueue" com os argumentos "file_example_MOV_480_700kB.mov", "videoConverted.mp4" e "thumbs" para adicionar um vídeo à fila e iniciar a conversão.
