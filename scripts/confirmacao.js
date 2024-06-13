document.addEventListener('DOMContentLoaded', function() {
    const pedidoItens = document.getElementById('pedido-itens');
    const totalPedido = document.getElementById('total-pedido');
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    let total = 0;

    carrinho.forEach(produto => {
        total += produto.preco;
        const produtoItem = document.createElement('div');
        produtoItem.className = 'produto-item';
        produtoItem.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" width="50">
            <div>
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <p>R$ ${produto.preco.toFixed(2)}</p>
            </div>
        `;
        pedidoItens.appendChild(produtoItem);
    });

    totalPedido.innerHTML = `Total: R$ ${total.toFixed(2)}`;

    document.getElementById('form-entrega').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Pedido confirmado com sucesso!');
        localStorage.removeItem('carrinho');
        window.location.href = '../index.html';
    });
});
