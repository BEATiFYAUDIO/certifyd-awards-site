import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { About } from './routes/About';
import { CategoryDetail } from './routes/CategoryDetail';
import { Home } from './routes/Home';
import { LegacyCategoryRedirect } from './routes/LegacyCategoryRedirect';
import { Methodology } from './routes/Methodology';
import { Music } from './routes/Music';
import { MusicCategories } from './routes/MusicCategories';
import { Nominate } from './routes/Nominate';
import { NomineeDetail } from './routes/NomineeDetail';
import { Nominees } from './routes/Nominees';
import { NotFound } from './routes/NotFound';
import { TechCategoryDetail } from './routes/TechCategoryDetail';
import { Technology } from './routes/Technology';
import { TechnologyCategories } from './routes/TechnologyCategories';
import { Winners } from './routes/Winners';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="creator-innovation" element={<Technology />} />
        <Route path="creator-innovation/categories" element={<TechnologyCategories />} />
        <Route path="creator-innovation/categories/:categoryId" element={<TechCategoryDetail />} />
        <Route path="technology" element={<Technology />} />
        <Route path="technology/categories" element={<TechnologyCategories />} />
        <Route path="technology/categories/:categoryId" element={<TechCategoryDetail />} />
        <Route path="creative-excellence" element={<Music />} />
        <Route path="creative-excellence/categories" element={<MusicCategories />} />
        <Route path="creative-excellence/categories/:categoryId" element={<CategoryDetail />} />
        <Route path="music" element={<Music />} />
        <Route path="music/categories" element={<MusicCategories />} />
        <Route path="music/categories/:categoryId" element={<CategoryDetail />} />
        <Route path="categories" element={<LegacyCategoryRedirect />} />
        <Route path="categories/:categoryId" element={<LegacyCategoryRedirect />} />
        <Route path="nominees" element={<Nominees />} />
        <Route path="nominees/:entryId" element={<NomineeDetail />} />
        <Route path="winners" element={<Winners />} />
        <Route path="winners/:year" element={<Winners />} />
        <Route path="methodology" element={<Methodology />} />
        <Route path="nominate" element={<Nominate />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
