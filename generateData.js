var faker = require('faker');
var fs = require('fs');


const generate = function() {
  var results = '';
  var amountOfReviews = Math.floor(Math.random() * 5) + 5;
  var timestamp = faker.date.past();
  var name = faker.name.findName();
  var location = faker.fake('{{address.stateAbbr}}');
  var title = faker.fake('{{lorem.words}}');
  var comment = faker.fake('{{lorem.sentence}}');
  var likes = Math.floor(Math.random() * 51);
  var dislikes = Math.floor(Math.random() * 51);
  var star = Math.ceil(Math.random() * 5);

  for (var i = 0; i < amountOfReviews; i++) {
    results += (`${timestamp}, ${name}, ${location}, ${title}, ${comment}, ${likes}, ${dislikes}, ${star}\n`);
  }
  // console.log(results);
  return results;
};

var start = Date.now();
var writeStream = fs.createWriteStream('data.csv');
// writeStream.write('timestamp, name, location, title, comment, likes, dislikes, star\n', 'utf8');
var count = 0;
var total = 10000;
var write = () => {
  var ready = true;
  while (count < total && ready) {
    ready = writeStream.write((generate()));
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

module.exports.generate = generate;
