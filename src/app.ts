import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

// Import error middlewares
import notFoundMiddleware from './middlewares/notfoundHandler';
import globalErrorMiddleware from './middlewares/globalErrorHandler';

// Temp router
import devRouter from './features/devData/devRoutes';

// Import routes
import authRouter from './features/authentication/authRoutes';
import userRouter from './features/users/userRoutes';
import categoryRouter from './features/categories/categoryRoutes';
import subcategoryRouter from './features/subcategories/subCatRoutes';
import productRouter from './features/products/productRoutes';
import reviewRouter from './features/reviews/reviewRoutes';
import cartRouter from './features/carts/cartRoutes';
import checkoutRouter from './features/orders/checkoutRoutes';
import orderRouter from './features/orders/orderRoutes';
import statsRouter from './features/stats/statsRoutes';
import settingRouter from './features/settings/settingRoutes';

// Create express application.
const app = express();

// mount application wide middlewares
app.use(express.json());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(process.env.JWT_SECRET));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// mount dev route
app.use('/api/v1/devs', devRouter);

// mount routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/subcategories', subcategoryRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/carts', cartRouter);
app.use('/api/v1/checkout', checkoutRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/stats', statsRouter);
app.use('/api/v1/settings', settingRouter);

// mount application wide error handlers
app.use(notFoundMiddleware);
app.use(globalErrorMiddleware);

export default app;
