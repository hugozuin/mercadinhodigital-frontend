document.getElementById('formulario-produto').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nomeProduto = document.getElementById('nome-produto').value;
    const descricaoProduto = document.getElementById('descricao-produto').value;
    const precoProduto = document.getElementById('preco-produto').value;
    const imagemProduto = document.getElementById('imagem-produto').value;
    const categoriaProduto = document.getElementById('categoria-produto').value;
    const indexProduto = document.getElementById('index-produto').value;

    const produto = {
        nome: nomeProduto,
        descricao: descricaoProduto,
        preco: precoProduto,
        imagem: imagemProduto,
        categoria: categoriaProduto
    };

    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    if (indexProduto) {
        // Editar produto existente
        produtos[parseInt(indexProduto)] = produto;
    } else {
        // Adicionar novo produto
        produtos.push(produto);
    }

    localStorage.setItem('produtos', JSON.stringify(produtos));

    exibirProdutos();
    this.reset();
    document.getElementById('index-produto').value = ''; // Limpar índice após edição
});

function exibirProdutos() {
    const listaProdutos = document.getElementById('lista-produtos');
    listaProdutos.innerHTML = '';

    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    produtos.forEach((produto, index) => {
        const produtoItem = document.createElement('div');
        produtoItem.className = 'produto-item';
        produtoItem.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" width="50">
            <div>
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <p>R$ ${produto.preco}</p>
                <p>Categoria: ${produto.categoria}</p>
            </div>
            <button class="editar-produto" data-index="${index}">Editar</button>
            <button class="remover-produto" data-index="${index}">Remover</button>
        `;
        listaProdutos.appendChild(produtoItem);
    });

    // Adiciona evento de clique aos botões de edição e remoção
    document.querySelectorAll('.editar-produto').forEach(button => {
        button.addEventListener('click', editarProduto);
    });
    document.querySelectorAll('.remover-produto').forEach(button => {
        button.addEventListener('click', removerProduto);
    });
}

function editarProduto(event) {
    const index = event.target.getAttribute('data-index');
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const produto = produtos[parseInt(index)];

    document.getElementById('nome-produto').value = produto.nome;
    document.getElementById('descricao-produto').value = produto.descricao;
    document.getElementById('preco-produto').value = produto.preco;
    document.getElementById('imagem-produto').value = produto.imagem;
    document.getElementById('categoria-produto').value = produto.categoria;
    document.getElementById('index-produto').value = index;
}

function removerProduto(event) {
    const index = event.target.getAttribute('data-index');
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.splice(index, 1);
    localStorage.setItem('produtos', JSON.stringify(produtos));

    exibirProdutos();
}

document.getElementById('limpar-produtos').addEventListener('click', function() {
    localStorage.removeItem('produtos');
    exibirProdutos();
});

document.addEventListener('DOMContentLoaded', exibirProdutos);
