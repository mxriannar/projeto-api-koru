const urlBase = `http://localhost:5000/`

const getLideres = async () => {
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

const getLider = async (id) => {
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


const postLider = async (dados) => {
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

const putLiderAtivo = async (id, dados) => {
    const url = urlBase + `lideres/${id}/ativo`

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

const putLider = async (id, dadosAtualizados) => {
    const url = urlBase + `lideres/${id}`

    const resposta = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosAtualizados)
    })

    if (!resposta.ok) {
        throw new Error(`Erro ao editar líder: ${resposta.statusText}`)
    }
    return resposta.json()
}