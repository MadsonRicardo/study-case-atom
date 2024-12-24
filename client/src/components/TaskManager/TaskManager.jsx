import React, { useState, useEffect } from "react";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(""); 
  const [editIndex, setEditIndex] = useState(null); 
  const [editValue, setEditValue] = useState(""); 

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, newTask.trim()]);
    setNewTask("");
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index]);
  };

  const saveEdit = () => {
    if (editValue.trim() === "") return;
    const updatedTasks = [...tasks];
    updatedTasks[editIndex] = editValue.trim();
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <div className="task-manager">
      <h2>Gerenciador de Tarefas</h2>
      <div className="add-task">
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type='button' onClick={addTask}>Adicionar</button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index}>
            {editIndex === index ? (
              <div className="edit-task">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button type='button' onClick={saveEdit}>Salvar</button>
                <button type='button' onClick={() => setEditIndex(null)}>Cancelar</button>
              </div>
            ) : (
              <div className="task">
                <span>{task}</span>
                <button type='button' onClick={() => startEdit(index)}>Editar</button>
                <button type='button' onClick={() => removeTask(index)}>Remover</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
