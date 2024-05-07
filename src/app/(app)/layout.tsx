import Footer from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<SiteHeader />
			<main className='flex-1 flex-col pb-16'>{children}</main>
			<Footer />
		</>
	)
}
