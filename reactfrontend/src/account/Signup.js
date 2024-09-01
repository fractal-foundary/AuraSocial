import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useConfig } from '../auth';
import { signUp } from '../lib/allauth';
import FormErrors from '../components/FormErrors';
import ProviderList from '../socialaccount/ProviderList';
import Button from '../components/Button';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [password2Errors, setPassword2Errors] = useState([]);
  const [response, setResponse] = useState({ fetching: false, content: null });
  const config = useConfig();
  const hasProviders = config.data.socialaccount.providers.length > 0;
  console.log(hasProviders)

  function submit() {
    if (password2 !== password1) {
      setPassword2Errors([{ param: 'password2', message: 'Password does not match.' }]);
      return;
    }
    setPassword2Errors([]);
    setResponse({ ...response, fetching: true });
    signUp({ email, password: password1 })
      .then((content) => {
        setResponse((r) => ({ ...r, content }));
      })
      .catch((e) => {
        console.error(e);
        window.alert(e);
      })
      .then(() => {
        setResponse((r) => ({ ...r, fetching: false }));
      });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-white-900">Sign Up</h1>
        <p className="mt-2 text-center text-sm text-white-600">
          Already have an account?{' '}
          <Link to="/account/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Login here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <FormErrors errors={response.content?.errors} />

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); submit(); }}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <FormErrors param="email" errors={response.content?.errors} />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <FormErrors param="password" errors={response.content?.errors} />
            </div>

            <div>
              <label htmlFor="password2" className="block text-sm font-medium text-white-700">
                Password (again)
              </label>
              <div className="mt-1">
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <FormErrors param="password2" errors={password2Errors} />
            </div>

            <div>
              <Button
                type="submit"
                disabled={response.fetching}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </Button>
            </div>
          </form>

          {hasProviders && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-white-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <ProviderList callbackURL="/account/provider/callback" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}