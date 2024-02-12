import { SECRET_HASH, TIME_TOKEN_VALIDATION } from '@shared/const';

export default {
  jwt: { secret: SECRET_HASH, expiresIn: TIME_TOKEN_VALIDATION },
};
