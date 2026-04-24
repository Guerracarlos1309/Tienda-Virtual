require('dotenv').config();
const { User, Product, sequelize } = require('./models');

const seed = async () => {
  try {
    const { Category, ProductType, Product, ProductImage, User } = require('./models');
    await sequelize.sync({ force: true });
    console.log('Base de datos reseteada para seeding');

    // 1. Create Admin
    await User.create({
      username: 'admin',
      email: 'admin@tienda.com',
      password: 'admin123',
      role: 'admin'
    });

    // 2. Create Categories
    const catModa = await Category.create({ name: 'Moda', slug: 'moda', description: 'Ropa y calzado de última tendencia' });
    const catAccesorios = await Category.create({ name: 'Accesorios', slug: 'accesorios', description: 'Complementos y artículos varios' });

    // 3. Create Product Types
    const typeCamisetas = await ProductType.create({ name: 'Camisetas', categoryId: catModa.id });
    const typeJeans = await ProductType.create({ name: 'Pantalones', categoryId: catModa.id });
    const typeRelojes = await ProductType.create({ name: 'Relojes', categoryId: catAccesorios.id });
    const typeMochilas = await ProductType.create({ name: 'Mochilas', categoryId: catAccesorios.id });

    // 4. Create Products and Images
    const p1 = await Product.create({
      name: 'Camiseta Premium Azul',
      description: 'Algodón 100% orgánico, corte moderno y extra suave.',
      price: 25.99,
      productTypeId: typeCamisetas.id,
      stock: 50,
      attributes: { sizes: ['S', 'M', 'L'], colors: ['Azul', 'Gris'] }
    });
    await ProductImage.bulkCreate([
      { url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800', isPrimary: true, productId: p1.id },
      { url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800', isPrimary: false, productId: p1.id }
    ]);

    const p2 = await Product.create({
      name: 'Jeans Slim Fit Dark',
      description: 'Diseño clásico con un toque moderno y duradero.',
      price: 45.50,
      productTypeId: typeJeans.id,
      stock: 30,
      attributes: { sizes: ['30', '32', '34'], colors: ['Azul Marino', 'Negro'] }
    });
    await ProductImage.create({ url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800', isPrimary: true, productId: p2.id });

    const p3 = await Product.create({
      name: 'Reloj Chrono Silver',
      description: 'Resistente al agua, cristal de zafiro y correa de acero.',
      price: 120.00,
      productTypeId: typeRelojes.id,
      stock: 15
    });
    await ProductImage.create({ url: 'https://images.unsplash.com/photo-1524592091214-8ca296cae367?auto=format&fit=crop&q=80&w=800', isPrimary: true, productId: p3.id });

    console.log('Seeding jerárquico completado con éxito');
    process.exit(0);
  } catch (error) {
    console.error('Error durante el seeding:', error);
    process.exit(1);
  }
};

seed();
