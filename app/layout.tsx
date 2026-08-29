import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL('https://example.com'),title:'Reputation Guard Cloud｜風評リスクから企業の信頼を守る',description:'データと専門知見で、企業のオンライン上の信頼を守り育てるレピュテーションマネジメントサービス。',alternates:{canonical:'/'},openGraph:{title:'Reputation Guard Cloud',description:'企業の信頼を守り、育てる。',type:'website',locale:'ja_JP'},twitter:{card:'summary_large_image'}};
const schema={"@context":"https://schema.org","@graph":[{"@type":"Organization","name":"Reputation Guard Cloud","url":"https://example.com"},{"@type":"Service","name":"オンライン評判管理支援","provider":{"@type":"Organization","name":"Reputation Guard Cloud"},"areaServed":"JP"}]};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ja"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></body></html>}
