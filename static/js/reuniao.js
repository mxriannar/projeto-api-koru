const tbody = document.getElementById('tbody')
let popForm = document.getElementById('wrapper'),
    blur = document.getElementById('blur'),
    btnSalvar = document.getElementById('btn-save')

function openForm(button, id) {
    const buttonID = button.id
    popForm.classList.add('open-wrapper')
    if (buttonID === "editar") {
        document.getElementById("title-form").innerText = "Editar"
        editarReuniao(id)
    } else {
        document.getElementById("title-form").innerText = "Criar"
        criarReuniao()
    }
    blur.classList.add('active')
}

function closeForm() {
    popForm.classList.remove('open-wrapper');
    blur.classList.remove('active');
    window.location.reload();
}

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

function listarReuniao() {
    getReunioes()
        .then((data) => {
            tbody.innerHTML = ``
            data.forEach((item) => {
                const tr = document.createElement('tr')
                apenasData = item.data.split(' ')[0]
                tr.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.lider.nome}</td>
                    <td>${item.colaborador.nome}</td>
                    <td>${apenasData}</td>
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
            });
        })
        .catch((erro) => {
            console.log(erro)
        })
}

function criarReuniao() {
    formReuniao.addEventListener('submit', (e) => {
        e.preventDefault()
        const fd = new FormData(formReuniao)
        const dadosFormulario = Object.fromEntries(fd)

        postReuniao(dadosFormulario)
            .then(() => {
                btnSalvar.disabled = true;
                alertaSucesso()
            })
            .catch((erro) => {
                console.log(erro)
            })

    })

}

function editarReuniao(id) {
    getReuniao(id)
        .then((data) => {
            const elemento = data.find(objeto => objeto.id === id) //buscar um objeto dentro de uma array de objetos
            const dataBD = elemento.data
            const somenteData = dataBD.split(' ')[0] // exibe somente data
            document.getElementById('id_lider').value = elemento.id_lider;
            document.getElementById('id_colaborador').value = elemento.id_colaborador;
            document.getElementById('data').value = somenteData;
        })
        .catch((erro) => {
            console.log(erro)
        })

    formReuniao.addEventListener('submit', (e) => {
        e.preventDefault()
        const fd = new FormData(formReuniao)
        const dadosFormulario = Object.fromEntries(fd)

        putReuniao(id, dadosFormulario)
            .then(() => {
                btnSalvar.disabled = true;
                alertaSucesso()
            })
            .catch((erro) => {
                console.log(erro)
            })
    })
}

function deletarReuniao() {
    const id = idDelete
    const dados = { ativo: 0 }
    console.log("entrou deltar reuniao")
    putReuniaoAtivo(id, dados)
        .then(() => {
            closePopup()
            alertaDeletadoSucesso()
        })
        .catch((erro) => {
            console.log(erro)
        })
}

//ENDPOINTS
const urlBase = `http://localhost:5000/`
const getReunioes = async () => {
    const url = urlBase + 'reunioes'

    try {
        const resposta = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await resposta.json()
    } catch (erro) {
        console.error('Ocorreu um erro na busca de reunioes:', erro)
        throw erro
    }
}

const getReuniao = async (id) => {
    const url = urlBase + 'reunioes'

    try {
        const resposta = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await resposta.json()
    } catch (error) {
        console.error('Ocorreu um erro na busca de reunioes:', erro)
        throw erro
    }
}

const postReuniao = async (dados) => {
    const url = urlBase + 'reunioes'

    const resposta = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    }
    )
    return await resposta.json()

}

const putReuniaoAtivo = async (id, dados) => {
    const url = urlBase + `reunioes/${id}/ativo`

    const resposta = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    if (!resposta.ok) {
        throw new Error(`Erro ao excluir líder: ${resposta.statusText}`)
    }
    return resposta.json()
}

const putReuniao = async (id, dados) => {
    const url = urlBase + `reunioes/${id}`

    const resposta = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    if (!resposta.ok) {
        throw new Error(`Erro ao editar reuniao: ${resposta.statusText}`)
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

document.addEventListener('DOMContentLoaded', () => {
    listarReuniao()
})