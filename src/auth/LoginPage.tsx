import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginAdmin } from '../queries/Auth';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonLoader from '../components/ButtonLoader';

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: loginAdmin, // API call function
    onSuccess: (data) => {
      if (!data?.data) {
        toast.error("Login failed. No data received.");
        return;
      }
      const { user, token } = data.data;

      // Store user session in context
      login({ user, token });
      toast.success("Login successful!");
      navigate("/dashboard"); // Redirect after login
    },
    onError: (error: any) => {
      console.error("Login Error:", error);
      toast.error(error?.response?.data?.message || error.message || "Login failed.");
    },
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: values => {
      handleLogin(values);
      console.log('Login submitted:', values);
    },
  });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Side - Background with logo */}
      <div className="w-[60%] bg-gradient-to-br from-purple-900 to-orange-900 flex items-center justify-center">
        <div className="border-2 border-white rounded-full h-48 w-48 flex items-center justify-center text-white text-xl font-semibold">
          LOGO
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-[40%] bg-white flex items-center justify-center">
        <div className="w-full max-w-md p-10 rounded-lg border border-gray-200 shadow-md">
          <h1 className="text-3xl font-bold text-center mb-1">Login</h1>
          <p className="text-center text-gray-500 mb-6">Login to the admin dashboard</p>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Enter email address"
                className={`mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"} // Toggle input type
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="Enter password"
                  className={`mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 cursor-pointer"
                  onClick={togglePasswordVisibility} // Toggle visibility on click
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-5 h-5' color="#ffffff" fill="none">
                      <path d="M19.439 15.439C20.3636 14.5212 21.0775 13.6091 21.544 12.955C21.848 12.5287 22 12.3155 22 12C22 11.6845 21.848 11.4713 21.544 11.045C20.1779 9.12944 16.6892 5 12 5C11.0922 5 10.2294 5.15476 9.41827 5.41827M6.74742 6.74742C4.73118 8.1072 3.24215 9.94266 2.45604 11.045C2.15201 11.4713 2 11.6845 2 12C2 12.3155 2.15201 12.5287 2.45604 12.955C3.8221 14.8706 7.31078 19 12 19C13.9908 19 15.7651 18.2557 17.2526 17.2526" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M9.85786 10C9.32783 10.53 9 11.2623 9 12.0711C9 13.6887 10.3113 15 11.9289 15C12.7377 15 13.47 14.6722 14 14.1421" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                      <path d="M3 3L21 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 011.875-4.825M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5" />
                    </svg>
                  )}
                </div>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
              )}
            </div>

            <button type="submit" disabled={isPending} className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-md transition-all">
              {isPending ? <ButtonLoader /> : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
