import { CreateUserBoundaries } from '../../ports/boundaries/create-user.boundaries';

export class CreateUserCommand {
  constructor(public readonly data: CreateUserBoundaries.Input) {}
}
