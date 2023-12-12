const weathForm = document.querySelector('form')
const locationSeaech = document.querySelector('input')

const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weathForm.addEventListener('submit' , (event) =>{
    event.preventDefault()
    const locationInsert = locationSeaech.value ?? 'boston'

    fetch('http://localhost:3000/weather?address='+locationInsert).then((response)=>{
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
            
        })
    })
})