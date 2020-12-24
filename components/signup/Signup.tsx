import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { getRootUrl } from '../../common/common';

const ROOT_URL = getRootUrl();

function Signup(): JSX.Element {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

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

  const handleSignupSubmitButtonClick = async () => {
    if (email && password && firstName && lastName) {
      const response = await signupRequest(email, password, firstName, lastName);
      console.log('response = ', response);

      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.data.signup.message === 'signup') {
          setShowSuccessModal(true);
        } else {
          setShowErrorModal(true);
        }
      }
    }
  };

  const signupRequest = async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await axios.post(
      `${ROOT_URL}`,
      {
        query: `
          mutation signup($data: SignupInput!) {
            signup(data: $data) {
              message
            }
          }
        `,
        variables: {
          data: {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
          },
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response;
  };

  const renderSuccessModal = (showSuccessModal: boolean) => {
    let modal = null;

    if (showSuccessModal) {
      modal = (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      Signup success!
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">You can login now and start to use trello clone.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pink-600 text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleSuccessCloseButtonClick()}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return modal;
  };

  const renderErrorModal = (showErrorModal: boolean) => {
    let modal = null;

    if (showErrorModal) {
      modal = (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>

                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      Signup fail
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Signup fail, Email already exists</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pink-600 text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleErrorCloseButtonClick()}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return modal;
  };

  const handleSuccessCloseButtonClick = () => {
    setShowSuccessModal(false);
    router.push(`/`);
  };

  const handleErrorCloseButtonClick = () => {
    setShowErrorModal(false);
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

      {renderSuccessModal(showSuccessModal)}
      {renderErrorModal(showErrorModal)}
    </div>
  );
}

export default Signup;
