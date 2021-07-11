#!/usr/bin/env node

const program = require('commander')
const del = require('./utils/delete')
const exportJson = require('./utils/export')
const getEarnings = require('./utils/getEarnings')
const list = require('./utils/list')
const newTask = require('./utils/newTask')
const path = require('path')
const increment = require('./utils/increment')

program.version('1.0.1').description('Command line task tracker')

const today = new Date
const filename = path.join(__dirname, '../') + '/exports/' + today.getFullYear() + '-' + today.getMonth() + '_tasks.csv'

program
    .command('newTask')
    .option('-h, --hours <number>', 'Hours of the task')
    .option('-e, --euros <number>', 'Euros per hour of the task', 20)
    .requiredOption('-d, --description <words...>', 'Description of the task')
    .argument('<client>', 'Client of the task')
    .argument('[earnings]', 'Earnings of the task')
    .action((client, earnings, options) => {
        newTask(options.description, client, earnings, options.hours, options.euros)
    })


program
    .command('earn')
    .option('-c, --client <string>', 'Name of the client to see earnings')
    .action((options) => {
        getEarnings(options.client)
    })

program
    .command('delete')
    .option('-i, --index <number>', 'delete by key')
    .action((options) => {
        del(options.index)
    })

program
    .command('list')
    .option('-c, --client <string>', 'client to list tasks')
    .option('-a, --all <number>', 'Show all tasks in the last given months')
    .option('-m, --month <number>', 'Show all tasks in the given months')
    .action((options) => {
        list(options.client, options.all, options.month)
    })

program
    .command('export')
    .option('-p, --path <string>', 'Path in which save the save (default is export in this folder)', filename)
    .action((options) => {
        exportJson(options.path)
    })

program
    .command('mail')
    .requiredOption('-t, --to <string>', 'Dest of mail')

program
    .command('increment')
    .requiredOption('-i, --index <number>', 'index of the task to increment')
    .option('-r, --reverse', 'decrement instead of increment')
    .action((options) => {
        increment(options.index, options.reverse)
    })
program.parse(process.argv);