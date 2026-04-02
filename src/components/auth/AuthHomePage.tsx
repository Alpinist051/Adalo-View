import { Dog, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

interface AuthHomePageProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

export function AuthHomePage({ onLoginClick, onSignupClick }: AuthHomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 px-5 py-10 sm:px-8 sm:py-14 flex items-center">
      <div className="mx-auto grid w-full max-w-5xl gap-5 lg:grid-cols-2 lg:gap-7">
        <section className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm sm:p-9">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Dog className="h-6 w-6 text-[#3457D5]" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-700">Welcome to</p>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Pawchio</h1>
            </div>
          </div>

          <p className="mb-6 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
            Share pet moments, discover nearby pet buddies, and track healthy activities in one place.
          </p>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start gap-3 rounded-2xl border border-gray-100 p-4">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
              <p className="text-sm text-gray-700 sm:text-[15px]">
                Beautiful pet feed and profile pages optimized for mobile previews.
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-gray-100 p-4">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
              <p className="text-sm text-gray-700 sm:text-[15px]">
                Simple account access with login and signup screens.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-9">
          <h2 className="text-xl font-semibold text-gray-900">Get Started</h2>
          <p className="mt-1 text-sm text-gray-600">Continue with your account to open the app.</p>

          <div className="mt-6 space-y-3">
            <Button className="h-10 w-full bg-[#3457D5] text-white hover:bg-[#2f4cc0]" onClick={onLoginClick}>
              Login
            </Button>
            <Button
              variant="outline"
              className="h-10 w-full border-[#3457D5] text-[#3457D5] hover:bg-blue-50"
              onClick={onSignupClick}
            >
              Create an account
            </Button>
          </div>

          <p className="mt-4 text-center text-xs text-gray-500">
            By continuing, you agree to a friendly and safe community experience.
          </p>
        </section>
      </div>
    </div>
  );
}
