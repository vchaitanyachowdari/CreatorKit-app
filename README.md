# CreatorKit - All in One Content Creation Platform

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Powered by AI SDK](https://img.shields.io/badge/Powered%20by-AI%20SDK-blue?style=for-the-badge)](https://sdk.vercel.ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

## Overview

**CreatorKit** is a comprehensive AI powered platform designed for content creators, marketing professionals, and developers. It provides 11+ tools to generate, analyze, and optimize content across every medium from social media posts to code debugging.

### Key Features

- **11+ AI Powered Tools** for content creation and analysis
- **Real time Generation** with streaming support
- **Production Ready** with comprehensive error handling
- **Dark Theme Interface** with modern, responsive design
- **Free Tier Access** with optional premium plans
- **Secure Authentication** with login/signup system
- **API Routes** for seamless integration

---

## Tools

### Content Generation
- **Social Media Post Generator** - Create platform specific posts (Twitter, LinkedIn, Instagram, Facebook, TikTok) with optimal hashtags and tone variations
- **Blog Post Writer** - Generate SEO optimized long form content with readability scores and keyword analysis
- **Press Release Generator** - Professional PR content formatted in AP Style
- **Script Writer** - Generate video, podcast, presentation, commercial, and tutorial scripts with delivery tips

### Analysis & Insights
- **PDF Analyzer** - Extract summaries, key points, and metadata from documents
- **Data Insights Engine** - Analyze CSV/JSON data with AI generated statistics, trends, and recommendations
- **Code Debugger** - Identify errors, security issues, and optimization suggestions

### Business & Development
- **SWOT Analysis Generator** - Create strategic business analysis with recommendations
- **Translation Suite** - Supports 12+ languages with tone preservation (formal, casual, professional, friendly)
- **Regex Builder** - Generate regex patterns with real time testing and explanations
- **Chart Generator** - Create beautiful charts from CSV data with multiple visualization options

---

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm package manager
- Git (for version control)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/CreatorKit-app.git
   cd CreatorKit-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```bash
   # AI Provider (Choose one)
   OPENAI_API_KEY=your_openai_api_key
   # or
   ANTHROPIC_API_KEY=your_anthropic_api_key
   # or
   GROQ_API_KEY=your_groq_api_key
   
   # Optional: Vercel AI Gateway (if using)
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
CreatorKit-app/
├── app/
│   ├── api/                          # API routes for backend
│   │   └── tools/                    # Tool endpoints
│   │       ├── social-media-generator/
│   │       ├── blog-press-release/
│   │       ├── script-debugger/
│   │       ├── pdf-data-analyzer/
│   │       ├── swot-translation/
│   │       └── regex-chart/
│   ├── tools/                        # Frontend tool pages
│   │   ├── social-media-generator/
│   │   ├── blog-press-release/
│   │   ├── script-debugger/
│   │   ├── pdf-data-analyzer/
│   │   ├── swot-translation/
│   │   └── regex-chart/
│   ├── login/                        # Authentication pages
│   ├── signup/
│   ├── page.tsx                      # Homepage
│   ├── layout.tsx                    # Root layout
│   ├── globals.css                   # Global styles
│   └── loading.tsx                   # Loading states
├── components/
│   ├── ui/                           # shadcn/ui components
│   ├── hero.tsx                      # Hero section
│   ├── features.tsx                  # Features showcase
│   ├── theme-provider.tsx            # Theme setup
│   └── ...                           # Other components
├── lib/
│   ├── utils.ts                      # Utility functions
│   └── fonts.ts                      # Font configuration
├── hooks/
│   ├── use-mobile.ts                 # Mobile detection hook
│   └── use-toast.ts                  # Toast notifications
├── public/                           # Static assets
├── styles/                           # Additional styles
├── next.config.mjs                   # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS setup
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Project dependencies
```

---

## Usage

### Accessing Tools

After logging in, navigate to `/tools/[tool-name]` to access specific tools:

- `/tools/social-media-generator`
- `/tools/blog-press-release`
- `/tools/script-debugger`
- `/tools/pdf-data-analyzer`
- `/tools/swot-translation`
- `/tools/regex-chart`

### API Integration

Each tool has a corresponding API route at `/api/tools/[tool-name]` that accepts POST requests:

```bash
curl -X POST http://localhost:3000/api/tools/social-media-generator \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "My new product launch",
    "platforms": ["twitter", "linkedin"],
    "tone": "professional"
  }'
```

---

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility first styling
- **Shadcn/UI** - High quality component library
- **Framer Motion** - Animations

### Backend
- **Next.js API Routes** - Backend endpoints
- **AI SDK** - Unified AI model integration
- **Vercel AI Gateway** - Centralized AI provider management

### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

---

## Building for Production

### Optimize the Build

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm run start
   ```

### Environment Variables

Ensure all required environment variables are set in your production environment:

```bash
# Production environment
OPENAI_API_KEY=your_production_key
NEXT_PUBLIC_API_URL=https://yourdomain.com
NODE_ENV=production
```

### Performance Tips

- Use static generation for landing pages
- Enable incremental static regeneration (ISR)
- Implement proper caching headers
- Monitor API response times
- Use CDN for static assets
- Enable compression on server

---

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub:
   ```bash
   git push origin main
   ```

2. Connect your repository to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Configure environment variables in Vercel dashboard
   - Click "Deploy"

3. Set up CI/CD:
   ```bash
   # Vercel automatically deploys on push to main
   # Preview deployments for pull requests
   ```

### Deploy to Other Platforms

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**Environment Setup:**
- Database connections (if needed)
- API keys and secrets
- CDN configuration
- Logging and monitoring

---

## API Documentation

### Endpoints

#### Social Media Post Generator
```
POST /api/tools/social-media-generator
Body: {
  topic: string
  platforms: string[]
  tone: 'professional' | 'casual' | 'creative'
}
Response: {
  posts: {
    [platform]: {
      content: string
      hashtags: string[]
      platform: string
    }
  }
}
```

#### Blog & Press Release Generator
```
POST /api/tools/blog-press-release
Body: {
  topic: string
  type: 'blog' | 'press'
  tone: string
}
Response: {
  content: string
  metadata: {
    wordCount: number
    readTime: number
    keywords: string[]
  }
}
```

#### Code Debugger
```
POST /api/tools/script-debugger
Body: {
  code: string
  language: string
  type: 'debug' | 'script'
}
Response: {
  issues: Array<{
    severity: 'error' | 'warning'
    message: string
    fix: string
  }>
}
```

---

## Security

### Best Practices Implemented

- **Environment variables** for sensitive data
- **API route protection** with authentication
- **Input validation** on all endpoints
- **Error handling** without exposing sensitive info
- **CORS** configuration for API access
- **Rate limiting** recommendations

### Data Privacy

- No user data stored without consent
- API responses not logged
- Secure transmission with HTTPS
- Compliance with GDPR and privacy regulations

---

## Performance

### Metrics

- **Lighthouse Score**: 90+
- **Core Web Vitals**: Optimized
- **First Contentful Paint**: <2s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1

### Optimization Strategies

1. Image optimization with Next.js Image component
2. Code splitting and lazy loading
3. CSS minification with Tailwind
4. JavaScript bundling optimization
5. Caching strategies for API responses
6. Compression (gzip/brotli)

---

## Testing

### Manual Testing

```bash
# Test local development
npm run dev

# Test production build
npm run build
npm run start
```

### Recommended Testing Tools

- Jest for unit tests
- Playwright for E2E tests
- Lighthouse for performance audits
- ZapScan for security scanning

---

## Monitoring & Logging

### Production Monitoring

- Vercel Analytics dashboard
- Error tracking (Sentry recommended)
- Performance monitoring (Web Vitals)
- API response time tracking

### Logging Setup

```javascript
// Example error logging
console.error('[Error]', error.message, error.stack)
// Use service like Sentry for production
```

---

## Troubleshooting

### Common Issues

**API Rate Limits:**
- Implement exponential backoff
- Queue requests during high load
- Use request throttling

**Build Errors:**
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

**Environment Variables Not Loading:**
- Verify `.env.local` file exists
- Check variable names match configuration
- Restart development server

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## Support

- **Documentation**: Check the [README](README.md) and inline code comments
- **Issues**: Report bugs on [GitHub Issues](https://github.com/yourusername/CreatorKit-app/issues)
- **Email**: vchaitanya@chowdari.in 
- **Community**: Join our Discord community (link when available)

---

## Roadmap

### Q1 2025
- User authentication system
- Payment integration
- Usage analytics dashboard

### Q2 2025
- Team collaboration features
- API for third-party integration
- Custom branding options

### Q3 2025
- Desktop applications
- Advanced caching strategies
- Enhanced AI model support

---

## Changelog

### Version 0.1.0 (Initial Release)
- 11+ AI powered tools
- Authentication system
- Dark theme UI
- Production ready deployment

---

## Credits

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Components from [shadcn/ui](https://ui.shadcn.com)
- AI Integration via [Vercel AI SDK](https://sdk.vercel.ai)
- Hosted on [Vercel](https://vercel.com)

---

## Contact

- **Website**: [chowdari.in](https://chowdari.in) 
- **Twitter**: [@vchaitanyachowadari](https://x.com/vchaitanyachai?s=11)
- **LinkedIn**: [V Chaitanya Chowdari](https://linkedin.com/vchaitanyachowdari/)
- **Email**: [vchaitanya@chowdari.in](vchaitanya@chowdari.in)

---

**Made with ❤️ by the CreatorKit team**

Last Updated: November 2025

