import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Fonts (npm 패키지가 CSS 자동 주입)
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
