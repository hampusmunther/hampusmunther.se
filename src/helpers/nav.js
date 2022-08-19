const getYaml = require('../_helpers/getYalm');

module.exports = async (site, cb) => {
    const nav = await getYaml('../data/nav.yaml');
    const { translation } = await getYaml('../data/translation.yaml');

    const translated = {
        pages: nav.pages.map(v => ({
            name: translation.nav[v.id],
            ...v
        }))
    };

    site = site.map(v => ({
        ...v,
        nav: translated
    }));

    cb(null, site);
};