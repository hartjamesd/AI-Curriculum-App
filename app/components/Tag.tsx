'use client';

interface TagProps {
  label: string;
  color?: string;
}

export default function Tag({ label, color = '#00d4aa' }: TagProps) {
  return (
    <span
      style={{
        fontFamily: 'monospace',
        fontSize: 10,
        letterSpacing: 1.5,
        padding: '2px 8px',
        borderRadius: 4,
        color,
        border: `1px solid ${color}44`,
        background: `${color}11`,
        display: 'inline-block',
        fontWeight: 700,
        textTransform: 'uppercase',
      }}
    >
      {label}
    </span>
  );
}
