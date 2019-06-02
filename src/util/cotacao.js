const request = require('request')

const api_token = '9Im0Fa83l6SJu81N2Jh8EY6jP6Bd0csT1u0ljANCnfNS905ZIDZvf7iPcyfN'

const cotacao = (symbol, callback) => {
    const url = `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${api_token}`

    request({url: url, json: true}, (err, response) => {
        if(err){
            const error = {
                message: `Something went wrong: ${err}`
            }
            callback(null, error)
        }
        
        const parsedJSON = response.body

        if(parsedJSON.data == undefined){
            const error = {
                message: 'There is no data'
            }
            callback(null, error)

        }else{
            const data = {
                symbol: parsedJSON.data[0].symbol,
                description: parsedJSON.data[0].name,
                price: parsedJSON.data[0].price
            }
            callback(data, null)
        }
        
    })
}

module.exports = cotacao