const elasticsearch = require('elasticsearch')
const client = new elasticsearch.Client({
  host: 'localhost:8083',
  log: 'trace',
  protocol: 'http',
  keepAlive: true
})

client.ping({
  requestTimeout: 6000
}, (error) => {
  if (error) {
    console.trace('search is down')
  } else {
    console.log('All is well')
  }
})
