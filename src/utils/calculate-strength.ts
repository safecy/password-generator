import { MAX_SCORE } from '@/constants'
import { zxcvbn } from '@zxcvbn-ts/core'
import { determineRating } from './determine-rating'

export const calculateStrength = (password: string) => {
	const { score, crackTimesDisplay } = zxcvbn(password)

	const percentage = (score / MAX_SCORE) * 100
	const rating = determineRating(score)

	return { percentage, rating, cracktime: crackTimesDisplay.onlineNoThrottling10PerSecond }
}
