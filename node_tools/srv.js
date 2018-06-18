const yaml = require('js-yaml');
const fs = require('fs');

const log = str => {
  console.log('\n\n', '--OBJ--');
  console.log(str);
};

const logJson = str => {
  const json = JSON.stringify(str, null, 2);
  console.log('\n\n', '---JSON---');
  console.log(json);
};

const parse = filename => {
  try {
    const obj = yaml.safeLoad(fs.readFileSync(filename, 'utf8'));
    log(obj);
    logJson(obj);
    return obj;
  } catch (e) {
    console.log(e);
  }
};




const generate = (obj, name) => {
  var stream = fs.createWriteStream(`${name}.yml`);
  var buffer = yaml.dump(obj);
  stream.write(buffer);
  stream.end();
};

let obj = parse('test4.yml');
generate(obj,"dump");
