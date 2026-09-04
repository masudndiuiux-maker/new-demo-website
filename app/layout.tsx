import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://new-demo-website.vercel.app"),
  title: "Reputation Guard Cloud | Online Reputation Management",
  description:
    "Protect and grow your organization’s online reputation with data and specialist expertise.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Reputation Guard Cloud",
    description: "Protect trust. Build what comes next.",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Reputation Guard Cloud",
      url: "https://new-demo-website.vercel.app",
    },
    {
      "@type": "Service",
      name: "Online reputation management support",
      provider: { "@type": "Organization", name: "Reputation Guard Cloud" },
      areaServed: "JP",
      inLanguage: ["ja", "en"],
    },
  ],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
