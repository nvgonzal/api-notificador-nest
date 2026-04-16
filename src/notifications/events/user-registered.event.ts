export class UserRegisteredEvent {
  constructor(
    public readonly userId: number,
    public readonly email: string | undefined,
    public readonly name: string | undefined,
  ) {}
}
