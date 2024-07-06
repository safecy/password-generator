type Feature = {
	title: string
	description: string
}

export const features: Feature[] = [
	{
		title: 'Customizable Length',
		description: 'Users can set the password length from 8 to 100 characters.'
	},
	{
		title: 'Character Type Selection',
		description:
			'Users can choose to include uppercase letters, lowercase letters, numbers, and symbols in their generated passwords.'
	},
	{
		title: 'Password Strength Indicator',
		description:
			'Displays the strength of the generated password with a progress bar and a textual rating (e.g., Very weak, Strong).'
	},
	{
		title: 'Estimated Crack Time',
		description: 'Provides an estimate of how long it would take to crack the generated password.'
	}
]
