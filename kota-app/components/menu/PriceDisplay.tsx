interface PriceDisplayProps {
  basePrice: number;
  additivesTotal: number;
}

export default function PriceDisplay({ basePrice, additivesTotal }: PriceDisplayProps) {
  const total = basePrice + additivesTotal;
  return (
    <div className="mt-4 space-y-1 text-sm">
      <div className="flex justify-between text-gray-500">
        <span>Base price</span>
        <span>R{basePrice.toFixed(2)}</span>
      </div>
      {additivesTotal > 0 && (
        <div className="flex justify-between text-gray-500">
          <span>Additives</span>
          <span>+R{additivesTotal.toFixed(2)}</span>
        </div>
      )}
      <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-1">
        <span>Total</span>
        <span>R{total.toFixed(2)}</span>
      </div>
    </div>
  );
}
