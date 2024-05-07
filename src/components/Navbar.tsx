'use client'

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Logo, { LogoMobile } from '@/components/Logo'
import { ModeToggleButton } from '@/components/mode-toggle-button'
import { Button, buttonVariants } from '@/components/ui/button'

import { cn } from '@/lib/utils'
import { MenuIcon } from 'lucide-react'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

function Navbar() {
	return (
		<>
			<DesktopNavbar />
			<MobileNavbar />
		</>
	)
}

const links = [
	{ label: 'Dashboard', href: '/dashboard' },
	{ label: 'Transactions', href: '/transactions' },
	{ label: 'Settings', href: '/settings' }
]

function MobileNavbar() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className='block border-separate bg-background md:hidden'>
			<nav className='container flex items-center justify-between px-8'>
				<Sheet
					open={isOpen}
					onOpenChange={setIsOpen}>
					<SheetTrigger asChild>
						<Button
							variant={'ghost'}
							size={'icon'}>
							<MenuIcon />
						</Button>
					</SheetTrigger>
					<SheetContent
						className='w-[400px] sm:w-[540px]'
						side='left'>
						<Logo />
						<div className='flex flex-col gap-1 pt-4'>
							{links.map((link) => (
								<NavbarLink
									key={link.label}
									link={link.href}
									label={link.label}
									clickCallback={() => setIsOpen((prev) => !prev)}
								/>
							))}
						</div>
					</SheetContent>
				</Sheet>
				<div className='flex h-[80px] min-h-[60px] items-center gap-x-4'>
					<LogoMobile />
				</div>
				<div className='flex items-center gap-2'>
					<ModeToggleButton />
					<UserButton />
				</div>
			</nav>
		</div>
	)
}

function DesktopNavbar() {
	return (
		<div className='fixed top-0 z-50 mx-auto hidden w-full border-separate border-b bg-transparent backdrop-blur-xl md:block'>
			<nav className='container flex items-center justify-between px-8'>
				<div className='flex h-[80px] min-h-[60px] items-center gap-x-4'>
					<Logo />
					<div className='flex h-full'>
						{links.map((link) => (
							<NavbarLink
								key={link.label}
								link={link.href}
								label={link.label}
							/>
						))}
					</div>
				</div>
				<div className='flex items-center gap-2'>
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
						<ModeToggleButton />
						<UserButton />
					</SignedIn>
				</div>
			</nav>
		</div>
	)
}

function NavbarLink({
	link,
	label,
	clickCallback
}: {
	link: string
	label: string
	clickCallback?: () => void
}) {
	const pathname = usePathname()
	const isActive = pathname === link

	return (
		<div className='relative flex items-center'>
			<Link
				href={link}
				className={cn(
					buttonVariants({ variant: 'ghost' }),
					'w-full justify-start text-lg text-muted-foreground hover:text-foreground',
					isActive && 'text-foreground'
				)}
				onClick={() => {
					if (clickCallback) clickCallback()
				}}>
				{label}
			</Link>
			{isActive && (
				<div className='absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block' />
			)}
		</div>
	)
}

export default Navbar
