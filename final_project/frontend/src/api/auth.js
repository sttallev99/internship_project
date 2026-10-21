import api from './client';

export const signIn = async (credentials) => {
    const { data } = await api.post('/sign-in', credentials);
    return data.user;
};

export const signUp = async (user) => {
    const { data } = await api.post('/sign-up', user);
    return data.user;
};

export const signOut = () => api.get('/sign-out');
