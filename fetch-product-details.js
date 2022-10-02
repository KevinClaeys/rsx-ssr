'use-strict';

const contentful = require('contentful-management');
const { program } = require('commander');
const endOfLine = require('os').EOL;
const fs = require('fs');

program
  .option('-s, --space <spaceId>', 'contentful spaceId')
  .option('-sn, --spaceName <spaceName>', 'contentful spaceName')
  .option('-e, --environment <environmentId>', 'contentful environment')
  .option('-a, --api-key <apiKey>', 'apiKey');

program.parse(process.argv);
const options = program.opts();
const client = contentful.createClient({
  accessToken: options.apiKey
});

client.getSpace(options.space)
  .then((space) => space.getEnvironment(options.environment))
  .then((environment) => environment.getPublishedEntries({'content_type': 'product'}))
  .then((res) => {
    const routes = [];
    const products = []

    res.items.forEach((product) => {
      routes.push('product/' + product.sys.id);
    });

    const directory = `./apps/${options.spaceName}/src/assets/data/products`
    ensureDirectoryExistence(directory);
    fs.writeFileSync(`${directory}/routes.txt`, routes.join(endOfLine), 'utf8');
    fs.writeFileSync(`${directory}/data.json`, JSON.stringify(res, null, 2) + '\n', 'utf8');
  })
  .catch(console.error)

function ensureDirectoryExistence(filePath) {
  if (fs.existsSync(filePath)) {
    return true;
  }

  fs.mkdirSync(filePath, { recursive: true }, (err) => {
    if (err) throw err;
  });
}
