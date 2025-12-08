import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Trash2, Download } from "lucide-react";
import { properties } from "../data/mockData";
import PropertyCard from "../components/property/PropertyCard";
import { useFormat } from "../context/AppContext";
import { EmptyState } from "../components/common/LoadingStates";

const Saved = () => {
  const navigate = useNavigate();
  const { formatPrice } = useFormat();
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setSavedIds(JSON.parse(stored));
    }
  }, []);

  const savedProperties = properties.filter((p) => savedIds.includes(p.id));

  const handleRemove = (id) => {
    const newSaved = savedIds.filter((savedId) => savedId !== id);
    setSavedIds(newSaved);
    localStorage.setItem("favorites", JSON.stringify(newSaved));
  };

  const handleCardClick = (id) => {
    navigate(`/property/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Saved Properties ({savedProperties.length})
          </h1>
          <p className="text-gray-600">Your favorite properties in one place</p>
        </div>

        {savedProperties.length === 0 ? (
          <EmptyState
            icon="💝"
            title="No saved properties yet"
            description="Start exploring and save properties you're interested in"
            actionLabel="Browse Properties"
            onAction={() => navigate("/")}
          />
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {savedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onCardClick={handleCardClick}
                formatPrice={formatPrice}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;
