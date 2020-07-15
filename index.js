'use strict'

const settings = require('standard-settings')
const client = require('spacebro2-client')
const fetch = require('node-fetch')
const events = settings.get('events')
const URL = settings.get('dmx-web-URL')

client.setup({
  host: settings.get('spacebro:host') || '127.0.0.1',
  port: settings.get('spacebro:port') || 9375,
  client: {
    name: 'dmx-web-bro',
    description: 'dmx-web forward tool'
  }
})

events.forEach((event) => {
  client.on(event.name, (datas) => {
    if (!event.requiredData || Object.values(datas).includes(event.requiredData)) {
      console.log(`sending "${event.name}"" event to ${URL}`)
      if (event.delay) console.log(`waiting ${event.delay}s...`)

      setTimeout(() => {
        fetch(URL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(event.datas)
        }).then((res) => {
          console.log(`"${event.name}" returned status ${res.status}`)
        })
      }, (event.delay || 0) * 1000)
    }
  })
})
