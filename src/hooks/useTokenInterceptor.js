import axios from 'axios';
import { setAccessToken } from '../features/user/userSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { api, BASE_URL } from '../api/apiConfig';


export const useTokenInterceptor = () => {
  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    console.log(requestInterceptor, "requestInterceptor");

    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        console.log(originalRequest, "originalRequest");

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshResponse = await api.post(`${BASE_URL}/token-refresh`, {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              }
            });

            if (refreshResponse.status === 201) {
              // Token refresh successful
              console.log('Token refresh successful:', refreshResponse);
              dispatch(setAccessToken(refreshResponse.data.accessToken));
              localStorage.setItem('accessToken', refreshResponse.data.accessToken);

              originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
              return api(originalRequest);
            } else {
              // Unexpected status code
              console.log('Unexpected status code:', refreshResponse.status);
              // Redirect to login page or handle the error appropriately
              navigate('/create-account');
              return Promise.reject(new Error('Unexpected status code'));
            }
          } catch (error) {
            // Error during token refresh
            console.log('Token refresh failed:', error);
            // Redirect to login page or handle the error appropriately
            navigate('/create-account');
            return Promise.reject(error);
          }

          
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [dispatch, accessToken, refreshToken, navigate]);
};