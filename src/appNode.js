const path = require('path')
const express = require('express')
const hbs = require('hbs')

//modulos proprios
const about = require('./about')
const cotacoes = require('./util/cotacao')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Pagina Inicial!!',
        author: 'Marcelo Cabral'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {errorMessage : 'Nao existe pagina depois de /help'})
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Pagina About!!',
        author: 'Marcelo Cabral',
        about
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Pagina Help!!',
        author: 'Marcelo Cabral'
    })
})

app.get('/cotacoes', (req, res) => {
    res.render('cotacoes', {
        title: 'Pagina Cotacoes!!',
        author: 'Marcelo Cabral'
    })
})

app.get('/cotacoesGet', (req, res) => {
    if(!req.query.ativo){
        const error = {
            message: 'O ativo deve ser informado'
        }
        return res.status(400).json(error)
    }
    
    const symbol = req.query.ativo.toUpperCase()
    cotacoes(symbol, (data, error) => {
        if(!error){
            res.status(200).json(data)
        }else{
            res.status(500).json(error)
        }        
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})