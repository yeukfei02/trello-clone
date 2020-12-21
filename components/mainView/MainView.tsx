import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import faker from 'faker';
import moment from 'moment';

function MainView(): JSX.Element {
  const [todoData, setTodoData] = useState<any[]>([]);
  const [inProgressData, setInProgressData] = useState<any[]>([]);
  const [doneData, setDoneData] = useState<any[]>([]);

  useEffect(() => {
    getTododata();
    getInProgressData();
    getDoneData();
  }, []);

  const getTododata = () => {
    const todoDataList = [];

    for (let index = 0; index < 3; index++) {
      const obj = {
        id: faker.random.uuid(),
        imageUrl: faker.image.imageUrl(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        text: faker.lorem.words(),
        createdAt: faker.time.recent(),
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
        imageUrl: faker.image.imageUrl(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        text: faker.lorem.words(),
        createdAt: faker.time.recent(),
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
        imageUrl: faker.image.imageUrl(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        text: faker.lorem.words(),
        createdAt: faker.time.recent(),
      };
      doneDataList.push(obj);
    }
    setDoneData(doneDataList);
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
                      <div className="text-xs text-gray-500">
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

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-14">
            <div className="bg-gray-300 shadow overflow-hidden sm:rounded-lg">
              <div className="p-5">
                <h3 className="px-5 text-lg leading-6 font-medium text-gray-900">Todo</h3>

                <Droppable droppableId="todoData" type="Todo">
                  {(provided, _) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="my-5">
                      {renderItems(todoData)}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </div>

          <div className="p-14">
            <div className="bg-gray-300 shadow overflow-hidden sm:rounded-lg">
              <div className="p-5">
                <h3 className="px-5 text-lg leading-6 font-medium text-gray-900">In progress</h3>

                <Droppable droppableId="inProgressData" type="InProgress">
                  {(provided, _) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="my-5">
                      {renderItems(inProgressData)}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </div>

          <div className="p-14">
            <div className="bg-gray-300 shadow overflow-hidden sm:rounded-lg">
              <div className="p-5">
                <h3 className="px-5 text-lg leading-6 font-medium text-gray-900">Done</h3>

                <Droppable droppableId="doneData" type="Done">
                  {(provided, _) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="my-5">
                      {renderItems(doneData)}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

export default MainView;
