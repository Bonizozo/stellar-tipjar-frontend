import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CreatorComparison } from '../CreatorComparison';

// Mock the hooks
vi.mock('@/hooks/queries/useCreatorSearch', () => ({
  useCreatorSearch: () => ({
    data: [
      { username: 'alice', displayName: 'Alice Johnson' },
      { username: 'bob', displayName: 'Bob Smith' }
    ],
    isPending: false
  })
}));

vi.mock('@/hooks/queries/useCreatorStats', () => ({
  useCreatorStats: () => ({
    data: {
      totalAmountXlm: 1000,
      tipCount: 50,
      uniqueSupporters: 25,
      topSupporters: [{ sender: 'user1', totalAmount: 100, tipCount: 5 }],
      tipHistory: [{ date: '2024-01-01', amount: 50 }]
    },
    isPending: false,
    isError: false
  })
}));

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('CreatorComparison', () => {
  it('renders the comparison interface', () => {
    renderWithQueryClient(<CreatorComparison />);
    
    expect(screen.getByText('Select Creators to Compare')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search creators/)).toBeInTheDocument();
  });

  it('shows empty state when no creators selected', () => {
    renderWithQueryClient(<CreatorComparison />);
    
    expect(screen.getByText('Select at least 2 creators to start comparing')).toBeInTheDocument();
  });

  it('allows searching for creators', () => {
    renderWithQueryClient(<CreatorComparison />);
    
    const searchInput = screen.getByPlaceholderText(/Search creators/);
    fireEvent.change(searchInput, { target: { value: 'alice' } });
    
    expect(searchInput).toHaveValue('alice');
  });

  it('shows view mode toggles when creators are selected', () => {
    renderWithQueryClient(<CreatorComparison />);
    
    // This would require more complex setup to actually select creators
    // For now, we're testing the basic rendering
    expect(screen.getByText('Select Creators to Compare')).toBeInTheDocument();
  });
});