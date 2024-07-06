import { Progress } from '@/components/ui/progress'
import type { Password } from '@/types/Password'
import type { Type } from '@/types/Type'
import { calculateStrength } from '@/utils/calculate-strength'
import { generatePassword } from '@/utils/generate-password'
import { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import { Label } from './ui/label'

export default function GenerateCard() {
	const [password, setPassword] = useState<Password>({
		value: '',
		strength: { percentage: 0, rating: '', cracktime: '' }
	})
	const [length, setLength] = useState<number>(20)
	const [types, setTypes] = useState<Type[]>([
		{ id: 'uppercase', label: 'Uppercase', checked: true },
		{ id: 'lowercase', label: 'Lowercase', checked: true },
		{ id: 'numbers', label: 'Numbers', checked: true },
		{ id: 'symbols', label: 'Symbols', checked: false }
	])
	const [copyLabel, setCopyLabel] = useState<string>('Copy')
	const [typeError, setTypeError] = useState<string | null>(null)

	const handleGenerate = useCallback(() => {
		const typesChecked = types.filter((type) => type.checked)
		const value = generatePassword(length, typesChecked)
		const strength = calculateStrength(value)
		return { value, strength }
	}, [length, types])

	const handleTypeError = (types: Type[]) => {
		const checkedTypes = types.filter((type) => type.checked)
		if (checkedTypes.length === 0) {
			setTypeError('Please select at least one character type.')
			return true
		} else {
			setTypeError(null)
			return false
		}
	}

	const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLength(parseInt(event.target.value))
	}

	const handleTypeChange = (type: Type) => {
		const newTypes = types.map((t) => (t.id === type.id ? { ...t, checked: !t.checked } : t))
		if (!handleTypeError(newTypes)) {
			setTypes(newTypes)
		}
	}

	const copyToClipboard = (value: string) => {
		navigator.clipboard.writeText(value)
		setCopyLabel('Copied!')
		setTimeout(() => {
			setCopyLabel('Copy')
		}, 2000)
	}

	useEffect(() => {
		if (length < 8) setLength(8)
		if (length > 100) setLength(100)

		const { value, strength } = handleGenerate()
		setPassword({ value, strength })
	}, [length, types])

	return (
		<Card className="my-8">
			<CardHeader>
				<CardTitle>Generate Password</CardTitle>
				<CardDescription>Customize the password length and character types to suit your needs.</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="grid grid-cols-[1fr_auto] items-center gap-4">
					<Input
						name="password"
						type="text"
						value={password.value}
						readOnly
						aria-label="Generated Password"
						className="rounded-md bg-muted px-4 py-2 text-muted-foreground"
					/>
					<Button onClick={() => copyToClipboard(password.value)}>{copyLabel}</Button>
				</div>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="length">Password Length</Label>
						<Input
							name="length"
							type="number"
							min="8"
							max="100"
							value={length}
							aria-label="Password Length"
							className="rounded-md bg-muted px-4 py-2 text-muted-foreground"
							onChange={handleLengthChange}
						/>
					</div>
					<div className="space-y-4 flex flex-col">
						<Label>Character Types</Label>
						<div className="grid grid-cols-2 gap-2">
							{types.map((type) => (
								<div key={type.id} className="flex items-center gap-2">
									<Checkbox
										name={type.id}
										checked={type.checked}
										onCheckedChange={() => handleTypeChange(type)}
										aria-label={type.label}
									/>
									<Label htmlFor={type.id} className="text-foreground">
										{type.label}
									</Label>
								</div>
							))}
						</div>
						<small className={typeError ? 'text-destructive' : 'text-muted-foreground'}>
							Select at least one character type.
						</small>
					</div>
				</div>
				<div className="space-y-2">
					<Label htmlFor="strength">Password Strength</Label>
					<div className="flex items-center gap-2">
						<Progress value={password.strength.percentage} aria-label="Password Strength" />
						<p className="text-muted-foreground min-w-fit">{password.strength.rating}</p>
					</div>
				</div>
				<div className="space-y-2">
					<Label htmlFor="strength">
						Estimated time to crack:{' '}
						<span className="text-muted-foreground min-w-fit">{password.strength.cracktime}</span>
					</Label>
				</div>
			</CardContent>
			<CardFooter className="flex flex-col gap-4">
				<Button className="w-full" onClick={() => setPassword(handleGenerate())}>
					Generate Password
				</Button>
				<small className="text-muted-foreground">
					Password strength estimator by <span className="text-primary">zxcvbn</span>
				</small>
			</CardFooter>
		</Card>
	)
}
