const axios = require('axios')

class CO2Calculator {
  constructor(ors_token) {
    axios.interceptors.request.use(function (config) {
      config.headers.Accept = 'application/json'
      config.headers.Authorization = ors_token
      return config
    })
  }

  async calculate(start, end, transportation_method) {
    const CO2Data = [
      { type: 'small-diesel-car', co2: 142 },
      { type: 'small-diesel-car', co2: 142 },
      { type: 'small-petrol-car', co2: 154 },
      { type: 'small-plugin-hybrid-car', co2: 73 },
      { type: 'small-electric-car', co2: 50 },
      { type: 'medium-diesel-car', co2: 171 },
      { type: 'medium-petrol-car', co2: 192 },
      { type: 'medium-plugin-hybrid-car', co2: 110 },
      { type: 'medium-electric-car', co2: 58 },
      { type: 'large-diesel-car', co2: 209 },
      { type: 'large-petrol-car', co2: 282 },
      { type: 'large-plugin-hybrid-car', co2: 126 },
      { type: 'large-electric-car', co2: 73 },
      { type: 'bus', co2: 27 },
      { type: 'train', co2: 6 },
    ]

    const transport = CO2Data.find(f => f.type === transportation_method)
    if (!transport) {
      throw new Error('Invalid transportation method!')
    }

    let [cityA, cityB] = await this.locate(start, end)

    if (!cityA.data || cityA.data.features.length === 0) {
      throw new Error(`Could not find the city ${start}!`)
    }

    if (!cityB.data || cityB.data.features.length === 0) {
      throw new Error(`Could not find the city ${end}!`)
    }

    let measurement = await this.measure(cityA.data, cityB.data)

    if (!measurement.data) {
      throw new Error('No distance information available!')
    }

    let distance = measurement.data.distances[0][1]
    let total = Number.parseFloat((distance * transport.co2) / 1000).toFixed(1)

    return total
  }

  async locate(cityA, cityB) {
    try {
      return axios.all([
        axios.get(`https://api.openrouteservice.org/geocode/search?text=${cityA}&layers=locality&size=1`),
        axios.get(`https://api.openrouteservice.org/geocode/search?text=${cityB}&layers=locality&size=1`),
      ])
    } catch (error) {
      throw new Error('Cannot locate cities! ' + error)
    }
  }

  async measure(cityA, cityB) {
    try {
      if (!cityA.features[0].geometry.coordinates || !cityB.features[0].geometry.coordinates) {
        throw new Error('Unknown City Coordinate(s)!')
      }

      return axios.post('https://api.openrouteservice.org/v2/matrix/driving-car',
        {
          locations: [cityA.features[0].geometry.coordinates, cityB.features[0].geometry.coordinates],
          metrics: ['distance'],
          resolve_locations: false,
          units: 'km',
        })
    } catch (error) {
      throw new Error('Cannot mesasure distances!' + error)
    }
  }
}
module.exports = CO2Calculator
