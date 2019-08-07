'use strict'

const settings = require('standard-settings')
const { SpacebroClient } = require('spacebro-client')

const verbose = settings.get('verbose') || false

const events = settings.get('events')

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
  client.on(event.name, () => {
    window.fetch(settings.url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event.datas)
    }).then(console.log)
  })
})
