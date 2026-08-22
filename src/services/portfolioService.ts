import { PortfolioItem } from '@/types/portfolio';
import { API_BASE_URL as API_URL } from "@/config/env";

export const portfolioService = {
  async getPortfolio(creatorId: string): Promise<PortfolioItem[]> {
    const res = await fetch(`${API_URL}/creators/${creatorId}/portfolio`);
    if (!res.ok) throw new Error('Failed to fetch portfolio');
    return res.json();
  },

  async createItem(creatorId: string, item: Omit<PortfolioItem, 'id' | 'createdAt' | 'updatedAt'>) {
    const res = await fetch(`${API_URL}/creators/${creatorId}/portfolio`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Failed to create portfolio item');
    return res.json();
  },

  async updateItem(creatorId: string, itemId: string, updates: Partial<PortfolioItem>) {
    const res = await fetch(`${API_URL}/creators/${creatorId}/portfolio/${itemId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update portfolio item');
    return res.json();
  },

  async deleteItem(creatorId: string, itemId: string) {
    const res = await fetch(`${API_URL}/creators/${creatorId}/portfolio/${itemId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete portfolio item');
  },

  async reorderItems(creatorId: string, items: PortfolioItem[]) {
    const res = await fetch(`${API_URL}/creators/${creatorId}/portfolio/reorder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: items.map((i, idx) => ({ id: i.id, order: idx })) }),
    });
    if (!res.ok) throw new Error('Failed to reorder portfolio');
    return res.json();
  },
};
