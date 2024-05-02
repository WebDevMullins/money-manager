export const currencies = [
	{ value: 'USD', label: '$ US Dollar', locale: 'en-US' },
	{ value: 'EUR', label: '€ Euro', locale: 'en-US' },
	{ value: 'GBP', label: '£ Pound', locale: 'en-GB' },
	{ value: 'CAD', label: '$ Canadian Dollar', locale: 'en-CA' }
]

export type Currency = (typeof currencies)[number]
