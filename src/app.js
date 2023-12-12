const path = require('path')
const express = require('express') 
const hbs = require('hbs') 

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const place = process.argv[2] 


const app = express() 

//define paths for express config
const publicDirctoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirctoryPath))

app.get('',(req, res) => {
    res.render('index',{
        title: ' Weather main page',
        name: 'harel'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: ' Weather about page',
        name: 'harel'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title: 'question and answer',
        name: 'harel',
        question: 'how its work',
        answer: 'its work like this.....'
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'you must provide a address to search'
        })
    }else{
        geocode(req.query.address, (error, {lat,long,namePlace} = {}) => {
            if(error){
                return res.send({error})
            }   
            forecast(lat,long,(error,{temp,feels}) =>{
                if(error){
                    return res.send({error})
                }    
                res.send(
                    { 
                        forecast : 'temperature is: '+temp+' and its feelslike: '+feels,
                        location : namePlace,
                        address : req.query.address
                    }
                )
            } )
        })
    }
    
})

app.get('/products',(req, res) => {
    if(!req.query.search){
        return res.send({
            error : 'you must provide a search term'
        })
    }
    res.send({
        products : []
    })
})

app.get('/help/*',(req, res) => {
    res.render('404page',{
        title: '404 page ',
        errorMessage: 'help artical page not found',
        name: 'harel'
    })
})

app.get('*',(req, res) => {
    res.render('404page',{
        title: '404 page ',
        errorMessage:  'page not found',
        name: 'harel'
    })
})


app.listen(3000, () => {
    console.log('server is up in port 3000')
})
