import React, { useState } from "react";
import "./App.css";
import TodolistHook from "./components/TodoListHook/TodolistHook"; // 函数组件
import { TodoItemObject } from "./types/CommonType";

interface AppState {
  keyID: number;
  inputValue: string;
  listData: TodoItemObject[];
}

// 函数组件
function App() {
  const [listData, setListData] = useState<TodoItemObject[]>([]);
  const [keyID, setkeyID] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");

  
  return (
    <div className="App">
      <input type="text" value={inputValue} onChange={handleChange} />
      <button onClick={Add}>添加</button>
      <TodolistHook listData={listData} onDelete={deleteHandle} />
    </div>
  );


  function Add() {
    if (inputValue === "") {
      alert("输入不应为空");
      return;
    }
    const newValue: TodoItemObject = {
      id: keyID,
      checked: false,
      content: inputValue,
    };
    const newListData = [...listData, newValue]; // listData.push(newValue) setListData(listData);错误，不应直接操作原来的数据，不纯
    setListData(newListData);
    setkeyID(keyID + 1);
    setInputValue("");
  }
  function deleteHandle(id: number) {
    const newListData = listData.filter((item) => {
      // map(),filter()不会改变原始数组。
      return item.id !== id;
    });
    setListData(newListData);
    // listData.splice(index,1)错误，不应直接操作原来的数据，不纯
    // setListData([...listData])
  }
  function handleChange(event: any) {
    setInputValue(event.target.value);
  }
}
export { App };
