console.log('Client side JavaScript is loaded!')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})


const weatherForm = document.querySelector('form')
const search  = document.querySelector('input')
const msgOne = document.querySelector('#message-1')
const msgTwo = document.querySelector('#message-2')
const msgThree = document.querySelector('#message-3')
const msgFour = document.querySelector('#message-4')
const msgFive = document.querySelector('#message-5')
const msgSix = document.querySelector('#message-6')
const msgSeven = document.querySelector('#message-7')

// msgOne.textContent = 'From JavaScript'
// msgTwo.textContent = ''


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    msgOne.textContent = 'Loading..'
    msgTwo.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                msgOne.textContent = data.error
            } else {
                msgOne.textContent = 'Sommaire: ' + data.forecast 
                msgTwo.textContent = 'Temperature: ' + data.temperature
                msgTwo.textContent = 'Temperature: ' + data.temperature
                msgThree.textContent = 'Temperature min: ' + data.temperatureLow
                msgFour.textContent = 'Temperature max: ' + data.temperatureMax
                msgFive.textContent = 'Precipitation: ' + data.precipProbability
                msgSix.textContent = 'Locatlisation: ' + data.location
                msgSeven.textContent = 'Adresse: ' + data.address
            }
            
        })
    })
    
})