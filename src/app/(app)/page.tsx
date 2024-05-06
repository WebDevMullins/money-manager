import { Button } from '@/components/ui/button'
import { SignInButton, SignUpButton } from '@clerk/nextjs'

export default function HomePage() {
	return (
		<div className='flex flex-col items-center justify-center py-12'>
			<div className='flex flex-col gap-y-4 py-12'>
				<p className='text-center text-4xl font-bold'>
					Welcome to
					<br />
					<span className='bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-5xl font-bold leading-tight tracking-tighter text-transparent'>
						MoneyManager
					</span>
				</p>
				<p className='text-center text-muted-foreground'>
					Your personal finance manager for the web
				</p>
			</div>
			<div className='flex gap-4'>
				<SignInButton>
					<Button>Sign In</Button>
				</SignInButton>
				<SignUpButton>
					<Button variant={'secondary'}>Sign Up</Button>
				</SignUpButton>
			</div>
		</div>
	)
}
