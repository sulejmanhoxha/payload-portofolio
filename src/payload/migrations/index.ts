import * as migration_20250205_191822 from './20250205_191822';

export const migrations = [
  {
    up: migration_20250205_191822.up,
    down: migration_20250205_191822.down,
    name: '20250205_191822'
  },
];
