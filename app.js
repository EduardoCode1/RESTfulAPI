const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        res.json(task);
    } else {
        res.status(404).send('No se encontró la tarea');
    }
});

app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.title = req.body.title || task.title;
        task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
        res.json(task);
    } else {
        res.status(404).send('No se actualizó la tarea');
    }
});

app.delete('/tasks/:id', (req,res)=>{
    const taskId = parseInt(req.params.id)
    const taskin = task.findIndex(t =>t.id === taskId)
    if (taskId !== -1) {
        task.splice(taskId,1)
        res.status(204).send('registro eliminado')
    }else{
        res.status(404).send('no se elimino la tarea')
    }
})

app.listen(port, () => {
    console.log(`Servidor corriendo en la url http://localhost:${port}`);
});