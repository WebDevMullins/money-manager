import Link from 'next/link'
import Logo from './Logo'

const footerConfig = {
	companyInfo: {
		title: 'MoneyManager',
		description: 'Your personal finance manager for the web'
	},
	legalLinks: [
		{
			title: 'Privacy Policy',
			href: '/privacy-policy'
		},
		{
			title: 'Terms of Service',
			href: '/terms-of-service'
		}
	],
	navConfig: {
		mainNav: [
			{
				title: 'Dashboard',
				href: '/dashboard'
			},
			{
				title: 'Transactions',
				href: '/transactions'
			},
			{
				title: 'Settings',
				href: '/settings'
			}
		]
	}
}

export default function Footer() {
	return (
		<footer className='w-full border-t'>
			<div className='container m-auto w-full max-w-screen-xl pb-6'>
				<div className='flex w-full flex-col justify-between gap-4 sm:flex-row sm:gap-10'>
					<div className='mt-6 flex flex-col items-start gap-2'>
						<Logo />
						<p className='text-sm text-muted-foreground'>
							{footerConfig.companyInfo.description}
						</p>
					</div>
					<div className='grid grid-cols-2 gap-24'>
						<div className='flex flex-col gap-y-1'>
							<h3 className='mb-2 mt-6 text-lg font-medium'>Navigation</h3>
							{footerConfig.navConfig.mainNav.map((link) => (
								<Link
									key={link.title}
									href={link.href}
									className='text-muted-foreground hover:text-secondary-foreground'>
									{link.title}
								</Link>
							))}
						</div>
						<div className='flex flex-col gap-y-1'>
							<h3 className='mb-2 mt-6 text-lg font-medium'>Legal</h3>
							{footerConfig.legalLinks.map((link) => (
								<Link
									key={link.title}
									href={link.href}
									className='text-muted-foreground hover:text-secondary-foreground'>
									{link.title}
								</Link>
							))}
						</div>
					</div>
				</div>
				<hr className='my-6' />
				<div className='text-sm'>
					© 2024 {footerConfig.companyInfo.title}. All rights reserved.
				</div>
			</div>
		</footer>
	)
}
