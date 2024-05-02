import Logo from '@/components/Logo'

export default function authLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div className='relative flex h-dvh w-full flex-col items-center justify-center'>
			<Logo />
			<div className='mt-12'>{children}</div>
		</div>
	)
}
