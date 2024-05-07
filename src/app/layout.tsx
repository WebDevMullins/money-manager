import { ClerkProvider } from '@clerk/nextjs'

import RootProviders from '@/components/providers/RootProviders'

import '@/styles/globals.css'

import { Toaster } from '@/components/ui/sonner'
import { Inter } from 'next/font/google'

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-sans'
})

export const metadata = {
	title: 'Money Manager',
	description: 'Keep track of your finances',
	icons: [{ rel: 'icon', url: '/favicon.ico' }]
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider>
			<html
				lang='en'
				className='dark'
				style={{ colorScheme: 'dark' }}>
				<body className={`font-sans ${inter.variable} min-h-dvh`}>
					<Toaster
						richColors
						position='bottom-right'
					/>
					<RootProviders>
						<div className='relative flex flex-col'>{children}</div>
					</RootProviders>
				</body>
			</html>
		</ClerkProvider>
	)
}
