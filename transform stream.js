const fs = require('fs');
const { Transform } = require('stream');

const reverseWords = new Transform({
  transform(chunk, encoding, callback) {
    const reversed = chunk.toString()
      .split(' ')
      .map(word => word.split('').reverse().join(''))
      .join(' ');
    
    callback(null, reversed);
  }
});

const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream
  .pipe(reverseWords)
  .pipe(writeStream);

writeStream.on('finish', () => {
  console.log('Done');
});
