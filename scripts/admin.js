document.getElementById('formulario-produto').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nomeProduto = document.getElementById('nome-produto').value;
    const descricaoProduto = document.getElementById('descricao-produto').value;
    const precoProduto = document.getElementById('preco-produto').value;
    const imagemProduto = document.getElementById('imagem-produto').value;
    const categoriaProduto = document.getElementById('categoria-produto').value;

    const produto = {
        nome: nomeProduto,
        descricao: descricaoProduto,
        preco: precoProduto,
        imagem: imagemProduto,
        categoria: categoriaProduto
    };

    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.push(produto);
    localStorage.setItem('produtos', JSON.stringify(produtos));

    exibirProdutos();
    this.reset();
});

function exibirProdutos() {
    const listaProdutos = document.getElementById('lista-produtos');
    listaProdutos.innerHTML = '';

    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    produtos.forEach((produto, index) => {
        const produtoItem = document.createElement('div');
        produtoItem.className = 'produto-item';
        produtoItem.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <div class="produto-detalhes">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <p>R$ ${produto.preco}</p>
                <p>Categoria: ${produto.categoria}</p>
            </div>
            <div class="produto-acoes">
                <button class="editar-produto" data-index="${index}">Editar</button>
                <button class="remover-produto" data-index="${index}">Remover</button>
            </div>
        `;
        listaProdutos.appendChild(produtoItem);
    });

    document.querySelectorAll('.remover-produto').forEach(button => {
        button.addEventListener('click', removerProduto);
    });

    document.querySelectorAll('.editar-produto').forEach(button => {
        button.addEventListener('click', editarProduto);
    });
}

function removerProduto(event) {
    const index = event.target.getAttribute('data-index');
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.splice(index, 1);
    localStorage.setItem('produtos', JSON.stringify(produtos));

    exibirProdutos();
}

function editarProduto(event) {
    const index = event.target.getAttribute('data-index');
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const produto = produtos[index];

    document.getElementById('nome-produto').value = produto.nome;
    document.getElementById('descricao-produto').value = produto.descricao;
    document.getElementById('preco-produto').value = produto.preco;
    document.getElementById('imagem-produto').value = produto.imagem;
    document.getElementById('categoria-produto').value = produto.categoria;
    document.getElementById('index-produto').value = index;
}

document.addEventListener('DOMContentLoaded', exibirProdutos);

document.getElementById('limpar-produtos').addEventListener('click', function() {
    localStorage.removeItem('produtos');
    exibirProdutos();
});
