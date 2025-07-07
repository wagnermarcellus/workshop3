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

    carregarItems();
});
/////////////////Fim do Ativar/Desativar estilo artístico com botão/////////////////

let itens = JSON.parse(localStorage.getItem("itens")) || [];
let itensRemovidos = JSON.parse(localStorage.getItem("itensRemovidos")) || [];

function salvarItens() {
    localStorage.setItem("itens", JSON.stringify(itens));
    localStorage.setItem("itensRemovidos", JSON.stringify(itensRemovidos));
}

function adicionarItem() {
    const nome = document.getElementById("IDnomeItem").value.trim();
    const descricao = document.getElementById("IDdecrição").value.trim();
    const preco = parseFloat(document.getElementById("IDpreço").value);

    if (nome === "" || descricao === "" || isNaN(preco)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const item = { nome, descricao, preco };
    itens.push(item);

    renderizarItens();
    limparCampos();
    salvarItens();
}

function renderizarItens() {
    const container = document.querySelector(".divDosItensAdicionados");
    const textoAdicionados = document.querySelector(".textoDosItensAdicionados");

    // Limpa todo o conteúdo antes de renderizar (evita duplicação)
    container.innerHTML = "";

    itens.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "itensCard";
        div.innerHTML = `
            <div class="itemIMG">
                <img src="https://i.ibb.co/xtkKTh6P/item-img.png" alt="Imagem do Item" class="itemImage">
            </div>
            <div class="itemDetalhes">
                <h3 id="numeracaoDoitem">Item #${index + 1}</h3>
                <p class="nomeItem">${item.nome}</p>
                <p class="decrição">${item.descricao}</p>
                <p class="preço">${item.preco.toFixed(2)} R$</p>
                <button class="removerItem" onclick="removerItem(${index})">Remover</button>
                <button class="restaurar" onclick="EditarItem(${index})">Editar</button>
            </div>
        `;
        container.appendChild(div);
    });

    // Animação e visibilidade
    if (itens.length === 0) {
        container.classList.remove("fade-in");
        container.classList.add("fade-out");
        setTimeout(() => container.classList.add("hidden"), 500);
    } else {
        container.classList.remove("hidden", "fade-out");
        container.classList.add("fade-in");
    }

    if (textoAdicionados) {
        textoAdicionados.classList.toggle("hidden", itens.length === 0);
    }

    renderizarItensRemovidos();
}

function renderizarItensRemovidos() {
    const container = document.querySelector(".divDosItensRemovidos");
    const direita = document.querySelector(".direita");

    // Limpa o container para evitar duplicação
    container.innerHTML = "";

    if (itensRemovidos.length === 0) {
        container.innerHTML = "<p>Nenhum item removido.</p>";
        if (direita) {
            direita.classList.remove("fade-in");
            direita.classList.add("fade-out");
            setTimeout(() => direita.classList.add("hidden"), 500);
        }
        return;
    }

    if (direita) {
        direita.classList.remove("hidden", "fade-out");
        direita.classList.add("fade-in");
    }

    itensRemovidos.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "itensCard";
        div.innerHTML = `
            <div class="itemIMG">
                <img src="./docs/img/item-img.png" alt="Imagem do Item" class="itemImage">
            </div>
            <div class="itemDetalhes">
                <h3 id="numeracaoDoitem">Item #${index + 1}</h3>
                <p class="nomeItem">${item.nome}</p>
                <p class="decrição">${item.descricao}</p>
                <p class="preço">${item.preco.toFixed(2)} R$</p>
                <button class="restaurar" onclick="restaurarItem(${index})">Restaurar</button>
                <button class="limparLista" onclick="removerItemPer(${index})">Apagar</button>
            </div>
        `;
        container.appendChild(div);
    });
}

function limparCampos() {
    document.getElementById("IDnomeItem").value = "";
    document.getElementById("IDdecrição").value = "";
    document.getElementById("IDpreço").value = "";
}

function removerItem(index) {
    const itemRemovido = itens.splice(index, 1)[0];
    itensRemovidos.push(itemRemovido);
    salvarItens();
    renderizarItens();
}

