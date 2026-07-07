import themeConfig from '@medicycle/theme/tailwind.config';

export default {
  presets: [themeConfig],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
  ],
}
