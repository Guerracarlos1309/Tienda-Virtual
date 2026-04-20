require('dotenv').config();
const { User, Product, sequelize } = require('./models');

const seed = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Base de datos reseteada para seeding');

    // Create Admin
    await User.create({
      username: 'admin',
      email: 'admin@tienda.com',
      password: 'admin123', // Will be hashed by model hook
      role: 'admin'
    });
    console.log('Admin creado: admin / admin123');

    // Create Products - Clothing
    await Product.bulkCreate([
      {
        name: 'Camiseta Premium',
        description: 'Algodón 100% orgánico, corte moderno.',
        price: 25.99,
        category: 'ropa',
        type: 'Camiseta',
        attributes: { sizes: ['S', 'M', 'L', 'XL'], colors: ['Negro', 'Blanco', 'Gris'] },
        stock: 50,
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Jeans Slim Fit',
        description: 'Diseño clásico con un toque moderno.',
        price: 45.50,
        category: 'ropa',
        type: 'Pantalón',
        attributes: { sizes: ['30', '32', '34', '36'], colors: ['Azul', 'Negro'] },
        stock: 30,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Reloj Elegante',
        description: 'Resistente al agua, cristal de zafiro.',
        price: 120.00,
        category: 'varios',
        type: 'Accesorio',
        attributes: { material: 'Acero Inoxidable' },
        stock: 15,
        image: 'https://images.unsplash.com/photo-1524592091214-8ca296cae367?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Mochila Urbana',
        description: 'Espacio para laptop de 15 pulgadas.',
        price: 60.00,
        category: 'varios',
        type: 'Equipaje',
        attributes: { capacidad: '20L' },
        stock: 20,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'
      }
    ]);
    console.log('Productos iniciales creados');

    process.exit(0);
  } catch (error) {
    console.error('Error durante el seeding:', error);
    process.exit(1);
  }
};

seed();
