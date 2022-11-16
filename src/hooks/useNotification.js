import { useDispatch } from 'react-redux';
import { notificationAction } from '../store/notification-slice';

const useNotification = () => {
  const dispatch = useDispatch();
  const showNotification = (params) => {
    dispatch(notificationAction.notification({
      status: params.status,
      title: params.title,
      message: params.message
    }));
  };

  return {
    showNotification
  };
};

export default useNotification;

