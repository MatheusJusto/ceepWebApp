var mudaLayout = (function() {
    'use strict';
    
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
}) ();