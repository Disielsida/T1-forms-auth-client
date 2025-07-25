import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Tooltip } from '@admiral-ds/react-ui';
import {
  ServiceCloseOutline,
  ServicePlusCircleOutline,
  SystemHomeOutline,
} from '@admiral-ds/icons';
import styles from './Sidebar.module.css';
import { ROUTES } from '@shared/config/routes';
import { LogoutModal } from '../LogoutModal';

export const Sidebar = () => {
  const navigate = useNavigate();

  const homeRef = useRef<HTMLButtonElement>(null);
  const addRef = useRef<HTMLButtonElement>(null);
  const logoutRef = useRef<HTMLButtonElement>(null);

  const [showHomeTooltip, setShowHomeTooltip] = useState(false);
  const [showAddTooltip, setShowAddTooltip] = useState(false);
  const [showLogoutTooltip, setShowLogoutTooltip] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    const homeBtn = homeRef.current;
    const addBtn = addRef.current;
    const logoutBtn = logoutRef.current;

    if (homeBtn) {
      homeBtn.addEventListener('mouseenter', () => setShowHomeTooltip(true));
      homeBtn.addEventListener('mouseleave', () => setShowHomeTooltip(false));
      homeBtn.addEventListener('focus', () => setShowHomeTooltip(true));
      homeBtn.addEventListener('blur', () => setShowHomeTooltip(false));
    }

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
      if (homeBtn) {
        homeBtn.removeEventListener('mouseenter', () => setShowHomeTooltip(true));
        homeBtn.removeEventListener('mouseleave', () => setShowHomeTooltip(false));
        homeBtn.removeEventListener('focus', () => setShowHomeTooltip(true));
        homeBtn.removeEventListener('blur', () => setShowHomeTooltip(false));
      }

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
          ref={homeRef}
          dimension="m"
          appearance="secondary"
          icon={<SystemHomeOutline />}
          onClick={() => navigate(ROUTES.root)}
          displayAsSquare
          aria-label="На главную"
          aria-describedby="home-tooltip"
        />
        {showHomeTooltip && homeRef.current && (
          <Tooltip
            renderContent={() => 'На главную'}
            targetElement={homeRef.current}
            tooltipPosition="right"
            id="home-tooltip"
          />
        )}

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
