const {Login} = require('./Login.js')
const {Events} = require('./Events.js')

class PoManager
{
    constructor(page)
    {
        this.page = page
        this.login = new Login(this.page)
        this.events = new Events(this.page)

    }

    getLogin()
    {
        return this.login
    }
    getEvents()
    {
        return this.events
    }

}

module.exports = {PoManager}