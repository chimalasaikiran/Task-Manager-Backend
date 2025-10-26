import db from '../config/db.js';

// Get all tasks

export const getAllTasks = (req, res) => {
    db.query('SELECT * FROM tasks',(error,results)=>{
        if(error) return res.status(500).json({error: 'Database query failed'});
        res.status(200).json(results);
    })
};

// Create a new task

export const createTask = (req, res) => {
  const userId = req.user.id; // comes from JWT middleware
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const sqlquery = 'INSERT INTO tasks(title, description, user_id) VALUES (?, ?, ?)';
  db.query(sqlquery, [title, description || "", userId], (error, results) => {
    if (error) return res.status(500).json({ error: 'Database insertion failed', detail: error.message });
    res.status(201).json({ message: 'Task created successfully', taskId: results.insertId });
  });
};


// Update a task
export const updateTask = (req, res) => {
       const {id} = req.params;
       const {title,description ,status}=req.body;
       if(!title || !description){
        return res.status(400).json({message: 'Title and description are required'});
       }
       const sqlquery = 'UPDATE tasks SET title=?,description=?,status=? WHERE id=?';
       db.query(sqlquery,[title,description,status,id],(error,results)=>{
        if(error) return res.status(500).json({message: 'Database update failed'});
        if(results.affectedRows===0){
            return res.status(404).json({message: 'Task not found'});
        }
        res.status(200).json({message: 'Task updated successfully'});
       })
};


// Delete a task
export const deleteTask = (req, res) => {
    const {id} = req.params;
    const sqlquery = 'DELETE FROM tasks WHERE id=?';
    db.query(sqlquery,[id],(error,results)=>{
        if(error) return res.status(500).json({message: 'Database deletion failed'});
        if(results.affectedRows===0){
            return res.status(404).json({message: 'Task not found'});
        }
        res.status(200).json({message: 'Task deleted successfully'});
    })
};