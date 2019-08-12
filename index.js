'use strict'

const settings = require('standard-settings')
const { SpacebroClient } = require('spacebro-client')
const fetch = require('node-fetch')

const verbose = settings.get('verbose') || false
const events = settings.get('events')
const URL = settings.get('dmx-web-URL')

const client = new SpacebroClient({
  host: settings.get('spacebro:host') || '127.0.0.1',
  port: settings.get('spacebro:port') || 8888,
  channelName: settings.get('spacebro:channelName') || '',
  client: {
    name: 'dmx-web-bro',
    description: 'dmx-web forward tool'
  },
  verbose
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
            'Accept': 'application/json',
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
