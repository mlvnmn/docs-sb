interface StarRatingProps {
  className?: string;
  count?: number;
}

export function StarRating({ className = 'star-rating', count = 5 }: StarRatingProps) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i}>✦</span>
      ))}
    </div>
  );
}
