import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import global_en from "./translation/en/global.json"
import global_pt from "./translation/pt/global.json"
import i18next from 'i18next'
import { I18nextProvider } from 'react-i18next'
import "./index.css"

i18next.init({
  interpolation: { escapeValue: true },
  lng: "en",
  resources: {
    en: {
      global: global_en
    },
    pt: {
      global: global_pt
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>,
)
