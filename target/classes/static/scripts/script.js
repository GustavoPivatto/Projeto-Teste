// Function to fetch and display filmes
function fetchFilmes() {
    fetch('/api/filmes') // Assuming this is your endpoint for fetching filmes
        .then(response => response.json())
        .then(data => {
            const filmeList = document.getElementById('filmeList');
            filmeList.innerHTML = ''; // Clear previous content

            // Get templates
            const filmeItemTemplate = document.getElementById('filmeItemTemplate');
            const editFormTemplate = document.getElementById('editFormTemplate');

            data.forEach(filme => {
                // Clone and populate filme item template
                const filmeItem = filmeItemTemplate.content.cloneNode(true);
                filmeItem.querySelector('.filmeId').textContent = filme.filme_id;
                filmeItem.querySelector('.filmeTitulo').textContent = filme.titulo;
                filmeItem.querySelector('.filmeDiretor').textContent = filme.diretor;
                filmeItem.querySelector('.filmeAnoLancamento').textContent = filme.ano_lancamento;
                filmeItem.querySelector('.filmePais').textContent = filme.pais;

                // Edit button functionality
                filmeItem.querySelector('.editBtn').addEventListener('click', function() {
                    // Populate edit form with filme details
                    const editForm = editFormTemplate.content.cloneNode(true);
                    editForm.querySelector('#editId').value = filme.filme_id;
                    editForm.querySelector('#editTitulo').value = filme.titulo;
                    editForm.querySelector('#editDiretor').value = filme.diretor;
                    editForm.querySelector('#editAnoLancamento').value = filme.ano_lancamento;
                    editForm.querySelector('#editPais').value = filme.pais;

                    // Replace filme item with edit form
                    filmeItem.parentNode.replaceChild(editForm, filmeItem);
                });

                // Delete button functionality
                filmeItem.querySelector('.deleteBtn').addEventListener('click', function() {
                    if (confirm('Are you sure you want to delete this filme?')) {
                        fetch(`/api/filmes/${filme.filme_id}`, {
                            method: 'DELETE',
                        })
                        .then(response => {
                            if (response.ok) {
                                fetchFilmes(); // Fetch and display updated list of filmes
                            } else {
                                console.error('Failed to delete filme:', response.statusText);
                            }
                        })
                        .catch(error => console.error('Error deleting filme:', error));
                    }
                });

                filmeList.appendChild(filmeItem);
            });
        })
        .catch(error => console.error('Error fetching filmes:', error));
}

// Function to handle form submission for creating a new filme
document.getElementById('createForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    fetch('/api/filmes', {
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
