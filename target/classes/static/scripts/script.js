
function fetchFilmes() {
    console.log('Fetching Filmes...'); 
    fetch('/api/filmes/') 
        .then(response => response.json())
        .then(data => {
            const filmeList = document.getElementById('filmeList');
            filmeList.innerHTML = ''; 

            data.forEach(filme => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${filme.id}</td>
                    <td class="editTitulo">${filme.titulo}</td>
                    <td>${filme.diretor}</td>
                    <td>${filme.ano_lancamento}</td>
                    <td>${filme.pais}</td>
                    <td>
                        <button class="editBtn" data-id="${filme.id}">Editar</button>
                        <button class="deleteBtn" data-id="${filme.id}">Deletar</button>
                    </td>
                `;
                filmeList.appendChild(row);
            });

            document.querySelectorAll('.editBtn').forEach(btn => {
                btn.addEventListener('click', handleEdit);
            });
            document.querySelectorAll('.deleteBtn').forEach(btn => {
                btn.addEventListener('click', handleDelete);
            });
        })
        .catch(error => console.error('Error fetching Filmes:', error));
}

function handleEdit(event) {
    const filmeId = event.target.dataset.id; 
    const editFormContainer = document.getElementById('editFormContainer');
    const editForm = document.getElementById('editForm');
    const editTitulo = document.getElementById('editTitulo');
    const editDiretor = document.getElementById('editDiretor');
    const editAnoLancamento = document.getElementById('editAnoLancamento');
    const editPais = document.getElementById('editPais');

    editFormContainer.style.display = 'block';

    fetch(`/api/filmes/${filmeId}`) 
        .then(response => response.json())
        .then(filme => {
            editForm.reset(); 
            editForm.elements['editId'].value = filme.id;
            editTitulo.value = filme.titulo;
            editDiretor.value = filme.diretor;
            editAnoLancamento.value = filme.ano_lancamento;
            editPais.value = filme.pais;
        })
        .catch(error => console.error('Error fetching filme for editing:', error));
}

function handleDelete(event) {
    const filmeId = event.target.dataset.id; 

    const confirmDelete = confirm('Tem certeza que quer deletar esse filme?');
    if (confirmDelete) {
  
        fetch(`/api/filmes/${filmeId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                fetchFilmes();
            } else {
                console.error('Failed to delete filme:', response.statusText);
            }
        })
        .catch(error => console.error('Error deleting filme:', error));
    }
}

document.getElementById('createForm').addEventListener('submit', event => {
    event.preventDefault(); 

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
            fetchFilmes(); 
            document.getElementById('createForm').reset(); 
        } else {
            console.error('Failed to create Filme:', response.statusText);
        }
    })
    .catch(error => console.error('Error creating Filme:', error));
})
fetchFilmes();