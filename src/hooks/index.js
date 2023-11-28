import { useState, useEffect } from 'react'
import {collection,getDocs,onSnapshot,query,where} from "firebase/firestore";
import {db} from '../firebase';
import moment from 'moment';
// export function useTodos(){
// const [todos, setTodos] = useState([]);

// useEffect(() => {
//   const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
//     const data = snapshot.docs.map((doc) => {
//       return {
//         id: doc.id,
//         ...doc.data(),
//       };
//     });
//     setTodos(data);
//   },[]);

//   return unsubscribe;
// }, []);

// return todos;
// };
export function useTodos(userRole) {
  const [todos, setTodos] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  var userEmail = "madhu269reddi@gmail.com";
  if(user){
    userEmail=user.email; 
    // onSnapshot(query(collection(db, "Users"), where("email", "==", userEmail)), (snapshot) => {
    //   const userDoc = snapshot.docs[0];
    //   if (userDoc.exists) {
    //     userRole = userDoc.data().role;
    //     console.log("User role:", userRole);
    //   } else {
    //     console.log("User not found or does not have a role");
    //   }
    // });
  }
  // Assuming 'req' is available in your context
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "todos"), where("email", "==", userEmail)),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => {
        if (doc) { 
          return {
            id: doc.id,
            ...doc.data(),
            email: doc.email,
          };
        } else {
          return null; // Return null if the doc object is null
        }
      });
        setTodos(data);
      }
    );
    const unisubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
          const data = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setTodos(data);
        },[]);
        console.log(userRole);
    return userRole === "admin"? unisubscribe : unsubscribe;
  }, [userEmail]);

  return todos;
}
// export function useTodos() {
//   const [todos, setTodos] = useState([]);
//   const user = JSON.parse(localStorage.getItem('user'));
//   const userEmail = user.email; // Assuming 'req' is available in your context

//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       query(collection(db, "todos"), where("email", "==", userEmail)),
//       (snapshot) => {
//         const data = snapshot.docs.map((doc) => {
//           return {
//             id: doc.id,
//             ...doc.data(),
//           };
//         });
//         setTodos(data);
//       }
//     );
//     return  unsubscribe;
//   }, []);

//   return todos;
// }
export function useProjects(){
const [projects, setProjects] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'projects'), (snapshot) => {
      const data = snapshot.docs.map((doc) => {

        return {
          id: doc.id,
          name: doc.data().name,
        };
      });

      setProjects(data);
    },[]);

    return () => unsubscribe();
  }, []);

  return projects;
};
export function useFilterTodos(todos, selectedProject){
  const [filteredTodos, setFilteredTodos] = useState([])

  useEffect( () => {
      let data;
      const todayDateFormated = moment().format('MM/DD/YYYY')

      if(selectedProject === 'today'){
          data = todos.filter(todo => todo.date === todayDateFormated)
      }else if(selectedProject === 'next 7 days'){
          data = todos.filter(todo => {
              const todoDate = moment(todo.date, 'MM/DD/YYYY')
              const todayDate = moment(todayDateFormated, 'MM/DD/YYYY')

              const diffDays = todoDate.diff(todayDate, 'days')

              return diffDays >=0 && diffDays < 7
          })
      }else if( selectedProject === 'all days'){
          data = todos
      }else{
          data = todos.filter(todo => todo.projectName === selectedProject)
      }

      setFilteredTodos(data)
  }, [todos, selectedProject])

  return filteredTodos
}
export function useProjectsWithStats(projects, todos){
  const [projectsWithStats, setProjectsWithStats] = useState([])

  useEffect(() => {
      const data = projects.map((project) => {
          return {
              numOfTodos : todos.filter( todo => todo.projectName === project.name && !todo.checked).length,
              ...project
          }
      })

      setProjectsWithStats(data)
  }, [projects, todos])

  return projectsWithStats
}