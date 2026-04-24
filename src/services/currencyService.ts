const COINGECKO_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=usd,eur,ngn,gbp';

export interface XLMRates {
  [key: string]: number;
}

export async function getXLMRates(): Promise<XLMRates> {
  try {
    const response = await fetch(COINGECKO_URL);
    if (!response.ok) throw new Error('Failed to fetch rates');
    const data = await response.json();
    // CoinGecko returns { stellar: { usd: 0.12, eur: 0.11, ... } }
    return data.stellar;
  } catch (error) {
    console.error('Error fetching XLM rates:', error);
    return {};
  }
}