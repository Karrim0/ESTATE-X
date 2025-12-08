import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Clock,
  Gavel,
  TrendingUp,
  User,
  AlertCircle,
  CheckCircle2,
  Zap,
  Crown,
} from "lucide-react";

/**
 * Professional AuctionBox Component
 * Real-time bidding system for B2B Real Estate Platform
 */

const AuctionBox = ({
  startPrice,
  endTime,
  formatPrice,
  propertyId,
  onBidSuccess,
}) => {
  const [currentBid, setCurrentBid] = useState(startPrice);
  const [customBidAmount, setCustomBidAmount] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [bids, setBids] = useState([
    {
      id: 1,
      name: "Investment Corp Ltd",
      amount: startPrice,
      time: "2 mins ago",
      isYou: false,
      avatar:
        "https://ui-avatars.com/api/?name=Investment+Corp&background=3b82f6&color=fff&bold=true",
      verified: true,
    },
    {
      id: 2,
      name: "Real Estate Holdings",
      amount: startPrice - 10000,
      time: "1 hour ago",
      isYou: false,
      avatar:
        "https://ui-avatars.com/api/?name=Real+Estate&background=10b981&color=fff&bold=true",
      verified: true,
    },
    {
      id: 3,
      name: "Property Ventures Inc",
      amount: startPrice - 25000,
      time: "3 hours ago",
      isYou: false,
      avatar:
        "https://ui-avatars.com/api/?name=Property+Ventures&background=8b5cf6&color=fff&bold=true",
      verified: false,
    },
  ]);
  const [isPlacingBid, setIsPlacingBid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [autoBidEnabled, setAutoBidEnabled] = useState(false);
  const [maxAutoBid, setMaxAutoBid] = useState("");

  const minNextBid = useMemo(() => currentBid + 5000, [currentBid]);

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(endTime).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const auctionEnded =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  const placeBid = useCallback(
    async (bidAmount) => {
      if (bidAmount <= currentBid) {
        setError(`Bid must be higher than ${formatPrice(currentBid)}`);
        setTimeout(() => setError(""), 3000);
        return;
      }

      if (bidAmount < minNextBid) {
        setError(`Minimum bid is ${formatPrice(minNextBid)}`);
        setTimeout(() => setError(""), 3000);
        return;
      }

      setIsPlacingBid(true);
      setError("");

      try {
        const newBid = {
          id: Date.now(),
          name: "Your Company",
          amount: bidAmount,
          time: "Just now",
          isYou: true,
          avatar:
            "https://ui-avatars.com/api/?name=You&background=ef4444&color=fff&bold=true",
          verified: true,
        };

        setBids((prev) => [newBid, ...prev]);
        setCurrentBid(bidAmount);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);

        if (onBidSuccess) {
          onBidSuccess(bidAmount);
        }
      } catch (err) {
        setBids((prev) => prev.filter((b) => b.amount !== bidAmount));
        setCurrentBid(currentBid);
        setError("Failed to place bid. Please try again.");
        setTimeout(() => setError(""), 3000);
      } finally {
        setIsPlacingBid(false);
        setCustomBidAmount("");
      }
    },
    [currentBid, minNextBid, formatPrice, propertyId, onBidSuccess]
  );

  const quickBid = () => placeBid(minNextBid);

  const handleCustomBid = () => {
    const amount = parseFloat(customBidAmount);
    if (isNaN(amount)) {
      setError("Please enter a valid amount");
      setTimeout(() => setError(""), 3000);
      return;
    }
    placeBid(amount);
  };

  const handleAutoBid = () => {
    const maxAmount = parseFloat(maxAutoBid);
    if (isNaN(maxAmount) || maxAmount <= currentBid) {
      setError("Invalid auto-bid amount");
      setTimeout(() => setError(""), 3000);
      return;
    }
    setAutoBidEnabled(true);
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      {/* Success Overlay */}
      {showSuccess && (
        <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 z-50 flex items-center justify-center animate-in fade-in duration-300">
          <div className="text-center text-white">
            <CheckCircle2 size={64} className="mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold">Bid Placed Successfully!</h3>
            <p className="text-sm mt-2 opacity-90">
              You're currently the highest bidder
            </p>
          </div>
        </div>
      )}

      {/* Premium Badge */}
      <div className="absolute top-0 right-0 bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-bl-2xl text-xs font-bold flex items-center gap-1">
        <Crown size={14} />
        LIVE AUCTION
      </div>

      {/* Countdown Header */}
      <div
        className={`flex items-center justify-between mb-6 p-4 rounded-xl ${
          auctionEnded
            ? "bg-gray-100 text-gray-600"
            : timeLeft.hours < 1
            ? "bg-red-100 text-red-600 animate-pulse border-2 border-red-300"
            : "bg-orange-100 text-orange-600 border-2 border-orange-300"
        }`}
      >
        <div className="flex items-center gap-2">
          <Clock size={20} />
          <span className="font-bold text-sm">
            {auctionEnded ? "Auction Ended" : "Ends In:"}
          </span>
        </div>
        {!auctionEnded && (
          <div className="font-bold text-lg">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
            {timeLeft.seconds}s
          </div>
        )}
      </div>

      {/* Current Bid */}
      <div className="mb-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
        <p className="text-gray-600 text-sm font-semibold mb-2 uppercase tracking-wide">
          Current Highest Bid
        </p>
        <div className="flex items-end gap-3">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-600">
            {formatPrice(currentBid)}
          </h2>
          <span className="text-green-600 text-base font-bold mb-2 flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full">
            <TrendingUp size={16} /> +$5k inc.
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {bids.length} total bids placed
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3 animate-in slide-in-from-top">
          <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
          <span className="text-sm text-red-700 font-medium">{error}</span>
        </div>
      )}

      {/* Action Buttons */}
      {!auctionEnded && (
        <div className="space-y-4 mb-6">
          {/* Quick Bid Button */}
          <button
            onClick={quickBid}
            disabled={isPlacingBid}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 border-2 border-blue-700"
          >
            {isPlacingBid ? (
              <>
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Placing Bid...</span>
              </>
            ) : (
              <>
                <Gavel size={22} />
                <span>Quick Bid ({formatPrice(minNextBid)})</span>
                <Zap size={18} />
              </>
            )}
          </button>

          {/* Custom Bid */}
          <div className="flex gap-3">
            <input
              type="number"
              value={customBidAmount}
              onChange={(e) => setCustomBidAmount(e.target.value)}
              placeholder={`Min: ${formatPrice(minNextBid)}`}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-semibold text-lg"
              disabled={isPlacingBid}
            />
            <button
              onClick={handleCustomBid}
              disabled={isPlacingBid || !customBidAmount}
              className="px-6 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-gray-900"
            >
              Bid
            </button>
          </div>

          {/* Auto-Bid (Collapsible) */}
          <details className="group border-2 border-gray-300 rounded-xl overflow-hidden">
            <summary className="cursor-pointer p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between font-bold text-gray-900">
              <span className="flex items-center gap-2">
                🤖 Advanced: Auto-Bid System
              </span>
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-bold">
                PRO
              </span>
            </summary>
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                Auto-bid automatically places bids on your behalf up to your
                maximum amount, ensuring you stay competitive without constant
                monitoring.
              </p>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={maxAutoBid}
                  onChange={(e) => setMaxAutoBid(e.target.value)}
                  placeholder="Max auto-bid amount"
                  className="flex-1 px-4 py-2 border-2 border-blue-300 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  onClick={handleAutoBid}
                  className="px-5 bg-blue-600 text-white text-sm rounded-lg font-bold hover:bg-blue-700 transition-all"
                >
                  Enable
                </button>
              </div>
              {autoBidEnabled && (
                <div className="mt-3 p-3 bg-green-100 border-2 border-green-300 rounded-lg text-xs text-green-700 flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span className="font-semibold">
                    Auto-bid active up to {formatPrice(parseFloat(maxAutoBid))}
                  </span>
                </div>
              )}
            </div>
          </details>
        </div>
      )}

      {auctionEnded && (
        <div className="mb-6 p-6 bg-gray-100 rounded-xl text-center border-2 border-gray-300">
          <p className="text-xl font-bold text-gray-800 mb-2">
            This auction has ended
          </p>
          <p className="text-sm text-gray-600">
            Final winning bid:{" "}
            <span className="font-bold text-gray-900">
              {formatPrice(currentBid)}
            </span>
          </p>
        </div>
      )}

      {/* Bid History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            📊 Bid History
          </h3>
          <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {bids.length} bids
          </span>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
          {bids.map((bid, index) => (
            <div
              key={bid.id}
              className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                bid.isYou
                  ? "bg-gradient-to-r from-blue-100 to-indigo-100 border-2 border-blue-300 shadow-md"
                  : index === 0 && !bid.isYou
                  ? "bg-yellow-50 border-2 border-yellow-300"
                  : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {/* Avatar */}
              <div className="relative">
                <img
                  src={bid.avatar}
                  alt={bid.name}
                  className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                />
                {bid.verified && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                    <CheckCircle2 size={12} className="text-white" />
                  </div>
                )}
                {index === 0 && !bid.isYou && (
                  <div className="absolute -top-2 -right-2">
                    <Crown size={16} className="text-yellow-500" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p
                    className={`font-bold text-sm truncate ${
                      bid.isYou ? "text-blue-600" : "text-gray-900"
                    }`}
                  >
                    {bid.name}
                  </p>
                  {bid.isYou && (
                    <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">
                      YOU
                    </span>
                  )}
                  {index === 0 && !bid.isYou && (
                    <span className="text-xs bg-yellow-500 text-white px-2 py-0.5 rounded-full font-bold">
                      WINNING
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{bid.time}</p>
              </div>

              {/* Amount */}
              <div className="text-right">
                <div
                  className={`font-bold text-lg ${
                    bid.isYou ? "text-blue-600" : "text-gray-900"
                  }`}
                >
                  {formatPrice(bid.amount)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legal Notice */}
      <p className="text-xs text-gray-500 mt-6 text-center leading-relaxed border-t-2 border-gray-200 pt-4">
        🔒 By placing a bid, you agree to our{" "}
        <a href="#" className="text-blue-600 hover:underline font-semibold">
          Terms & Conditions
        </a>
        . All bids are legally binding.
      </p>
    </div>
  );
};

export default AuctionBox;
