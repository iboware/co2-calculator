const { expect, test } = require('@oclif/test')
const CO2Calculator = require('../src/co2calculator')
const assert = require('assert')
describe('CO2Calculator', () => {
  let token = process.env.ORS_TOKEN
  let calc = new CO2Calculator(token)
  describe('locate', () => {
    it('should have coordinate values', async function () {
      let result = await calc.locate('Essen', 'Duisburg')
      expect(result).to.have.length(2)
      expect(result[0].data.features).to.have.length(1)
      expect(result[1].data.features).to.have.length(1)
      expect(result[0].data.features[0].geometry).to.have.property('coordinates')
      expect(result[1].data.features[0].geometry).to.have.property('coordinates')
    })
  })
  describe('measure', () => {
    it('should have the distance 24.53km between Essen and Duisburg', async function () {
      let cityA = { features: [{ geometry: { coordinates: [7.019603, 51.468739] } }] }
      let cityB = { features: [{ geometry: { coordinates: [6.75966, 51.47994] } }] }
      let distance = await calc.measure(cityA, cityB)
      expect(distance.data).to.have.property('distances')
      expect(distance.data.distances).to.have.length(2)
      assert.strictEqual(distance.data.distances[0][1], 24.53)
    })
  })
  describe('calculate', () => {
    it('should have 5.1kg co2 emmision', async function () {
      let emmision = await calc.calculate('Essen', 'Duisburg', 'large-diesel-car')
      assert.strictEqual(emmision, '5.1')
    })
  })
})
