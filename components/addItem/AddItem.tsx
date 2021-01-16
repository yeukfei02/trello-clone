import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { getRootUrl } from '../../common/common';

const ROOT_URL = getRootUrl();

function UserLoggedInView(): JSX.Element {
  const router = useRouter();

  const [userDetails, setUserDetails] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('todo');

  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleTypeDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const handleAddItemSubmitButtonClick = async () => {
    if (title && description && type) {
      switch (type) {
        case 'todo':
          await addTodoData();
          break;
        case 'inProgress':
          await addInProgressData();
          break;
        case 'done':
          await addDoneData();
          break;
        default:
          break;
      }
      setShowSuccessModal(true);
      setTimeout(() => {
        router.push(`/`);
      }, 1500);
    }
  };

  const addTodoData = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (userId && token) {
      const response = await axios.post(
        `${ROOT_URL}`,
        {
          query: `
            mutation addTodoData ($data: AddTodoDataInput!) {
                addTodoData (data: $data) {
                    message
                }
            }
          `,
          variables: {
            data: {
              userId: userId,
              title: title,
              description: description,
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
      }
    }
  };

  const addInProgressData = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (userId && token) {
      const response = await axios.post(
        `${ROOT_URL}`,
        {
          query: `
            mutation addInProgressData ($data: AddInProgressDataInput!) {
                addInProgressData (data: $data) {
                    message
                }
            }
          `,
          variables: {
            data: {
              userId: userId,
              title: title,
              description: description,
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
      }
    }
  };

  const addDoneData = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (userId && token) {
      const response = await axios.post(
        `${ROOT_URL}`,
        {
          query: `
            mutation addDoneData ($data: AddDoneDataInput!) {
                addDoneData (data: $data) {
                    message
                }
            }
          `,
          variables: {
            data: {
              userId: userId,
              title: title,
              description: description,
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
      }
    }
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
                      Add Item success!
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">You can back and check the new item now.</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
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

  const renderUserDetailsCircle = (userDetails: string) => {
    let userDetailsCircle = null;

    if (userDetails) {
      userDetailsCircle = (
        <div className="flex-shrink-0 w-10 h-10">
          <div className="flex items-center justify-center w-10 h-10 bg-purple-500 rounded-full">
            <div className="text-xl font-bold text-white">{userDetails}</div>
          </div>
        </div>
      );
    }

    return userDetailsCircle;
  };

  // const handleSuccessCloseButtonClick = () => {
  //   router.push(`/`);
  // };

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
        <div className="self-center w-6 h-6" style={{ cursor: 'pointer' }} onClick={() => handleBackArrowClick()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>

        <div className="flex flex-row">
          {renderUserDetailsCircle(userDetails)}

          <button
            type="button"
            className="px-4 py-2 ml-5 text-sm font-medium text-white bg-red-600 border-transparent rounded-md shadow-sm order hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={() => handleLogoutButtonClick()}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="container max-w-3xl m-auto">
        <div className="overflow-hidden rounded-lg shadow">
          <div className="p-8 bg-gray-200">
            <div>
              <img src="/favicon.png" className="w-20 h-20 m-auto" />
              <div className="my-5 text-2xl font-bold text-center">Trello Clone</div>
            </div>

            <div className="mt-5">
              <label htmlFor="firstName" className="block text-lg font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                onChange={(e) => handleTitleInputChange(e)}
                className="block w-full p-3 mt-3 border-red-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>

            <div className="mt-5">
              <label htmlFor="description" className="block text-lg font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                className="block w-full p-3 mt-3 border-red-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Description"
                onChange={(e) => handleDescriptionInputChange(e)}
              ></textarea>
            </div>

            <div className="mt-5">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                id="type"
                name="type"
                value={type}
                onChange={(e) => handleTypeDropdownChange(e)}
                className="block w-full p-3 mt-3 border-red-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
              >
                <option value="todo">Todo</option>
                <option value="inProgress">In progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
          <div className="p-5 bg-gray-100">
            <button
              type="button"
              onClick={() => handleAddItemSubmitButtonClick()}
              className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Add Item
            </button>
          </div>
        </div>
      </div>

      {renderSuccessModal(showSuccessModal)}
    </div>
  );
}

export default UserLoggedInView;
