import { ThemeProvider } from './theme/ThemeContext';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Tagline } from './components/Tagline/Tagline';
import { ProgramsGrid } from './components/ProgramsGrid/ProgramsGrid';
import { Approach } from './components/Approach/Approach';
import { CTA } from './components/CTA/CTA';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <ThemeProvider>
      <Header />
      <main>
        <Hero />
        <Tagline />
        <ProgramsGrid />
        <Approach />
        <CTA />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
