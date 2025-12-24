// import { useState } from "react";
// import { v4 as uuidv4 } from 'uuid';

// export default function TodoList() {
//     let [todos, setTodos] = useState([{task:"sample task", id:uuidv4()}]);
//     let [newTodo, setNewtodo] = useState("");

//     // add task
//     let addnewTask=()=>{
//         setTodos([...todos,{task:newTodo, id:uuidv4()}]);
//         setNewtodo("");
//     };

//     // delete task
//     let deleteTodo = (id) => {
//         setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
//     };

//     // update task
//     let updateTodo = (id, newTask) => {
//         setTodos((prevTodos) => prevTodos.map(todo => (todo.id === id ? { ...todo, task: newTask } : todo)));
//     };

//     let updateTodoValue = (event)=>{
//         setNewtodo(event.target.value);
//     };
   
//     return(
//         <div>
//             <input 
//             placeholder="add a task"
//             value={newTodo}
//             onChange={updateTodoValue}
//             ></input>
//             <br /> <br />
//             <button onClick={addnewTask}>Add Task</button>
//             <br /> <br />
//             <hr />
//             <h4>Task Todo</h4>
//             <ul>
//                    {todos.map((todo)=>(
//                     <li key={todo.id}>{todo.task}</li>
//                    ))}
//             </ul>
//         </div>
//     );
// }




// import { useState } from 'react';
// import { Check, Trash2, Edit2, Plus, X, Moon, Sun } from 'lucide-react';
// import './TodoList.css';

// export default function TodoApp() {
//   const [todos, setTodos] = useState([
//     { id: 1, task: 'Welcome to your todo app! 🎉', completed: false },
//     { id: 2, task: 'Click the checkbox to mark tasks complete', completed: false },
//     { id: 3, task: 'Click the pencil icon to edit tasks', completed: false },
//   ]);
//   const [newTodo, setNewTodo] = useState('');
//   const [editingId, setEditingId] = useState(null);
//   const [editText, setEditText] = useState('');
//   const [darkMode, setDarkMode] = useState(false);

//   const addTodo = () => {
//     if (newTodo.trim() === '') return;
//     setTodos([...todos, { id: Date.now(), task: newTodo, completed: false }]);
//     setNewTodo('');
//   };

//   const deleteTodo = (id) => {
//     setTodos(todos.filter(todo => todo.id !== id));
//   };

//   const toggleComplete = (id) => {
//     setTodos(todos.map(todo =>
//       todo.id === id ? { ...todo, completed: !todo.completed } : todo
//     ));
//   };

//   const startEdit = (id, currentText) => {
//     setEditingId(id);
//     setEditText(currentText);
//   };

//   const saveEdit = (id) => {
//     if (editText.trim() === '') return;
//     setTodos(todos.map(todo =>
//       todo.id === id ? { ...todo, task: editText } : todo
//     ));
//     setEditingId(null);
//     setEditText('');
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//     setEditText('');
//   };

//   const handleKeyPress = (e, isEditing = false) => {
//     if (e.key === 'Enter') {
//       if (isEditing) {
//         saveEdit(editingId);
//       } else {
//         addTodo();
//       }
//     } else if (e.key === 'Escape' && isEditing) {
//       cancelEdit();
//     }
//   };

//   const completedCount = todos.filter(t => t.completed).length;
//   const activeCount = todos.length - completedCount;

//   return (
//     <div className={`todo-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
//       <div className="todo-wrapper">
//         {/* Header */}
//         <div className="todo-header">
//           <div>
//             <h1 className="todo-title">Tasks</h1>
//             <p className="todo-subtitle">
//               {activeCount === 0 && completedCount === 0
//                 ? 'No tasks yet. Add one to get started!'
//                 : `${activeCount} active · ${completedCount} completed`}
//             </p>
//           </div>

//           {/* Dark Mode Toggle */}
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className="theme-toggle"
//             aria-label="Toggle dark mode"
//           >
//             {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//           </button>
//         </div>

//         {/* Input Section */}
//         <div className="input-section">
//           <div className="input-container">
//             <input
//               type="text"
//               value={newTodo}
//               onChange={(e) => setNewTodo(e.target.value)}
//               onKeyPress={(e) => handleKeyPress(e, false)}
//               placeholder="Add a new task..."
//               className="todo-input"
//               aria-label="Add new task"
//             />
//             <button
//               onClick={addTodo}
//               className="add-button"
//               aria-label="Add task"
//             >
//               <Plus size={20} />
//               <span className="add-text">Add</span>
//             </button>
//           </div>
//         </div>

//         {/* Todo List */}
//         <div className="todos-list">
//           {todos.length === 0 ? (
//             <div className="empty-state">
//               <div className="empty-emoji">📝</div>
//               <p className="empty-title">Your todo list is empty</p>
//               <p className="empty-subtitle">Add a task to get started</p>
//             </div>
//           ) : (
//             todos.map((todo, index) => (
//               <div
//                 key={todo.id}
//                 className="todo-item"
//                 style={{ animationDelay: `${index * 50}ms` }}
//               >
//                 {editingId === todo.id ? (
//                   // Edit Mode
//                   <div className="edit-container">
//                     <input
//                       type="text"
//                       value={editText}
//                       onChange={(e) => setEditText(e.target.value)}
//                       onKeyPress={(e) => handleKeyPress(e, true)}
//                       autoFocus
//                       className="edit-input"
//                       aria-label="Edit task"
//                     />
//                     <button
//                       onClick={() => saveEdit(todo.id)}
//                       className="save-button"
//                       aria-label="Save edit"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={cancelEdit}
//                       className="cancel-button"
//                       aria-label="Cancel edit"
//                     >
//                       <X size={18} />
//                     </button>
//                   </div>
//                 ) : (
//                   // View Mode
//                   <div className="todo-content">
//                     <button
//                       onClick={() => toggleComplete(todo.id)}
//                       className={`checkbox ${todo.completed ? 'completed' : ''}`}
//                       aria-label={`Mark "${todo.task}" as ${todo.completed ? 'incomplete' : 'complete'}`}
//                     >
//                       {todo.completed && <Check size={16} />}
//                     </button>

