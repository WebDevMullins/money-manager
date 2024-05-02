import Navbar from '@/components/Navbar'

export default function DashboardLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div className='relative flex h-dvh w-full flex-col'>
			<Navbar />
			<div className='w-full'>{children}</div>
		</div>
	)
}
