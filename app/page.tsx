import LoginButton from '@/components/auth/login-button'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-slate-100">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-bold drop-shadow-md">Auth</h1>
        <p className="text-lg">A simple authentication service</p>
        <div>
          <LoginButton>
            <Button size="lg">Sign in</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  )
}
