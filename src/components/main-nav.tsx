'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Logo from '@/components/Logo'

import { cn } from '@/lib/utils'

const links = [
	{ label: 'Dashboard', href: '/dashboard' },
	{ label: 'Transactions', href: '/transactions' },
	{ label: 'Settings', href: '/settings' }
]

export function MainNav() {
	const pathname = usePathname()

	return (
		<div className='mr-4 hidden md:flex'>
			<Logo />
			<nav className='flex items-center gap-4 text-sm lg:gap-6'>
				{links.map((item) => (
					<Link
						key={item.label}
						href={item.href}
						className={cn(
							'transition-colors hover:text-foreground/80',
							pathname === `${item.href}`
								? 'text-foreground'
								: 'text-foreground/70'
						)}>
						{item.label}
					</Link>
				))}
			</nav>
		</div>
	)
}
