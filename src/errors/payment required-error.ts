import { ApplicationError } from '@/protocols';

export function paymentRequiredError(): ApplicationError {
  return {
    name: 'paymentRequiredError',
    message: 'No result for this search!',
  };
}
