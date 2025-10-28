import React from 'react'

interface AdBannerProps {
  position: 'header' | 'sidebar' | 'footer' | 'between-content'
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export const AdBanner: React.FC<AdBannerProps> = ({ 
  position, 
  size = 'medium', 
  className = '' 
}) => {
  const getAdDimensions = () => {
    switch (position) {
      case 'header':
        return 'w-full h-20'
      case 'sidebar':
        return 'w-48 h-96'
      case 'footer':
        return 'w-full h-32'
      case 'between-content':
        return size === 'large' ? 'w-full h-40' : 'w-full h-24'
      default:
        return 'w-full h-24'
    }
  }

  const getAdContent = () => {
    switch (position) {
      case 'header':
        return 'Google AdSense - Header Banner (728x90)'
      case 'sidebar':
        return 'Google AdSense - Sidebar (160x600)'
      case 'footer':
        return 'Google AdSense - Footer Banner (728x90)'
      case 'between-content':
        return 'Google AdSense - In-Content Ad (728x90)'
      default:
        return 'Google AdSense Advertisement'
    }
  }

  return (
    <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${getAdDimensions()} ${className}`}>
      <div className="text-center">
        <p className="text-gray-500 text-sm font-medium">{getAdContent()}</p>
        <p className="text-gray-400 text-xs mt-1">Advertisement Space</p>
      </div>
    </div>
  )
}