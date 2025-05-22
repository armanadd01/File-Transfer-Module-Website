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
    'default': 'from-blue-600 via-purple-500 to-pink-500',
    'blue-purple': 'from-blue-600 to-purple-600',
    'green': 'from-green-400 to-emerald-600'
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradients[variant]} ${className}`}>
      {children}
    </div>
  );
};