document.getElementById('formulario-produto').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nomeProduto = document.getElementById('nome-produto').value;
    const descricaoProduto = document.getElementById('descricao-produto').value;
    const precoProduto = document.getElementById('preco-produto').value;
    const imagemProduto = document.getElementById('imagem-produto').value;
    const categoriaProduto = document.getElementById('categoria-produto').value;
    const indexProduto = document.getElementById('index-produto').value;

    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    const produto = {
        nome: nomeProduto,
        descricao: descricaoProduto,
        preco: precoProduto,
        imagem: imagemProduto,
        categoria: categoriaProduto
    };

    if (indexProduto === "") {
        produtos.push(produto);
    } else {
        produtos[indexProduto] = produto;
        document.getElementById('index-produto').value = "";
    }
    
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
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <p>R$ ${produto.preco}</p>
            <img src="${produto.imagem}" alt="${produto.nome}" width="100">
            <p>Categoria: ${produto.categoria}</p>
            <button class="editar-produto" data-index="${index}">Editar</button>
            <button class="remover-produto" data-index="${index}">Remover</button>
        `;
        listaProdutos.appendChild(produtoItem);
    });

    // Adiciona eventos de clique aos botões de edição e remoção
    document.querySelectorAll('.editar-produto').forEach(button => {
        button.addEventListener('click', editarProduto);
    });
    document.querySelectorAll('.remover-produto').forEach(button => {
        button.addEventListener('click', removerProduto);
    });
}

function removerProduto(event) {
    const index = event.target.getAttribute('data-index');
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.splice(index, 1); // Remove o produto do array
    localStorage.setItem('produtos', JSON.stringify(produtos));
    exibirProdutos(); // Atualiza a lista de produtos exibida
}

function editarProduto(event) {
    const index = event.target.getAttribute('data-index');
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const produto = produtos[index];

    // Preenche o formulário com os dados do produto para edição
    document.getElementById('nome-produto').value = produto.nome;
    document.getElementById('descricao-produto').value = produto.descricao;
    document.getElementById('preco-produto').value = produto.preco;
    document.getElementById('imagem-produto').value = produto.imagem;
    document.getElementById('categoria-produto').value = produto.categoria;
    document.getElementById('index-produto').value = index;
}

document.addEventListener('DOMContentLoaded', exibirProdutos);

// Função para limpar o catálogo
document.getElementById('limpar-produtos').addEventListener('click', function() {
    localStorage.removeItem('produtos');
    exibirProdutos();
});
