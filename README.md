# dmx-web-bro

`dmx-web-bro` is a [spacebro](https://github.com/spacebro) tool that aims to forward spacebro events to a [dmx-web](https://github.com/node-dmx/dmx-web) server.

```
$ npm install -g dmx-web
```

## configuration

each `event` item contains the event name and a datas property with channel index and associated values to be sent:

```json
{
  "url": "http://127.0.0.1:37300/state/default",
  "events": [
    {
      "name": "first",
      "datas": {
        "1": 0,
        "2": 255
      }
    }, {
      "name": "second",
      "datas": {
        "1": 255,
        "2": 120
      }
    }, {
      "name": "third",
      "datas": {
        "1": 120,
        "2": 0
      }
    }
  ]
}
```
