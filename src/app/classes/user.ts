export class User {
  id: number;
  name: string;
  email: string;
  phone: string;  
}

export class UserFactory {
  static getInstance() {
    return <User>{
      id: 0,
      name: '',
      email: '',
      phone: '',  
    }
  }
}