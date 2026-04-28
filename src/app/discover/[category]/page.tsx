import CategoryPage from '@/components/CategoryPage';

export default function CategoryPageRoute({ params }: { params: { category: string } }) {
  return <CategoryPage category={params.category} />;
}
