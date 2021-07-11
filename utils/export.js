const {Parser} = require("json2csv");
const fs = require('fs');
const chalk = require("chalk");
const path = require('path')

const today = new Date
const filename = path.join(__dirname, '../') + '/output/' + today.getFullYear() + '-' + today.getMonth() + '_tasks.json'

const exportJson = (path) => {
    let Tasks = fs.readFileSync(filename)
    let data = JSON.parse(Tasks)
    const encoded = JSON.stringify(data)

    const fields = ['field1', 'field2', 'field3'];
    const opts = { fields };
    const pippo = {
        "field1": "ffff",
        "field2": "ffff",
        "field3": "ffff",
    }
    const parser = new Parser(opts);
    const csvData = parser.parse(pippo);

    fs.writeFile(path, csvData, function(error) {
        if (error) throw error;
        console.log(chalk.green("Write to excel file successfully!"));
    });
}

module.exports = exportJson