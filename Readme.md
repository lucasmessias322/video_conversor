<h1>Conversor de Vídeos para MP4</h1>
<p>
  Este é um script que converte vídeos para o formato MP4 e gera imagens a
  partir dos vídeos convertidos. Ele utiliza o pacote
  <a href="https://github.com/fluent-ffmpeg/node-fluent-ffmpeg" target="_new"
    >fluent-ffmpeg</a
  >, bem como os pacotes
  <a href="https://nodejs.org/api/fs.html" target="_new">fs</a>,
  <a href="https://nodejs.org/api/path.html" target="_new">path</a> e
  <a href="https://nodejs.org/api/util.html" target="_new">util</a> do Node.js.
</p>
<h2>Como funciona</h2>
<ol>
  <li>
    O script começa mapeando o diretório "videos_for_convert" para obter a lista
    de vídeos para conversão.
  </li>
  <li>
    Então, utiliza o pacote <code>fluent-ffmpeg</code> para converter cada vídeo
    na lista para o formato MP4, usando as opções de codificação especificadas.
  </li>
  <li>
    Depois de converter todos os vídeos, o script gera uma imagem a partir de
    cada vídeo convertido e as salva no diretório "thumbs".
  </li>
  <li>O tempo total de execução é exibido no final.</li>
</ol>
<h2>Uso</h2>
<ol>
  <li>
    Instale as dependências executando o comando <code>npm install</code> no
    terminal.
  </li>
  <li>
    Crie as pastas "thumbs" e "videos_for_convert" no diretório raiz do projeto.
  </li>
  <li>
    Adicione os vídeos que deseja converter na pasta "videos_for_convert".
  </li>
  <li>Execute o script com o comando <code>npm start</code>.</li>
</ol>
<h2>Nota</h2>
<p>
  Certifique-se de que o
  <a href="https://www.ffmpeg.org/" target="_new">FFmpeg</a> esteja instalado em
  sua máquina antes de executar este script.
</p>
