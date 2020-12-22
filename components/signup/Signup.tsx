import React, { useState } from 'react';
import { useRouter } from 'next/router';

function Signup(): JSX.Element {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleLoginButtonClick = () => {
    router.push(`/login`);
  };

  const handleSignupButtonClick = () => {
    router.push(`/signup`);
  };

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleFirstNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleSignupSubmitButtonClick = () => {
    if (email && password && firstName && lastName) {
      console.log(email, password, firstName, lastName);
    }
  };

  return (
    <div className="m-10">
      <div className="flex flex-row justify-end mb-8">
        <button
          type="button"
          className="px-4 py-2 order border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={() => handleLoginButtonClick()}
        >
          Login
        </button>

        <button
          type="button"
          className="px-4 py-2 ml-5 order border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          onClick={() => handleSignupButtonClick()}
        >
          Signup
        </button>
      </div>

      <div className="container m-auto max-w-3xl">
        <div className="shadow overflow-hidden rounded-lg">
          <div className="p-8 bg-gray-200">
            <div>
              <img src="/favicon.png" className="m-auto h-20 w-20" />
              <div className="text-2xl text-center my-5 font-bold">Trello Clone</div>
            </div>

            <div className="mt-5">
              <label htmlFor="firstName" className="block text-lg font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={(e) => handleEmailInputChange(e)}
                className="mt-3 p-3 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-pink-300 rounded-md"
              />
            </div>

            <div className="mt-5">
              <label htmlFor="firstName" className="block text-lg font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={(e) => handlePasswordInputChange(e)}
                className="mt-3 p-3 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-pink-300 rounded-md"
              />
            </div>

            <div className="mt-5">
              <label htmlFor="firstName" className="block text-lg font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                onChange={(e) => handleFirstNameInputChange(e)}
                className="mt-3 p-3 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-pink-300 rounded-md"
              />
            </div>

            <div className="mt-5">
              <label htmlFor="firstName" className="block text-lg font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                onChange={(e) => handleLastNameInputChange(e)}
                className="mt-3 p-3 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-pink-300 rounded-md"
              />
            </div>
          </div>
          <div className="p-5 bg-gray-100">
            <button
              type="button"
              onClick={() => handleSignupSubmitButtonClick()}
              className="inline-flex justify-center py-2 px-4 w-full border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
