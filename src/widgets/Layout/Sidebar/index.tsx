import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Tooltip } from '@admiral-ds/react-ui';
import { ServiceCloseOutline, ServicePlusCircleOutline } from '@admiral-ds/icons';
import styles from './Sidebar.module.css';
import { ROUTES } from '@shared/config/routes';
import { LogoutModal } from '../LogoutModal';

export const Sidebar = () => {
  const navigate = useNavigate();

  const addRef = useRef<HTMLButtonElement>(null);
  const logoutRef = useRef<HTMLButtonElement>(null);

  const [showAddTooltip, setShowAddTooltip] = useState(false);
  const [showLogoutTooltip, setShowLogoutTooltip] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    const addBtn = addRef.current;
    const logoutBtn = logoutRef.current;

    if (addBtn) {
      addBtn.addEventListener('mouseenter', () => setShowAddTooltip(true));
      addBtn.addEventListener('mouseleave', () => setShowAddTooltip(false));
      addBtn.addEventListener('focus', () => setShowAddTooltip(true));
      addBtn.addEventListener('blur', () => setShowAddTooltip(false));
    }

    if (logoutBtn) {
      logoutBtn.addEventListener('mouseenter', () => setShowLogoutTooltip(true));
      logoutBtn.addEventListener('mouseleave', () => setShowLogoutTooltip(false));
      logoutBtn.addEventListener('focus', () => setShowLogoutTooltip(true));
      logoutBtn.addEventListener('blur', () => setShowLogoutTooltip(false));
    }

    return () => {
      if (addBtn) {
        addBtn.removeEventListener('mouseenter', () => setShowAddTooltip(true));
        addBtn.removeEventListener('mouseleave', () => setShowAddTooltip(false));
        addBtn.removeEventListener('focus', () => setShowAddTooltip(true));
        addBtn.removeEventListener('blur', () => setShowAddTooltip(false));
      }

      if (logoutBtn) {
        logoutBtn.removeEventListener('mouseenter', () => setShowLogoutTooltip(true));
        logoutBtn.removeEventListener('mouseleave', () => setShowLogoutTooltip(false));
        logoutBtn.removeEventListener('focus', () => setShowLogoutTooltip(true));
        logoutBtn.removeEventListener('blur', () => setShowLogoutTooltip(false));
      }
    };
  }, []);

  return (
    <>
      <aside className={styles.sidebar}>
        <Button
          ref={addRef}
          dimension="m"
          appearance="primary"
          icon={<ServicePlusCircleOutline />}
          onClick={() => navigate(ROUTES.userCreate)}
          displayAsSquare
          aria-label="Добавить пользователя"
          aria-describedby="add-tooltip"
        />
        {showAddTooltip && addRef.current && (
          <Tooltip
            renderContent={() => 'Добавить пользователя'}
            targetElement={addRef.current}
            tooltipPosition="right"
            id="add-tooltip"
          />
        )}

        <Button
          ref={logoutRef}
          dimension="m"
          appearance="secondary"
          icon={<ServiceCloseOutline />}
          onClick={() => setIsLogoutModalOpen(true)}
          displayAsSquare
          aria-label="Выйти"
          aria-describedby="logout-tooltip"
        />
        {showLogoutTooltip && logoutRef.current && (
          <Tooltip
            renderContent={() => 'Выйти'}
            targetElement={logoutRef.current}
            tooltipPosition="right"
            id="logout-tooltip"
          />
        )}
      </aside>

      <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} />
    </>
  );
};
