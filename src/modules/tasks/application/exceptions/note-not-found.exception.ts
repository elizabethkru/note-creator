import { BaseException } from 'src/modules/shared/domain/exceptions/base-domain.exception';

export class DomainNotFoundException extends BaseException {
  status = 404;
  customErrorCode = 'domain_not_found';
}
