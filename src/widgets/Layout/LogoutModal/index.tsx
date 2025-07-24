import { Modal, ModalTitle, ModalContent, ModalButtonPanel, Button, T } from '@admiral-ds/react-ui';
import { useAppDispatch } from '@shared/lib/hooks/redux';
import { logoutThunk } from '@features/auth/model/thunks/logout';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@shared/config/routes';
import styles from './LogoutModal.module.css';
import { useEffect, useState } from 'react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoutModal = ({ isOpen, onClose }: LogoutModalProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 550);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 550);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    onClose();
    navigate(ROUTES.login);
  };

  if (!isOpen) return null;

  return (
    <Modal
      dimension="m"
      mobile={isMobile}
      onClose={onClose}
      closeOnEscapeKeyDown
      closeOnOutsideClick
      displayCloseIcon
      aria-labelledby="logout-modal-title"
    >
      <ModalTitle id="logout-modal-title" className={styles.titleWrapper}>
        <div className={styles.titleInner}>
          <T font="Header/H2" className={styles.title}>
            Выход из аккаунта
          </T>
          <div className={styles.titleUnderline} />
        </div>
      </ModalTitle>

      <ModalContent className={styles.modalContent}>
        <T font="Body/Body 2 Long">
          После выхода вы будете перенаправлены на страницу входа, где Вам снова нужно будет
          авторизоваться.
        </T>
      </ModalContent>

      <ModalButtonPanel className={styles.modalButtons}>
        <Button appearance="secondary" dimension="m" onClick={onClose}>
          Отмена
        </Button>
        <Button appearance="danger" dimension="m" onClick={handleLogout}>
          Выйти
        </Button>
      </ModalButtonPanel>
    </Modal>
  );
};
