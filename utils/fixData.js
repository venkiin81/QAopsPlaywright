const base = require('@playwright/test')

exports.customdatatest=base.test.extend(
    {
        datasets:{
                email : "Venkatesh@gm.co",
                password:"Pass@123"
        }
    }
    
)