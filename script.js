//////////////////Ativar/Desativar estilo artístico com botão/////////////////
document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('toggleFont');
    let pacificoActive = false;

    btn.addEventListener('click', function () {
        pacificoActive = !pacificoActive;
        if (pacificoActive) {
            document.body.classList.add('pacifico-on');
        } else {
            document.body.classList.remove('pacifico-on');
        }
    });
});
/////////////////Fim do Ativar/Desativar estilo artístico com botão/////////////////
let itens=[], precos=[]

