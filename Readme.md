# Conversor de Vídeo
Este é um script para converter vídeos em formato MOV para MP4 e gerar uma imagem em formato PNG da parte principal do vídeo. O script foi escrito em JavaScript utilizando as bibliotecas ffmpeg e path.

Funcionamento
O script mantém uma fila de vídeos a serem convertidos e, a cada conversão concluída, processa o próximo da fila. É possível adicionar vídeos à fila chamando a função addVideoToQueue(), passando como argumentos o caminho do arquivo de entrada, o caminho do arquivo de saída e o nome do arquivo de imagem.

Dependências
fluent-ffmpeg
path
Como usar
Instale as dependências com o comando npm install fluent-ffmpeg path
Adicione vídeos à fila chamando a função addVideoToQueue()
Execute o script com o comando node script.js
Observações
É necessário ter o ffmpeg instalado na máquina para que o script funcione corretamente.
O script supõe que as pastas "videos_for_convert", "thumbs" e "converted" já existem e estão localizadas na pasta principal do projeto.
