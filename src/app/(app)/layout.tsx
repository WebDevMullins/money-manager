import Navbar from '@/components/Navbar'
import Footer from '@/components/site-footer'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar />
			<main className='relative flex w-full flex-col justify-between pb-12'>
				{children}
			</main>
			<Footer />
		</>
	)
}
