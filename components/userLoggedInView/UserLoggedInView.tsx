import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import moment from 'moment';

import { getRootUrl } from '../../common/common';

const ROOT_URL = getRootUrl();

function UserLoggedInView(): JSX.Element {
  const router = useRouter();

  const [userDetails, setUserDetails] = useState('');

  const [rowsData, setRowsData] = useState<any[]>([]);
  const [todoData, setTodoData] = useState<any[]>([]);
  const [inProgressData, setInProgressData] = useState<any[]>([]);
  const [doneData, setDoneData] = useState<any[]>([]);

  useEffect(() => {
    getUserDetails();

    getTododata();
    getInProgressData();
    getDoneData();
  }, []);

  useEffect(() => {
    if (todoData && inProgressData && doneData) {
      getRowsData();
    }
  }, [todoData, inProgressData, doneData]);

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

  const getTododata = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (userId && token) {
      const response = await axios.post(
        `${ROOT_URL}`,
        {
          query: `
            query getTodoList ($userId: String!) {
                getTodoList (userId: $userId) {
                    message
                    todo {
                        id
                        userId
                        title
                        description
                        dataType
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

        setTodoData(responseData.data.getTodoList.todo);
      }
    }
  };

  const getInProgressData = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (userId && token) {
      const response = await axios.post(
        `${ROOT_URL}`,
        {
          query: `
            query getInProgressList ($userId: String!) {
                getInProgressList (userId: $userId) {
                    message
                    inProgress {
                        id
                        userId
                        title
                        description
                        dataType
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

        setInProgressData(responseData.data.getInProgressList.inProgress);
      }
    }
  };

  const getDoneData = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (userId && token) {
      const response = await axios.post(
        `${ROOT_URL}`,
        {
          query: `
            query getDoneList ($userId: String!) {
                getDoneList (userId: $userId) {
                    message
                    done {
                        id
                        userId
                        title
                        description
                        dataType
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

        setDoneData(responseData.data.getDoneList.done);
      }
    }
  };

  const getRowsData = () => {
    const item1 = {
      id: 'todo',
      content: (
        <div className="p-5">
          <div className="overflow-hidden bg-gray-300 shadow sm:rounded-lg">
            <div className="p-5">
              <h3 className="px-5 text-lg font-medium leading-6 text-gray-900">Todo</h3>

              <Droppable droppableId="todoData" type="Todo">
                {(provided, _) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {renderItems(todoData)}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </div>
      ),
    };
    const item2 = {
      id: 'inProgress',
      content: (
        <div className="p-5">
          <div className="overflow-hidden bg-gray-300 shadow sm:rounded-lg">
            <div className="p-5">
              <h3 className="px-5 text-lg font-medium leading-6 text-gray-900">In progress</h3>

              <Droppable droppableId="inProgressData" type="InProgress">
                {(provided, _) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {renderItems(inProgressData)}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </div>
      ),
    };
    const item3 = {
      id: 'done',
      content: (
        <div className="p-5">
          <div className="overflow-hidden bg-gray-300 shadow sm:rounded-lg">
            <div className="p-5">
              <h3 className="px-5 text-lg font-medium leading-6 text-gray-900">Done</h3>

              <Droppable droppableId="doneData" type="Done">
                {(provided, _) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {renderItems(doneData)}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </div>
      ),
    };
    const rowsList = [item1, item2, item3];
    setRowsData(rowsList);
  };

  const onDragEnd = (result: any) => {
    console.log('result = ', result);

    if (!result.destination) {
      return;
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const type = result.type;

    if (type) {
      switch (type) {
        case 'Rows':
          const newRowsDataList = reorder(rowsData, startIndex, endIndex);
          setRowsData(newRowsDataList);
          break;
        case 'Todo':
          const newTodoDataList = reorder(todoData, startIndex, endIndex);
          setTodoData(newTodoDataList);
          break;
        case 'InProgress':
          const newInprogressDataList = reorder(inProgressData, startIndex, endIndex);
          setInProgressData(newInprogressDataList);
          break;
        case 'Done':
          const newDoneDataList = reorder(doneData, startIndex, endIndex);
          setDoneData(newDoneDataList);
          break;
        default:
          break;
      }
    }
  };

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const renderItems = (dataList: any) => {
    let itemsList = null;

    if (dataList) {
      itemsList = dataList.map((item: any, index: number) => {
        return (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => {
              return (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <div
                    className="flex flex-col items-end p-5 m-5 bg-white rounded hoverItem"
                    style={{ backgroundColor: snapshot.isDragging ? 'rgba(254, 202, 202, 1)' : '' }}
                  >
                    {/* <img src={item.imageUrl} className="flex-shrink-0 w-10 h-10 rounded-full" /> */}
                    <div
                      className="w-8 h-8"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleDeleteButtonClick(item.id, item.dataType)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>

                    <div className="flex flex-col self-start mx-4">
                      <div className="text-lg">
                        <b>{item.title}</b>
                      </div>
                      <div className="my-2">{item.description}</div>
                      <div className="my-1 text-xs text-gray-500">
                        {moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          </Draggable>
        );
      });
    }

    return itemsList;
  };

  const handleDeleteButtonClick = async (id: string, dataType: string) => {
    switch (dataType) {
      case 'todo':
        await deleteTodoDataById(id);
        break;
      case 'inProgress':
        await deleteInProgressDataById(id);
        break;
      case 'done':
        await deleteDoneDataById(id);
        break;
      default:
        break;
    }
  };

  const deleteTodoDataById = async (id: string) => {
    const token = localStorage.getItem('token');

    if (token) {
      const response = await axios.post(
        `${ROOT_URL}`,
        {
          query: `
            mutation deleteTodoDataById ($id: String!) {
                deleteTodoDataById (id: $id) {
                    message
                }
            }
          `,
          variables: {
            id: id,
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
          await getTododata();
        }
      }
    }
  };

  const deleteInProgressDataById = async (id: string) => {
    const token = localStorage.getItem('token');

    if (token) {
      const response = await axios.post(
        `${ROOT_URL}`,
        {
          query: `
            mutation deleteInProgressDataById ($id: String!) {
                deleteInProgressDataById (id: $id) {
                    message
                }
            }
          `,
          variables: {
            id: id,
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
          await getInProgressData();
        }
      }
    }
  };

  const deleteDoneDataById = async (id: string) => {
    const token = localStorage.getItem('token');

    if (token) {
      const response = await axios.post(
        `${ROOT_URL}`,
        {
          query: `
            mutation deleteDoneDataById ($id: String!) {
                deleteDoneDataById (id: $id) {
                    message
                }
            }
          `,
          variables: {
            id: id,
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
          await getDoneData();
        }
      }
    }
  };

  const renderRows = (rowsData: any[]) => {
    let rows = null;

    if (rowsData) {
      rows = rowsData.map((item: any, index: number) => {
        return (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => {
              return (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <div
                    className="bg-white rounded hoverRowItem"
                    style={{ backgroundColor: snapshot.isDragging ? 'rgba(254, 202, 202, 1)' : '' }}
                  >
                    <div>{item.content}</div>
                  </div>
                </div>
              );
            }}
          </Draggable>
        );
      });
    }

    return rows;
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

  const handleAddItemButtonClick = () => {
    router.push(`/add-item`);
  };

  const handleChangePasswordButtonClick = () => {
    router.push(`/change-password`);
  };

  const handleLogoutButtonClick = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="m-10">
      <div className="flex flex-row justify-end mb-8">
        {renderUserDetailsCircle(userDetails)}

        <button
          type="button"
          className="px-4 py-2 ml-5 text-sm font-medium text-white bg-yellow-600 border-transparent rounded-md shadow-sm order hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          onClick={() => handleAddItemButtonClick()}
        >
          Add Item
        </button>

        <button
          type="button"
          className="px-4 py-2 ml-5 text-sm font-medium text-white bg-green-600 border-transparent rounded-md shadow-sm order hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={() => handleChangePasswordButtonClick()}
        >
          Change Password
        </button>

        <button
          type="button"
          className="px-4 py-2 ml-5 text-sm font-medium text-white bg-red-600 border-transparent rounded-md shadow-sm order hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={() => handleLogoutButtonClick()}
        >
          Logout
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="rows" type="Rows" direction="horizontal">
          {(provided, _) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <div className="grid gap-4 md:grid-cols-3">{renderRows(rowsData)}</div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default UserLoggedInView;