//                     <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
//                       {todo.task}
//                     </span>

//                     <div className="todo-actions">
//                       <button
//                         onClick={() => startEdit(todo.id, todo.task)}
//                         className="action-btn edit-btn"
//                         aria-label="Edit task"
//                       >
//                         <Edit2 size={18} />
//                       </button>
//                       <button
//                         onClick={() => deleteTodo(todo.id)}
//                         className="action-btn delete-btn"
//                         aria-label="Delete task"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>

//         {/* Footer Stats */}
//         {todos.length > 0 && (
//           <div className="footer-stats">
//             <div className="stats-grid">
//               <div className="stat-item">
//                 <div className="stat-number">{todos.length}</div>
//                 <p className="stat-label">Total Tasks</p>
//               </div>
//               <div className="stat-item">
//                 <div className="stat-number">{activeCount}</div>
//                 <p className="stat-label">Active</p>
//               </div>
//               <div className="stat-item">
//                 <div className="stat-number">{completedCount}</div>
//                 <p className="stat-label">Completed</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// import { useState } from 'react';
// import { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase";
// import { saveTodos, loadTodos } from "./firestore";
// import Auth from "./Auth";

// import { Check, Trash2, Edit2, Plus, X, Moon, Sun, BarChart3, History, Calendar } from 'lucide-react';

// const useLocalStorage = (key, initialValue) => {
//   const [storedValue, setStoredValue] = useState(() => {
//     try {
//       const item = window.localStorage?.getItem(key);
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       return initialValue;
//     }
//   });

//   const setValue = (value) => {
//     try {
//       const valueToStore = value instanceof Function ? value(storedValue) : value;
//       setStoredValue(valueToStore);
//       window.localStorage?.setItem(key, JSON.stringify(valueToStore));
//     } catch (error) {
//       console.error('localStorage error:', error);
//     }
//   };

//   return [storedValue, setValue];
// };

// const getDateKey = (date) => new Date(date).toISOString().split('T')[0];

// const filterHistoryByRange = (history, range) => {
//   const now = new Date();
//   const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
//   switch (range) {
//     case 'today':
//       return history.filter(h => new Date(h.completedAt) >= today);
//     case 'week':
//       const weekAgo = new Date(today);
//       weekAgo.setDate(weekAgo.getDate() - 7);
//       return history.filter(h => new Date(h.completedAt) >= weekAgo);
//     case 'month':
//       const monthAgo = new Date(today);
//       monthAgo.setMonth(monthAgo.getMonth() - 1);
//       return history.filter(h => new Date(h.completedAt) >= monthAgo);
//     default:
//       return history;
//   }
// };

// const getChartData = (history) => {
//   const grouped = {};
  
//   history.forEach(item => {
//     const date = getDateKey(item.completedAt);
//     grouped[date] = (grouped[date] || 0) + 1;
//   });

//   const last30Days = [];
//   for (let i = 29; i >= 0; i--) {
//     const date = new Date();
//     date.setDate(date.getDate() - i);
//     const key = getDateKey(date);
//     last30Days.push({
//       date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
//       tasks: grouped[key] || 0
//     });
//   }
  
//   return last30Days;
// };

// const StatsCard = ({ label, value, icon: Icon, color, darkMode }) => {
//   const bgColors = {
//     blue: darkMode ? '#1e3a8a' : '#eff6ff',
//     green: darkMode ? '#14532d' : '#f0fdf4',
//     purple: darkMode ? '#3f0f5c' : '#faf5ff',
//     orange: darkMode ? '#7c2d12' : '#fff7ed',
//   };

//   const textColors = {
//     blue: darkMode ? '#60a5fa' : '#2563eb',
//     green: darkMode ? '#4ade80' : '#16a34a',
//     purple: darkMode ? '#d8b4fe' : '#9333ea',
//     orange: darkMode ? '#fb923c' : '#ea580c',
//   };

//   return (
//     <div style={{
//       backgroundColor: bgColors[color],
//       borderRadius: '12px',
//       padding: '24px',
//       transition: 'all 0.3s ease'
//     }}>
//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//         <div>
//           <p style={{
//             fontSize: '14px',
//             fontWeight: '500',
//             color: darkMode ? '#94a3b8' : '#64748b',
//             margin: 0
//           }}>
//             {label}
//           </p>
//           <p style={{
//             fontSize: '32px',
//             fontWeight: 'bold',
//             marginTop: '12px',
//             marginBottom: 0,
//             color: textColors[color]
//           }}>
//             {value}
//           </p>
//         </div>
//         <Icon style={{ width: '32px', height: '32px', color: textColors[color], opacity: 0.5 }} />
//       </div>
//     </div>
//   );
// };

