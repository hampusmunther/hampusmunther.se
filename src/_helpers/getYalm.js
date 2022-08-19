const fs = require('fs');
const path = require('path');
const YAML = require('yaml');
const { promisify } = require('util');

module.exports = async file => {
    const navPath = path.join(__dirname, file);
    const navData = await promisify(fs.readFile)(navPath, {encoding: 'utf-8'});
    return YAML.parse(navData);
}