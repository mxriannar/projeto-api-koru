
//ENDPOINTS
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
