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

    // Debug: Verificar o conteúdo dos produtos
    console.log('Produtos armazenados:', produtos);

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
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <p>R$ ${produto.preco}</p>
            <img src="${produto.imagem}" alt="${produto.nome}" width="100">
            <p>Categoria: ${produto.categoria}</p>
        `;
        listaProdutos.appendChild(produtoItem);
    });
}

document.addEventListener('DOMContentLoaded', exibirProdutos);

// Função para limpar o catálogo
document.getElementById('limpar-produtos').addEventListener('click', function() {
    localStorage.removeItem('produtos');
    exibirProdutos();
});
