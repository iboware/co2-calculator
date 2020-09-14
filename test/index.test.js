const { expect, test } = require('@oclif/test')
const cmd = require('..')

describe('co2-calculator Command', () => {
  test
  .stdout()
  .do(() => cmd.run([
    '-s',
    'Hamburg',
    '-e',
    'Berlin',
    '-m',
    'large-electric-car',
  ]))
  .it('runs co2-calculator -s Hamburg -e Berlin -m large-electric-car', ctx => {
    expect(ctx.stdout).to.contain('21.0kg')
  })
})
