import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationua from './locales/ua/translation.json';

const resources = {
	en: {
		translation: translationEN,
	},
	ua: {
		translation: translationua,
	},
};

i18n.use(initReactI18next).init({
	resources,
	debug: true,
	lng: 'en',
	interpolation: {
		escapeValue: false,
	},
	react: {
		bindI18nStore: '',
		transEmptyNodeValue: '',
		transSupportBasicHtmlNodes: true,
		transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
		useSuspense: true,
	},
});

export default i18n;
