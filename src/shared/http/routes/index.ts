import { productsRouter } from '@modules/products/routes/products.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);

routes.get('/', (req, res) => {
  res.json({ message: 'hello dev, again!!' });
});

export { routes };
