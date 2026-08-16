import { SignIn, useAuth } from '@clerk/tanstack-react-start'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/sign-in/$')({
  component: SignInPage,
})

function SignInPage() {
  const { isLoaded } = useAuth()

  if (!isLoaded) {
    return (
      <div className="flex w-full justify-center">
        <div className="h-[500px] w-full max-w-[450px] animate-pulse rounded-xl border bg-muted/60" />
      </div>
    )
  }

  return (
    <div className="flex w-full justify-center">
      <SignIn />
    </div>
  )
}
