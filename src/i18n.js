import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./locales/en.json";
import zhTranslation from "./locales/zh.json";

i18n
  .use(initReactI18next) // 绑定 React
  .init({
    resources: {
      en: { translation: enTranslation },
      zh: { translation: zhTranslation },
    },
    lng: "zh", // 默认语言
    fallbackLng: "en", // 如果找不到对应翻译，后备使用英文
    interpolation: {
      escapeValue: false, // React 已经防范了 XSS，这里设为 false
    },
  });

export default i18n;
