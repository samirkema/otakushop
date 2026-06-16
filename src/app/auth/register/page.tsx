import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata = { title: 'Inscription — Otaku Shop' };

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Créer un compte</h1>
          <p className="text-gray-500 text-sm mt-1">Rejoignez la communauté Otaku Shop</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
