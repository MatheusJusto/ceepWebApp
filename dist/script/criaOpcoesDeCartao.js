var criaOpcoesDeCartao = (function() {
    'use-strict';

    function removeCartao() {
        var cartao = document.querySelector('#cartao_' + this.dataset.ref);

        //Dá uma classe que faz ele sumir devagar
        cartao.classList.add('cartao--some');

        //Tira da página depois da animação
        setTimeout( function() {
        cartao.remove();
        }, 400);
    };

    var ehPraEditar = false;
    function toggleEdicao() {
        var cartao = $('#cartao_' + this.dataset.ref);
        var conteudo = cartao.find('.cartao-conteudo');

        if(ehPraEditar) {
            ehPraEditar = false;
            conteudo.attr('contenteditable', false);
            conteudo.blur();
        }
        else {
            ehPraEditar = true;
            conteudo.attr('contenteditable', true);
            conteudo.focus();
        }
    }

    function opcoesDeCoresDoCartao(idDoCartao) {
        var cores = [
            {nome: "Padrao", codigo: '#EBEF40'},
            {nome: "Importante", codigo: '#F05450'},
            {nome: "Tarefa", codigo: '#92c4ec'},
            {nome: "Inspiração", codigo: '#76EF40'}
        ];

        var opcoesDeCor = $('<div>').addClass('opcoesDoCartao-cores');

        cores.forEach(function(cor) {

            var idInputCor = 'cor' + cor.nome + "-cartao" + idDoCartao;

            var inputCor = $('<input>').attr('type', 'radio')
                                       .attr('name', 'corDoCartao' + idDoCartao)
                                       .val(cor.codigo)
                                       .attr('id', idInputCor)
                                       .addClass('opcoesDoCartao-radioCor');

            var labelCor = $('<label>').css('color', cor.codigo)
                                       .attr('for', idInputCor)
                                       .attr('tabindex', 0)
                                       .addClass('opcoesDoCartao-cor')
                                       .addClass('opcoesDoCartao-opcao')
                                       .text(cor.nome);

            opcoesDeCor.data('ref', idDoCartao).append(inputCor).append(labelCor);
        });

        opcoesDeCor.on("change", function(event) {
            if(event.target.classList.contains('opcoesDoCartao-radioCor')) {
                var cor = $(event.target);
                var cartao = $('#cartao_' + $(this).data('ref'));
                cartao.css('background-color', cor.val());
                $(document).trigger('precisaSincronizar');
            }
        });

        return opcoesDeCor;
    }

    
    return function(idNovoCartao) {
        var botaoRemove = $('<button>').addClass('opcoesDoCartao-remove')
                                       .addClass('opcoesDoCartao-opcao')
                                       .attr('data-ref', idNovoCartao)
                                       .text('Remover')
                                       .click(removeCartao);

        var botaoEdita = $('<button>').addClass('opcoesDoCartao-edita')
                                      .addClass('opcoesDoCartao-opcao')
                                      .attr('data-ref', idNovoCartao)
                                      .text("Editar")
                                      .click(toggleEdicao);

        var opcoesDeCor = opcoesDeCoresDoCartao(idNovoCartao);

        var opcoes = $('<div>').addClass('opcoesDoCartao')
                               .append(botaoRemove)
                               .append(botaoEdita)
                               .append(opcoesDeCor);

       return opcoes;

    };

}) ();