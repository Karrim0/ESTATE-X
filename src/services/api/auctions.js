// src/services/api/auctions.js

import apiClient, { apiCall } from "./client";
import { API_ENDPOINTS } from "../../data/constants";
import { properties } from "../../data/mockData";

// Mock auction data
const mockAuctions = properties
  .filter((p) => p.type === "Auction")
  .map((p) => ({
    ...p,
    auctionData: {
      startPrice: p.price,
      currentBid: p.price + Math.floor(Math.random() * 50000),
      minIncrement: 5000,
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      bidCount: Math.floor(Math.random() * 20) + 5,
      status: "active",
      bids: [
        {
          id: 1,
          userId: "user_1",
          username: "Investment Corp Ltd",
          amount: p.price + 10000,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          verified: true,
        },
        {
          id: 2,
          userId: "user_2",
          username: "Real Estate Holdings",
          amount: p.price,
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          verified: true,
        },
      ],
    },
  }));

// ==================== GET ACTIVE AUCTIONS ====================
export const getActiveAuctions = async (params = {}) => {
  const mockData = () => {
    let filtered = [...mockAuctions];

    // Apply filters
    if (params.country) {
      filtered = filtered.filter((a) => a.country === params.country);
    }
    if (params.minPrice) {
      filtered = filtered.filter(
        (a) => a.auctionData.currentBid >= parseFloat(params.minPrice)
      );
    }
    if (params.maxPrice) {
      filtered = filtered.filter(
        (a) => a.auctionData.currentBid <= parseFloat(params.maxPrice)
      );
    }

    // Sort by ending soon
    filtered.sort(
      (a, b) =>
        new Date(a.auctionData.endDate) - new Date(b.auctionData.endDate)
    );

    return {
      auctions: filtered,
      total: filtered.length,
    };
  };

  return apiCall(
    () => apiClient.get(`${API_ENDPOINTS.AUCTIONS}/active`, { params }),
    mockData()
  );
};

// ==================== GET AUCTION BY ID ====================
export const getAuction = async (id) => {
  const mockData = () => {
    const auction = mockAuctions.find((a) => a.id === parseInt(id));

    if (!auction) {
      throw { message: "Auction not found", status: 404 };
    }

    return auction;
  };

  return apiCall(
    () => apiClient.get(`${API_ENDPOINTS.AUCTIONS}/${id}`),
    mockData()
  );
};

// ==================== PLACE BID ====================
export const placeBid = async (auctionId, bidAmount) => {
  const mockData = () => {
    const auction = mockAuctions.find((a) => a.id === parseInt(auctionId));

    if (!auction) {
      throw { message: "Auction not found", status: 404 };
    }

    const currentBid = auction.auctionData.currentBid;
    const minIncrement = auction.auctionData.minIncrement;

    if (bidAmount <= currentBid) {
      throw {
        message: `Bid must be higher than current bid of $${currentBid}`,
        status: 400,
      };
    }

    if (bidAmount < currentBid + minIncrement) {
      throw {
        message: `Minimum bid increment is $${minIncrement}`,
        status: 400,
      };
    }

    const newBid = {
      id: Date.now(),
      userId: "current_user",
      username: "You",
      amount: bidAmount,
      timestamp: new Date().toISOString(),
      verified: true,
    };

    // Update auction data
    auction.auctionData.currentBid = bidAmount;
    auction.auctionData.bidCount += 1;
    auction.auctionData.bids.unshift(newBid);

    return {
      message: "Bid placed successfully",
      bid: newBid,
      currentBid: bidAmount,
    };
  };

  return apiCall(
    () =>
      apiClient.post(`${API_ENDPOINTS.AUCTIONS}/${auctionId}/bid`, {
        amount: bidAmount,
      }),
    mockData()
  );
};

// ==================== GET BID HISTORY ====================
export const getBidHistory = async (auctionId, limit = 10) => {
  const mockData = () => {
    const auction = mockAuctions.find((a) => a.id === parseInt(auctionId));

    if (!auction) {
      throw { message: "Auction not found", status: 404 };
    }

    return {
      bids: auction.auctionData.bids.slice(0, limit),
      total: auction.auctionData.bids.length,
    };
  };

  return apiCall(
    () =>
      apiClient.get(`${API_ENDPOINTS.AUCTIONS}/${auctionId}/bids`, {
        params: { limit },
      }),
    mockData()
  );
};

