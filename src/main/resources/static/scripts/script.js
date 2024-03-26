// Function to fetch and display Filmes
function fetchFilmes() {
    fetch('/api/filmes/') // Assuming this is your endpoint for fetching Filmes
        .then(response => response.json())
        .then(data => {
            const filmeList = document.getElementById('filmeList');
            filmeList.innerHTML = ''; // Clear previous content

            data.forEach(filme => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${filme.id}</td>
                    <td class="editTitulo">${filme.titulo}</td>
                    <td>${filme.diretor}</td>
                    <td>${filme.ano_lancamento}</td>
                    <td>${filme.pais}</td>
                    <td>
                        <button class="editBtn" data-id="${filme.id}">Edit</button>
                        <button class="deleteBtn" data-id="${filme.id}">Delete</button>
                    </td>
                `;
                filmeList.appendChild(row);
            });

            // Add event listeners to Edit and Delete buttons
            document.querySelectorAll('.editBtn').forEach(btn => {
                btn.addEventListener('click', handleEdit);
            });
            document.querySelectorAll('.deleteBtn').forEach(btn => {
                btn.addEventListener('click', handleDelete);
            });
        })
        .catch(error => console.error('Error fetching Filmes:', error));
}

// Function to handle form submission for creating a new Filme
document.getElementById('createForm').addEventListener('submit', event => {
    event.preventDefault(); // Prevent default form submission

    const titulo = document.getElementById('titulo').value;
    const diretor = document.getElementById('diretor').value;
    const anoLancamento = document.getElementById('anoLancamento').value;
    const pais = document.getElementById('pais').value;

    fetch('/api/filmes/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo, diretor, ano_lancamento: anoLancamento, pais }),
    })
    .then(response => {
        if (response.ok) {
            fetchFilmes(); // Fetch and display updated list of Filmes
            document.getElementById('createForm').reset(); // Reset the form after successful submission
        } else {
            console.error('Failed to create Filme:', response.statusText);
        }
    })
    .catch(error => console.error('Error creating Filme:', error));
})