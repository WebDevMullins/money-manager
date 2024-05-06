import Navbar from '@/components/Navbar'

export default function SettingsLayout({
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
