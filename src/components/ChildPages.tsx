import React from 'react';
import { TransferUploadForm } from './forms/TransferUploadForm';
import PricingPage from '@/app/child-pages/pricing/page';
import ReviewsPage from '@/app/child-pages/reviews/page';
import BrandingPage from '@/app/child-pages/branding/page';
import TransfersPage from '@/app/child-pages/transfers/page';
import { useNavigation } from '@/context/NavigationContext';

const ChildPages = () => {
  const { activePage } = useNavigation();

  const renderContent = () => {
    switch (activePage) {
      case 'upload-form':
        return <TransferUploadForm />;
      case 'transfers':
        return <TransfersPage />;
      case 'pricing':
        return <PricingPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'branding':
        return <BrandingPage />;
      default:
        return <TransferUploadForm />;
    }
  };

  return (
    <div className="flex-1 border-t border-gray-200 dark:border-gray-700">
      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default ChildPages;