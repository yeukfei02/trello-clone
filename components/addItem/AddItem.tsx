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

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

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
      const resultStr = `${userDetails.firstName} ${userDetails.lastName} (${userDetails.email})`;
      setUserDetails(resultStr);
    }
  };

  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleTypeDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const handleAddItemSubmitButtonClick = () => {
    if (title && description && type) {
      router.push(`/`);
    }
  };

  const handleLogoutButtonClick = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleBackArrowClick = () => {
    router.push(`/`);
  };

  return (
    <div className="m-10">
      <div className="flex flex-row justify-between mb-8">
        <div className="h-8 w-8 self-center" style={{ cursor: 'pointer' }} onClick={() => handleBackArrowClick()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>

        <div className="flex flex-row">
          <div className="flex items-center font-bold text-lg">{userDetails}</div>

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
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                onChange={(e) => handleTitleInputChange(e)}
                className="mt-3 p-3 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md"
              />
            </div>

            <div className="mt-5">
              <label htmlFor="firstName" className="block text-lg font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Description"
                onChange={(e) => handleDescriptionInputChange(e)}
                className="mt-3 p-3 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md"
              />
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
                className="mt-3 p-3 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md"
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
              className="inline-flex justify-center py-2 px-4 w-full border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLoggedInView;
