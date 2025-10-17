import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import zh from '../locales/zh.json'

// Detect browser language or use saved preference
function getLocale() {
  // Check if user has saved preference
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && ['en', 'zh'].includes(savedLocale)) {
    return savedLocale
  }
  
  // Detect browser language
  const navigatorLocale = navigator.languages !== undefined ? navigator.languages[0] : navigator.language
  if (!navigatorLocale) {
    return 'en'
  }
  
  // Extract language code (e.g., 'en-US' -> 'en')
  const locale = navigatorLocale.split('-')[0].toLowerCase()
  
  // Return supported locale or default to English
  return locale === 'zh' ? 'zh' : 'en'
}

const messages = {
  en,
  zh
}

const i18n = createI18n({
  locale: getLocale(), // Auto-detect browser language or use saved preference
  fallbackLocale: 'en', // Fallback to English
  messages,
  legacy: false // Use Composition API mode
})

export default i18n