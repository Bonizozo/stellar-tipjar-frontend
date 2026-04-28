export interface TipActivity {
  date: string;
  count: number;
  amount: number; // In XLM
}

export const generateMockTipData = (days: number = 365): TipActivity[] => {
  const data: TipActivity[] = [];
  const now = new Date();
  
  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(now.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Create some patterns (more activity on weekends, some spikes)
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseCount = isWeekend ? Math.floor(Math.random() * 8) : Math.floor(Math.random() * 4);
    
    // Add random spikes
    const spike = Math.random() > 0.95 ? Math.floor(Math.random() * 15) : 0;
    const count = baseCount + spike;
    const amount = count * (Math.random() * 10 + 2);

    data.push({
      date: dateStr,
      count,
      amount: parseFloat(amount.toFixed(2))
    });
  }
  
  return data.reverse();
};

export const MOCK_TIPS = generateMockTipData();
