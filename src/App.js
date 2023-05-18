import './style.css';
import {useState} from "react";

//media
import { RiSendPlane2Line } from 'react-icons/ri';
import { MdOutlineDoneOutline } from 'react-icons/md';
import { MdNotificationImportant } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

const App = () => {
  const [tasks, setTasks] = useState([
  {
    id: 1,
    title: 'text1',
    isDone: false,
    isImportant: false,
  },
  {
    id: 2,
    title: 'text2',
    isDone: false,
    isImportant: false,
  },
]);
  const [status, setStatus] = useState('All')
  const addTasks = (e) => {
    e.preventDefault()
    e.target[0].value !== '' ?
        setTasks([...tasks, {
          id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
          title: e.target[0].value,
          isDone: false,
          isImportant: false,
        }]) :
        e.target[0].value = '';
    e.target[0].value = ''
  }
  const deleteTasks = (id) => {
    setTasks(tasks.filter((item) => {            return item.id !== id
    }))
  }
  const doneHandler = (id) => {
    setTasks(tasks.map((item) => {
      return item.id === id ? {...item,
        isDone: !item.isDone
      } : item
    }))
  }
  const importantHandler = (id) => {
    setTasks(tasks.map((item) => {            return item.id === id ? {...item,
      isImportant: !item.isImportant
    } : item
    }))
  }
  const deleteAllTasks = () => {
    setTasks([])
  }
  const filterTasks = (s) => {
    setStatus(s)
  }

  return (
      <section>
        <div className="container">
          <div className="todo">
            <h1>Todo list</h1>
            <form className="todo__form" onSubmit={addTasks}>
              <input
                  type="text"
                  className="todo__input"
                  placeholder="Enter your text..."
                  minLength={5}
                  maxLength={40}
              />
              <button className="btn todo__form-btn" type="submit">
                <RiSendPlane2Line />
              </button>
             </form>
            <div className="todo__row">
              {
                tasks
                    .filter((item) => {
                  if (status === 'Done') {
                    return item.isDone
                  } else if (status === 'Important') {
                    return item.isImportant
                  }
                  return item
                })
                    .map((item) => (
                        <div className={`todo__text ${item.isDone ? 'done' : ''} ${item.isImportant ? 'important' : ''}`}>
                          {item.title}
                          <div className="todo__text-btns">
                            <button className="btn btn__done" onClick={() => {
                              !item.isImportant ?
                                  doneHandler(item.id) :
                                  importantHandler(item.id)
                            }}>
                              <MdOutlineDoneOutline/>
                            </button>
                            <button className="btn btn__important" onClick={() => {
                              !item.isDone ?
                                  importantHandler(item.id) :
                                  doneHandler(item.id)
                            }}>
                              <MdNotificationImportant/>
                            </button>
                            <button className="btn btn__delete" onClick={() => {deleteTasks(item.id)}}>
                              <MdDelete/>
                            </button>
                          </div>
                        </div>                        ))
              }
            </div>
            <div className="todo__btns">
              <div className="todo__btns-status">
                <button className="btn btn__all" onClick={() => {filterTasks('All')}}>
                  All
                </button>
                <button className="btn btn__isDone" onClick={() => {filterTasks('Done')}}>
                  Done
                </button>
                <button className="btn btn__isImportant" onClick={() => {filterTasks('Important')}}>
                  Important
                </button>
              </div>
              <button className="btn btn__delete-all" onClick={deleteAllTasks}>
                Dell all
              </button>
            </div>
          </div>
        </div>
      </section>
  );
}
export default App;