export default function OnboardingLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div className='relative flex h-dvh w-full flex-col items-center justify-center'>
			{children}
		</div>
	)
}
