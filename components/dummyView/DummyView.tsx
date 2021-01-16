import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import faker from 'faker';
import moment from 'moment';
import Chance from 'chance';

const chance = new Chance();

function DummyView(): JSX.Element {
  const router = useRouter();

  const [rowsData, setRowsData] = useState<any[]>([]);
  const [todoData, setTodoData] = useState<any[]>([]);
  const [inProgressData, setInProgressData] = useState<any[]>([]);
  const [doneData, setDoneData] = useState<any[]>([]);

  useEffect(() => {
    getTododata();
    getInProgressData();
    getDoneData();
  }, []);

  useEffect(() => {
    if (todoData && inProgressData && doneData) {
      getRowsData();
    }
  }, [todoData, inProgressData, doneData]);

  const getTododata = () => {
    const todoDataList = [];

    for (let index = 0; index < 3; index++) {
      const obj = {
        id: faker.random.uuid(),
        imageUrl: faker.image.image(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        text: `${faker.random.words()} ${faker.random.words()}`,
        createdAt: moment.unix(chance.timestamp()).format('YYYY-MM-DD HH:mm:ss'),
      };
      todoDataList.push(obj);
    }
    setTodoData(todoDataList);
  };

  const getInProgressData = () => {
    const inProgressDataList = [];

    for (let index = 0; index < 3; index++) {
      const obj = {
        id: faker.random.uuid(),
        imageUrl: faker.image.image(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        text: `${faker.random.words()} ${faker.random.words()}`,
        createdAt: moment.unix(chance.timestamp()).format('YYYY-MM-DD HH:mm:ss'),
      };
      inProgressDataList.push(obj);
    }
    setInProgressData(inProgressDataList);
  };

  const getDoneData = () => {
    const doneDataList = [];

    for (let index = 0; index < 3; index++) {
      const obj = {
        id: faker.random.uuid(),
        imageUrl: faker.image.image(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        text: `${faker.random.words()} ${faker.random.words()}`,
        createdAt: moment.unix(chance.timestamp()).format('YYYY-MM-DD HH:mm:ss'),
      };
      doneDataList.push(obj);
    }
    setDoneData(doneDataList);
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
                    className="flex flex-row p-5 m-5 bg-white rounded hoverItem"
                    style={{ backgroundColor: snapshot.isDragging ? 'rgba(254, 202, 202, 1)' : '' }}
                  >
                    <img src={item.imageUrl} className="flex-shrink-0 w-10 h-10 rounded-full" />
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

  const handleLoginButtonClick = () => {
    router.push(`/login`);
  };

  const handleSignupButtonClick = () => {
    router.push(`/signup`);
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
          className="px-4 py-2 ml-5 text-sm font-medium text-white bg-pink-600 border-transparent rounded-md shadow-sm order hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          onClick={() => handleSignupButtonClick()}
        >
          Signup
        </button>
      </div>

      <div className="my-8 text-2xl font-bold text-center">
        This is dummy data view, please register/login to use this Trello Clone
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

export default DummyView;
