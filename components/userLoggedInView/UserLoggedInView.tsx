import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

import { getRootUrl } from '../../common/common';

const ROOT_URL = getRootUrl();

function UserLoggedInView(): JSX.Element {
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

  const getTododata = () => {
    const todoDataList: any[] = [];
    setTodoData(todoDataList);
  };

  const getInProgressData = () => {
    const inProgressDataList: any[] = [];
    setInProgressData(inProgressDataList);
  };

  const getDoneData = () => {
    const doneDataList: any[] = [];
    setDoneData(doneDataList);
  };

  const getRowsData = () => {
    const item1 = {
      id: 'todo',
      content: (
        <div className="p-5">
          <div className="bg-gray-300 shadow overflow-hidden sm:rounded-lg">
            <div className="p-5">
              <h3 className="px-5 text-lg leading-6 font-medium text-gray-900">Todo</h3>

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
          <div className="bg-gray-300 shadow overflow-hidden sm:rounded-lg">
            <div className="p-5">
              <h3 className="px-5 text-lg leading-6 font-medium text-gray-900">In progress</h3>

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
          <div className="bg-gray-300 shadow overflow-hidden sm:rounded-lg">
            <div className="p-5">
              <h3 className="px-5 text-lg leading-6 font-medium text-gray-900">Done</h3>

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
                    className="flex flex-row bg-white p-5 m-5 rounded hoverItem"
                    style={{ backgroundColor: snapshot.isDragging ? 'rgba(254, 202, 202, 1)' : '' }}
                  >
                    <img src={item.imageUrl} className="flex-shrink-0 h-10 w-10 rounded-full" />
                    <div className="flex flex-col mx-4">
                      <div className="text-lg">
                        <b>
                          {item.firstName} {item.lastName}
                        </b>
                      </div>
                      <div className="my-2">{item.text}</div>
                      <div className="my-1 text-xs text-gray-500">{item.createdAt}</div>
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

  const handleLogoutButtonClick = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="m-10">
      <div className="flex flex-row justify-end mb-8">
        <div className="flex items-center font-bold text-lg">{userDetails}</div>

        <button
          type="button"
          className="px-4 py-2 ml-5 order border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={() => handleLogoutButtonClick()}
        >
          Logout
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="rows" type="Rows" direction="horizontal">
          {(provided, _) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <div className="grid md:grid-cols-3 gap-4">{renderRows(rowsData)}</div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default UserLoggedInView;