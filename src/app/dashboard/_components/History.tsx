'use client'

import { type UserSettings } from '@prisma/client'
import { useState } from 'react'

import type { TimeFrame } from '@/lib/types'

interface HistoryProps {
	userSettings: UserSettings
}

export default function History({ userSettings }: HistoryProps) {
	const [timeframe, setTimeframe] = useState<TimeFrame>('month')
	return <div>History</div>
}
