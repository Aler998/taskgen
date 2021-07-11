const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

const today = new Date
const filename = path.join(__dirname, '../') + '/output/' + today.getFullYear() + '-' + today.getMonth() + '_tasks.json'

const del = (index) => {
    if (index) {
        let tasks = []

        if(fs.existsSync(filename)) {
            let Tasks = fs.readFileSync(filename)
            let parsed = JSON.parse(Tasks)
            tasks = tasks.concat(parsed)
            tasks.splice(index, 1)

            fs.writeFile(filename, JSON.stringify(tasks, null, 2), (err) => {
                if(err) throw err
                console.log(chalk.green('Task successfully removed'))
            })
        } else {
            console.log(chalk.yellow("No task to delete"))
        }
        
        
    } else {
        deleteLast()
    }
}

const deleteLast = () => {
    let tasks = []

    if(fs.existsSync(filename)) {
        let Tasks = fs.readFileSync(filename)
        let parsed = JSON.parse(Tasks)
        tasks = tasks.concat(parsed)
        tasks.pop()

        fs.writeFile(filename, JSON.stringify(tasks, null, 2), (err) => {
            if(err) throw err
            console.log(chalk.green('Task successfully removed'))
        })

    } else {
        console.log(chalk.yellow("No task to delete"))
    }
    
}

module.exports = del