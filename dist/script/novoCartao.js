var novoCartao = (function() {
	"use strict";	
	$(".novoCartao").submit(function(event){
		

		var campoConteudo = $(".novoCartao-conteudo");
		
		var conteudo = campoConteudo.val().trim();

		if(conteudo) {
			controladorDeCartoes.adicionaCartao(conteudo);
			$(document).trigger("precisaSincronizar");		
		}

		campoConteudo.val("");
		event.preventDefault();
	});

	function formatText (content) {
		return content.trim().replace(/\n/g,"<br>")
				   .replace(/\*\*(.*)\*\*/g,"<b>$1</b>")
				   .replace(/\*(.*)\*/g,"<em>$1</em>"); 
	}
})();