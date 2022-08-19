const showdown = require('showdown');
require('showdown-icon');
const getYaml = require('../_helpers/getYalm');

module.exports = async (site, cb) => {
    const { translation } = await getYaml('../data/translation.yaml');
    const converter = new showdown.Converter({ extensions: ['icon'] });

    site = site.map(v => ({
        ...v,
        translation: {
            ...translation,
            texts: Object.entries(translation.texts)
                .map(([k, v]) => [k, converter.makeHtml(v).replace(/<\/?p[^>]*>/g, '')])
                .reduce((a, [k, v]) => ({...a, [k]: v}), {}),
            paragraphs: Object.entries(translation.paragraphs)
                .map(([k, v]) => [k, converter.makeHtml(v)])
                .reduce((a, [k, v]) => ({...a, [k]: v}), {}),
        }
    }));

    cb(null, site);
};