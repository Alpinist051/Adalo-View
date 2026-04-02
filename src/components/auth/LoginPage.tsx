import { FormEvent, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface LoginPageProps {
  onBack: () => void;
  onGoSignup: () => void;
  onLogin: (payload: { email: string; password: string }) => void;
}

export function LoginPage({ onBack, onGoSignup, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setError('');
    onLogin({ email: email.trim(), password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white px-4 py-6 sm:py-10 flex items-center">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <button
          type="button"
          className="mb-5 inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Welcome back</h1>
        <p className="mt-1 text-sm text-gray-600">Login to continue to your pet community.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 w-full rounded-xl border border-gray-300 px-3 text-sm outline-none transition focus:border-[#3457D5] focus:ring-2 focus:ring-blue-100"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-12 w-full rounded-xl border border-gray-300 px-3 text-sm outline-none transition focus:border-[#3457D5] focus:ring-2 focus:ring-blue-100"
              placeholder="Enter your password"
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <Button type="submit" className="mt-1 h-12 w-full bg-[#3457D5] text-white hover:bg-[#2f4cc0]">
            Login
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          New here?{' '}
          <button type="button" className="font-semibold text-[#3457D5]" onClick={onGoSignup}>
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}
