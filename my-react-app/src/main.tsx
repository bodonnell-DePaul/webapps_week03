import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
// import MultiApp from './components/multiComponentPage.tsx'
// import PropApp from './components/PropApp.tsx'
// import UserCard from './components/EmbeddedProps.tsx'
// import Counter from './components/Counter.tsx'
import CustomHookExamples from './components/CustomHookExamples.tsx'



createRoot(document.getElementById('root')!).render(
    <>
    <CustomHookExamples />
    </>
)
