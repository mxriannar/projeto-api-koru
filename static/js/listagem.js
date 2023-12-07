
// Popup botão cancelar
let popup = document.getElementById('popup');
let blur = document.getElementById('blur');

const tbody = document.getElementById('tbody')

function openPopup(id) {
    idDelete = id
    popup.classList.add('open-popup');
    blur.classList.add('active');
}

function closePopup() {
    popup.classList.remove('open-popup');
    blur.classList.remove('active');
}

// Filtro de pesquisa
function filterTable() {
    let input = document.getElementById("search"),
        filter = input.value.toLowerCase(),
        table = document.getElementById("table-sortable"),
        rows = table.getElementsByTagName("tr");

    if (filter != "") {
        for (i = 1; i < rows.length; i++) {
            let cells = rows[i].getElementsByTagName("td"),
                j,
                rowContainsFilter = false;

            for (j = 0; j < cells.length; j++) {
                if (cells[j]) {
                    let cellValue = cells[j].innerHTML.toLowerCase();

                    if (cellValue.includes(filter) && !cellValue.includes("<button")) {
                        rowContainsFilter = true;
                        break
                    }
                }
            }
            if (!rowContainsFilter) {
                rows[i].style.display = "none";
            } else {
                rows[i].style.display = "";
            }
        }
    } else {
        for (let index = 0; index < rows.length; index++) {
            rows[index].style.display = "";
        }
    }
}

// / Ordenar crescente e decrescente
/**
 * Sorts a HTML table
 * 
 * @param {HTMLTableElement} table The table to sort
 * @param {number} column The index of the column to sort
 * @param {boolean} asc Determines if the sorting will be in ascending order
 */

function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows_table = Array.from(tBody.querySelectorAll('tr'));
    debugger
    // Sort each row
    const sortedRows = rows_table.sort((a, b) => {
        debugger
        const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    })

    // Remove all existing TRs from the table 
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    table.querySelectorAll('th').forEach(th => th.classList.remove('th-sort-asc', 'th-sort-desc'));
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle('th-sort-asc', asc);
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle('th-sort-desc', !asc);
}

document.querySelectorAll('.table-sortable th').forEach(headerCell => {
    headerCell.addEventListener('click', () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains('th-sort-asc');

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    })
})

function listar() {
    getLeaders()
        .then((data) => {
            console.log(data)

            tbody.innerHTML = ''

            data.forEach((item) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.nome}</td>
                    <td>${item.departamento}</td>
                    <td>${item.email}</td>
                    <td>
                    <button class="btn" type="submit" title="Editar">
                        <i class="ri-edit-2-fill"></i>
                    </button>
                </td>
                <td>
                    <button class="btn" type="submit" title="Deletar" onclick="openPopup(${item.id})">
                        <i class="ri-delete-bin-2-fill"></i>
                    </button>
                </td>
                `
                tbody.appendChild(tr)
            })
        })
        .catch((erro) => {
            console.log(erro)
        })
}

function deletar() {
    const id = idDelete
    const dados = { ativo: 0 }
    deleteLeader(id, dados)
        .then(() => {
            window.location.reload()

        })
        .catch((erro) => {
            console.log(erro)
        })
}


//SERVICES

const urlBase = `http://localhost:5000/`

const getLeaders = async () => {
    const url = urlBase + 'lideres'

    try {
        const resposta = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await resposta.json()
    } catch (erro) {
        console.error('Ocorreu um erro na busca de líderes:', erro)
        throw erro
    }
}

const getAllLeaders = async (id) => {
    const url = urlBase + `lideres/${id}`
    try {
        const resposta = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await resposta.json()
    } catch (erro) {
        console.error('Ocorreu um erro na busca de lideres:', erro)
        throw erro
    }
}


const createLeader = async (dados) => {
    const url = urlBase + 'lideres'

    const resposta = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    return await resposta.json()
}

const deleteLeader = async (id, dados) => {

    const url = urlBase + `lideres/${id}/ativo`

    const resposta = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    console.log(dados)
    if (!resposta.ok) {
        throw new Error(`Erro ao excluir líder: ${resposta.statusText}`)
    }
    return resposta.json()
}
const editarLider = async (id, dadosAtualizados) => {
    const url = urlBase + `lideres/${id}`

    const resposta = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosAtualizados)
    })
    console.log(dadosAtualizados)

    if (!resposta.ok) {
        throw new Error(`Erro ao editar líder: ${resposta.statusText}`)
    }

    return resposta.json()
}