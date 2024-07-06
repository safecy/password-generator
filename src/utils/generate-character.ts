import { LOWERCASE, NUMBERS, SYMBOLS, UPPERCASE } from '@/constants'
import type { Type } from '@/types/Type'

export const generateCharacter = (type: Type) => {
	switch (type.id) {
		case 'uppercase':
			return UPPERCASE[Math.floor(Math.random() * UPPERCASE.length)]
		case 'lowercase':
			return LOWERCASE[Math.floor(Math.random() * LOWERCASE.length)]
		case 'numbers':
			return NUMBERS[Math.floor(Math.random() * NUMBERS.length)]
		case 'symbols':
			return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
		default:
			return ''
	}
}
