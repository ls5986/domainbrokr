import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://domainbrokr.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ]

  // Domain pages (for each domain in your portfolio)
  const domainPages = [
    'domainbrokr', 'chatgpt-wrapped', 'clinkhq', 'reignmoney', 'qualifymylead',
    'letsqualifi', 'toptake', 'habexa', 'sushi-han', 'reignmoney', 'yappygolucky',
    'yappyhourpodcast', 'alphexa', 'blumexa', 'bubexa', 'chabexa', 'chasingrabbitz',
    'dabexa', 'fatexa', 'himexa', 'kabexa', 'liebexa', 'luchexa', 'maisoncove',
    'newtexa', 'omnexatech', 'quirexa', 'reevexa', 'reppyroute', 'vabexa', 'yabexa',
    'yappyhour', 'zellexa', 'appwzrd', 'bibliotexa', 'blssly', 'blyae', 'bravra',
    'brskly', 'chatgpt-wrapped', 'chatgptwrapped', 'clinkhq', 'dareyx', 'dashsly',
    'domainbrokr', 'dripra', 'frayae', 'fzzly', 'hushyx', 'koditlabs', 'kyexa',
    'letsqualifi', 'rshly', 'ryvyx', 'slatsly', 'sngsly', 'snugshq', 'snugshub',
    'snugsly', 'spynyx', 'swyly', 'thrivyx', 'trekyx', 'vibsly', 'wynae', 'zinton',
    'zstly', 'caviqo', 'divlet', 'fuqly', 'judayo', 'laqly', 'legacylifeadvocates',
    'pumely', 'betterwrong', 'byemillie', 'camphavenco', 'casuallylate', 'creatorlegacylife',
    'educatorlegacylife', 'foundationlegacylife', 'immigrantlegacylife', 'luckyexit',
    'responderlegacylife', 'startuplegacylife', 'successlegacylife', 'toptake',
    'tradelegacylife', 'traderlegacylife', 'vintageviolence', 'camphavenrentals',
    'staycamphaven', 'itstheshitsshow', 'letsclink', 'theelevateddj'
  ].map(domain => ({
    url: `${baseUrl}/domains/${domain}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...domainPages]
}

