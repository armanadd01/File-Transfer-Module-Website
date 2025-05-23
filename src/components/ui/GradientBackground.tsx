interface GradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'blue-purple' | 'green' | 'default';
}

export const GradientBackground = ({ 
  children, 
  className = '', 
  variant = 'default' 
}: GradientBackgroundProps) => {
  const gradients = {
    'default': 'from-blue-600 via-purple-500 to-pink-500 dark:from-blue-500 dark:via-purple-400 dark:to-pink-400 dark:opacity-75',
    'blue-purple': 'from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 dark:opacity-75',
    'green': 'from-green-400 to-emerald-600 dark:from-green-500 dark:to-emerald-500 dark:opacity-75'
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradients[variant]} ${className}`}>
      {children}
    </div>
  );
};