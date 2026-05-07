import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Fonts (npm 패키지가 CSS 자동 주입)
import '@fontsource/jetbrains-mono'
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'

import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './contexts/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
