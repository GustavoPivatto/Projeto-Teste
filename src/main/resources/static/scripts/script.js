// Function to fetch and display filmes
function fetchFilmes() {
    fetch('/api/filmes/') // Assuming this is your endpoint for fetching filmes
        .then(response => response.json())
        .then(data => {
            const filmeList = document.getElementById('filmeList');
            filmeList.innerHTML = ''; // Clear previous content

            data.forEach(filme => {
                const filmeItem = document.createElement('div');
                filmeItem.classList.add('filmeItem');
                filmeItem.innerHTML = `
                    <p>ID: ${filme.filme_id}</p>
                    <p>Título: ${filme.titulo}</p>
                    <p>Diretor: ${filme.diretor}</p>
                    <p>Ano de Lançamento: ${filme.ano_lancamento}</p>
                    <p>País: ${filme.pais}</p>
                `;
                filmeList.appendChild(filmeItem);
            });
        })
        .catch(error => console.error('Error fetching filmes:', error));
}

// Function to handle form submission for creating a new filme
document.getElementById('createForm').addEventListener('submit', event => {
    event.preventDefault(); // Prevent default form submission

    const titulo = document.getElementById('titulo').value;
    const id = document.getElementById('filme_id').value;
    const diretor = document.getElementById('diretor').value;
    const ano_lancamento = document.getElementById('ano_lancamento');
    const pais = document.getElementById('pais').value;

    fetch('/api/filmes/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
    })
    .then(response => {
        if (response.ok) {
            fetchFilmes(); // Fetch and display updated list of filmes
        } else {
            console.error('Failed to create filme:', response.statusText);
        }
    })
    .catch(error => console.error('Error creating filme:', error));
});

// Fetch and display filmes when the page loads
fetchFilmes();
