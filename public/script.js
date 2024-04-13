document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.querySelector('.inputs form');
    const contatosUnicos = document.getElementById('contatosUnicos');

    const limparContatos = () => {
        contatosUnicos.innerHTML = '';
    };

    const carregarContatos = async () => {
        limparContatos();

        try {
            const response = await fetch('http://localhost:3000/');
            const contatos = await response.json();
    
            contatos.forEach(contato => {
                const divContato = document.createElement('div');
                divContato.classList.add('contato');

                const nome = document.createElement('h3');
                nome.textContent = `${contato.nome}`;

                const numero = document.createElement('h3');
                numero.textContent = `${contato.numero}`;

                console.log(contato)


                const botaoExcluir = document.createElement('input');
                botaoExcluir.type = 'button';
                botaoExcluir.value = 'X';
                botaoExcluir.onclick = async () => {
                    await fetch(`http://localhost:3000/${contato._id}`, {
                        method: 'DELETE'
                    });
                    carregarContatos();
                };

                divContato.appendChild(nome);
                divContato.appendChild(numero);
                divContato.appendChild(botaoExcluir);

                contatosUnicos.appendChild(divContato);
            });
        } catch (error) {
            console.error('Erro ao carregar contatos:', error);
        }
    };

    formCadastro.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const numero = document.getElementById('numero').value;

        await fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, numero })
        });

        carregarContatos();
        formCadastro.reset();
    });

    carregarContatos();
});