// ==================== ENABLE AUTO-BID ====================
export const enableAutoBid = async (auctionId, maxAmount) => {
  const mockData = () => {
    return {
      message: "Auto-bid enabled successfully",
      autoBid: {
        auctionId: parseInt(auctionId),
        maxAmount,
        enabled: true,
        createdAt: new Date().toISOString(),
      },
    };
  };

  return apiCall(
    () =>
      apiClient.post(`${API_ENDPOINTS.AUCTIONS}/${auctionId}/auto-bid`, {
        maxAmount,
      }),
    mockData()
  );
};

// ==================== DISABLE AUTO-BID ====================
export const disableAutoBid = async (auctionId) => {
  const mockData = () => {
    return {
      message: "Auto-bid disabled successfully",
      auctionId: parseInt(auctionId),
    };
  };

  return apiCall(
    () => apiClient.delete(`${API_ENDPOINTS.AUCTIONS}/${auctionId}/auto-bid`),
    mockData()
  );
};

// ==================== GET MY BIDS ====================
export const getMyBids = async (status = "all") => {
  const mockData = () => {
    // Return user's bid history across all auctions
    const myBids = mockAuctions
      .filter((a) =>
        a.auctionData.bids.some((b) => b.userId === "current_user")
      )
      .map((a) => ({
        auction: {
          id: a.id,
          title: a.title,
          image: a.image,
          location: a.location,
        },
        myBid: a.auctionData.bids.find((b) => b.userId === "current_user"),
        currentBid: a.auctionData.currentBid,
        isWinning: a.auctionData.bids[0]?.userId === "current_user",
        endDate: a.auctionData.endDate,
        status: a.auctionData.status,
      }));

    return {
      bids: myBids,
      total: myBids.length,
    };
  };

  return apiCall(
    () =>
      apiClient.get(`${API_ENDPOINTS.AUCTIONS}/my-bids`, {
        params: { status },
      }),
    mockData()
  );
};

// ==================== GET ENDING SOON ====================
export const getEndingSoon = async (hours = 24) => {
  const mockData = () => {
    const now = new Date();
    const cutoff = new Date(now.getTime() + hours * 60 * 60 * 1000);

    const endingSoon = mockAuctions.filter(
      (a) =>
        new Date(a.auctionData.endDate) <= cutoff &&
        new Date(a.auctionData.endDate) > now
    );

    return {
      auctions: endingSoon,
      total: endingSoon.length,
    };
  };

  return apiCall(
    () =>
      apiClient.get(`${API_ENDPOINTS.AUCTIONS}/ending-soon`, {
        params: { hours },
      }),
    mockData()
  );
};

// ==================== WATCH AUCTION ====================
export const watchAuction = async (auctionId) => {
  const mockData = () => {
    return {
      message: "Auction added to watchlist",
      auctionId: parseInt(auctionId),
      watching: true,
    };
  };

  return apiCall(
    () => apiClient.post(`${API_ENDPOINTS.AUCTIONS}/${auctionId}/watch`),
    mockData()
  );
};

// ==================== UNWATCH AUCTION ====================
export const unwatchAuction = async (auctionId) => {
  const mockData = () => {
    return {
      message: "Auction removed from watchlist",
      auctionId: parseInt(auctionId),
      watching: false,
    };
  };

  return apiCall(
    () => apiClient.delete(`${API_ENDPOINTS.AUCTIONS}/${auctionId}/watch`),
    mockData()
  );
};

// ==================== GET WATCHED AUCTIONS ====================
export const getWatchedAuctions = async () => {
  const mockData = () => {
    // Return random auctions for demo
    const watched = mockAuctions.slice(0, 3);

    return {
      auctions: watched,
      total: watched.length,
    };
  };

  return apiCall(
    () => apiClient.get(`${API_ENDPOINTS.AUCTIONS}/watched`),
    mockData()
  );
};

export default {
  getActiveAuctions,
  getAuction,
  placeBid,
  getBidHistory,
  enableAutoBid,
  disableAutoBid,
  getMyBids,
  getEndingSoon,
  watchAuction,
  unwatchAuction,
  getWatchedAuctions,
};
