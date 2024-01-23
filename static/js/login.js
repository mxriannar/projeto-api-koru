const formNovaConta = document.getElementById("new-account")

function logar() {

    const fd = new FormData(formNovaConta)
    const dadosFormulario = Object.fromEntries(fd)

    getLogin(dadosFormulario)
    .then(() => {
        showLogin()
        })
        .catch((erro) => {
            console.log(erro)
        })

}

function validarLogin() {

    const fd = new FormData(formNovaConta)
    const dadosFormulario = Object.fromEntries(fd)

    try {
        
    } catch (error) {
        
    }
}


function showLogin() {
    const login = document.querySelector('.login')
    login.style.display = 'flex'

    const create = document.querySelector('.new-account')
    create.style.display = 'none'

    const forgot = document.querySelector('.forgot-password')
    forgot.style.display = 'none'
}

function showCreate() {
    const login = document.querySelector('.login')
    login.style.display = 'none'

    const create = document.querySelector('.new-account')
    create.style.display = 'flex'

    const forgot = document.querySelector('.forgot-password')
    forgot.style.display = 'none'
}

function showForgot() {
    const login = document.querySelector('.login')
    login.style.display = 'none'

    const create = document.querySelector('.new-account')
    create.style.display = 'none'

    const forgot = document.querySelector('.forgot-password')
    forgot.style.display = 'flex'
}