const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

const today = new Date
const filename = path.join(__dirname, '../') + '/output/' + today.getFullYear() + '-' + today.getMonth() + '_tasks.json'

const getEarnings = (name = null) => {

    if(fs.existsSync(filename)) {
        let Tasks = fs.readFileSync(filename)
        let parsed = JSON.parse(Tasks)
        let total = 0

        parsed.map(element => {
            if (name) {
                if (name.toUpperCase() == element.client.toUpperCase()) {
                    if (element.earnings) {
                        total += element.earnings
                    } else {
                        total += element.hours * element.euros
                    }
                }
            } else {
                if (element.earnings) {
                    total += element.earnings
                } else {
                    total += element.hours * element.euros
                }
            }
            
            
        });
        if (name) {
            console.log(chalk.green("Questo mese " + name + " ti deve ben: " + chalk.yellow(String(total)) + "€"))
        } else {
            console.log(chalk.green("Questo mese hai guadagnato ben: " + chalk.yellow(String(total)) + "€"))
        }

    } else {
        console.log(chalk.green("Questo mese hai guadagnato ben: ") + chalk.red("Un bel calcio in culo"))
    }
}

module.exports = getEarnings