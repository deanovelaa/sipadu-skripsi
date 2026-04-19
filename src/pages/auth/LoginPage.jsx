import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('juan@gmail.com');
  const [password, setPassword] = useState('JUAN!!!2');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-[80px] px-[80px] sm:px-6 lg:px-8">
      <div className="max-w-[680px] w-full bg-white rounded-lg shadow-md p-[80px]">
        {/* Title */}
        <h1 className="flex items-center justify-center text-3xl font-bold text-gray-800 mb-2">
          Masuk
        </h1>
        
        {/* Subtitle */}
        <p className="flex items-center justify-center text-gray-600 mb-8">
          Masuk untuk melanjutkan ke layanan SIPADU
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Masukkan email Anda"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Kata Sandi
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                placeholder="Masukkan kata sandi Anda"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 3C5.5 3 1.73 5.61 0 9C1.73 12.39 5.5 15 10 15C14.5 15 18.27 12.39 20 9C18.27 5.61 14.5 3 10 3ZM10 13C7.24 13 5 10.76 5 8C5 5.24 7.24 3 10 3C12.76 3 15 5.24 15 8C15 10.76 12.76 13 10 13ZM10 5C8.34 5 7 6.34 7 8C7 9.66 8.34 11 10 11C11.66 11 13 9.66 13 8C13 6.34 11.66 5 10 5Z"
                      fill="currentColor"
                    />
                    <path
                      d="M2.5 2.5L17.5 17.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 3C5.5 3 1.73 5.61 0 9C1.73 12.39 5.5 15 10 15C14.5 15 18.27 12.39 20 9C18.27 5.61 14.5 3 10 3ZM10 13C7.24 13 5 10.76 5 8C5 5.24 7.24 3 10 3C12.76 3 15 5.24 15 8C15 10.76 12.76 13 10 13ZM10 5C8.34 5 7 6.34 7 8C7 9.66 8.34 11 10 11C11.66 11 13 9.66 13 8C13 6.34 11.66 5 10 5Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                Ingat Saya
              </label>
            </div>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-green-600 transition-colors"
            >
              Lupa Password?
            </a>
          </div>

          {/* Login Button */}
          <button
          onClick={() => navigate('/dtphp/dashboard')}
            type="submit"
            className="w-full bg-[#16A34A] text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Masuk
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Belum Punya Akun?{' '}
            <a
              href="#"
              className="text-[#16A34A] font-semibold hover:underline"
            >
              Daftar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

