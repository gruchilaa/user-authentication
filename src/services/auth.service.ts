import { TUser } from '../context/auth/auth-context';

let userData: TUser[] = [];

export interface IResponse {
  status: 'success' | 'error';
  message?: string;
}

// mock login API
export const loginMockApi = async (payload: TUser): Promise<IResponse> => {
  console.log('login api', payload);
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      // check if user exists
      const findUser = userData.find(
        (user: TUser) => user.email === payload.email,
      );

      // user does not exists
      if (!findUser) {
        return reject(new Error('User not found'));
      }
      // check if password is correct

      if (findUser.password !== payload.password) {
        return reject(new Error('Incorrect credentials'));
      }

      resolve({
        status: 'success',
      });
    }, 100);
  });
};

// mock signup API
export const signUpMockApi = async (payload: TUser): Promise<IResponse> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      //check if email exists
      const findUser = userData.findIndex(
        (user: TUser) => user.email === payload.email,
      );

      // email exists
      if (findUser) {
        reject(new Error('User already exists'));
      }

      // add new user
      userData.push(payload);

      resolve({
        status: 'success',
        message: 'User successfully added',
      });
    }, 200);
  });
};
