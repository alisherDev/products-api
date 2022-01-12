export class UserDto {
  constructor(props) {
    Object.entries(props).forEach(([prop, value]) => (this[prop] = value));
  }

  id?: number;

  email!: string;

  password?: string;
}
