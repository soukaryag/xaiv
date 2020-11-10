/**
 * Simple file-based datastore
 *
 * @flow
 */

const path = require('path');
const fs = require('mz/fs');

class Store {
  dir = path.join(__dirname, 'store');

  async load(uri) {
    const filename = path.join(this.dir, uri);
    const data = await fs.readFile(filename, 'utf8');
    const config = JSON.parse(data);
    return config;
  }

  async save(uri, config) {
    const filename = path.join(this.dir, uri);
    await fs.writeFile(filename, JSON.stringify(config), 'utf8');
  }
}

module.exports = { Store }