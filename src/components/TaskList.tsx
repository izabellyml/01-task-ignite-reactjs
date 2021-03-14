import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle) return; //se entrar na função com o valor vazio já retorna
    
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }
    
    setTasks(oldState => [...oldState, newTask]); //adicionar um item novo na lista (pega a lista antiga e adiciona o item novo)
    setNewTaskTitle(''); //limpar o input 

  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    const editTask = tasks.map(task => task.id == id ? {
      ...task,
      isComplete: !task.isComplete //pega o mesmo objeto porém coloca o contrário, para booleanos :)
    } : task);

    setTasks(editTask);

  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    //o filter pega todos os itens, exceto o item com o id setado
    const filteredTasks = tasks.filter(task => task.id != id); 
     

    setTasks(filteredTasks); //apenas passar para o estado novo o array que está sem o item setado
    
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}