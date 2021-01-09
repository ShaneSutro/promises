/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */
const fs = require('fs');
const Promise = require('bluebird');
const readFileAsync = Promise.promisify(fs.readFile);
const writeFileAsync = Promise.promisify(fs.writeFile);

var combineFirstLineOfManyFiles = function (filePaths, writePath) {
  // TODO
  var promises = filePaths.map(filePath => readFileAsync(filePath, 'utf8'));
  return new Promise((resolve, reject) => {
    Promise.all(promises)
      .then(contents => contents.map(data => data.split('\n')[0]).join('\n'))
      .then(firstLines => writeFileAsync(writePath, firstLines))
      .then(() => resolve())
      .catch(err => {
        console.error(err);
        reject(err);
      });
  });
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};