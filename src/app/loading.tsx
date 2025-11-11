import { Logo } from '@/components/layout/Logo';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="border-tango mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-t-transparent"></div>
        <Logo />
      </div>
    </div>
  );
}
