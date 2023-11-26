import './App.css';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import AddNewTodo from './components/AddNewTodo';
import EditTodo from './components/EditTodo';
import Todos from './components/Todos';
import Projects from './components/Projects';
import Calendar from './components/Calendar';
import User from './components/User';
import { useContext } from 'react';
function App() {
  return (
    <div className="App">
      <Sidebar>
      <User></User>
      <AddNewTodo></AddNewTodo>
      <Calendar></Calendar>
      <Projects></Projects>
      </Sidebar>
      <Main>
        <Todos></Todos>
        <EditTodo></EditTodo>
      </Main>
    </div>
  );
}

export default App;
