
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault() // prevent default behavior which is refresh the page
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const location = search.value
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            }
            else {
                messageOne.textContent = ("location is " + location)
                messageTwo.textContent = data.forecast
            }
        
        })
    })
})
