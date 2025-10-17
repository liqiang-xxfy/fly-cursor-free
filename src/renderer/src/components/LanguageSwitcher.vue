<template>
  <div class="language-switcher">
    <el-select 
      v-model="currentLocale" 
      @change="changeLanguage"
      size="small"
      class="language-select"
    >
      <el-option
        v-for="locale in supportedLocales"
        :key="locale.value"
        :label="locale.label"
        :value="locale.value"
      />
    </el-select>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

// Supported locales
const supportedLocales = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: '中文' }
]

// Current locale
const currentLocale = computed({
  get: () => locale.value,
  set: (val) => {
    locale.value = val
  }
})

// Change language
const changeLanguage = (newLocale) => {
  locale.value = newLocale
  // Save preference to localStorage
  localStorage.setItem('locale', newLocale)
  // Update HTML lang attribute
  document.querySelector('html').setAttribute('lang', newLocale)
}
</script>

<style scoped>
.language-switcher {
  margin: 0 10px;
}

.language-select {
  width: 120px;
}
</style>