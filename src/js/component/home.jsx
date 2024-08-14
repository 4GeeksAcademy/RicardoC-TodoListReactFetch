import React, { useState, useEffect } from 'react';

const TodoList = () => {
    const [todo, setTodo] = useState([]);
    const [taskEntry, setTaskEntry] = useState("");

    // URL de la API
    const apiUrl = 'https://playground.4geeks.com/todo/';

    // Obtener tareas del servidor al cargar el componente
    useEffect(() => {
        createdUser()
        getTodos()

    }, []);

    // Agregar nueva tarea al servidor
    const addTask = (taskEntry) => {
        const newTask = {label: taskEntry, is_done: false };  //Creamos una nueva tarea con el texto que el usuario escribió
        fetch(apiUrl + "todos/ricardoclaro", {  //Enviamos la nueva tarea al servidor
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })

            .then(response => {if(response.ok){
                getTodos()
                response.json()}})
            .then(data =>console.log(data))
            .catch(error => console.error('Error adding task:', error));
    };

    // Eliminar tarea del servidor
    const taskDelete = (id) => {
        fetch(`${apiUrl}todos/${id}`, {  // Pedimos al servidor eliminar la tarea
            method: 'DELETE'
        })
            .then((response) => {   //Si la eliminación es exitosa, actualizamos nuestra lista de tareas
            if (response.ok){
                getTodos()
                return response.json()
            }
            })
            .catch(error => console.error('Error deleting task:', error));
    };
    function createdTodoList() {
        fetch(apiUrl + "users/ricardoclaro", {
            method: "POST",
            body: JSON.stringify([]),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())

            .then(data => {
                getTodos();

            })
            .catch(err => console.error(err))
    }
    function getTodos() { //Función para obtener la lista de tareas del servidor.
        fetch(apiUrl + "users/ricardoclaro", { //El "fetch()" hace la solicitud al servidor(aquí se coloca la url).
            method: "GET", //Con el método "GET" solicitamos información de nuestro usuario(lista de tareas).
        })
            //.then() recibe una respuesta del servidor.
            .then(response => {
                if (!response.ok) {
                    createdTodoList(); //Si la condición NO es "ok" llamamos nuestra función que crea la lista de tareas.
                    throw new Error("La lista no existe") //Esta declaración interrumpe el código y no ejecuta lo demás.
                }
                return response.json(); //Si el status de response es "ok" retornamos el objeto en formato .json() para js pueda leerlo.
            })
            .then((data) => { 

                setTodo(data.todos);
            })
            .catch((err) => {
                console.error(err);

            });
    }
    function createdUser() {
        fetch(apiUrl + "users/ricardoclaro", {
            method: "POST",
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())

            .then(data => {
                console.log(data);

            })
            .catch(err => console.error(err))
    }

    return (
        <div className="text-center container mt-5">
            <form onSubmit={(e) => {   //define una función que se ejecutará cuando el usuario haga clic en el botón de enviar del formulario
                e.preventDefault();
                if (taskEntry.trim()) {
                    addTask(taskEntry);
                    setTaskEntry("");
                }
            }}>
                <label htmlFor="Deberes" className="form-label h1" style={{ color: "#28ADB5" }}>TodoList</label>
                <input type="text" className="form-control" id="Pendiente" aria-describedby="emailHelp" placeholder="GOALS"
                    value={taskEntry}
                    onChange={(e) => setTaskEntry(e.target.value)}
                />
                <div id="emailHelp" className="form-text">tasks to complete:</div>
            </form>
            <div className="text-start d-md-flex justify-content-md-start">
                <ul>
                    {todo.map((tarea, index) => (
                        <li key={index} className="d-flex justify-content-between align-items-center list-group-item shadow rounded p-3 mt-4">
                            {tarea.label}
                            <button type="button" className="btn btn-sm ms-2" onClick={() => taskDelete(tarea.id)}>
                                <i className="fa fa-times" style={{ color: "red", fontSize: "1.5rem" }}></i>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="d-flex justify-content-center mt-4">
                <button className="btn mt-2" style={{ backgroundColor: "black", color: "white" }} onClick={() => setTodo([])}>
                    Eliminar tareas
                </button>
            </div>
        </div>
    );
};

export default TodoList;
