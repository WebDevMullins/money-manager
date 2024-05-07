'use client'

import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'

export default function ModeToggleSlider() {
	const { setTheme: setMode } = useTheme()

	return (
		<div className='flex flex-row items-center space-x-2 rounded-full border p-1'>
			<ToggleGroup
				type='single'
				onValueChange={(value) => setMode(value)}>
				<ToggleGroupItem
					value='dark'
					aria-label='Toggle dark'
					className='size-[22px] rounded-full p-1'>
					<MoonIcon className='size-4' />
				</ToggleGroupItem>
				<ToggleGroupItem
					value='light'
					aria-label='Toggle light'
					className='size-6 rounded-full p-0'>
					<SunIcon className='size-3.5' />
				</ToggleGroupItem>
				<ToggleGroupItem
					value='system'
					aria-label='Toggle system'
					className='size-6 rounded-full p-0'>
					<MonitorIcon className='size-3.5' />
				</ToggleGroupItem>
			</ToggleGroup>
		</div>
	)
}
