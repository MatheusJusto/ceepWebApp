var sincronizacao = (function(){
    'use strict';
    
    var usuario = "matheusgarciadg@gmail.com";

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
                controladorDeCartoes.adicionaCartao(cartao.conteudo);
            });
        }
    );

}) ();