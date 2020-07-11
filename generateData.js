var faker = require('faker');
var fs = require('fs');

const generate = function(newId) {
  var results = [];
  var amountOfReviews = Math.floor(Math.random() * 5) + 5;
  for (var i = 0; i < amountOfReviews; i++) {
    results[i] = {
      timestamp: faker.date.past(),
      name: faker.name.findName(),
      location: faker.fake('{{address.city}}, {{address.stateAbbr}}'),
      title: faker.fake('{{hacker.ingverb}} {{hacker.adjective}} {{hacker.noun}}'),
      comment: faker.fake('{{hacker.phrase}}'),
      like: Math.floor(Math.random() * 51),
      dislike: Math.floor(Math.random() * 51),
      star: Math.ceil(Math.random() * 5),
    };
  }
  return {id: newId, result: results};
};

var start = Date.now();
var writeStream = fs.createWriteStream('data.csv');
var count = 0;
var total = 10000000; // requires 10,000,000
var write = () => {
  var ready = true;
  while (count < total && ready) {
    ready = writeStream.write(JSON.stringify(generate(count)) + ',\n');
    count++;
  }
  if (count < total) {
    writeStream.once('drain', write);
  } else {
    writeStream.end();
    console.log(`${Math.floor((Date.now() - start) / 60000)} minute(s) to generate`);
  }
};
write();
