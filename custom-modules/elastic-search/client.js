const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: 'https://localhost:3000',
  auth: {
    apiKey: 'RnR5RFdaSUJGbzl3V0tPQ2VOMmM6Sk1wRVlwSjNUQ3V4Uk1uajdVUncxQQ=='
  }
})

module.exports = client;