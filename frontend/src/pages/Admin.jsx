import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Package, FileText, LogOut, CheckCircle, Plus, Trash2, Edit3, ShoppingBag, X, Layers, AlertCircle, HelpCircle, Eye } from 'lucide-react';
import logo from '../assets/logo.png';
import '../styles/Admin.css';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('adminToken'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'invoices' or 'products'
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    productTypeId: '',
    images: ['']
  });

  // Cat/Type states
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [catFormData, setCatFormData] = useState({ name: '', description: '' });

  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [typeFormData, setTypeFormData] = useState({ name: '', categoryId: '', attributes: {} });

  const [selectedOrder, setSelectedOrder] = useState(null);

  // Custom Modal States
  const [notification, setNotification] = useState(null); // { type: 'success' | 'error', message: '' }
  const [confirmModal, setConfirmModal] = useState(null); // { message: '', onConfirm: () => {} }

  const showNotify = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('adminToken', response.data.token);
      setIsLoggedIn(true);
      showNotify('Bienvenido de nuevo, Administrador');
    } catch (error) {
      showNotify('Credenciales inválidas', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
  };

  const fetchData = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const [ordersRes, invoicesRes, productsRes, categoriesRes, typesRes] = await Promise.all([
        axios.get('http://localhost:5000/api/orders', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:5000/api/invoices', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:5000/api/products'),
        axios.get('http://localhost:5000/api/categories'),
        axios.get('http://localhost:5000/api/types')
      ]);
      setOrders(ordersRes.data);
      setInvoices(invoicesRes.data);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
      setProductTypes(typesRes.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      if (error.response?.status === 401) handleLogout();
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        images: formData.images.filter(url => url.trim() !== '')
      };

      if (editingProduct) {
        await axios.put(`http://localhost:5000/api/products/${editingProduct.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:5000/api/products', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setIsModalOpen(false);
      resetForm();
      fetchData();
      showNotify(editingProduct ? 'Producto actualizado' : 'Producto creado con éxito');
    } catch (error) {
      showNotify('Error al guardar el producto', 'error');
    }
  };

  const handleProductDelete = async (id) => {
    setConfirmModal({
      message: '¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.',
      onConfirm: async () => {
        const token = localStorage.getItem('adminToken');
        try {
          await axios.delete(`http://localhost:5000/api/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          fetchData();
          showNotify('Producto eliminado correctamente');
        } catch (error) {
          showNotify('Error al eliminar el producto', 'error');
        }
        setConfirmModal(null);
      }
    });
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        productTypeId: product.productTypeId,
        images: product.images?.length > 0 ? product.images.map(img => img.url) : ['']
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      productTypeId: '',
      images: ['']
    });
  };

  // Category Handlers
  const handleCatSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    try {
      if (editingCat) {
        await axios.put(`http://localhost:5000/api/categories/${editingCat.id}`, catFormData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:5000/api/categories', catFormData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setIsCatModalOpen(false);
      setEditingCat(null);
      setCatFormData({ name: '', description: '' });
      fetchData();
      showNotify(editingCat ? 'Categoría actualizada' : 'Categoría creada');
    } catch (error) {
      showNotify('Error al guardar la categoría', 'error');
    }
  };

  const handleCatDelete = async (id) => {
    setConfirmModal({
      message: '¿Eliminar categoría? Se perderán todos los tipos de productos y asociaciones relacionadas.',
      onConfirm: async () => {
        const token = localStorage.getItem('adminToken');
        try {
          await axios.delete(`http://localhost:5000/api/categories/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          fetchData();
          showNotify('Categoría eliminada');
        } catch (error) {
          showNotify('Error al eliminar la categoría', 'error');
        }
        setConfirmModal(null);
      }
    });
  };

  // Type Handlers
  const handleTypeSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    try {
      if (editingType) {
        await axios.put(`http://localhost:5000/api/types/${editingType.id}`, typeFormData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:5000/api/types', typeFormData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setIsTypeModalOpen(false);
      setEditingType(null);
      setTypeFormData({ name: '', categoryId: '', attributes: {} });
      fetchData();
      showNotify(editingType ? 'Tipo actualizado' : 'Tipo creado');
    } catch (error) {
      showNotify('Error al guardar el tipo', 'error');
    }
  };

  const handleTypeDelete = async (id) => {
    setConfirmModal({
      message: '¿Eliminar este tipo de producto?',
      onConfirm: async () => {
        const token = localStorage.getItem('adminToken');
        try {
          await axios.delete(`http://localhost:5000/api/types/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          fetchData();
          showNotify('Tipo de producto eliminado');
        } catch (error) {
          showNotify('Error al eliminar el tipo', 'error');
        }
        setConfirmModal(null);
      }
    });
  };

  const handleUpdateStatus = async (id, newStatus) => {
    const token = localStorage.getItem('adminToken');
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
      showNotify(`Estado del pedido actualizado a: ${newStatus}`);
    } catch (error) {
      showNotify('Error al actualizar el estado', 'error');
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
          <img src={logo} alt="Logo" className="admin-logo-img" />
          <span>Panel Admin</span>
        </div>
        <nav>
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
            <Package size={20} /> Pedidos
          </button>
          <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
            <ShoppingBag size={20} /> Productos
          </button>
          <button className={activeTab === 'invoices' ? 'active' : ''} onClick={() => setActiveTab('invoices')}>
            <FileText size={20} /> Facturas
          </button>
          <hr className="sidebar-divider" />
          <button className={activeTab === 'categories' ? 'active' : ''} onClick={() => setActiveTab('categories')}>
            <Layers size={20} /> Categorías
          </button>
          <button className={activeTab === 'types' ? 'active' : ''} onClick={() => setActiveTab('types')}>
            <Edit3 size={20} /> Tipos Prod.
          </button>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} /> Cerrar Sesión
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-header glass">
          <h1>
            {activeTab === 'orders' && 'Gestión de Pedidos'}
            {activeTab === 'products' && 'Gestión de Inventario'}
            {activeTab === 'invoices' && 'Registro de Facturas'}
            {activeTab === 'categories' && 'Categorías de la Tienda'}
            {activeTab === 'types' && 'Tipos de Productos'}
          </h1>
          <div className="header-actions">
            {activeTab === 'products' && (
              <button onClick={() => openModal()} className="btn-primary flex-center gap-2">
                <Plus size={18} /> Nuevo Producto
              </button>
            )}
            {activeTab === 'categories' && (
              <button onClick={() => { setEditingCat(null); setCatFormData({ name: '', description: '' }); setIsCatModalOpen(true); }} className="btn-primary flex-center gap-2">
                <Plus size={18} /> Nueva Categoría
              </button>
            )}
            {activeTab === 'types' && (
              <button onClick={() => { setEditingType(null); setTypeFormData({ name: '', categoryId: '', attributes: {} }); setIsTypeModalOpen(true); }} className="btn-primary flex-center gap-2">
                <Plus size={18} /> Nuevo Tipo
              </button>
            )}
            <button onClick={fetchData} className="refresh-btn">Actualizar Datos</button>
          </div>
        </header>

        <section className="admin-content animate-up">
          {activeTab === 'orders' && (
            <div className="data-table glass">
              <table>
                <thead>
                  <tr>
                    <th>ID Pedido</th>
                    <th>Cliente</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>
                        <div className="client-info">
                          <strong>{order.customerName}</strong>
                          <span>{order.customerEmail}</span>
                        </div>
                      </td>
                      <td className="amount">${order.total}</td>
                      <td>
                        <div className="status-selector">
                          <select 
                            value={order.status} 
                            onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                            className={`status-tag-select ${order.status}`}
                          >
                            <option value="pendiente">Pendiente</option>
                            <option value="procesado">Procesado</option>
                            <option value="enviado">Enviado</option>
                            <option value="entregado">Entregado</option>
                          </select>
                        </div>
                      </td>
                      <td>
                        <div className="actions-cell">
                          <button onClick={() => setSelectedOrder(order)} className="icon-btn view" title="Ver Detalles">
                            <Eye size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="data-table glass">
              <table>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Categoría / Tipo</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td>
                        <div className="product-cell">
                          {product.images?.[0] && <img src={product.images[0].url} alt={product.name} className="product-thumb" />}
                          <div>
                            <strong>{product.name}</strong>
                            <p className="description-short">{product.description?.slice(0, 50)}...</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="category-info">
                          <span className="type-badge">{product.type?.name}</span>
                          <span className="cat-text">{product.type?.category?.name}</span>
                        </div>
                      </td>
                      <td className="amount">${product.price}</td>
                      <td>
                        <span className={`stock-tag ${product.stock <= 5 ? 'low' : ''}`}>
                          {product.stock} unidades
                        </span>
                      </td>
                      <td>
                        <div className="actions-cell">
                          <button onClick={() => openModal(product)} className="icon-btn edit">
                            <Edit3 size={18} />
                          </button>
                          <button onClick={() => handleProductDelete(product.id)} className="icon-btn delete">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'invoices' && (
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

          {activeTab === 'categories' && (
            <div className="data-table glass">
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Slug</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(cat => (
                    <tr key={cat.id}>
                      <td><strong>{cat.name}</strong></td>
                      <td><code>{cat.slug}</code></td>
                      <td>{cat.description}</td>
                      <td>
                        <div className="actions-cell">
                          <button onClick={() => { setEditingCat(cat); setCatFormData({ name: cat.name, description: cat.description }); setIsCatModalOpen(true); }} className="icon-btn edit"><Edit3 size={18}/></button>
                          <button onClick={() => handleCatDelete(cat.id)} className="icon-btn delete"><Trash2 size={18}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'types' && (
            <div className="data-table glass">
              <table>
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Categoría</th>
                    <th>Atributos</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productTypes.map(type => (
                    <tr key={type.id}>
                      <td><strong>{type.name}</strong></td>
                      <td>{type.category?.name}</td>
                      <td>{JSON.stringify(type.attributes)}</td>
                      <td>
                        <div className="actions-cell">
                          <button onClick={() => { setEditingType(type); setTypeFormData({ name: type.name, categoryId: type.categoryId, attributes: type.attributes }); setIsTypeModalOpen(true); }} className="icon-btn edit"><Edit3 size={18}/></button>
                          <button onClick={() => handleTypeDelete(type.id)} className="icon-btn delete"><Trash2 size={18}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* Modals Cat/Type */}
      {isCatModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass animate-up">
            <header className="modal-header">
              <h2>{editingCat ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
              <button onClick={() => setIsCatModalOpen(false)} className="close-btn"><X size={24} /></button>
            </header>
            <form onSubmit={handleCatSubmit} className="product-form">
              <div className="input-group">
                <label>Nombre</label>
                <input type="text" value={catFormData.name} onChange={e => setCatFormData({...catFormData, name: e.target.value})} required />
              </div>
              <div className="input-group">
                <label>Descripción</label>
                <textarea value={catFormData.description} onChange={e => setCatFormData({...catFormData, description: e.target.value})} rows="3"></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setIsCatModalOpen(false)} className="btn-secondary">Cancelar</button>
                <button type="submit" className="btn-primary">{editingCat ? 'Guardar' : 'Crear'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isTypeModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass animate-up">
            <header className="modal-header">
              <h2>{editingType ? 'Editar Tipo' : 'Nuevo Tipo'}</h2>
              <button onClick={() => setIsTypeModalOpen(false)} className="close-btn"><X size={24} /></button>
            </header>
            <form onSubmit={handleTypeSubmit} className="product-form">
              <div className="input-group">
                <label>Nombre del Tipo (Ej: Calzado, Camisas)</label>
                <input type="text" value={typeFormData.name} onChange={e => setTypeFormData({...typeFormData, name: e.target.value})} required />
              </div>
              <div className="input-group">
                <label>Categoría Perteneciente</label>
                <select value={typeFormData.categoryId} onChange={e => setTypeFormData({...typeFormData, categoryId: e.target.value})} required>
                  <option value="">Seleccionar Categoría...</option>
                  {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setIsTypeModalOpen(false)} className="btn-secondary">Cancelar</button>
                <button type="submit" className="btn-primary">{editingType ? 'Guardar' : 'Crear'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Product Form */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass animate-up">
            <header className="modal-header">
              <h2>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="close-btn"><X size={24} /></button>
            </header>
            <form onSubmit={handleProductSubmit} className="product-form">
              <div className="form-grid">
                <div className="input-group">
                  <label>Nombre del Producto</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Precio ($)</label>
                  <input type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Stock Inicial</label>
                  <input type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Categoría / Tipo</label>
                  <select value={formData.productTypeId} onChange={e => setFormData({...formData, productTypeId: e.target.value})} required>
                    <option value="">Seleccionar Tipo...</option>
                    {productTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.category?.name} - {type.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="input-group">
                <label>Descripción</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows="3"></textarea>
              </div>
              <div className="input-group">
                <label>URLs de Imágenes (una por línea)</label>
                <textarea placeholder="https://ejemplo.com/imagen.jpg" value={formData.images.join('\n')} onChange={e => setFormData({...formData, images: e.target.value.split('\n')})} rows="2"></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Cancelar</button>
                <button type="submit" className="btn-primary">{editingProduct ? 'Guardar Cambios' : 'Crear Producto'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal Order Details */}
      {selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-content glass animate-up order-details-modal">
            <header className="modal-header">
              <h2>Detalles del Pedido</h2>
              <button onClick={() => setSelectedOrder(null)} className="close-btn"><X size={24} /></button>
            </header>
            <div className="order-details-body">
              <div className="info-grid">
                <div className="info-item">
                  <label>Cliente</label>
                  <p>{selectedOrder.customerName}</p>
                </div>
                <div className="info-item">
                  <label>WhatsApp</label>
                  <p>{selectedOrder.phone}</p>
                </div>
                <div className="info-item full">
                  <label>Dirección</label>
                  <p>{selectedOrder.address}</p>
                </div>
              </div>

              <hr className="modal-divider" />
              
              <h3>Productos ({selectedOrder.items.length})</h3>
              <div className="order-items-list">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="order-item-row">
                    <div className="item-main">
                      <strong>{item.Product?.name}</strong>
                      <div className="item-meta">
                        {item.selectedAttributes && Object.entries(item.selectedAttributes).map(([k, v]) => (
                          <span key={k} className="attr-badge">{v}</span>
                        ))}
                      </div>
                    </div>
                    <div className="item-qty">x{item.quantity}</div>
                    <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className="order-summary-box glass">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${selectedOrder.total}</span>
                </div>
                <div className="summary-row total">
                  <span>Total Final:</span>
                  <span>${selectedOrder.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div className={`notification-toast glass ${notification.type} animate-up`}>
          {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="modal-overlay" style={{ zIndex: 2000 }}>
          <div className="confirm-modal glass animate-up">
            <div className="confirm-header">
              <HelpCircle size={40} color="var(--primary)" />
            </div>
            <div className="confirm-body">
              <h3>¿Estás seguro?</h3>
              <p>{confirmModal.message}</p>
            </div>
            <div className="confirm-actions">
              <button className="btn-secondary" onClick={() => setConfirmModal(null)}>Cancelar</button>
              <button className="confirm-btn" onClick={confirmModal.onConfirm}>Confirmar Acción</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
