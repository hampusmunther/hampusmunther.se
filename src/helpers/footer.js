const getYaml = require('../_helpers/getYalm');

module.exports = async (site, cb) => {
    const footer = await getYaml('../data/footer.yaml');

    site = site.map(v => ({
        ...v,
        footer
    }));

    cb(null, site);
};