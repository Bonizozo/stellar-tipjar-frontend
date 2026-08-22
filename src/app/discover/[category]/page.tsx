import CategoryPage from '@/components/CategoryPage';

export default async function CategoryPageRoute({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return <CategoryPage category={category} />;
}
