import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/nextjs'
import Image from 'next/image'

export default function HomePage() {
	return (
		<>
			<section className='relative flex min-h-dvh w-full flex-col justify-center gap-y-32 overflow-hidden pt-16'>
				{/* Background Gradient */}
				<div className='absolute inset-0 -z-20 flex overflow-hidden'>
					<div className='bg-dot-black/[0.2] dark:bg-dot-white/[0.2] relative flex h-full w-full items-center justify-center bg-transparent'>
						{/* Radial gradient for the container to give a faded look */}
						<div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)] dark:bg-background'></div>
					</div>
				</div>
				<div
					className='absolute inset-0 top-[60%] -z-10 mx-auto h-[30%] w-[50%] max-w-6xl rounded-full bg-orange-500/50 blur-[100px] sm:top-[40%]'
					aria-hidden='true'></div>
				<div className='absolute inset-0 -z-20 flex overflow-hidden'></div>

				{/* Hero Content */}
				<div className='container flex pt-16 text-center'>
					<div className='flex w-full flex-col items-center  gap-y-8'>
						<h1 className='h-20 text-pretty bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text text-5xl font-extrabold leading-none text-transparent md:text-6xl'>
							MoneyManager
						</h1>
						<p className='mx-auto max-w-sm text-lg text-muted-foreground sm:max-w-md md:max-w-lg'>
							Your personal finance manager for the web
						</p>
						<div className='mx-auto flex max-w-sm flex-col justify-center gap-4 sm:flex-row'>
							<SignInButton>
								<Button>Get Started Now</Button>
							</SignInButton>
						</div>
					</div>
				</div>
				{/* Hero Image */}
				<div
					className='container z-10 mx-auto max-w-6xl'
					aria-hidden='true'>
					<div className='relative h-fit rounded-2xl bg-gradient-to-b from-orange-500 to-zinc-300/70 to-40% after:absolute after:inset-0 after:rounded-[calc(1rem-1px)] after:bg-zinc-100/30 dark:to-zinc-300/50 dark:after:bg-zinc-800/50'>
						<Image
							alt='logo'
							className='relative z-20 rounded-2xl p-1 md:p-2'
							decoding='async'
							height='938'
							loading='eager'
							src={'/hero-image.png'}
							width='1500'
						/>
					</div>
				</div>
			</section>
		</>
	)
}
