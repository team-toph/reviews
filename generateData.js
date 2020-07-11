var faker = require('faker');
var fs = require('fs');


const generate = function(newId) {
  var results = [];
  var amountOfReviews = Math.floor(Math.random() * 5) + 2;
  var timestamp = faker.date.past();
  var name = faker.name.findName();
  var location = faker.fake('{{address.stateAbbr}}');
  var title = faker.fake('{{lorem.words}}');
  var comment = faker.fake('{{lorem.sentence}}');
  var likes = Math.floor(Math.random() * 51);
  var dislikes = Math.floor(Math.random() * 51);
  var star = Math.ceil(Math.random() * 5);

  for (var i = 0; i < amountOfReviews; i++) {
    results[i] = `{${timestamp}, ${name}, ${location}, ${title}, ${comment}, ${likes}, ${dislikes}, ${star}}`;
  }
  return `{id: ${newId}, results: [${results}]}`;
};

var start = Date.now();
var writeStream = fs.createWriteStream('data.txt', {flags: 'a'});
var count = 0;
var total = 100000; // requires 10,000,000
var write = () => {
  var ready = true;
  while (count < total && ready) {
    ready = writeStream.write((generate(count)) + '\r,\n');
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
