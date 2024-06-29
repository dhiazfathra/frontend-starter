import Link from 'next/link';
import { useTranslations } from 'next-intl';

const Navbar = () => {
  const t = useTranslations('Navbar');

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">{t('home')}</Link>
        </li>
      </ul>
    </nav>
  );
};

export { Navbar };
