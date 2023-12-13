const urlBaseColab = `http://localhost:5000/`

const getColaboradores = async () => {
    const url = urlBaseColab + 'colaboradores'

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
    const url = urlBaseColab + `colaboradores/${id}`

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
    const url = urlBaseColab + 'colaboradores'

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
    const url = urlBaseColab + `colaboradores/${id}/ativo`

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
    const url = urlBaseColab + `colaboradores/${id}`

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
