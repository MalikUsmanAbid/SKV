import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className = 'w-6 h-6', size }) => {
  // @ts-ignore dynamic lookup
  const IconComponent = LucideIcons[name] || LucideIcons.Building2;
  return <IconComponent className={className} size={size} />;
};
