import React from 'react';
import { TransferUploadForm } from './forms/TransferUploadForm';
import ReviewsPage from '@/app/child-pages/reviews/page';
import BrandingPage from '@/app/child-pages/branding/page';
import TransfersPage from '@/app/child-pages/transfers/page';
import { useNavigation } from '@/context/NavigationContext';
import PlansPage from '@/app/child-pages/plans/page';
import HistoryPage from '@/app/child-pages/history/page';

const ChildPages = () => {
  const { activePage } = useNavigation();

  const renderContent = () => {
    switch (activePage) {
      case 'upload-form':
        return <TransferUploadForm />;
      case 'transfers':
        return <TransfersPage />;
      case 'history':
        return <HistoryPage />; // Assuming HistoryPage is defined elsewhere
      case 'pricing':
        return <PlansPage />;
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
      <div className="">
        {renderContent()}
      </div>
    </div>
  );
};

export default ChildPages;