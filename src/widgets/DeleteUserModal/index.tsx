import { Modal, ModalTitle, ModalContent, ModalButtonPanel, Button, T } from '@admiral-ds/react-ui';
import styles from './DeleteUserModal.module.css';

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName?: string;
}

export const DeleteUserModal = ({ isOpen, onClose, onConfirm, userName }: DeleteUserModalProps) => {
  if (!isOpen) return null;

  return (
    <Modal
      dimension="m"
      onClose={onClose}
      closeOnEscapeKeyDown
      closeOnOutsideClick
      displayCloseIcon
    >
      <ModalTitle>
        <T font="Header/H2">Удаление пользователя</T>
      </ModalTitle>

      <ModalContent>
        <T font="Body/Body 2 Long">
          {userName
            ? `Вы уверены, что хотите удалить пользователя "${userName}"?`
            : 'Вы уверены, что хотите удалить этого пользователя?'}
        </T>
      </ModalContent>

      <ModalButtonPanel className={styles.modalButtons}>
        <Button appearance="secondary" dimension="m" onClick={onClose}>
          Отмена
        </Button>
        <Button appearance="danger" dimension="m" onClick={onConfirm}>
          Удалить
        </Button>
      </ModalButtonPanel>
    </Modal>
  );
};
