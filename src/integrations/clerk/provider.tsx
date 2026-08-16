import { ClerkProvider } from '@clerk/tanstack-react-start'
import { shadcn } from '@clerk/ui/themes'

const clerkAppearance = {
  theme: shadcn,
  variables: {
    borderRadius: '0.75rem',
    colorBorder: 'var(--border)',
    colorShadow: 'var(--shadow-color)',
    fontFamily: 'var(--font-sans)',
  },
  elements: {
    rootBox: 'w-full mx-auto',
    cardBox: 'shadow-md border border-border bg-card',
    headerTitle: 'text-foreground',
    headerSubtitle: 'text-muted-foreground',
    socialButtonsBlockButton:
      'border border-border bg-background text-foreground hover:bg-accent',
    formButtonPrimary:
      'bg-primary text-primary-foreground hover:bg-primary/80',
    footerActionLink: 'text-primary hover:text-primary/20',
  },
} as const

export default function AppClerkProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={clerkAppearance}>{children}</ClerkProvider>
  )
}
