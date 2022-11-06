import Fastify from 'fastify';
import jwt from '@fastify/jwt';
import cors from '@fastify/cors';

import { authRoutes } from './routes/auth';
import { pollRoutes } from './routes/poll';
import { guessRoutes } from './routes/guess';
import { userRoutes } from './routes/user';
import { gameRoutes } from './routes/game';

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(jwt, {
    secret: process.env.JWT_SECRET ?? '',
  });

  await fastify.register(authRoutes);
  await fastify.register(pollRoutes);
  await fastify.register(gameRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(userRoutes);

  await fastify.listen({ port: 3333, host: '0.0.0.0' });
}

bootstrap();
