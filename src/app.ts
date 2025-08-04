import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import dotenv from 'dotenv';
import AuthAndRegisterUsers from './routes/auth.register.routes'

dotenv.config();

class App {
  public app: Application;
  public port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '5000', 10);
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(helmet());
    this.app.use(cors({
      origin: process.env.NODE_ENV === 'production'
        ? ['https://your-production-url.com']
        : ['http://localhost:3000', 'http://localhost:5173'],
      credentials: true
    }));
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    this.app.use(morgan('dev'));

    const limiter = rateLimit({
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
      max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
      message: 'Trop de requêtes, veuillez réessayer plus tard.'
    });
    this.app.use('/api/', limiter);
  }

  private initializeRoutes(): void {
    console.log('Initializing routes...');

    
    this.app.get('/health', (req: Request, res: Response) => {
      console.log('Handling /health route');
      res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      });
    });
    
    // toutes les routes crees sont utlisees ici 

    // routes d'access aux ressources
    this.app.use('/api/access/management', AuthAndRegisterUsers)


    this.app.use(/.*/, (req: Request, res: Response) => {
      console.log('Handling catch-all route');
      res.status(404).json({
        error: 'Route introuvable',
        path: req.originalUrl
      });
    });

  }

  private initializeErrorHandling(): void {
    console.log('Initializing error handling...');

    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error('[Erreur Serveur]', err.stack);
      res.status(500).json({
        error: process.env.NODE_ENV === 'production'
          ? 'Erreur interne du serveur'
          : err.message,
        timestamp: new Date().toISOString()
      });
    });
  }

  public listen(): void {
    console.log('Starting server...');
    this.app.listen(this.port, () => {
      console.log(`🚀 Serveur lancé sur http://localhost:${this.port}`);
      console.log(`🌱 ENV : ${process.env.NODE_ENV}`);
      console.log(`💡 Test santé : http://localhost:${this.port}/health`);
    });
  }
}

export default App;