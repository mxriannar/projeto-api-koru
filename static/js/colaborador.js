
const tbody = document.getElementById('tbody')
const formColaborador = document.getElementById('formColaborador')
let popup = document.getElementById('popup'),
    blur = document.getElementById('blur'),
    popForm = document.getElementById('wrapper'),
    input = document.getElementById("search"),
    filter = input.value.toLowerCase(),
    table = document.getElementById("table-sortable"),
    rows = table.getElementsByTagName("tr"),
    btnSalvar = document.getElementById('btn-save'),
    criar = document.getElementById('criar');


// Popup botão cancelar
function openPopup(id) {
    idDelete = id
    popup.classList.add('open-popup');
    blur.classList.add('active');
}

function closePopup() {
    popup.classList.remove('open-popup');
    blur.classList.remove('active');
}

// Popup formulário
function openForm(button, id) {
    const buttonID = button.id
    popForm.classList.add('open-wrapper')
    if (buttonID === "editar") {
        document.getElementById("title-form").innerText = "Editar"
        editarColaborador(id)
    } else {
        document.getElementById("title-form").innerText = "Criar"
        criarColaborador()
    }
    blur.classList.add('active')
}

function closeForm() {
    popForm.classList.remove('open-wrapper');
    blur.classList.remove('active');
    window.location.reload();
}

// Filtro de pesquisa
function filterTable() {
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
=======
/**
 * Tabela HTML em ordem crescente ou decrescente
 *
 * @param {HTMLTableElement} table Qual tabela será ordenada
 * @param {number} column O index da coluna que será ordenada
 * @param {boolean} asc Determina a ordem em crescente ou decrescente
 */

function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows_table = Array.from(tBody.querySelectorAll('tr'));
    // Ordenada cada linha
    const sortedRows = rows_table.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    })

    // Remove todos os TRs existentes da tabela
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    // Adiciona novamente as linhas recém-ordenadas
    tBody.append(...sortedRows);

    // Guarda a ordenação atual da coluna
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

function listarColaboradores() {
    getColaboradores()
        .then((data) => {
            tbody.innerHTML = ''
            data.forEach((item) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.nome}</td>
                    <td>${item.departamento}</td>
                    <td>${item.email}</td>
                    <td>
                    <button class="btn" type="button" title="Editar" onclick="openForm(this, ${item.id})" id="editar">
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

function deletarColaborador() {
    const id = idDelete
    const dados = { ativo: 0 }
    putColaboradorAtivo(id, dados)
        .then(() => {
            closePopup()
            alertaDeletadoSucesso()
        })
        .catch((erro) => {
            console.log("Entrou no erro")
        })
}

function criarColaborador() {
    formColaborador.addEventListener('submit', (e) => {
        e.preventDefault()
        const fd = new FormData(formColaborador)
        const dadosFormulario = Object.fromEntries(fd)

        postColaborador(dadosFormulario)
            .then(() => {
                btnSalvar.disabled = true;
                alertaSucesso()
            })
            .catch((erro) => {
                console.log(erro)
            })

    })
}

function editarColaborador(id) {
    getColaborador(id)
        .then((data) => {
            document.getElementById('nome').value = data.nome
            document.getElementById('departamento').value = data.departamento
            document.getElementById('email').value = data.email
            document.getElementById('senha').value = data.senha
        })
        .catch((erro) => {
            console.log(erro)
        })

    formColaborador.addEventListener('submit', (e) => {
        e.preventDefault()
        const fd = new FormData(formColaborador)
        const dadosFormulario = Object.fromEntries(fd)

        putColaborador(id, dadosFormulario)
            .then(() => {
                btnSalvar.disabled = true;
                alertaSucesso();
            })
            .catch((erro) => {
                console.log(erro)
            })

    })
}


//SERVICES

const urlBase = `http://localhost:5000/`

const getColaboradores = async () => {
    const url = urlBase + 'colaboradores'

    try {
        const resposta = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await resposta.json()
    } catch (erro) {
        console.error('Ocorreu um erro na busca de colaboradores:', erro)
    }
}

const getColaborador = async (id) => {
    const url = urlBase + `colaboradores/${id}`

    try {
        const resposta = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await resposta.json()
    } catch (erro) {
        console.error('Ocorreu um erro na busca de colaborador:', erro)
        throw erro
    }

}


const postColaborador = async (dados) => {
    const url = urlBase + 'colaboradores'

    const resposta = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    return await resposta.json()
}

const putColaboradorAtivo = async (id, dados) => {
    const url = urlBase + `colaboradores/${id}/ativo`

    const resposta = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    if (!resposta.ok) {
        throw new Error(`Erro ao excluir colaborador: ${resposta.statusText}`)
    }

    return resposta.json()
}

const putColaborador = async (id, dados) => {
    const url = urlBase + `colaboradores/${id}`

    const resposta = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    if (!resposta.ok) {
        throw new Error(`Erro ao excluir colaborador: ${resposta.statusText}`)
    }

    return resposta.json()
}

// Notificação de alerta DELETADO
function alertaDeletadoSucesso() {
    $('.alert-del').addClass("show");
    $('.alert-del').removeClass("hide");
    $('.alert-del').addClass("showAlert");
    setTimeout(function () {
        $('.alert-del').removeClass("show");
        $('.alert-del').addClass("hide");
        $('.alert-del').removeClass("showAlert");
        window.location.reload()
    }, 5000);
};

$('.close-btn-del').click(function () {
    $('.alert-del').removeClass("show");
    $('.alert-del').addClass("hide");
});

// Notificação de alerta CADASTRADO OU EDITADO
function alertaSucesso() {
    $('.alert-reg').addClass("show");
    $('.alert-reg').removeClass("hide");
    $('.alert-reg').addClass("showAlert");
    setTimeout(function () {
        $('.alert-reg').removeClass("show");
        $('.alert-reg').addClass("hide");
        closeForm()
    }, 5000);
};

$('.close-btn-del').click(function () {
    $('.alert-reg').removeClass("show");
    $('.alert-reg').addClass("hide");
});

document.addEventListener('DOMContentLoaded', () => {
    listarColaboradores()
})
