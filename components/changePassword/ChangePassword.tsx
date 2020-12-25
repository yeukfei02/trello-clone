import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { getRootUrl } from '../../common/common';

const ROOT_URL = getRootUrl();

function ChangePassword(): JSX.Element {
  const router = useRouter();

  const [userDetails, setUserDetails] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const userDetailsStr = localStorage.getItem('userDetailsStr');

    if (!userDetailsStr && userId) {
      const response = await axios.post(
        `${ROOT_URL}`,
        {
          query: `
                  query getUserDetails($userId: String!) {
                      getUserDetails(userId: $userId) {
                      message
                      userDetails {
                          id
                          email
                          firstName
                          lastName
                          createdAt
                          updatedAt
                      }
                      }
                  }
                `,
          variables: {
            userId: userId,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response) {
        const responseData = response.data;
        console.log('responseData = ', responseData);

        const userDetails = responseData.data.getUserDetails.userDetails;
        const resultStr = userDetails.firstName.substring(0, 1);
        localStorage.setItem('userDetailsStr', resultStr);
        setUserDetails(resultStr);
      }
    } else {
      if (userDetailsStr) setUserDetails(userDetailsStr);
    }
  };

  const handleCurrentPasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleChangePasswordSubmitButtonClick = async () => {
    await changePasswordRequest();
  };

  const changePasswordRequest = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (userId && token) {
      const response = await axios.post(
        `${ROOT_URL}`,
        {
          query: `
            mutation changePassword ($data: ChangePasswordInput!) {
                changePassword (data: $data) {
                    message
                }
            }
          `,
          variables: {
            data: {
              id: userId,
              currentPassword: currentPassword,
              newPassword: newPassword,
            },
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response) {
        const responseData = response.data;
        console.log('responseData = ', responseData);

        if (responseData.data) {
          if (responseData.data.changePassword.message === 'changePassword') {
            setShowSuccessModal(true);
            setTimeout(() => {
              router.push(`/`);
            }, 1500);
          } else {
            setShowErrorModal(true);
          }
        }
      }
    }
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
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      Change password success!
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">You can login with this new password again.</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
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
                      Change password fail
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Wrong current password</p>
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

  const renderUserDetailsCircle = (userDetails: string) => {
    let userDetailsCircle = null;

    if (userDetails) {
      userDetailsCircle = (
        <div className="flex-shrink-0 h-10 w-10">
          <div className="h-10 w-10 rounded-full bg-purple-500 flex justify-center items-center">
            <div className="text-white text-xl font-bold">{userDetails}</div>
          </div>
        </div>
      );
    }

    return userDetailsCircle;
  };

  // const handleSuccessCloseButtonClick = () => {
  //   router.push(`/`);
  // };

  const handleErrorCloseButtonClick = () => {
    setShowErrorModal(false);
  };

  const handleLogoutButtonClick = () => {
    localStorage.clear();
    router.push(`/`);
  };

  const handleBackArrowClick = () => {
    router.push(`/`);
  };

  return (
    <div className="m-10">
      <div className="flex flex-row justify-between mb-8">
        <div className="h-6 w-6 self-center" style={{ cursor: 'pointer' }} onClick={() => handleBackArrowClick()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>

        <div className="flex flex-row">
          {renderUserDetailsCircle(userDetails)}

          <button
            type="button"
            className="px-4 py-2 ml-5 order border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={() => handleLogoutButtonClick()}
          >
            Logout
          </button>
        </div>
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
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                placeholder="Current Password"
                onChange={(e) => handleCurrentPasswordInputChange(e)}
                className="mt-3 p-3 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md"
              />
            </div>

            <div className="mt-5">
              <label htmlFor="description" className="block text-lg font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="mt-3 p-3 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md"
                placeholder="New Password"
                onChange={(e) => handleNewPasswordInputChange(e)}
              />
            </div>
          </div>
          <div className="p-5 bg-gray-100">
            <button
              type="button"
              onClick={() => handleChangePasswordSubmitButtonClick()}
              className="inline-flex justify-center py-2 px-4 w-full border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {renderSuccessModal(showSuccessModal)}
      {renderErrorModal(showErrorModal)}
    </div>
  );
}

export default ChangePassword;