// const TodoItem = ({ todo, onToggle, onEdit, onDelete, darkMode, isEditing, editText, onEditChange, onSaveEdit, onCancelEdit }) => {
//   return (
//     <div style={{
//       backgroundColor: darkMode ? '#1e293b' : '#ffffff',
//       padding: '16px',
//       borderRadius: '8px',
//       boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
//       transition: 'all 0.3s ease'
//     }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'}
//        onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}>
//       {isEditing ? (
//         <div style={{ display: 'flex', gap: '8px' }}>
//           <input
//             type="text"
//             value={editText}
//             onChange={onEditChange}
//             onKeyPress={(e) => {
//               if (e.key === 'Enter') onSaveEdit();
//               if (e.key === 'Escape') onCancelEdit();
//             }}
//             autoFocus
//             style={{
//               flex: 1,
//               padding: '8px 12px',
//               borderRadius: '6px',
//               border: 'none',
//               outline: 'none',
//               backgroundColor: darkMode ? '#334155' : '#f1f5f9',
//               color: darkMode ? '#ffffff' : '#1f2937',
//               fontFamily: 'inherit'
//             }}
//           />
//           <button onClick={onSaveEdit} style={{
//             padding: '8px 12px',
//             backgroundColor: '#16a34a',
//             color: 'white',
//             border: 'none',
//             borderRadius: '6px',
//             fontSize: '14px',
//             fontWeight: '500',
//             cursor: 'pointer'
//           }}>
//             Save
//           </button>
//           <button onClick={onCancelEdit} style={{
//             padding: '8px 12px',
//             backgroundColor: darkMode ? '#334155' : '#e5e7eb',
//             color: darkMode ? '#cbd5e1' : '#4b5563',
//             border: 'none',
//             borderRadius: '6px',
//             cursor: 'pointer'
//           }}>
//             <X size={16} />
//           </button>
//         </div>
//       ) : (
//         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//           <button
//             onClick={() => onToggle(todo.id)}
//             style={{
//               flexShrink: 0,
//               width: '24px',
//               height: '24px',
//               borderRadius: '6px',
//               border: '2px solid',
//               borderColor: todo.completed ? 'transparent' : (darkMode ? '#475569' : '#d1d5db'),
//               backgroundColor: todo.completed ? '#16a34a' : 'transparent',
//               cursor: 'pointer',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               transition: 'all 0.3s ease'
//             }}
//           >
//             {todo.completed && <Check size={14} color="white" />}
//           </button>
//           <span style={{
//             flex: 1,
//             transition: 'all 0.3s ease',
//             textDecoration: todo.completed ? 'line-through' : 'none',
//             opacity: todo.completed ? 0.5 : 1
//           }}>
//             {todo.task}
//           </span>
//           <div style={{ display: 'flex', gap: '8px' }}>
//             {!todo.completed && (
//               <button onClick={() => onEdit(todo.id, todo.task)} style={{
//                 padding: '6px',
//                 backgroundColor: darkMode ? '#334155' : '#f1f5f9',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//                 transition: 'all 0.2s ease'
//               }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkMode ? '#475569' : '#e5e7eb'}
//                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = darkMode ? '#334155' : '#f1f5f9'}>
//                 <Edit2 size={16} color={darkMode ? '#94a3b8' : '#4b5563'} />
//               </button>
//             )}
//             <button onClick={() => onDelete(todo.id)} style={{
//               padding: '6px',
//               backgroundColor: 'transparent',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               color: darkMode ? '#f87171' : '#dc2626',
//               transition: 'all 0.2s ease'
//             }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkMode ? 'rgba(239, 68, 68, 0.1)' : '#fef2f2'}
//                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
//               <Trash2 size={16} />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const SimpleChart = ({ data, darkMode }) => {
//   const maxTasks = Math.max(...data.map(d => d.tasks), 1);
//   const height = 200;

//   return (
//     <div style={{
//       backgroundColor: darkMode ? '#1e293b' : '#ffffff',
//       borderRadius: '12px',
//       padding: '24px',
//       boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
//       marginBottom: '32px'
//     }}>
//       <h3 style={{ fontSize: '18px', fontWeight: '600', marginTop: 0, marginBottom: '16px' }}>
//         Tasks Completed (Last 30 Days)
//       </h3>
//       <div style={{
//         display: 'flex',
//         alignItems: 'flex-end',
//         justifyContent: 'space-around',
//         height: `${height}px`,
//         gap: '4px',
//         padding: '16px 0'
//       }}>
//         {data.slice(-14).map((item, idx) => (
//           <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
//             <div style={{
//               width: '100%',
//               backgroundColor: '#3b82f6',
//               borderRadius: '4px',
//               height: `${(item.tasks / maxTasks) * height}px`,
//               minHeight: item.tasks > 0 ? '4px' : '0px',
//               transition: 'all 0.3s ease'
//             }} />
//             <span style={{
//               fontSize: '10px',
//               marginTop: '8px',
//               color: darkMode ? '#94a3b8' : '#64748b',
//               textAlign: 'center',
//               width: '100%'
//             }}>
//               {item.date}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const HistoryPanel = ({ history, darkMode, onClearHistory }) => {
//   const [filter, setFilter] = useState('all');
//   const filteredHistory = filterHistoryByRange(history, filter);

//   const handleClear = () => {
//     if (window.confirm('Are you sure you want to clear all history? This cannot be undone.')) {
//       onClearHistory();
//     }
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//         <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Completed Tasks</h2>
//         {history.length > 0 && (
//           <button
//             onClick={handleClear}
//             style={{
//               fontSize: '14px',
//               padding: '6px 12px',
//               color: '#dc2626',
//               backgroundColor: 'transparent',
//               border: 'none',
//               cursor: 'pointer',
//               transition: 'all 0.2s ease'
//             }}
//             onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
//             onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
//           >
//             Clear History
//           </button>
//         )}
//       </div>

