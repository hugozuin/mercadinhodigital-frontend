document.addEventListener('DOMContentLoaded', function() {
    const pedidoItens = document.getElementById('pedido-itens');
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    carrinho.forEach(produto => {
        const produtoItem = document.createElement('div');
        produtoItem.className = 'produto-item';
        produtoItem.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" width="50">
            <div>
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <p>${produto.preco}</p>
            </div>
        `;
        pedidoItens.appendChild(produtoItem);
    });

    document.getElementById('form-entrega').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Pedido confirmado com sucesso!');
        localStorage.removeItem('carrinho');
        window.location.href = '../index.html';
    });
});
