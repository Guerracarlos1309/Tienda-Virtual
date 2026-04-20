import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Package, FileText, LogOut, CheckCircle } from 'lucide-react';
import '../styles/Admin.css';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('adminToken'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'invoices'

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('adminToken', response.data.token);
      setIsLoggedIn(true);
    } catch (error) {
      alert('Credenciales inválidas');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
  };

  const fetchData = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const ordersRes = await axios.get('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const invoicesRes = await axios.get('http://localhost:5000/api/invoices', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(ordersRes.data);
      setInvoices(invoicesRes.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      if (error.response?.status === 401) handleLogout();
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchData();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="login-page">
        <form className="login-form glass animate-up" onSubmit={handleLogin}>
          <h2>Acceso Administrador</h2>
          <div className="input-group">
            <label>Usuario</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn-primary">Ingresar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <aside className="admin-sidebar glass">
        <div className="admin-logo">
          <Package size={30} />
          <span>Panel Admin</span>
        </div>
        <nav>
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
            <Package size={20} /> Pedidos
          </button>
          <button className={activeTab === 'invoices' ? 'active' : ''} onClick={() => setActiveTab('invoices')}>
            <FileText size={20} /> Facturas
          </button>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} /> Cerrar Sesión
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-header glass">
          <h1>{activeTab === 'orders' ? 'Gestión de Pedidos' : 'Registro de Facturas'}</h1>
          <button onClick={fetchData} className="refresh-btn">Actualizar Datos</button>
        </header>

        <section className="admin-content animate-up">
          {activeTab === 'orders' ? (
            <div className="data-table glass">
              <table>
                <thead>
                  <tr>
                    <th>ID Pedido</th>
                    <th>Cliente</th>
                    <th>Productos</th>
                    <th>Total</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id.slice(0, 8)}...</td>
                      <td>
                        <div className="client-info">
                          <strong>{order.customerName}</strong>
                          <span>{order.customerEmail}</span>
                        </div>
                      </td>
                      <td>
                        <ul className="product-list-mini">
                          {order.items.map((item, idx) => (
                            <li key={idx}>
                              {item.Product?.name} ({item.quantity})
                              {item.selectedAttributes && <span className="attr-tag">{JSON.stringify(item.selectedAttributes)}</span>}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="amount">${order.total}</td>
                      <td>
                        <span className={`status-tag ${order.status}`}>{order.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="data-table glass">
              <table>
                <thead>
                  <tr>
                    <th>Factura #</th>
                    <th>Fecha</th>
                    <th>Subtotal</th>
                    <th>Impuestos</th>
                    <th>Total Pagado</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map(invoice => (
                    <tr key={invoice.id}>
                      <td>{invoice.invoiceNumber}</td>
                      <td>{new Date(invoice.date).toLocaleDateString()}</td>
                      <td>${invoice.subtotal}</td>
                      <td>${invoice.tax}</td>
                      <td className="amount-total">${invoice.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Admin;
