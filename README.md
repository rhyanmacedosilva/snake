# Snake
Famoso jogo da cobrinha, desenvolvido com a biblioteca Kaboom.js, este projeto é o resultado dos primeiros contatos com esta ferramenta.

## O Projeto

Sem muitas novidades, trata-se de um simples jogo Snake, desenvolvido para aplicar alguns dos fundamentos da biblioteca [Kaboom.js](https://kaboomjs.com/).

## Executando o Projeto

Este projeto pode ser executado abrindo o arquivo index.html, porém apenas se as seguintes linhas no arquivo `app.js` forem comentadas:

`22) loadSound('power-up', 'sounds/power-up.wav')`

`23) loadSound('game-over', 'sounds/game-over.wav')`

`100) play('power-up')`

`111) play('game-over')`

As linhas citadas acima são responsáveis por carregar os arquivos de áudio, bem como executá-los durante a jogatina, e como estamos trabalhando com Javascript no client, o browser não permite o acesso direto aos arquivos .wav na máquina do usuário.

## Executando o Projeto com Áudio

A documentação da Kaboom.js recomenda algumas formas de se contornar a situação descrita acima. Você pode conferir toda a seção de setup do projeto [aqui](https://kaboomjs.com/doc/setup).

Eu utilizei o [static-here](https://www.npmjs.com/package/static-here), talvez a mais simples entre as alternativas.
