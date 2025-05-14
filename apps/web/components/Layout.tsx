import { ReactNode } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { t } = useTranslation('common');
  const router = useRouter();

  const handleLanguageChange = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-xl font-bold text-primary-600">
                  School MS
                </Link>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  {t('navigation.dashboard')}
                </Link>
                <Link href="/students" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  {t('navigation.students')}
                </Link>
                <Link href="/teachers" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  {t('navigation.teachers')}
                </Link>
                <Link href="/courses" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  {t('navigation.courses')}
                </Link>
                <Link href="/grades" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  {t('navigation.grades')}
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-3 py-2 text-sm font-medium ${router.locale === 'en' ? 'text-primary-600' : 'text-gray-500'}`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageChange('es')}
                className={`px-3 py-2 text-sm font-medium ${router.locale === 'es' ? 'text-primary-600' : 'text-gray-500'}`}
              >
                ES
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
} 