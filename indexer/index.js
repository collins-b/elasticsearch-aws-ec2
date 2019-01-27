(function () {
  'use strict';

  const fs = require('fs');
  const elasticsearch = require('elasticsearch');
  const esClient = new elasticsearch.Client({
    host: process.env.ELASTICSEARCH_HOST,
    log: 'error'
  });

  const bulkIndex = function bulkIndex(index, type, data) {
    let bulkBody = [];

    data.forEach(item => {
      bulkBody.push({
        index: {
          _index: index,
          _type: type,
          _id: item.id
        }
      });

      bulkBody.push(item);
    });

    esClient.bulk({body: bulkBody})
    .then(response => {
      let errorCount = 0;
      response.items.forEach(item => {
        if (item.index && item.index.error) {
          console.log(++errorCount, item.index.error);
        }
      });
      console.log(`Successfully indexed ${data.length - errorCount} out of ${data.length} items`);
    })
    .catch(console.err);
  };

  const test = function test() {
    const passRaw = fs.readFileSync('sample.json');
    const pass = JSON.parse(passRaw);
    console.log(`${pass.length} Items parsed from sample data`);
    bulkIndex('passenger', 'name', pass);
  };

  test();

  module.exports = {
    bulkIndex
  };
} ());
