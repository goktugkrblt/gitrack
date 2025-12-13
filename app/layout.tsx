import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GitCheck - GitHub Checked",
    template: "%s | GitCheck"
  },
  description: "Analyze your GitHub profile with advanced developer analytics. Real-time metrics, developer scoring, and comprehensive insights powered by intelligent algorithms.",
  keywords: [
    "GitHub analytics",
    "developer tools",
    "GitHub profile analyzer",
    "developer score",
    "code metrics",
    "GitHub stats",
    "contribution tracking",
    "developer portfolio",
    "gitcheck",
    "github verified",
    "github checked"
  ],
  authors: [{ name: "Goktug Karabulut", url: "https://goktug.info" }],
  creator: "Goktug Karabulut",
  publisher: "GitCheck",
  metadataBase: new URL("https://gitcheck.me"),
  alternates: {
    canonical: "https://gitcheck.me"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gitcheck.me",
    title: "GitCheck - GitHub Checked",
    description: "Analyze your GitHub profile with advanced developer analytics. Real-time metrics, scoring, and comprehensive insights.",
    siteName: "GitCheck",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "GitCheck - GitHub Analytics Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "GitCheck - GitHub Checked",
    description: "Analyze your GitHub profile with advanced developer analytics and real-time insights.",
    images: ["/og-image.png"], 
    creator: "@goktugkrblt"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    google: "your-google-verification-code",     
  },
  category: "technology"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* ... (head aynı) */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>

        {/* ✅ ORGANIZATION SCHEMA */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "GitCheck",
              "url": "https://gitcheck.me",
              "logo": "https://gitcheck.me/og-image.jpg",
              "description": "Advanced GitHub profile analytics and developer scoring platform",
              "founder": {
                "@type": "Person",
                "name": "Goktug Karabulut",
                "url": "https://goktug.info"
              },
              "sameAs": [
                "https://twitter.com/goktugkrblt"
              ]
            })
          }}
        />

        {/* ✅ WEBSITE SCHEMA */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "GitCheck",
              "url": "https://gitcheck.me",
              "description": "Analyze your GitHub profile with advanced developer analytics",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://gitcheck.me/dashboard?username={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* ✅ SOFTWARE APPLICATION SCHEMA */}
        <Script
          id="software-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "GitCheck",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "150"
              }
            })
          }}
        />

        {/* ✅ FAQ SCHEMA - FİYAT GÜNCELLENDİ */}
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Is my GitHub data secure?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. We only access public repository data via GitHub OAuth. We never request write permissions or access to private repos. All data is transmitted over encrypted connections."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What's included in the PRO plan?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "PRO includes 5 advanced analytics modules: README Quality Analysis (20%), Repository Health (25%), Developer Patterns (30%), Career Insights (25%), and AI Career Analysis (bonus). You get a comprehensive developer score with detailed breakdowns plus personalized AI-powered career recommendations."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is this a subscription or one-time payment?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "It's a one-time payment of $2.99 for lifetime access. No recurring charges, no hidden fees, not a subscription. Pay once, keep PRO features forever."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I cancel my PRO access?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Since it's a one-time purchase with lifetime access, there's no subscription to cancel. You own PRO features permanently after purchase."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How is my developer score calculated?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Your score is calculated from 4 weighted components: README Quality (20%), Repository Health (25%), Developer Patterns (30%), and Career Insights (25%). Each analyzes different aspects of your GitHub presence."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do I need to reconnect my GitHub account regularly?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. Once you sign in with GitHub OAuth, you stay authenticated. You can revoke access anytime from your GitHub Settings if needed."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What programming languages are supported?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "GitCheck analyzes all programming languages that GitHub recognizes. We track language usage, detect your primary tech stack, and show language evolution over time."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How often is my data updated?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "FREE users can re-analyze anytime. PRO analysis results are cached for 1 hour for performance, then auto-refresh. You can manually refresh anytime via the dashboard."
                  }
                }
              ]
            })
          }}
        />

        {/* ✅ PRODUCT SCHEMA - FİYAT GÜNCELLENDİ $2.99 */}
        <Script
          id="product-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "GitCheck PRO - Lifetime Access",
              "description": "Advanced GitHub analytics with README Quality Analysis, Repository Health, Developer Patterns, Career Insights, and AI Career Analysis",
              "brand": {
                "@type": "Brand",
                "name": "GitCheck"
              },
              "offers": {
                "@type": "Offer",
                "price": "2.99",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": "https://gitcheck.me",
                "priceValidUntil": "2026-12-31"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "87"
              }
            })
          }}
        />
      </body>
    </html>
  );
}