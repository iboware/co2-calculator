const { Command, flags } = require('@oclif/command')
const CO2 = require('./co2calculator')

class Co2CalculatorCommand extends Command {
  async run() {
    const { flags } = this.parse(Co2CalculatorCommand)
    const start = flags.start
    const end = flags.end
    const transportation_method = flags.transportation_method
    const token = flags.ors_token
    if (!start || !end || !transportation_method) {
      throw new Error('Parameters cannot be empty!')
    }

    const co2 = new CO2(token)
    let total = await co2.calculate(start, end, transportation_method)
    this.log(`Your trip caused ${total}kg of CO2-equivalent.`)
  }
}

Co2CalculatorCommand.description = `Calculates CO2 emmision caused by a car between two cities.
...
`

Co2CalculatorCommand.flags = {
  help: flags.help({ char: 'h' }),
  start: flags.string({
    char: 's',
    description: 'Start City',
    required: true,
  }),
  end: flags.string({
    char: 'e',
    description: 'End City',
    required: true,
  }),
  transportation_method: flags.string({
    char: 'm',
    description: 'Transportation Method',
    required: true,
  }),
  ors_token: flags.string({
    char: 't',
    description: 'Open Route Service API Token',
    env: 'ORS_TOKEN',
    required: true,
  }),
  options: [
    'small-diesel-car',
    'small-diesel-car',
    'small-petrol-car',
    'small-plugin-hybrid-car',
    'small-electric-car',
    'medium-diesel-car',
    'medium-petrol-car',
    'medium-plugin-hybrid-car',
    'medium-electric-car',
    'large-diesel-car',
    'large-petrol-car',
    'large-plugin-hybrid-car',
    'large-electric-car',
    'bus',
    'train',
  ],
}

module.exports = Co2CalculatorCommand
