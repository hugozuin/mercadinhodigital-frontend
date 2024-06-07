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

//---------------------------------------

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
        `;

        if (produto.categoria === 'mercado') {
            containerMercado.appendChild(elementoProduto);
        } else if (produto.categoria === 'farmacia') {
            containerFarmacia.appendChild(elementoProduto);
        }
    });
}

document.addEventListener('DOMContentLoaded', exibirProdutos);
