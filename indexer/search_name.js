(function () {
  'use strict';

  const elasticsearch = require('elasticsearch');
  const esClient = new elasticsearch.Client({
    host: process.env.ELASTICSEARCH_HOST,
    log: 'error'
  });

  const search = function search(index, body) {
    return esClient.search({index: index, body: body});
  };

  const testing = function testing() {
    let body = {
      size: 10,
      from: 0,
      query: {
        match: {
          Name: {
            query: 'Endres',
            minimum_should_match: 3,
            fuzziness: 2
          }
        }
      }
    };

    console.log(`Retrieving passenger whose Name matches '${body.query.match.Name.query}' (displaying ${body.size} passengers at a time)...`);
    search('passenger', body)
    .then(results => {
      console.log(`Found ${results.hits.total} passengers in ${results.took}ms`);
      if (results.hits.total > 0) console.log(`returned passenger's Name:`);
      results.hits.hits.forEach((hit, index) => console.log(`\t${body.from + ++index} - ${hit._source.Name} (score: ${hit._score})`));
    })
    .catch(console.error);
  };

  testing();

  module.exports = {
    search
  };
} ());
