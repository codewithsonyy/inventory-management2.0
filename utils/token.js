import { verify, sign } from 'jsonwebtoken';

const secretKey = process.env.NEXTAUTH_SECRET;
export const generateAccessToken = (user) => {
  const token = sign({ sub: user._id }, secretKey, { expiresIn: '6d' });
  return token;
};

export const decodeToken = (token) => {
  try {
    const decodedToken = verify(token, secretKey);
    return decodedToken;
  } catch (err) {
    console.error('Token decoding error:', err);
    return null;
  }
};

export const getAccessToken = () => {
  let accessToken;
  if( typeof window !== 'undefined' ){
    accessToken = localStorage.getItem('token');
  }
  return accessToken || '';
}

export const saveAccessToken = (accessToken) => {
  if (typeof window !== 'undefined' && typeof accessToken !== 'undefined') {
    localStorage.setItem('token', 'Bearer ' + accessToken);
  }
}


export const removeToken = () => {
  if( typeof window !== 'undefined' ){
  localStorage.removeItem('token');
  }
};