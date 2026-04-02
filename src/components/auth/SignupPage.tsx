import { FormEvent, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface SignupPageProps {
  onBack: () => void;
  onGoLogin: () => void;
  onSignup: (payload: { fullName: string; email: string; password: string }) => void;
}

export function SignupPage({ onBack, onGoLogin, onSignup }: SignupPageProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please complete all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError('');
    onSignup({ fullName: fullName.trim(), email: email.trim(), password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white px-4 py-6 sm:py-10 flex items-center">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <button
          type="button"
          className="mb-5 inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Create account</h1>
        <p className="mt-1 text-sm text-gray-600">Sign up to start exploring Pawchio.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="signup-name">
              Full name
            </label>
            <input
              id="signup-name"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="h-12 w-full rounded-xl border border-gray-300 px-3 text-sm outline-none transition focus:border-[#3457D5] focus:ring-2 focus:ring-blue-100"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="signup-email">
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 w-full rounded-xl border border-gray-300 px-3 text-sm outline-none transition focus:border-[#3457D5] focus:ring-2 focus:ring-blue-100"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="signup-password">
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-12 w-full rounded-xl border border-gray-300 px-3 text-sm outline-none transition focus:border-[#3457D5] focus:ring-2 focus:ring-blue-100"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="signup-confirm-password">
              Confirm password
            </label>
            <input
              id="signup-confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="h-12 w-full rounded-xl border border-gray-300 px-3 text-sm outline-none transition focus:border-[#3457D5] focus:ring-2 focus:ring-blue-100"
              placeholder="Confirm your password"
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <Button type="submit" className="mt-1 h-12 w-full bg-[#3457D5] text-white hover:bg-[#2f4cc0]">
            Sign up
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button type="button" className="font-semibold text-[#3457D5]" onClick={onGoLogin}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
