//-------------CARROSEL---------------

let indiceAtual = 0;

function moverCarrossel(direcao) {
    const itens = document.querySelectorAll('.item-carrossel');
    const totalItens = itens.length;

    indiceAtual = (indiceAtual + direcao + totalItens) % totalItens;
    const deslocamento = -indiceAtual * 100; // Calcula o deslocamento em porcentagem
    document.querySelector('.carrossel-interno').style.transform = `translateX(${deslocamento}%)`;

    atualizarIndicadores();
}

function atualizarIndicadores() {
    const indicadores = document.querySelectorAll('.indicador');
    indicadores.forEach((indicador, indice) => {
        if (indice === indiceAtual) {
            indicador.classList.add('ativo');
        } else {
            indicador.classList.remove('ativo');
        }
    });
}

setInterval(() => {
    moverCarrossel(1);
}, 3000);

document.querySelectorAll('.indicador').forEach((indicador, indice) => {
    indicador.addEventListener('click', () => {
        moverCarrossel(indice - indiceAtual);
    });
});

//---------------PRODUTOS----------------------

function exibirProdutos() {
    const containerMercado = document.querySelector('.produtos-container.mercado');
    const containerFarmacia = document.querySelector('.produtos-container.farmacia');

    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    // Debug: Verificar o conteúdo dos produtos
    console.log('Produtos carregados:', produtos);

    containerMercado.innerHTML = ''; // Limpa o conteúdo atual
    containerFarmacia.innerHTML = ''; // Limpa o conteúdo atual

    produtos.forEach(produto => {
        const elementoProduto = document.createElement('div');
        elementoProduto.className = 'produto';
        elementoProduto.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <h4>R$ ${produto.preco}</h4>
            <button class="adicionar-carrinho">Adicionar ao Carrinho</button>
        `;

        if (produto.categoria === 'mercado') {
            containerMercado.appendChild(elementoProduto);
        } else if (produto.categoria === 'farmacia') {
            containerFarmacia.appendChild(elementoProduto);
        }
    });

    document.querySelectorAll('.adicionar-carrinho').forEach(button => {
        button.addEventListener('click', adicionarAoCarrinho);
    });
}

document.addEventListener('DOMContentLoaded', exibirProdutos);

//------------------CARRINHO-----------------------
document.getElementById('carrinho-link').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('menu-carrinho').style.width = '300px';
});

document.getElementById('fechar-carrinho').addEventListener('click', function() {
    document.getElementById('menu-carrinho').style.width = '0';
});

function adicionarAoCarrinho(event) {
    const produtoElemento = event.target.closest('.produto');
    const produto = {
        imagem: produtoElemento.querySelector('img').src,
        nome: produtoElemento.querySelector('h3').innerText,
        descricao: produtoElemento.querySelector('p').innerText,
        preco: produtoElemento.querySelector('h4').innerText,
    };

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    atualizarCarrinho();
}

function atualizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const contadorCarrinho = document.getElementById('contador-carrinho');
    contadorCarrinho.innerText = carrinho.length;

    const carrinhoItens = document.getElementById('carrinho-itens');
    carrinhoItens.innerHTML = '';

    carrinho.forEach((produto, index) => {
        const produtoItem = document.createElement('div');
        produtoItem.className = 'produto-item';
        produtoItem.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" width="50">
            <div>
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <p>${produto.preco}</p>
                <button class="remover-item-carrinho" data-index="${index}">Remover</button>
            </div>
        `;
        carrinhoItens.appendChild(produtoItem);
    });

    // Adiciona evento de clique aos botões de remoção
    document.querySelectorAll('.remover-item-carrinho').forEach(button => {
        button.addEventListener('click', removerItemCarrinho);
    });
}

function removerItemCarrinho(event) {
    const index = event.target.getAttribute('data-index');
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    atualizarCarrinho();
}

document.getElementById('finalizar-compra').addEventListener('click', function() {
    alert('Compra finalizada com sucesso!');
    localStorage.removeItem('carrinho');
    atualizarCarrinho();
});

document.addEventListener('DOMContentLoaded', atualizarCarrinho);

//------------------ROLAGEM PRODUTOS-----------------------
document.querySelectorAll('.scroll-btn.left').forEach(button => {
    button.addEventListener('click', function() {
        const container = button.nextElementSibling;
        container.scrollBy({ left: -200, behavior: 'smooth' });
    });
});

document.querySelectorAll('.scroll-btn.right').forEach(button => {
    button.addEventListener('click', function() {
        const container = button.previousElementSibling;
        container.scrollBy({ left: 200, behavior: 'smooth' });
    });
});
