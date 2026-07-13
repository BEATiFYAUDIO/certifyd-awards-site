import { Navigate, useParams } from 'react-router-dom';

export function LegacyCategoryRedirect() {
  const { categoryId } = useParams();
  return <Navigate to={categoryId ? `/music/categories/${categoryId}` : '/music/categories'} replace />;
}
