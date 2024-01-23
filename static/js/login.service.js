const urlBase = `http://localhost:5000/`

const getLogin = async (dados) => {
    console.log(dados)

    const url = urlBase + 'login'

    const resposta = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    return await resposta.json()
}