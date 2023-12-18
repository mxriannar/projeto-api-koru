const urlBase = `http://localhost:5000/`

const postLogin = async (dados) => {
    const url = urlBase + 'loginCreate'
    const resposta = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    return await resposta.json()
}