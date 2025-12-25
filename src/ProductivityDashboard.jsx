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












import { useState } from 'react';
import { Check, Trash2, Edit2, Plus, X, Moon, Sun, BarChart3, History, Calendar, Zap } from 'lucide-react';

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

// Professional Dark & Light Mode Color System
const colors = {
  light: {
    bg: {
      primary: '#f0f9ff',
      secondary: '#ffffff',
      tertiary: '#f1f5f9',
      hover: '#f8fafc',
    },
    text: {
      primary: '#1f2937',
      secondary: '#64748b',
      muted: '#94a3b8',
    },
    border: '#e5e7eb',
    accent: {
      blue: '#2563eb',
      green: '#16a34a',
      purple: '#9333ea',
      red: '#dc2626',
      amber: '#d97706',
    },
  },
  dark: {
    bg: {
      primary: '#0f172a',
      secondary: '#1e293b',
      tertiary: '#334155',
      hover: '#475569',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#cbd5e1',
      muted: '#94a3b8',
    },
    border: '#475569',
    accent: {
      blue: '#3b82f6',
      green: '#10b981',
      purple: '#a855f7',
      red: '#ef4444',
      amber: '#f59e0b',
    },
  }
};

const StatsCard = ({ label, value, icon: Icon, color, darkMode }) => {
  const palette = darkMode ? colors.dark : colors.light;
  const accentColor = palette.accent[color];
  
  return (
    <div
      style={{
        backgroundColor: palette.bg.secondary,
        borderRadius: '12px',
        padding: '24px',
        border: `1px solid ${accentColor}`,
        opacity: darkMode ? 0.85 : 0.95,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = darkMode 
          ? '0 20px 25px -5px rgba(59, 130, 246, 0.1)'
          : '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{
            fontSize: '14px',
            fontWeight: '500',
            color: palette.text.muted,
            margin: 0,
            marginBottom: '12px',
          }}>
            {label}
          </p>
          <p style={{
            fontSize: '32px',
            fontWeight: '700',
            margin: 0,
            color: accentColor,
          }}>
            {value}
          </p>
        </div>
        <div style={{
          padding: '12px',
          borderRadius: '8px',
          backgroundColor: `${accentColor}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon size={24} color={accentColor} opacity={0.8} />
        </div>
      </div>
    </div>
  );
};

const TodoItem = ({ todo, onToggle, onEdit, onDelete, darkMode, isEditing, editText, onEditChange, onSaveEdit, onCancelEdit }) => {
  const palette = darkMode ? colors.dark : colors.light;

  return (
    <div style={{
      backgroundColor: palette.bg.secondary,
      border: `1px solid ${palette.border}`,
      opacity: darkMode ? 0.8 : 0.9,
      padding: '16px',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
    }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 4px 6px ${darkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
    >
      {isEditing ? (
        <div style={{ display: 'flex', gap: '8px', flexDirection: window.innerWidth < 640 ? 'column' : 'row' }}>
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
              backgroundColor: palette.bg.tertiary,
              color: palette.text.primary,
              fontFamily: 'inherit',
              fontSize: '14px',
            }}
          />
          <button onClick={onSaveEdit} style={{
            padding: '8px 12px',
            backgroundColor: palette.accent.green,
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Save
          </button>
          <button onClick={onCancelEdit} style={{
            padding: '8px 12px',
            backgroundColor: palette.bg.tertiary,
            color: palette.text.secondary,
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}>
            <X size={16} />
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => onToggle(todo.id)}
            style={{
              flexShrink: 0,
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              border: `2px solid ${todo.completed ? 'transparent' : palette.border}`,
              backgroundColor: todo.completed ? palette.accent.green : 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
            }}
          >
            {todo.completed && <Check size={14} color="white" />}
          </button>
          <span style={{
            flex: 1,
            transition: 'all 0.3s ease',
            textDecoration: todo.completed ? 'line-through' : 'none',
            opacity: todo.completed ? 0.5 : 1,
            color: palette.text.primary,
            fontSize: '14px',
          }}>
            {todo.task}
          </span>
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            {!todo.completed && (
              <button onClick={() => onEdit(todo.id, todo.task)} style={{
                padding: '6px',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '44px',
                minHeight: '44px',
              }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.bg.tertiary}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Edit2 size={16} color={palette.text.muted} />
              </button>
            )}
            <button onClick={() => onDelete(todo.id)} style={{
              padding: '6px',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              color: palette.accent.red,
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '44px',
              minHeight: '44px',
            }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${palette.accent.red}15`}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const SimpleChart = ({ data, darkMode }) => {
  const palette = darkMode ? colors.dark : colors.light;
  const maxTasks = Math.max(...data.map(d => d.tasks), 1);
  const height = 200;

  return (
    <div style={{
      backgroundColor: palette.bg.secondary,
      border: `1px solid ${palette.border}`,
      opacity: darkMode ? 0.8 : 0.9,
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      marginBottom: '32px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: palette.text.primary }}>
          Tasks Completed (Last 30 Days)
        </h3>
        <Zap size={18} color={palette.accent.amber} opacity={0.7} />
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        height: `${height}px`,
        gap: '4px',
        padding: '16px 0',
        overflowX: 'auto',
      }}>
        {data.slice(-14).map((item, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: '35px' }}>
            <div style={{
              width: '100%',
              background: `linear-gradient(180deg, ${palette.accent.blue} 0%, ${palette.accent.blue}80 100%)`,
              borderRadius: '4px 4px 0 0',
              height: `${(item.tasks / maxTasks) * height}px`,
              minHeight: item.tasks > 0 ? '4px' : '0px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            />
            <span style={{
              fontSize: '10px',
              marginTop: '8px',
              color: palette.text.muted,
              textAlign: 'center',
              width: '100%',
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
  const palette = darkMode ? colors.dark : colors.light;

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all history? This cannot be undone.')) {
      onClearHistory();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0, color: palette.text.primary }}>Completed Tasks</h2>
        {history.length > 0 && (
          <button
            onClick={handleClear}
            style={{
              fontSize: '14px',
              padding: '6px 12px',
              color: palette.accent.red,
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              borderRadius: '4px',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${palette.accent.red}15`}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            Clear History
          </button>
        )}
      </div>

      {history.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['all', 'today', 'week', 'month'].map(range => (
            <button
              key={range}
              onClick={() => setFilter(range)}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                border: `1px solid ${palette.border}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: filter === range ? palette.accent.blue : palette.bg.tertiary,
                color: filter === range ? 'white' : palette.text.secondary,
                opacity: filter === range ? 1 : 0.7,
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
        overflowY: 'auto',
      }}>
        {filteredHistory.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '32px 16px',
            borderRadius: '8px',
            backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.5)' : '#f8fafc',
            border: `1px solid ${palette.border}`,
          }}>
            <History size={32} style={{ margin: '0 auto 8px', opacity: 0.3 }} color={palette.text.muted} />
            <p style={{ color: palette.text.muted, margin: 0, fontSize: '14px' }}>
              No completed tasks {filter !== 'all' ? `this ${filter}` : 'yet'}
            </p>
          </div>
        ) : (
          filteredHistory.map(item => (
            <div
              key={item.id}
              style={{
                backgroundColor: palette.bg.secondary,
                border: `1px solid ${palette.border}`,
                opacity: darkMode ? 0.8 : 0.9,
                padding: '16px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 4px 6px ${darkMode ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.1)'}`}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: '500', margin: '0 0 8px 0', color: palette.text.primary }}>
                  {item.task}
                </p>
                <p style={{
                  fontSize: '14px',
                  marginTop: '4px',
                  marginBottom: 0,
                  color: palette.text.muted,
                }}>
                  {new Date(item.completedAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <Check size={20} color={palette.accent.green} style={{ flexShrink: 0, marginLeft: '12px', marginTop: '4px' }} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default function ProductivityDashboard({ user, todos = [], setTodos = () => {} }) {
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [view, setView] = useState('dashboard');

  const palette = darkMode ? colors.dark : colors.light;

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
      backgroundColor: palette.bg.primary,
      color: palette.text.primary,
      padding: '24px 16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* User Info Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          backgroundColor: darkMode ? palette.bg.secondary : '#dbeafe',
          border: `1px solid ${palette.border}`,
          opacity: darkMode ? 0.8 : 0.9,
          borderRadius: '8px',
          marginBottom: '24px',
          fontSize: '14px',
        }}>
          <span style={{ color: palette.text.secondary }}>Synced with Firebase ☁️ • {user?.displayName || user?.email || 'Guest'}</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              padding: '8px',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: palette.bg.tertiary,
              color: darkMode ? palette.accent.amber : '#475569',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.bg.hover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = palette.bg.tertiary}
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
            backgroundClip: 'text',
          }}>
            Productivity Dashboard
          </h1>
          <p style={{ margin: '8px 0 0 0', color: palette.text.muted }}>
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
                flex: window.innerWidth < 640 ? 1 : 'initial',
                padding: '10px 16px',
                borderRadius: '8px',
                fontWeight: '500',
                border: `1px solid ${palette.border}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: view === v ? palette.accent.blue : palette.bg.secondary,
                color: view === v ? 'white' : palette.text.secondary,
                fontSize: '14px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {v === 'dashboard' ? '📊 Dashboard' : '📋 Tasks'}
            </button>
          ))}
        </div>

        {view === 'dashboard' ? (
          <>
            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '32px',
            }}>
              <StatsCard label="Total Tasks" value={total} icon={BarChart3} color="blue" darkMode={darkMode} />
              <StatsCard label="Completed" value={completed} icon={Check} color="green" darkMode={darkMode} />
              <StatsCard label="Pending" value={total - completed} icon={Calendar} color="orange" darkMode={darkMode} />
              <StatsCard label="Progress" value={`${percentage}%`} icon={BarChart3} color="purple" darkMode={darkMode} />
            </div>

            {/* Completion Rate */}
            <div style={{
              backgroundColor: palette.bg.secondary,
              border: `1px solid ${palette.border}`,
              opacity: darkMode ? 0.8 : 0.9,
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              marginBottom: '32px',
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginTop: 0, marginBottom: '16px', color: palette.text.primary }}>
                Completion Rate
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      height: '12px',
                      borderRadius: '9999px',
                      overflow: 'hidden',
                      backgroundColor: palette.bg.tertiary,
                    }}>
                      <div
                        style={{
                          height: '100%',
                          background: `linear-gradient(135deg, ${palette.accent.green} 0%, ${palette.accent.green}dd 100%)`,
                          width: `${percentage}%`,
                          transition: 'all 0.5s ease'
                        }}
                      />
                    </div>
                  </div>
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: palette.accent.green, minWidth: '48px' }}>
                    {percentage}%
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: palette.text.primary }}>{completed} completed</span>
                  <span style={{ color: palette.text.muted }}>{total - completed} remaining</span>
                </div>
              </div>
            </div>

            {/* Chart */}
            {history.length > 0 && <SimpleChart data={chartData} darkMode={darkMode} />}

            {/* Main Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
              marginTop: '32px',
            }}>
              <div>
                {/* Quick Add Task */}
                <div style={{
                  backgroundColor: palette.bg.secondary,
                  border: `1px solid ${palette.border}`,
                  opacity: darkMode ? 0.8 : 0.9,
                  padding: '24px',
                  borderRadius: '12px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  marginBottom: '24px',
                }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginTop: 0, marginBottom: '16px', color: palette.text.primary }}>Quick Add Task</h3>
                  <div style={{ display: 'flex', gap: '8px', flexDirection: window.innerWidth < 640 ? 'column' : 'row' }}>
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
                        backgroundColor: palette.bg.tertiary,
                        color: palette.text.primary,
                        fontFamily: 'inherit',
                        fontSize: '14px',
                        minHeight: '44px',
                        transition: 'all 0.2s ease',
                      }}
                      onFocus={(e) => e.currentTarget.style.backgroundColor = palette.bg.hover}
                      onBlur={(e) => e.currentTarget.style.backgroundColor = palette.bg.tertiary}
                    />
                    <button
                      onClick={addTodo}
                      style={{
                        padding: '12px 16px',
                        background: `linear-gradient(135deg, ${palette.accent.blue} 0%, ${palette.accent.purple} 100%)`,
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        minHeight: '44px',
                        minWidth: '44px',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                {/* Active Tasks */}
                <div style={{
                  backgroundColor: palette.bg.secondary,
                  border: `1px solid ${palette.border}`,
                  opacity: darkMode ? 0.8 : 0.9,
                  padding: '24px',
                  borderRadius: '12px',
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    color: palette.text.primary
                  }}>
                    Active Tasks
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {todos.filter(t => !t.completed).length === 0 ? (
                      <p style={{
                        textAlign: 'center',
                        padding: '24px',
                        color: palette.text.muted,
                        fontSize: '14px'
                      }}>
                        No active tasks. Great work 🎉
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

              {/* History Panel */}
              <div>
                <HistoryPanel
                  history={history}
                  darkMode={darkMode}
                  onClearHistory={clearHistory}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* LIST VIEW */}
            <div style={{
              backgroundColor: palette.bg.secondary,
              border: `1px solid ${palette.border}`,
              opacity: darkMode ? 0.8 : 0.9,
              padding: '24px',
              borderRadius: '12px',
            }}>
              <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '16px',
                flexDirection: window.innerWidth < 640 ? 'column' : 'row'
              }}>
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
                    backgroundColor: palette.bg.tertiary,
                    color: palette.text.primary,
                    minHeight: '44px',
                  }}
                />
                <button
                  onClick={addTodo}
                  style={{
                    padding: '12px 24px',
                    background: `linear-gradient(135deg, ${palette.accent.blue}, ${palette.accent.purple})`,
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    minHeight: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
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
                    color: palette.text.muted
                  }}>
                    No tasks yet. Create one to get started.
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

            <div style={{ marginTop: '32px' }}>
              <HistoryPanel
                history={history}
                darkMode={darkMode}
                onClearHistory={clearHistory}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
