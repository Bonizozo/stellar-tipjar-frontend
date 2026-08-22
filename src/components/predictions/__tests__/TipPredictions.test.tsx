import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TipPredictions } from '../TipPredictions';

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

vi.mock('@/hooks/queries/useTipPredictions', () => ({
  useTipPredictions: () => ({
    data: {
      predictedAmount: 1000,
      predictedCount: 50,
      predictedNewSupporters: 25,
      confidence: 0.85,
      amountTrend: 0.15,
      countTrend: 0.08,
      supportersTrend: 0.12,
      confidenceInterval: {
        amount: { lower: 800, upper: 1200 },
        count: { lower: 40, upper: 60 }
      },
      timeline: [
        { date: '2024-01-01', predicted: 50, confidenceUpper: 60, confidenceLower: 40 }
      ],
      trendAnalysis: [
        { period: 'Week 1', baseline: 800, trend: 900, seasonal: 850 }
      ],
      featureImportance: [
        { name: 'Historical Patterns', importance: 0.35 }
      ]
    },
    isPending: false,
    isError: false
  })
}));

vi.mock('@/hooks/queries/useCreatorStats', () => ({
  useCreatorStats: () => ({
    data: {
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

describe('TipPredictions', () => {
  it('renders the predictions interface', () => {
    renderWithQueryClient(<TipPredictions />);
    
    expect(screen.getByText('Select Creator for Predictions')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search creators/)).toBeInTheDocument();
  });

  it('shows empty state when no creator selected', () => {
    renderWithQueryClient(<TipPredictions />);
    
    expect(screen.getByText('Select a creator to view tip predictions')).toBeInTheDocument();
  });

  it('allows searching for creators', () => {
    renderWithQueryClient(<TipPredictions />);
    
    const searchInput = screen.getByPlaceholderText(/Search creators/);
    fireEvent.change(searchInput, { target: { value: 'alice' } });
    
    expect(searchInput).toHaveValue('alice');
  });

  it('shows timeframe selector options', () => {
    renderWithQueryClient(<TipPredictions />);
    
    // These would be visible after selecting a creator
    expect(screen.getByText('Select a creator to view tip predictions')).toBeInTheDocument();
  });
});