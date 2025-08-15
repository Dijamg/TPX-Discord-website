import { useEffect, useRef, useState } from 'react'

type RevealProps = {
	children: React.ReactNode
	delayMs?: number
	className?: string
}

const Reveal = ({ children, delayMs = 0, className = '' }: RevealProps) => {
	const rootRef = useRef<HTMLDivElement | null>(null)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const node = rootRef.current
		if (!node) return

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsVisible(true)
						observer.unobserve(entry.target)
					}
				})
			},
			{ threshold: 0.15 }
		)

		observer.observe(node)
		return () => observer.disconnect()
	}, [])

	return (
		<div
			ref={rootRef}
			className={`${className} transition-all duration-700 ease-out will-change-transform will-change-opacity ${
				isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
			}`}
			style={{ transitionDelay: `${delayMs}ms` }}
		>
			{children}
		</div>
	)
}

export default Reveal