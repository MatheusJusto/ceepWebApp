var controladorDeCartoes = (function() {
    'use strict';

    //var contador
    var contador = $(".cartao").length;

    //Remove cartao
    function removeCartao() {
        var cartao = document.querySelector('#cartao_' + this.dataset.ref);

        //Dá uma classe que faz ele sumir devagar
        cartao.classList.add('cartao--some');

        //Tira da página depois da animação
        setTimeout( function() {
        cartao.remove();
        }, 400);
    }

    //Decide tipo de cartao
    function decideTipoCartao(conteudo) {
        var quebras = conteudo.split('<br>').length;
        var totalDeLetras = conteudo.replace(/<br>/g, " ").length;

        var ultimoMaior = "";
        conteudo.replace(/br/g, " ")
                .split(" ")
                .forEach(function(palavra) {
                    if(palavra.length > ultimoMaior.length) {
                        ultimoMaior = palavra;
                    }
                });

        var tamMaior = ultimoMaior.length;

        //no mínimo, todo cartão tem o texto pequeno
        var tipoCartao = "cartao--textoPequeno";

        if(tamMaior < 9 && quebras < 5 && totalDeLetras < 55) {
            tipoCartao = "cartao--textoGrande";
        } else if(tamMaior < 12 && quebras < 6 && totalDeLetras < 75) {
            tipoCartao = "cartao--textoMedio";
        }
        return tipoCartao;
    }
    

    

    function adicionaCartao(conteudo, cor) {
        contador ++;

        //Cria a div de opcoes
        var opcoes = criaOpcoesDeCartao(contador);

        //Executa tipo de cartao
        var tipoCartao = decideTipoCartao(conteudo);

        //Cria o conteudo do cartao
        var conteudoTag = $('<p>').addClass('cartao-conteudo')
                                  .attr('contenteditable', true)
                                  .on('input', editaCartaoHandler)
                                  .append(conteudo);


        //Acrescenta o append para colocar a div opcoes no cartão
        $('<div>').attr('id', 'cartao_' + contador)
                  .attr('tabindex', 0)
                  .addClass('cartao')
                  .addClass(tipoCartao)
                  .append(opcoes)
                  .append(conteudoTag)
                  .css('background-color', cor)
                  .prependTo('.mural');
    }


    var intervaloSync;
    
    function editaCartaoHandler(event) {
        clearTimeout(intervaloSyncEdicao);

        intervaloSyncEdicao = setTimeout(function() {
            $(document).trigger('precisaSincronizar');
        }, 1000);
    }

    return {
       adicionaCartao: adicionaCartao,
       idUltimoCartao: function() {
            return contador;
        }
    }

}) ();

