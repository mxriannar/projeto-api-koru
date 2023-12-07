function showLogin(){
    const login = document.querySelector('.login')
    login.style.display = 'flex'

    const create = document.querySelector('.new-account')
    create.style.display = 'none'

    const forgot = document.querySelector('.forgot-password')
    forgot.style.display = 'none'
}

function showCreate(){
    const login = document.querySelector('.login')
    login.style.display = 'none'

    const create = document.querySelector('.new-account')
    create.style.display = 'flex'

    const forgot = document.querySelector('.forgot-password')
    forgot.style.display = 'none'
}

function showForgot(){
    const login = document.querySelector('.login')
    login.style.display = 'none'

    const create = document.querySelector('.new-account')
    create.style.display = 'none'

    const forgot = document.querySelector('.forgot-password')
    forgot.style.display = 'flex'
}