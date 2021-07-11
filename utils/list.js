const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

const today = new Date
const filename = path.join(__dirname, '../') + '/output/' + today.getFullYear() + '-' + today.getMonth() + '_tasks.json'
const tasks = []

const listAll = (client = null, all = null, month = null) => {

    if (all) {
        if (client) {
            getAllInMonths(all, client)
        } else {
            getAllInMonths(all)
        }
    } else {
        if (client && month) {
            getByMonthAndClient(month, client)
        } else if (!client && month) {
            getByMonthAndClient(month)
        } else if (client && !month) {
            getByClientOrSimple(client)
        } else if (!client && !month) {
            getByClientOrSimple()
        }
    }

}



const getAllInMonths = (all, client = null) => {
    let year = today.getFullYear()
    let m = 0
    let reverse = false

    for (let i = 0; i < all; i++) {
        
        if ((today.getMonth() - i) <= 0 || m != i) {
            if (m == i) {
                m = 12
            }
            reverse = true
        }


        if (reverse) {
            let fname = path.join(__dirname, '../') + '/output/' + String(year - 1) + '-' + String(m) + '_tasks.json'
            checkfile(() => {

                let Tasks = fs.readFileSync(fname)
                let parsed = JSON.parse(Tasks)
                index = 0
                parsed.forEach(element => {
                    if (client) {
                        if (element.client.toUpperCase() == client.toUpperCase()) {
                            element.month = m
                            element.position = index
                            tasks.push(element)
                        }
                        index ++
                    } else {
                        element.month = m
                        element.position = index
                        tasks.push(element)
                        index ++
                    }
                    
                });
            }, fname,  "No tasks in last " + all + " months")
            m--
        } else {
            let fname = path.join(__dirname, '../') + '/output/' + year + '-' + String(today.getMonth() - m) + '_tasks.json'

            checkfile(() => {
                let Tasks = fs.readFileSync(fname)
                let parsed = JSON.parse(Tasks)
                index = 0
                parsed.forEach(element => {
                    if (client) {
                        if (element.client.toUpperCase() == client.toUpperCase()) {
                            element.month = today.getMonth() - m
                            element.position = index
                            tasks.push(element)
                        }
                        index ++
                    } else {
                        element.month = today.getMonth() - m
                        element.position = index
                        tasks.push(element)
                        index ++
                    }
                    
                });
            }, fname,  "No tasks in last " + all + " months")
            m++
        }
    }
    console.table(tasks)
}



const getByClientOrSimple = (client) => {
    checkfile(() => {
        let Tasks = fs.readFileSync(filename)
        let parsed = JSON.parse(Tasks)
        checkclient(parsed, client)
    }, filename, "No tasks this month")
}



const getByMonthAndClient = (month, client) => {
    const fname = path.join(__dirname, '../') + '/output/' + today.getFullYear() + '-' + String(month) + '_tasks.json'
    checkfile(() => {
        let Tasks = fs.readFileSync(filename)
        let parsed = JSON.parse(Tasks)
        checkclient(parsed, client)
        
    }, fname, "No tasks in this month")
}


const checkclient = (parsed, client) => {
    if (!client) {
        console.table(parsed)
    } else {
        let index = 0
        // let tasks = []
        parsed.forEach(element => {
            if (element.client.toUpperCase() == client.toUpperCase()) {
                element.position = index
                tasks.push(element)
            }
            index ++
        });

        if (tasks.length > 0) {
            console.table(tasks)
        } else {
            console.log(chalk.red("No tasks assign to this client this month"))
        }
        
    }
}

const checkfile = (make, fname, output) => {
    if(fs.existsSync(fname)) {
        make()
    } else {
        console.log(chalk.red(output))
    }
}

module.exports = listAll