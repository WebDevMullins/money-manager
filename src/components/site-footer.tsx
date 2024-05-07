import Link from 'next/link'

import Logo from './Logo'
import ModeToggleSlider from './mode-toggle-slider'

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
				{/* <hr className='my-6' />
				<div className='text-sm'>
					© 2024 {footerConfig.companyInfo.title}. All rights reserved.
				</div> */}
				<div className='mt-16 flex flex-col-reverse items-center border-t  pt-4  sm:mt-20 md:flex-row md:justify-between md:pt-8 lg:mt-24'>
					<p className='mt-4 w-full text-left text-sm leading-5 text-muted-foreground md:mt-0'>
						© 2024 {footerConfig.companyInfo.title}. All rights reserved.
					</p>
					<div className='flex w-full justify-start md:justify-end'>
						<ModeToggleSlider />
						{/* <div className='flex flex-row items-center space-x-2 rounded-full border p-1'>
							<button className='bg-transparent p-1'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='18'
									height='18'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									stroke-width='2'
									stroke-linecap='round'
									stroke-linejoin='round'
									className='lucide lucide-sun stroke-1'>
									<circle
										cx='12'
										cy='12'
										r='4'></circle>
									<path d='M12 2v2'></path>
									<path d='M12 20v2'></path>
									<path d='m4.93 4.93 1.41 1.41'></path>
									<path d='m17.66 17.66 1.41 1.41'></path>
									<path d='M2 12h2'></path>
									<path d='M20 12h2'></path>
									<path d='m6.34 17.66-1.41 1.41'></path>
									<path d='m19.07 4.93-1.41 1.41'></path>
								</svg>
							</button>
							<button className='rounded-full bg-neutral-200 p-1 dark:bg-neutral-700'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='18'
									height='18'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									stroke-width='2'
									stroke-linecap='round'
									stroke-linejoin='round'
									className='lucide lucide-monitor stroke-1'>
									<rect
										width='20'
										height='14'
										x='2'
										y='3'
										rx='2'></rect>
									<line
										x1='8'
										x2='16'
										y1='21'
										y2='21'></line>
									<line
										x1='12'
										x2='12'
										y1='17'
										y2='21'></line>
								</svg>
							</button>
							<button className='bg-transparent p-1'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='18'
									height='18'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									stroke-width='2'
									stroke-linecap='round'
									stroke-linejoin='round'
									className='lucide lucide-moon stroke-1'>
									<path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'></path>
								</svg>
							</button>
						</div> */}
					</div>
				</div>
			</div>
		</footer>
	)
}
