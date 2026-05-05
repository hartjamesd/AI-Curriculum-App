'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'HOME' },
  { href: '/curriculum', label: 'CURRICULUM' },
  { href: '/collab', label: 'COLLAB LOG' },
  { href: '/ztm', label: 'ZTM' },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav
      style={{ background: '#0d1321', borderBottom: '1px solid #1f2937' }}
      className="sticky top-0 z-50 px-6 py-3 flex items-center gap-6"
    >
      <span style={{ color: '#00d4aa', fontFamily: 'monospace', fontWeight: 700, fontSize: 14, letterSpacing: 2 }}>
        CV2.3
      </span>
      <div className="flex gap-1 flex-1">
        {links.map(l => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontFamily: 'monospace',
                fontSize: 11,
                letterSpacing: 1.5,
                padding: '4px 12px',
                borderRadius: 6,
                color: active ? '#0a0e1a' : '#6b7280',
                background: active ? '#00d4aa' : 'transparent',
                fontWeight: active ? 700 : 400,
                transition: 'all 0.15s',
                textDecoration: 'none',
              }}
            >
              {l.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
