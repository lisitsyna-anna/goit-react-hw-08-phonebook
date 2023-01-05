import { useSelector } from 'react-redux';
import {
  selectUser,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectAuthIsLoading,
  selectAuthError,
} from 'redux/auth/authSelectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);
  const authIsLoading = useSelector(selectAuthIsLoading);
  const authError = useSelector(selectAuthError);

  return {
    isLoggedIn,
    isRefreshing,
    user,
    authIsLoading,
    authError,
  };
};
