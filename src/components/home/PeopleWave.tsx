interface PeopleWaveProps {
  variant: 'top' | 'bottom';
  style?: React.CSSProperties;
}

export function PeopleWave({ variant, style }: PeopleWaveProps) {
  const className = variant === 'top' ? 'people-wave-top' : 'people-wave-bottom';
  const path =
    variant === 'top'
      ? 'M0,36 C320,95 640,-15 960,55 C1200,90 1360,25 1440,36 L1440,90 L0,90 Z'
      : 'M0,0 L1440,0 L1440,36 C1360,25 1200,90 960,55 C640,-15 320,95 0,36 Z';

  return (
    <div className={className} style={style} aria-hidden={variant === 'bottom' ? true : undefined}>
      <svg
        viewBox="0 0 1440 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="people-wave-svg"
        preserveAspectRatio="none"
      >
        <path d={path} fill="#3761cc" />
      </svg>
    </div>
  );
}
