import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'

import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav'
import { ModeToggleButton } from './mode-toggle-button'

export function SiteHeader() {
	return (
		<header className='fixed top-0 z-50 mx-auto w-full items-center justify-center border-b bg-transparent backdrop-blur-xl'>
			<div className='container flex h-16 max-w-screen-2xl items-center'>
				<MainNav />
				<MobileNav />
				<div className='flex h-full flex-1 items-center justify-between md:justify-end'>
					<div className='w-full flex-1 md:w-auto md:flex-none'>
						{/* <CommandMenu /> */}
					</div>
					<nav className='flex items-center justify-center space-x-6'>
						<SignedOut>
							<SignInButton>
								<Button variant={'outline'}>Login</Button>
							</SignInButton>
							<SignInButton>
								<Button>Get Started Now</Button>
							</SignInButton>
						</SignedOut>
						{/* <UserButton /> */}
						<SignedIn>
							{/* <ModeToggleButton /> */}
							<UserButton />
						</SignedIn>
					</nav>
				</div>
			</div>
		</header>
	)
}
