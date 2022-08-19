const getYaml = require('../_helpers/getYalm');

module.exports = async (site, cb) => {
    const { translation } = await getYaml('../data/translation.yaml');
    const { languages } = await getYaml('../data/languages.yaml');

	const activeLanguage = languages[translation.current];
	const otherLanguages = Object.entries(languages)
		.filter(([k,]) => k !== translation.current)
		.filter(([,v]) => !v.hidden)
		.map(([,v]) => v);

    site = site.map(v => ({
        ...v,
        activeLanguage,
		languages: otherLanguages
    }));

    cb(null, site);
};