import { AwilixContainer } from 'awilix';

const container = new AwilixContainer();

container.register({
  // Register our Prisma instance
  prisma: asValue(prisma),
});

export default container;