function restaurarItem(index) {
    const itemRestaurado = itensRemovidos.splice(index, 1)[0];
    itens.push(itemRestaurado);
    salvarItens();
    renderizarItens();
}

function removerItemPer(index) {
    itensRemovidos.splice(index, 1);
    salvarItens();
    renderizarItens();
}

function EditarItem(index) {
    const item = itens[index];

    document.getElementById("IDnomeItem").value = item.nome;
    document.getElementById("IDdecrição").value = item.descricao;
    document.getElementById("IDpreço").value = item.preco;

    const botaoAdicionar = document.querySelector('.AddItens button');
    botaoAdicionar.style.display = "none";

    let botaoEditar = document.getElementById("botaoEditar");
    if (!botaoEditar) {
        botaoEditar = document.createElement("button");
        botaoEditar.id = "botaoEditar";
        botaoEditar.textContent = "Salvar Edição";
        botaoEditar.className = "btn btn-warning";
        document.querySelector('.AddItens').appendChild(botaoEditar);
    }

    botaoEditar.onclick = function () {
        const novoNome = document.getElementById("IDnomeItem").value.trim();
        const novaDescricao = document.getElementById("IDdecrição").value.trim();
        const novoPreco = parseFloat(document.getElementById("IDpreço").value);

        if (novoNome === "" || novaDescricao === "" || isNaN(novoPreco)) {
            alert("Preencha todos os campos corretamente!");
            return;
        }

        itens[index] = { nome: novoNome, descricao: novaDescricao, preco: novoPreco };

        salvarItens();
        renderizarItens();
        limparCampos();

        botaoEditar.remove();
        botaoAdicionar.style.display = "inline-block";
    };
}

function limparLista() {
    if (itens.length === 0) {
        alert("A lista já está vazia.");
        return;
    }

    if (confirm("Tem certeza que deseja mover todos os itens para os removidos?")) {
        itensRemovidos = itensRemovidos.concat(itens);
        itens = [];
        salvarItens();
        renderizarItens();
    }
}

function limparListaRemovidos() {
    if (itensRemovidos.length === 0) {
        alert("A lista de removidos já está vazia.");
        return;
    }

    if (confirm("Tem certeza que deseja apagar todos os itens removidos?")) {
        itensRemovidos = [];
        salvarItens();
        renderizarItens();
    }
}

function carregarItems() {
    renderizarItens();
}

////////////
function renderizarItens() {
    const container = document.querySelector(".divDosItensAdicionados");
    const textoAdicionados = document.querySelector(".textoDosItensAdicionados");
    const esquerda = document.querySelector(".esquerda");
    const direita = document.querySelector(".direita");

    // Limpa todo o conteúdo antes de renderizar (evita duplicação)
    container.innerHTML = "";

    itens.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "itensCard";
        div.innerHTML = `
            <div class="itemIMG">
                <img src="https://i.ibb.co/xtkKTh6P/item-img.png" alt="Imagem do Item" class="itemImage">
            </div>
            <div class="itemDetalhes">
                <h3 id="numeracaoDoitem">Item #${index + 1}</h3>
                <p class="nomeItem">${item.nome}</p>
                <p class="decrição">${item.descricao}</p>
                <p class="preço">${item.preco.toFixed(2)} R$</p>
                <button class="removerItem" onclick="removerItem(${index})">Remover</button>
                <button class="restaurar" onclick="EditarItem(${index})">Editar</button>
            </div>
        `;
        container.appendChild(div);
    });

    // Animação e visibilidade
    if (itens.length === 0) {
        container.classList.remove("fade-in");
        container.classList.add("fade-out");
        setTimeout(() => container.classList.add("hidden"), 500);
        // Aplica estilo clássico centralizado
        if (esquerda) esquerda.classList.add("esquerda-classica");
    } else {
        container.classList.remove("hidden", "fade-out");
        container.classList.add("fade-in");
        // Remove estilo clássico e volta ao normal
        if (esquerda) esquerda.classList.remove("esquerda-classica");
    }

    if (textoAdicionados) {
        textoAdicionados.classList.toggle("hidden", itens.length === 0);
    }

    renderizarItensRemovidos();
}
///////////