// Function to fetch and display Filmes
function fetchFilmes() {
    console.log('Fetching Filmes...'); // Log a message to indicate the function is running
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
//Edit function
function handleEdit(event) {
    const filmeId = event.target.dataset.id; // Get the filme ID from the button's data-id attribute
    const editFormContainer = document.getElementById('editFormContainer');
    const editForm = document.getElementById('editForm');
    const editTitulo = document.getElementById('editTitulo');
    const editDiretor = document.getElementById('editDiretor');
    const editAnoLancamento = document.getElementById('editAnoLancamento');
    const editPais = document.getElementById('editPais');

    // Show the edit form container
    editFormContainer.style.display = 'block';

    // Fetch the specific filme data for editing
    fetch(`/api/filmes/${filmeId}`) // Assuming this is your endpoint for fetching a specific filme
        .then(response => response.json())
        .then(filme => {
            // Populate the edit form fields with existing data
            editForm.reset(); // Clear previous form data
            editForm.elements['editId'].value = filme.id;
            editTitulo.value = filme.titulo;
            editDiretor.value = filme.diretor;
            editAnoLancamento.value = filme.ano_lancamento;
            editPais.value = filme.pais;
        })
        .catch(error => console.error('Error fetching filme for editing:', error));
}

//Delete function
function handleDelete(event) {
    const filmeId = event.target.dataset.id; // Get the filme ID from the button's data-id attribute

    // Confirm with the user before deleting the filme
    const confirmDelete = confirm('Are you sure you want to delete this filme?');
    if (confirmDelete) {
        // Send a DELETE request to the backend API to delete the filme
        fetch(`/api/filmes/${filmeId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                // Refresh the list of filmes after successful deletion
                fetchFilmes();
            } else {
                console.error('Failed to delete filme:', response.statusText);
            }
        })
        .catch(error => console.error('Error deleting filme:', error));
    }
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
fetchFilmes();