import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';

export interface Campaign {
  id: string;
  title: string;
  description: string;
  sponsorName: string;
  sponsorAvatar?: string;
  matchAmount: number;
  matchLimit: number; // Maximum total match amount
  currentMatched: number;
  creatorUsername: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'ended' | 'upcoming';
  matchPercentage: number; // e.g., 100 means 1:1 match
}

export interface MatchedTip {
  tipId: string;
  tipAmount: number;
  matchedAmount: number;
  campaignId: string;
  timestamp: Date;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Double Your Tips!',
    description: 'All tips matched dollar for dollar',
    sponsorName: 'TechCorp',
    matchAmount: 500,
    matchLimit: 1000,
    currentMatched: 750,
    creatorUsername: 'alice_creator',
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: 'active',
    matchPercentage: 100,
  },
  {
    id: '2',
    title: '50% Match',
    description: 'Sponsor matches 50% of all tips',
    sponsorName: 'CreatorFund',
    matchAmount: 250,
    matchLimit: 500,
    currentMatched: 300,
    creatorUsername: 'bob_streamer',
    startDate: new Date(),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    status: 'active',
    matchPercentage: 50,
  },
];

export const useMatchingCampaign = (creatorUsername?: string, campaignId?: string) => {
  const [matchedTips, setMatchedTips] = useState<MatchedTip[]>([]);

  // Fetch campaigns
  const {
    data: campaigns = mockCampaigns,
    isLoading: isLoadingCampaigns,
    error: campaignsError,
  } = useQuery({
    queryKey: ['campaigns', creatorUsername],
    queryFn: async () => {
      if (!creatorUsername) return mockCampaigns;

      // In a real app, this would fetch from your API
      // const response = await fetch(`/api/campaigns?creator=${creatorUsername}`);
      // return response.json();

      return mockCampaigns.filter((c) => c.creatorUsername === creatorUsername || !creatorUsername);
    },
  });

  // Fetch matched tips
  const {
    data: tips = matchedTips,
    isLoading: isLoadingTips,
    error: tipsError,
  } = useQuery({
    queryKey: ['matched-tips', campaignId],
    queryFn: async () => {
      if (!campaignId) return [];

      // In a real app, fetch from API
      // const response = await fetch(`/api/campaigns/${campaignId}/matched-tips`);
      // return response.json();

      return [];
    },
  });

  // Process tip with matching
  const processTipMutation = useMutation({
    mutationFn: async (tipData: { amount: number; campaignId: string }) => {
      // In a real app, this would call your backend
      // const response = await fetch(`/api/campaigns/${tipData.campaignId}/process-tip`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(tipData),
      // });
      // return response.json();

      const campaign = campaigns.find((c) => c.id === tipData.campaignId);
      if (!campaign) throw new Error('Campaign not found');

      // Calculate matched amount
      const matchedAmount = (tipData.amount * campaign.matchPercentage) / 100;
      const canMatch = campaign.currentMatched + matchedAmount <= campaign.matchLimit;

      if (!canMatch) {
        throw new Error('Match limit exceeded');
      }

      return {
        tipId: 'TIP-' + Date.now(),
        tipAmount: tipData.amount,
        matchedAmount: canMatch ? matchedAmount : 0,
        campaignId: tipData.campaignId,
        timestamp: new Date(),
      };
    },
    onSuccess: (data) => {
      setMatchedTips((prev) => [...prev, data]);
    },
  });

  // Get active campaigns
  const getActiveCampaigns = useCallback(() => {
    const now = new Date();
    return campaigns.filter(
      (c) =>
        c.status === 'active' &&
        c.startDate <= now &&
        c.endDate >= now &&
        c.currentMatched < c.matchLimit
    );
  }, [campaigns]);

  // Get campaign progress
  const getCampaignProgress = useCallback((campaign: Campaign) => {
    return {
      percentage: (campaign.currentMatched / campaign.matchLimit) * 100,
      remaining: campaign.matchLimit - campaign.currentMatched,
      remaining_percentage: ((campaign.matchLimit - campaign.currentMatched) / campaign.matchLimit) * 100,
    };
  }, []);

  // Get time remaining
  const getTimeRemaining = useCallback((campaign: Campaign) => {
    const now = new Date();
    const diffMs = campaign.endDate.getTime() - now.getTime();

    if (diffMs <= 0) return { expired: true };

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return {
      expired: false,
      days: diffDays,
      hours: diffHours,
      minutes: diffMins,
      total: diffMs,
    };
  }, []);

  // Check if tip qualifies for match
  const qualifiesForMatch = useCallback(
    (tipAmount: number, campaignId: string) => {
      const campaign = campaigns.find((c) => c.id === campaignId);
      if (!campaign) return false;

      const matchedAmount = (tipAmount * campaign.matchPercentage) / 100;
      return campaign.currentMatched + matchedAmount <= campaign.matchLimit;
    },
    [campaigns]
  );

  // Calculate total matched for creator
  const getTotalMatched = useCallback(
    (username: string) => {
      return campaigns
        .filter((c) => c.creatorUsername === username)
        .reduce((total, c) => total + c.currentMatched, 0);
    },
    [campaigns]
  );

  return {
    // Campaigns
    campaigns,
    isLoadingCampaigns,
    campaignsError,
    getActiveCampaigns,

    // Campaign details
    getCampaignProgress,
    getTimeRemaining,
    qualifiesForMatch,
    getTotalMatched,

    // Matched tips
    matchedTips,
    isLoadingTips,
    tipsError,

    // Actions
    processTip: processTipMutation.mutateAsync,
    isProcessing: processTipMutation.isPending,
  };
};
