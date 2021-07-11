const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

const today = new Date
const filename = path.join(__dirname, '../') + '/output/' + today.getFullYear() + '-' + today.getMonth() + '_tasks.json'

const increment = (index, reverse = null) => {
    if(fs.existsSync(filename)) {
        let Tasks = fs.readFileSync(filename)
        let parsed = JSON.parse(Tasks)
        let counter = 0
        parsed.forEach(element => {
            if(counter == index) {
                if (reverse) {
                    element.hours -= 1
                } else {
                    element.hours += 1
                }
                
            }
            counter ++
        });

        fs.writeFile(filename, JSON.stringify(parsed, null, 2), (err) => {
            if(err) throw err
            if (reverse) {
                console.log(chalk.green('Hours decremented correctly'))
            } else {
                console.log(chalk.green('Hours incremented correctly'))
            }
            
        })

    } else {
        console.log(chalk.red("No tasks this month"))
    }
}

module.exports = increment