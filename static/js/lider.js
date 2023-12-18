
const tbody = document.getElementById('tbody');
const formLider = document.getElementById('formLider');
const inputRadio = document.getElementsByName('radioButton');
let popup = document.getElementById('popup'),
    blur = document.getElementById('blur'),
    popForm = document.getElementById('wrapper'),
    input = document.getElementById("search"),
    table = document.getElementById("table-sortable"),
    rows = table.getElementsByTagName("tr"),
    btnSalvar = document.getElementById('btn-save');
const btnDeletar = document.getElementById('btnDeletar');


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
        editarLider(id)
    } else {
        document.getElementById("title-form").innerText = "Criar"
        criarLider()
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
    const filter = input.value.toLowerCase()
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

        if (column == 0) {
            const aColValue = parseInt(aColText);
            const bColValue = parseInt(bColText);
            return aColValue > bColValue ? (1 * dirModifier) : (-1 * dirModifier);
        }
        else {
            return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
        }
    })

    // Remove todos os TRs existentes da tabela
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

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

function listar() {
    getLideres()
        .then((data) => {
            const lideresAtivos = data.filter(leader => leader.ativo === 1);
            renderizarTabela(lideresAtivos);

            inputArray = Array.from(inputRadio);
            inputArray.forEach((element) => {
                element.addEventListener('click', () => {
                    if (element.checked) {
                        let idSelecionado = element.id;
                        const lideresFiltrados = filtrarPorAtivo(data, idSelecionado);
                        renderizarTabela(lideresFiltrados);
                    }
                });
            });
        })
        .catch((erro) => {
            console.log(erro);
        });
}


function renderizarTabela(lista) {
    console.log('Lista de lideres:', lista);
    // Função para renderizar a tabela com base na lista fornecida
    tbody.innerHTML = '';
    lista.forEach((item) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td data-title="ID">${item.id}</td>
            <td data-title="Nome">${item.nome}</td>
            <td data-title="Setor">${item.departamento}</td>
            <td data-title="E-mail">${item.email}</td>
            <td data-title="Ações">
                <button class="btn" type="button" title="Editar" onclick="openForm(this, ${item.id})" id="editar">
                    <i class="ri-edit-2-fill"></i>
                </button>
            </td>
            <td>
                <button class="btn" type="submit" title="Deletar" id="btnDeletar" onclick="openPopup(${item.id})">
                    <i class="ri-delete-bin-2-fill"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}


function deletar() {
    const id = idDelete
    const dados = { ativo: 0 }
    putLiderAtivo(id, dados)
        .then(() => {
            closePopup();
            alertaDeletadoSucesso();
        })
        .catch((erro) => {
            console.log(erro)
        })
}

function criarLider() {
    formLider.addEventListener('submit', (e) => {
        e.preventDefault()
        const fd = new FormData(formLider)
        const dadosFormulario = Object.fromEntries(fd)

        postLider(dadosFormulario)
            .then(() => {
                btnSalvar.disabled = true;
                alertaSucesso()
            })
            .catch((erro) => {
                console.log(erro)
            })

    })

}

function editarLider(id) {
    getLider(id)
        .then((data) => {
            document.getElementById('nome').value = data.nome;
            document.getElementById('departamento').value = data.departamento;
            document.getElementById('email').value = data.email;
            document.getElementById('password').value = data.password;
        })
        .catch((erro) => {
            console.log(erro)
        })

    formLider.addEventListener('submit', (e) => {
        e.preventDefault()
        const fd = new FormData(formLider)
        const dadosFormulario = Object.fromEntries(fd)

        putLider(id, dadosFormulario)
            .then(() => {
                btnSalvar.disabled = true;
                alertaSucesso()
            })
            .catch((erro) => {
                console.log(erro)
            })
    })
}


function filtrarPorAtivo(data, idSelecionado) {
    switch (idSelecionado) {
        case 'ativo':
            return data.filter(leader => leader.ativo === 1);
        case 'inativo':
            return data.filter(leader => leader.ativo === 0);
        default:
            return data;
    }
}
// TODO: arrumar tempo de atualização da página para mostrar a notificação
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
    }, 3000);
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
    }, 3000);
};


$('.close-btn-del').click(function () {
    $('.alert-reg').removeClass("show");
    $('.alert-reg').removeClass("showAlert");
    $('.alert-reg').addClass("hide");
});


document.addEventListener('DOMContentLoaded', () => {
    listar()
})
