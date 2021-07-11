const chalk = require("chalk")
const fs = require('fs')
const path = require('path')

const today = new Date
const filename = path.join(__dirname, '../') + '/output/' + today.getFullYear() + '-' + today.getMonth() + '_tasks.json'


const newTask = (description, client, earnings, hours, euros) => {

    if(hours) {
        
        if (!euros) {
            console.log(chalk.red('If hours are insterted euros (-e) is required'))
        } else {
            saveTask({client: client, earnings: null, hours: Number(hours), euros: Number(euros), description: description.join(" ")})
        }

    } else {

        if (!earnings) {
            console.log(chalk.red('If no hours are insterted earnings is required'))
        } else {
            saveTask({client: client, earnings: Number(earnings), hours: null, euros: null, description: description.join(" ")})
        }


    }
    
}


const saveTask = (Task) => {
    
    let tasks = []

    if(fs.existsSync(filename)) {
        let Tasks = fs.readFileSync(filename)
        let parsed = JSON.parse(Tasks)
        tasks = tasks.concat(parsed)
        tasks.push(Task)
    } else {
        tasks.push(Task)
    }
    
    fs.writeFile(filename, JSON.stringify(tasks, null, 2), (err) => {
        if(err) throw err
        console.log(chalk.green('Task successfully stored'))
    })

}

module.exports = newTask