//       {history.length > 0 && (
//         <div style={{ display: 'flex', gap: '8px' }}>
//           {['all', 'today', 'week', 'month'].map(range => (
//             <button
//               key={range}
//               onClick={() => setFilter(range)}
//               style={{
//                 padding: '8px 12px',
//                 borderRadius: '6px',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 border: 'none',
//                 cursor: 'pointer',
//                 transition: 'all 0.2s ease',
//                 backgroundColor: filter === range ? '#2563eb' : (darkMode ? '#334155' : '#e5e7eb'),
//                 color: filter === range ? 'white' : (darkMode ? '#cbd5e1' : '#4b5563')
//               }}
//             >
//               {range.charAt(0).toUpperCase() + range.slice(1)}
//             </button>
//           ))}
//         </div>
//       )}

//       <div style={{
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '8px',
//         maxHeight: '400px',
//         overflowY: 'auto'
//       }}>
//         {filteredHistory.length === 0 ? (
//           <div style={{
//             textAlign: 'center',
//             padding: '32px 16px',
//             borderRadius: '8px',
//             backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.5)' : '#f8fafc'
//           }}>
//             <History size={32} style={{ margin: '0 auto 8px', opacity: 0.3 }} />
//             <p style={{ color: darkMode ? '#94a3b8' : '#64748b', margin: 0 }}>
//               No completed tasks {filter !== 'all' ? `this ${filter}` : 'yet'}
//             </p>
//           </div>
//         ) : (
//           filteredHistory.map(item => (
//             <div
//               key={item.id}
//               style={{
//                 backgroundColor: darkMode ? '#1e293b' : '#ffffff',
//                 padding: '16px',
//                 borderRadius: '8px',
//                 display: 'flex',
//                 alignItems: 'flex-start',
//                 justifyContent: 'space-between'
//               }}
//             >
//               <div style={{ flex: 1 }}>
//                 <p style={{ fontWeight: '500', margin: '0 0 8px 0' }}>{item.task}</p>
//                 <p style={{
//                   fontSize: '14px',
//                   marginTop: '4px',
//                   marginBottom: 0,
//                   color: darkMode ? '#94a3b8' : '#64748b'
//                 }}>
//                   {new Date(item.completedAt).toLocaleString('en-US', {
//                     month: 'short',
//                     day: 'numeric',
//                     hour: '2-digit',
//                     minute: '2-digit'
//                   })}
//                 </p>
//               </div>
//               <Check size={20} style={{ color: '#16a34a', flexShrink: 0, marginLeft: '12px', marginTop: '4px' }} />
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default function ProductivityDashboard() {
//   const [todos, setTodos] = useLocalStorage('todos', [
//     { id: '1', task: '🚀 Welcome! Create your first task', completed: false, createdAt: new Date().toISOString(), completedAt: null },
//   ]);
  
//   const [history, setHistory] = useLocalStorage('history', []);
//   const [newTodo, setNewTodo] = useState('');
//   const [editingId, setEditingId] = useState(null);
//   const [editText, setEditText] = useState('');
//   const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
//   const [view, setView] = useState('dashboard');

//   const addTodo = () => {
//     if (newTodo.trim() === '') return;
//     const newItem = {
//       id: Date.now().toString(),
//       task: newTodo,
//       completed: false,
//       createdAt: new Date().toISOString(),
//       completedAt: null
//     };
//     setTodos([...todos, newItem]);
//     setNewTodo('');
//   };

//   const toggleComplete = (id) => {
//     setTodos(todos.map(todo => {
//       if (todo.id === id && !todo.completed) {
//         const completedTodo = { ...todo, completed: true, completedAt: new Date().toISOString() };
//         setHistory([...history, completedTodo]);
//         return completedTodo;
//       }
//       return todo;
//     }));
//   };

//   const deleteTodo = (id) => {
//     setTodos(todos.filter(todo => todo.id !== id));
//   };

//   const startEdit = (id, text) => {
//     setEditingId(id);
//     setEditText(text);
//   };

//   const saveEdit = () => {
//     if (editText.trim() === '') return;
//     setTodos(todos.map(todo => (todo.id === editingId ? { ...todo, task: editText } : todo)));
//     setEditingId(null);
//     setEditText('');
//   };

//   const clearHistory = () => {
//     setHistory([]);
//   };

//   const completed = todos.filter(t => t.completed).length;
//   const total = todos.length;
//   const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
//   const chartData = getChartData(history);

//   return (
//     <div style={{
//       minHeight: '100vh',
//       transition: 'background-color 0.3s ease, color 0.3s ease',
//       backgroundColor: darkMode ? '#0f172a' : '#f0f9ff',
//       color: darkMode ? '#e2e8f0' : '#1f2937',
//       padding: '24px 16px'
//     }}>
//       <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
//         {/* Header */}
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
//           <div>
//             <h1 style={{
//               fontSize: '48px',
//               fontWeight: 'bold',
//               margin: '0 0 8px 0',
//               background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 50%, #ec4899 100%)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               backgroundClip: 'text'
//             }}>
//               Productivity Dashboard
//             </h1>
//             <p style={{ margin: '8px 0 0 0', color: darkMode ? '#94a3b8' : '#64748b' }}>
//               Track your progress, stay focused
//             </p>
//           </div>

//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             style={{
//               padding: '10px',
//               borderRadius: '50%',
//               border: 'none',
//               cursor: 'pointer',
//               backgroundColor: darkMode ? '#1e293b' : '#ffffff',
//               color: darkMode ? '#fbbf24' : '#475569',
//               boxShadow: darkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
//               transition: 'all 0.3s ease'
//             }}
//           >
//             {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//           </button>
//         </div>

//         {/* View Toggle */}
//         <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
//           {['dashboard', 'list'].map(v => (
//             <button
//               key={v}
//               onClick={() => setView(v)}
//               style={{
//                 padding: '10px 16px',
//                 borderRadius: '8px',
//                 fontWeight: '500',
//                 border: 'none',
//                 cursor: 'pointer',
//                 transition: 'all 0.2s ease',
//                 backgroundColor: view === v ? '#2563eb' : (darkMode ? '#1e293b' : '#ffffff'),
//                 color: view === v ? 'white' : (darkMode ? '#cbd5e1' : '#4b5563'),
//                 boxShadow: view !== v && !darkMode ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
//               }}
//             >
//               {v === 'dashboard' ? '📊 Dashboard' : '📋 Tasks'}
//             </button>
//           ))}
//         </div>

//         {view === 'dashboard' ? (
//           <>
//             {/* Dashboard View */}
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
//               <StatsCard label="Total Tasks" value={total} icon={BarChart3} color="blue" darkMode={darkMode} />
//               <StatsCard label="Completed" value={completed} icon={Check} color="green" darkMode={darkMode} />
//               <StatsCard label="Pending" value={total - completed} icon={Calendar} color="orange" darkMode={darkMode} />
//               <StatsCard label="Progress" value={`${percentage}%`} icon={BarChart3} color="purple" darkMode={darkMode} />
//             </div>

//             {/* Progress Bar */}
//             <div style={{
//               backgroundColor: darkMode ? '#1e293b' : '#ffffff',
//               borderRadius: '12px',
//               padding: '24px',
//               boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
//               marginBottom: '32px'
//             }}>
//               <h3 style={{ fontSize: '18px', fontWeight: '600', marginTop: 0, marginBottom: '16px' }}>
//                 Completion Rate
//               </h3>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//                   <div style={{ flex: 1 }}>
//                     <div style={{
//                       height: '12px',
//                       borderRadius: '9999px',
//                       overflow: 'hidden',
//                       backgroundColor: darkMode ? '#334155' : '#e5e7eb'
//                     }}>
//                       <div
//                         style={{
//                           height: '100%',
//                           background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
//                           width: `${percentage}%`,
//                           transition: 'all 0.5s ease'
//                         }}
//                       />
//                     </div>
//                   </div>
//                   <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#16a34a', minWidth: '48px' }}>
//                     {percentage}%
//                   </span>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                   <span>{completed} completed</span>
//                   <span style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>{total - completed} remaining</span>
//                 </div>
//               </div>
//             </div>

//             {/* Chart */}
//             {history.length > 0 && <SimpleChart data={chartData} darkMode={darkMode} />}

//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//               gap: '32px',
//               marginTop: '32px'
//             }}>
//               <div>
//                 {/* Quick Add */}
//                 <div style={{
//                   backgroundColor: darkMode ? '#1e293b' : '#ffffff',
//                   padding: '24px',
//                   borderRadius: '12px',
//                   boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
//                   marginBottom: '24px'
//                 }}>
//                   <h3 style={{ fontSize: '16px', fontWeight: '600', marginTop: 0, marginBottom: '16px' }}>Quick Add Task</h3>
//                   <div style={{ display: 'flex', gap: '8px' }}>
//                     <input
//                       type="text"
//                       value={newTodo}
//                       onChange={(e) => setNewTodo(e.target.value)}
//                       onKeyPress={(e) => e.key === 'Enter' && addTodo()}
//                       placeholder="Add a new task..."
//                       style={{
//                         flex: 1,
//                         padding: '12px 16px',
//                         borderRadius: '8px',
//                         border: 'none',
//                         outline: 'none',
//                         backgroundColor: darkMode ? '#334155' : '#f1f5f9',
//                         color: darkMode ? '#ffffff' : '#1f2937',
//                         fontFamily: 'inherit',
//                         fontSize: '14px'
//                       }}
//                     />
//                     <button
//                       onClick={addTodo}
//                       style={{
//                         padding: '12px 16px',
//                         background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 100%)',
//                         color: 'white',
//                         border: 'none',
//                         borderRadius: '8px',
//                         fontWeight: '600',
//                         cursor: 'pointer',
//                         transition: 'all 0.2s ease'
//                       }}
//                       onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px rgba(37, 99, 235, 0.3)'}
//                       onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
//                     >
//                       <Plus size={20} />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Active Tasks */}
//                 <div style={{
//                   backgroundColor: darkMode ? '#1e293b' : '#ffffff',
//                   padding: '24px',
//                   borderRadius: '12px',
//                   boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
//                 }}>
//                   <h3 style={{ fontSize: '16px', fontWeight: '600', marginTop: 0, marginBottom: '16px' }}>Active Tasks</h3>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//                     {todos.filter(t => !t.completed).length === 0 ? (
//                       <p style={{
//                         textAlign: 'center',
//                         padding: '24px',
//                         color: darkMode ? '#94a3b8' : '#64748b'
//                       }}>
//                         No active tasks. Great work! 🎉
//                       </p>
//                     ) : (
//                       todos
//                         .filter(t => !t.completed)
//                         .map(todo => (
//                           <TodoItem
//                             key={todo.id}
//                             todo={todo}
//                             onToggle={toggleComplete}
//                             onEdit={startEdit}
//                             onDelete={deleteTodo}
//                             darkMode={darkMode}
//                             isEditing={editingId === todo.id}
//                             editText={editText}
//                             onEditChange={(e) => setEditText(e.target.value)}
//                             onSaveEdit={saveEdit}
//                             onCancelEdit={() => setEditingId(null)}
//                           />
//                         ))
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <HistoryPanel history={history} darkMode={darkMode} onClearHistory={clearHistory} />
//               </div>
//             </div>
//           </>
//         ) : (
//           <>
//             {/* List View */}
//             <div style={{
//               backgroundColor: darkMode ? '#1e293b' : '#ffffff',
//               padding: '24px',
//               borderRadius: '12px',
//               boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
//               marginBottom: '32px'
//             }}>
//               <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
//                 <input
//                   type="text"
//                   value={newTodo}
//                   onChange={(e) => setNewTodo(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && addTodo()}
//                   placeholder="Add a new task..."
//                   style={{
//                     flex: 1,
//                     padding: '12px 16px',
//                     borderRadius: '8px',
//                     border: 'none',
//                     outline: 'none',
//                     backgroundColor: darkMode ? '#334155' : '#f1f5f9',
//                     color: darkMode ? '#ffffff' : '#1f2937',
//                     fontFamily: 'inherit',
//                     fontSize: '14px'
//                   }}
//                 />
//                 <button
//                   onClick={addTodo}
//                   style={{
//                     padding: '12px 24px',
//                     background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 100%)',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '8px',
//                     fontWeight: '600',
//                     cursor: 'pointer',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '8px',
//                     transition: 'all 0.2s ease'
//                   }}
//                   onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px rgba(37, 99, 235, 0.3)'}
//                   onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
//                 >
//                   <Plus size={20} /> Add
//                 </button>
//               </div>

//               <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//                 {todos.length === 0 ? (
//                   <p style={{
//                     textAlign: 'center',
//                     padding: '24px',
//                     color: darkMode ? '#94a3b8' : '#64748b'
//                   }}>
//                     No tasks yet. Create one to get started!
//                   </p>
//                 ) : (
//                   todos.map(todo => (
//                     <TodoItem
//                       key={todo.id}
//                       todo={todo}
//                       onToggle={toggleComplete}
//                       onEdit={startEdit}
//                       onDelete={deleteTodo}
//                       darkMode={darkMode}
//                       isEditing={editingId === todo.id}
//                       editText={editText}
//                       onEditChange={(e) => setEditText(e.target.value)}
//                       onSaveEdit={saveEdit}
//                       onCancelEdit={() => setEditingId(null)}
//                     />
//                   ))
//                 )}
//               </div>
//             </div>

//             <HistoryPanel history={history} darkMode={darkMode} onClearHistory={clearHistory} />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }




// =============================================================

// src/ProductivityDashboard.jsx
import { useState } from 'react';
import { Check, Trash2, Edit2, Plus, X, Moon, Sun, BarChart3, History, Calendar } from 'lucide-react';

const getDateKey = (date) => new Date(date).toISOString().split('T')[0];

const filterHistoryByRange = (history, range) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  switch (range) {
    case 'today':
      return history.filter(h => new Date(h.completedAt) >= today);
    case 'week':
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      return history.filter(h => new Date(h.completedAt) >= weekAgo);
    case 'month':
      const monthAgo = new Date(today);
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return history.filter(h => new Date(h.completedAt) >= monthAgo);
    default:
      return history;
  }
};

