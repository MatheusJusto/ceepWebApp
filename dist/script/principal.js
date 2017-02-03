document.querySelector('#mudaLayout').addEventListener('click', function() {

    //Pega o elemento com a class="mural"
    var mural = document.querySelector('.mural');

    //Tira ou coloca class
    mural.classList.toggle('mural--linhas');

    if(mural.classList.contains('mural--linhas')) {
        this.textContent = "Blocos";
    } else {
        this.textContent = "Linhas";
    }
});


//Pega os botões 
var botoes = document.querySelectorAll('.opcoesDoCartao-remove');

for (var i = 0; i < botoes.length; i++) {
    //adiciona o evento em cada botão
    botoes[i].addEventListener('click', removeCartao);
}

function removeCartao() {
    var cartao = document.querySelector('#cartao_' + this.dataset.ref);

    //Dá uma classe que faz ele sumir devagar
    cartao.classList.add('cartao--some');

    //Tira da página depois da animação
    setTimeout( function() {
    cartao.remove();
    }, 400);
}

//Decide tipo de cartão

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

//Adiciona novo cartão

//Criando o contador
var contador = $('.cartao').length;
$('.novoCartao').submit(function(event) {

    var campoConteudo = $('.novoCartao-conteudo');
        var conteudo = campoConteudo.val().trim().replace(/\n/g, '<br>')
											     .replace(/\*{2}(.*?)\*{2}/, '<b>conteudo</b>')
											     .replace(/\*{1}(.*?)\*{1}/, '<em>conteudo</em>');

    if(conteudo) {
        //Soma um no contador
        contador++;
        
        //Criando o atributo data-ref
        var botaoRemove = $('<button>').addClass('opcoesDoCartao-remove')
                                       .attr('data-ref', contador)
                                       .text('Remover')
                                       .click(removeCartao);

        

        //Cria a div de opcoes
        var opcoes = $('<div>').addClass('opcoesDoCartao')
                             .append(botaoRemove);

        //Cria o conteudo do cartao
        var conteudoTag = $('<p>').addClass('cartao-conteudo')
                                  .append(conteudo);

        //Chamada para decide tipo de cartão
        var tipoCartao = decideTipoCartao(conteudo);

        //Acrescenta o append para colocar a div opcoes no cartão
        $('<div>').attr('id', 'cartao_' + contador)
                .addClass('cartao')
                .append(opcoes)
                .append(conteudoTag)
                .prependTo('.mural');

    }
    campoConteudo.val('');
    event.preventDefault();
});

//Botao de busca

$('#busca').on('input', function() {
    //guarda o valor digitado, removendo espaços extras
    var busca = $(this).val().trim();

    if(busca.length) {
        $('.cartao').hide().filter(function(){
            return $(this).find('.cartao-conteudo')
                          .text()
                          .match(new RegExp(busca, 'i'));
        }).show();
    } else {
        $('.cartao').show();
    }
});

function adicionaCartao(conteudo, cor) {
    contador++;

    var botaoRemove = $('<button>').addClass('opcoesDoCartao-remove')
                                   .attr('data-ref', contador)
                                   .text('Remover')
                                   .click('removeCartao');

    var opcoes = $('<div>').addClass('opcoesDoCartao')
                           .append(conteudo);

    $('<div>').attr('id', 'cartao_' + contador)
              .addClass('cartao')
              .addClass(tipoCartao)
              .append(opcoes)
              .append(conteudoTag)
              .css('background-color', cor)
              .prependTo('.mural');
              
}
(function(){
    var usuario = "matheusgarciadg@gmail.com";

    $('#ajuda').click(function() {
        $.getJSON('https://ceep.herokuapp.com/cartoes/instrucoes',
            function(res) {
                console.log(res);

                res.instrucoes.forEach(function(instrucao) {
                    adicionaCartao(instrucao.conteudo, instrucao.cor);
                });
            }
        );
    });


    $('#sync').click(function() {

        $('#sync').removeClass('botaoSync--sincronizado');
        $('#sync').addClass('botaoSync--esperando');
        var cartoes = [];

        $('.cartao').each(function() {
            var cartao = {};

            cartao.conteudo = $(this).find('.cartao-conteudo').html();
            cartoes.push(cartao);
        });

        //Escolha seu nome de usuario aqui
        var mural = {
            usuario: usuario,
            cartoes: cartoes,

        };

        $.ajax({
            url: "https://ceep.herokuapp.com/cartoes/salvar",
            method: 'POST',
            data: mural,
            success: function(res) {
                $('#sync').addClass('botaoSync--sincronizado');
                console.log(res.quantidade + " cartões salvos em " + res.usuario);
            }
            ,error: function() {
                $('#sync').addClass('botaoSync--deuRuim');
                console.log("não foi possivel salvar o mural");
            }
            ,complete: function() {
                $('#sync').removeClass('botaoSync--esperando');
            }
        });
    });


    $.getJSON(
        'https://ceep.heroKuapp.com/cartoes/carregar?callback=?',
        {usuario: usuario},
        function(res) {
            var cartoes = res.cartoes;
            console.log(cartoes.length + " carregados em " + res.usuario);
            cartoes.forEach(function(cartao) {
                adicionaCartao(cartao.conteudo);
            });
        }
    );

}) ();
