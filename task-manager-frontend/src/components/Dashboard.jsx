import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard({ token }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/api/tasks', config);
    setTasks(res.data);
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!title) return;
    await axios.post('http://localhost:5000/api/tasks', { title, description }, config);
    setTitle('');
    setDescription('');
    fetchTasks();
  };

  const updateStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'Pending' ? 'In Progress' : currentStatus === 'In Progress' ? 'Completed' : 'Pending';
    await axios.put(`http://localhost:5000/api/tasks/${id}`, { status: nextStatus }, config);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, config);
    fetchTasks();
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Your Tasks</h2>
      <form onSubmit={createTask} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ flex: 1, padding: '8px' }} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ flex: 2, padding: '8px' }} />
        <button type="submit" style={{ padding: '8px 15px', background: '#28a745', color: '#fff', border: 'none' }}>Add</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ddd', alignItems: 'center' }}>
            <div>
              <strong style={{ textDecoration: task.status === 'Completed' ? 'line-through' : 'none' }}>{task.title}</strong>
              <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}>{task.description}</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => updateStatus(task._id, task.status)} style={{ padding: '5px', background: '#ffc107', border: 'none', cursor: 'pointer' }}>
                {task.status}
              </button>
              <button onClick={() => deleteTask(task._id)} style={{ padding: '5px', background: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