const getChartData = (history) => {
  const grouped = {};
  
  history.forEach(item => {
    const date = getDateKey(item.completedAt);
    grouped[date] = (grouped[date] || 0) + 1;
  });

  const last30Days = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const key = getDateKey(date);
    last30Days.push({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      tasks: grouped[key] || 0
    });
  }
  
  return last30Days;
};

const StatsCard = ({ label, value, icon: Icon, color, darkMode }) => {
  const bgColors = {
    blue: darkMode ? '#1e3a8a' : '#eff6ff',
    green: darkMode ? '#14532d' : '#f0fdf4',
    purple: darkMode ? '#3f0f5c' : '#faf5ff',
    orange: darkMode ? '#7c2d12' : '#fff7ed',
  };

  const textColors = {
    blue: darkMode ? '#60a5fa' : '#2563eb',
    green: darkMode ? '#4ade80' : '#16a34a',
    purple: darkMode ? '#d8b4fe' : '#9333ea',
    orange: darkMode ? '#fb923c' : '#ea580c',
  };

  return (
    <div style={{
      backgroundColor: bgColors[color],
      borderRadius: '12px',
      padding: '24px',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{
            fontSize: '14px',
            fontWeight: '500',
            color: darkMode ? '#94a3b8' : '#64748b',
            margin: 0
          }}>
            {label}
          </p>
          <p style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginTop: '12px',
            marginBottom: 0,
            color: textColors[color]
          }}>
            {value}
          </p>
        </div>
        <Icon style={{ width: '32px', height: '32px', color: textColors[color], opacity: 0.5 }} />
      </div>
    </div>
  );
};

