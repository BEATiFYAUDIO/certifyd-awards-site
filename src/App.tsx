import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { About } from './routes/About';
import { Categories } from './routes/Categories';
import { CategoryDetail } from './routes/CategoryDetail';
import { Home } from './routes/Home';
import { Methodology } from './routes/Methodology';
import { Nominate } from './routes/Nominate';
import { NomineeDetail } from './routes/NomineeDetail';
import { Nominees } from './routes/Nominees';
import { NotFound } from './routes/NotFound';
import { Winners } from './routes/Winners';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/:categoryId" element={<CategoryDetail />} />
        <Route path="nominees" element={<Nominees />} />
        <Route path="nominees/:entryId" element={<NomineeDetail />} />
        <Route path="winners" element={<Winners />} />
        <Route path="methodology" element={<Methodology />} />
        <Route path="nominate" element={<Nominate />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
