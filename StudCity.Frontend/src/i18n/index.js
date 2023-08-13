import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationUKR from './locales/ukr/translation.json';

const resources = {
	en: {
		translation: translationEN,
	},
	ukr: {
		translation: translationUKR,
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
