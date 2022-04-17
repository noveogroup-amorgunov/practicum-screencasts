import { UserDTO } from 'api/types';

export const transformUser = (data: UserDTO): User => {
  return {
    login: data.login,
    id: data.id,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name,
    avatar: data.avatar,
    phone: data.phone,
    email: data.email,
  };
};

export const transformUserDTO = (data: User): UserDTO => {
  return {
    login: data.login,
    id: data.id,
    first_name: data.firstName,
    second_name: data.secondName,
    display_name: data.displayName,
    avatar: data.avatar,
    phone: data.phone,
    email: data.email,
  };
};
