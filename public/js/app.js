console.log('client js')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorMessage = document.querySelector('#error-message')
const message = document.querySelector('#message')

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    const location = search.value
    message.textContent = 'Loading...'
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data)=> {
            if(data.error) {
                message.textContent = ''
                errorMessage.textContent = data.error
            } else {
                errorMessage.textContent = ''
                message.textContent = data.location +' .'+ data.forecast
            }
        })
    })      
})