const TodoItem = ({ todo, onToggle, onEdit, onDelete, darkMode, isEditing, editText, onEditChange, onSaveEdit, onCancelEdit }) => {
  return (
    <div style={{
      backgroundColor: darkMode ? '#1e293b' : '#ffffff',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      transition: 'all 0.3s ease'
    }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'}
       onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}>
      {isEditing ? (
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={editText}
            onChange={onEditChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') onSaveEdit();
              if (e.key === 'Escape') onCancelEdit();
            }}
            autoFocus
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '6px',
              border: 'none',
              outline: 'none',
              backgroundColor: darkMode ? '#334155' : '#f1f5f9',
              color: darkMode ? '#ffffff' : '#1f2937',
              fontFamily: 'inherit'
            }}
          />
          <button onClick={onSaveEdit} style={{
            padding: '8px 12px',
            backgroundColor: '#16a34a',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            Save
          </button>
          <button onClick={onCancelEdit} style={{
            padding: '8px 12px',
            backgroundColor: darkMode ? '#334155' : '#e5e7eb',
            color: darkMode ? '#cbd5e1' : '#4b5563',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            <X size={16} />
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => onToggle(todo.id)}
            style={{
              flexShrink: 0,
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              border: '2px solid',
              borderColor: todo.completed ? 'transparent' : (darkMode ? '#475569' : '#d1d5db'),
              backgroundColor: todo.completed ? '#16a34a' : 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            {todo.completed && <Check size={14} color="white" />}
          </button>
          <span style={{
            flex: 1,
            transition: 'all 0.3s ease',
            textDecoration: todo.completed ? 'line-through' : 'none',
            opacity: todo.completed ? 0.5 : 1
          }}>
            {todo.task}
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {!todo.completed && (
              <button onClick={() => onEdit(todo.id, todo.task)} style={{
                padding: '6px',
                backgroundColor: darkMode ? '#334155' : '#f1f5f9',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkMode ? '#475569' : '#e5e7eb'}
                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = darkMode ? '#334155' : '#f1f5f9'}>
                <Edit2 size={16} color={darkMode ? '#94a3b8' : '#4b5563'} />
              </button>
            )}
            <button onClick={() => onDelete(todo.id)} style={{
              padding: '6px',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              color: darkMode ? '#f87171' : '#dc2626',
              transition: 'all 0.2s ease'
            }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkMode ? 'rgba(239, 68, 68, 0.1)' : '#fef2f2'}
               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const SimpleChart = ({ data, darkMode }) => {
  const maxTasks = Math.max(...data.map(d => d.tasks), 1);
  const height = 200;

  return (
    <div style={{
      backgroundColor: darkMode ? '#1e293b' : '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      marginBottom: '32px'
    }}>
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginTop: 0, marginBottom: '16px' }}>
        Tasks Completed (Last 30 Days)
      </h3>
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        height: `${height}px`,
        gap: '4px',
        padding: '16px 0'
      }}>
        {data.slice(-14).map((item, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <div style={{
              width: '100%',
              backgroundColor: '#3b82f6',
              borderRadius: '4px',
              height: `${(item.tasks / maxTasks) * height}px`,
              minHeight: item.tasks > 0 ? '4px' : '0px',
              transition: 'all 0.3s ease'
            }} />
            <span style={{
              fontSize: '10px',
              marginTop: '8px',
              color: darkMode ? '#94a3b8' : '#64748b',
              textAlign: 'center',
              width: '100%'
            }}>
              {item.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const HistoryPanel = ({ history, darkMode, onClearHistory }) => {
  const [filter, setFilter] = useState('all');
  const filteredHistory = filterHistoryByRange(history, filter);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all history? This cannot be undone.')) {
      onClearHistory();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Completed Tasks</h2>
        {history.length > 0 && (
          <button
            onClick={handleClear}
            style={{
              fontSize: '14px',
              padding: '6px 12px',
              color: '#dc2626',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            Clear History
          </button>
        )}
      </div>

      {history.length > 0 && (
        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'today', 'week', 'month'].map(range => (
            <button
              key={range}
              onClick={() => setFilter(range)}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: filter === range ? '#2563eb' : (darkMode ? '#334155' : '#e5e7eb'),
                color: filter === range ? 'white' : (darkMode ? '#cbd5e1' : '#4b5563')
              }}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      )}

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        maxHeight: '400px',
        overflowY: 'auto'
      }}>
        {filteredHistory.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '32px 16px',
            borderRadius: '8px',
            backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.5)' : '#f8fafc'
          }}>
            <History size={32} style={{ margin: '0 auto 8px', opacity: 0.3 }} />
            <p style={{ color: darkMode ? '#94a3b8' : '#64748b', margin: 0 }}>
              No completed tasks {filter !== 'all' ? `this ${filter}` : 'yet'}
            </p>
          </div>
        ) : (
          filteredHistory.map(item => (
            <div
              key={item.id}
              style={{
                backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                padding: '16px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: '500', margin: '0 0 8px 0' }}>{item.task}</p>
                <p style={{
                  fontSize: '14px',
                  marginTop: '4px',
                  marginBottom: 0,
                  color: darkMode ? '#94a3b8' : '#64748b'
                }}>
                  {new Date(item.completedAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <Check size={20} style={{ color: '#16a34a', flexShrink: 0, marginLeft: '12px', marginTop: '4px' }} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default function ProductivityDashboard({ user, todos, setTodos }) {
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [view, setView] = useState('dashboard');

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const newItem = {
      id: Date.now().toString(),
      task: newTodo,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    setTodos([...todos, newItem]);
    setNewTodo('');
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id && !todo.completed) {
        return { ...todo, completed: true, completedAt: new Date().toISOString() };
      }
      return todo;
    }));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (editText.trim() === '') return;
    setTodos(todos.map(todo => (todo.id === editingId ? { ...todo, task: editText } : todo)));
    setEditingId(null);
    setEditText('');
  };

  const clearHistory = () => {
    setTodos(todos.map(t => ({ ...t, completed: false, completedAt: null })));
  };

  const completed = todos.filter(t => t.completed).length;
  const total = todos.length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  const history = todos.filter(t => t.completed);
  const chartData = getChartData(history);

  return (
    <div style={{
      minHeight: '100vh',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      backgroundColor: darkMode ? '#0f172a' : '#f0f9ff',
      color: darkMode ? '#e2e8f0' : '#1f2937',
      padding: '24px 16px'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* User Info Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          backgroundColor: darkMode ? '#1e293b' : '#dbeafe',
          borderRadius: '8px',
          marginBottom: '24px',
          fontSize: '14px'
        }}>
          <span>Synced with Firebase ☁️ • {user?.displayName || user?.email}</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              padding: '8px',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: darkMode ? '#334155' : '#ffffff',
              color: darkMode ? '#fbbf24' : '#475569'
            }}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            margin: '0 0 8px 0',
            background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 50%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Productivity Dashboard
          </h1>
          <p style={{ margin: '8px 0 0 0', color: darkMode ? '#94a3b8' : '#64748b' }}>
            Track your progress, stay focused
          </p>
        </div>

        {/* View Toggle */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
          {['dashboard', 'list'].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: view === v ? '#2563eb' : (darkMode ? '#1e293b' : '#ffffff'),
                color: view === v ? 'white' : (darkMode ? '#cbd5e1' : '#4b5563')
              }}
            >
              {v === 'dashboard' ? '📊 Dashboard' : '📋 Tasks'}
            </button>
          ))}
        </div>

        {view === 'dashboard' ? (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              <StatsCard label="Total Tasks" value={total} icon={BarChart3} color="blue" darkMode={darkMode} />
              <StatsCard label="Completed" value={completed} icon={Check} color="green" darkMode={darkMode} />
              <StatsCard label="Pending" value={total - completed} icon={Calendar} color="orange" darkMode={darkMode} />
              <StatsCard label="Progress" value={`${percentage}%`} icon={BarChart3} color="purple" darkMode={darkMode} />
            </div>

            <div style={{
              backgroundColor: darkMode ? '#1e293b' : '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              marginBottom: '32px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginTop: 0, marginBottom: '16px' }}>
                Completion Rate
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      height: '12px',
                      borderRadius: '9999px',
                      overflow: 'hidden',
                      backgroundColor: darkMode ? '#334155' : '#e5e7eb'
                    }}>
                      <div
                        style={{
                          height: '100%',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          width: `${percentage}%`,
                          transition: 'all 0.5s ease'
                        }}
                      />
                    </div>
                  </div>
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#16a34a', minWidth: '48px' }}>
                    {percentage}%
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span>{completed} completed</span>
                  <span style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>{total - completed} remaining</span>
                </div>
              </div>
            </div>

            {history.length > 0 && <SimpleChart data={chartData} darkMode={darkMode} />}

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
              marginTop: '32px'
            }}>
              <div>
                <div style={{
                  backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                  padding: '24px',
                  borderRadius: '12px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  marginBottom: '24px'
                }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginTop: 0, marginBottom: '16px' }}>Quick Add Task</h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={newTodo}
                      onChange={(e) => setNewTodo(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                      placeholder="Add a new task..."
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        outline: 'none',
                        backgroundColor: darkMode ? '#334155' : '#f1f5f9',
                        color: darkMode ? '#ffffff' : '#1f2937',
                        fontFamily: 'inherit',
                        fontSize: '14px'
                      }}
                    />
                    <button
                      onClick={addTodo}
                      style={{
                        padding: '12px 16px',
                        background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                <div style={{
                  backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                  padding: '24px',
                  borderRadius: '12px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginTop: 0, marginBottom: '16px' }}>Active Tasks</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {todos.filter(t => !t.completed).length === 0 ? (
                      <p style={{
                        textAlign: 'center',
                        padding: '24px',
                        color: darkMode ? '#94a3b8' : '#64748b'
                      }}>
                        No active tasks. Great work! 🎉
                      </p>
                    ) : (
                      todos
                        .filter(t => !t.completed)
                        .map(todo => (
                          <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={toggleComplete}
                            onEdit={startEdit}
                            onDelete={deleteTodo}
                            darkMode={darkMode}
                            isEditing={editingId === todo.id}
                            editText={editText}
                            onEditChange={(e) => setEditText(e.target.value)}
                            onSaveEdit={saveEdit}
                            onCancelEdit={() => setEditingId(null)}
                          />
                        ))
                    )}
                  </div>
                </div>
              </div>

              <div>
                <HistoryPanel history={history} darkMode={darkMode} onClearHistory={clearHistory} />
              </div>
            </div>
          </>
        ) : (
          <>
            <div style={{
              backgroundColor: darkMode ? '#1e293b' : '#ffffff',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              marginBottom: '32px'
            }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                  placeholder="Add a new task..."
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    outline: 'none',
                    backgroundColor: darkMode ? '#334155' : '#f1f5f9',
                    color: darkMode ? '#ffffff' : '#1f2937',
                    fontFamily: 'inherit',
                    fontSize: '14px'
                  }}
                />
                <button
                  onClick={addTodo}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Plus size={20} /> Add
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {todos.length === 0 ? (
                  <p style={{
                    textAlign: 'center',
                    padding: '24px',
                    color: darkMode ? '#94a3b8' : '#64748b'
                  }}>
                    No tasks yet. Create one to get started!
                  </p>
                ) : (
                  todos.map(todo => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleComplete}
                      onEdit={startEdit}
                      onDelete={deleteTodo}
                      darkMode={darkMode}
                      isEditing={editingId === todo.id}
                      editText={editText}
                      onEditChange={(e) => setEditText(e.target.value)}
                      onSaveEdit={saveEdit}
                      onCancelEdit={() => setEditingId(null)}
                    />
                  ))
                )}
              </div>
            </div>

            <HistoryPanel history={history} darkMode={darkMode} onClearHistory={clearHistory} />
          </>
        )}
      </div>
    </div>
  );
}