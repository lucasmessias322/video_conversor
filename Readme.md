<h1>Documentação do código</h1>

<h2>Introdução</h2>

<p>
  Este código é uma aplicação Node.js que realiza a conversão de vídeos para o
  formato MP4. A aplicação lê informações de vídeos para conversão de um arquivo
  JSON, e inicia a conversão desses vídeos. Durante a conversão, a aplicação
  também gera screenshots dos vídeos e registra informações sobre o tempo de
  conversão.
</p>

<h2>Requisitos</h2>

<p>
  Para executar este código, é necessário ter o seguinte software instalado em
  sua máquina:
</p>

<ul>
  <li>Node.js</li>
  <li>ffmpeg</li>
</ul>

<h2>Módulos utilizados</h2>

<p>Este código utiliza três módulos externos:</p>

<ul>
  <li>
    <code>fluent-ffmpeg</code>: Este módulo fornece uma interface amigável para
    o uso do ffmpeg no Node.js.
  </li>
  <li>
    <code>path</code>: Este módulo fornece uma série de funções para trabalhar
    com caminhos de arquivos.
  </li>

  <li>
    <code>os</code>: Este módulo fornece informações sobre o sistema
    operacional, como o número de CPUs disponíveis.
  </li>
</ul>

<h2>Variáveis</h2>

<ul>
  <li>
    <code>videosForConvertData</code>: Armazena as informações dos vídeos que
    serão convertidos, lidas a partir do arquivo JSON.
  </li>

  <li>
    <code>videoQueue</code>: Armazena uma cópia das informações dos vídeos para
    conversão.
  </li>

  <li>
    <code>currentProcessing</code>: Armazena o status atual da conversão (se
    está ou não em processo de conversão).
  </li>

  <li>
    <code>maxParallelProcess</code>: Armazena o número máximo de processos de
    conversão que podem ser executados em paralelo. Este número é igual ao
    número de CPUs disponíveis no sistema.
  </li>

  <li>
    <code>timeTaken</code>: Armazena o tempo total de conversão de um vídeo.
  </li>
</ul>

<h2>Funções</h2>

<h3>convertToMp4(inputFile, outputFile, imageFile)</h3>

<p>
  Esta função realiza a conversão de um vídeo específico para o formato MP4. Ela
  utiliza o módulo <code>fluent-ffmpeg</code> para realizar a conversão, e
  também gera um screenshot do vídeo durante a conversão. A função registra
  informações sobre o tempo de conversão e exibe mensagens de log durante o
  processo de conversão.
</p>

<h3>processQueue()</h3>

<p>
  Esta função é responsável por processar a fila de vídeos para conversão. Ela
  verifica se há vídeos na fila e, se sim, inicia a conversão do próximo vídeo
  na fila. A função também registra
</p>
