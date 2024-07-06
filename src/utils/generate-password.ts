import type { Type } from '@/types/Type'
import { generateCharacter } from './generate-character'
import { shuffle } from './shuffle'

export const generatePassword = (length: number, types: Type[]) => {
	let password = ''
	for (let i = 0; i < length; i++) {
		const randomType = types[Math.floor(Math.random() * types.length)]
		password += generateCharacter(randomType)
	}
	password = shuffle(password)
	return password
}
