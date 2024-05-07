import { PiggyBankIcon } from 'lucide-react'
import Link from 'next/link'

export default function Logo() {
	return (
		<Link
			href='/'
			className='mr-6 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-xl font-bold leading-tight tracking-tighter text-transparent'>
			<PiggyBankIcon className='stroke size-8 stroke-amber-400 stroke-1' />
			MoneyManager
		</Link>
	)
}

export function LogoMobile() {
	return (
		<Link
			href='/'
			className='flex items-center gap-2'>
			<p className='bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-2xl font-bold leading-tight tracking-tighter text-transparent'>
				MoneyManager
			</p>
		</Link>
	)
}
