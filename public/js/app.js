console.log('Javascript no frontend')

const cotacoesForm = document.querySelector('form')

cotacoesForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const ativo = document.querySelector('input').value

    fetch(`/cotacoesGet?ativo=${ativo}`).then((response) => {
        response.json().then( (data) => {
            const spanError = document.querySelector('span')
            const table = document.querySelector('table')
            if(data.message){
                spanError.innerHTML = `erro: ${data.message}`
                if(table){
                    table.innerHTML = ''
                }                
            }else{
                spanError.innerHTML = ''

                let tableContent = '<thead><tr><td>Simbol</td><td>Description</td><td>Price</td></tr></thead>'
                tableContent += `<tbody><tr><td>${data.symbol}</td><td>${data.description}</td><td>${data.price}</td></tr></tbody>`
                table.innerHTML = tableContent
            }
        })
    })
})