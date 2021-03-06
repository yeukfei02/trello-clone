import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { getRootUrl } from '../../common/common';

const ROOT_URL = getRootUrl();

function Login(): JSX.Element {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const handleEmailInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (email && password) {
        handleLoginSubmitButtonClick();
      }
    }
  };

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (email && password) {
        handleLoginSubmitButtonClick();
      }
    }
  };

  const handleLoginSubmitButtonClick = async () => {
    if (email && password) {
      const response = await loginRequest(email, password);
      console.log('response = ', response);

      if (response) {
        const responseData = response.data;
        if (responseData.data && responseData.data.login.message === 'login') {
          const token = responseData.data.login.token;
          const userId = responseData.data.login.userId;
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);

          setShowSuccessModal(true);
          setTimeout(() => {
            router.push(`/`);
          }, 1500);
        } else {
          setShowErrorModal(true);
        }
      }
    }
  };

  const loginRequest = async (email: string, password: string) => {
    const response = await axios.post(
      `${ROOT_URL}`,
      {
        query: `
          mutation login($data: LoginInput!) {
            login(data: $data) {
              message
              token
              userId
            }
          }
        `,
        variables: {
          data: {
            email: email,
            password: password,
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
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div
              className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-green-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="w-6 h-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-headline">
                      Login success!
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">You can start to use trello clone now.</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleSuccessCloseButtonClick()}
                >
                  Close
                </button>
              </div> */}
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
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div
              className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="w-6 h-6 text-red-600"
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
                    <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-headline">
                      Login fail
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Wrong password</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
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

  // const handleSuccessCloseButtonClick = () => {
  //   setShowSuccessModal(false);
  //   router.push(`/`);
  // };

  const handleErrorCloseButtonClick = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="m-10">
      <div className="flex flex-row justify-end mb-8">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 border-transparent rounded-md shadow-sm order hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={() => handleLoginButtonClick()}
        >
          Login
        </button>

        <button
          type="button"
          className="px-4 py-2 ml-5 text-sm font-medium text-white bg-red-600 border-transparent rounded-md shadow-sm order hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={() => handleSignupButtonClick()}
        >
          Signup
        </button>
      </div>

      <div className="container max-w-3xl m-auto">
        <div className="overflow-hidden rounded-lg shadow">
          <div className="p-8 bg-gray-200">
            <div>
              <img src="/favicon.png" className="w-20 h-20 m-auto" />
              <div className="my-5 text-2xl font-bold text-center">Trello Clone</div>
            </div>

            <div className="mt-5">
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={(e) => handleEmailInputChange(e)}
                onKeyUp={(e) => handleEmailInputKeyUp(e)}
                className="block w-full p-3 mt-3 border-red-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>

            <div className="mt-5">
              <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={(e) => handlePasswordInputChange(e)}
                onKeyUp={(e) => handlePasswordInputKeyUp(e)}
                className="block w-full p-3 mt-3 border-red-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="p-5 bg-gray-100">
            <button
              type="button"
              onClick={() => handleLoginSubmitButtonClick()}
              className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {renderSuccessModal(showSuccessModal)}
      {renderErrorModal(showErrorModal)}
    </div>
  );
}

export default Login;
