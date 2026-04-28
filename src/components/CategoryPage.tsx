'use client';

interface CategoryPageProps {
  category: string;
}

export default function CategoryPage({ category }: CategoryPageProps) {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4 capitalize">{category} Creators</h1>
      <p className="text-gray-600 mb-8">Explore creators in the {category} category</p>
      
      <div className="text-center py-12">
        <p className="text-gray-500">Category page content coming soon...</p>
      </div>
    </div>
  );
}
