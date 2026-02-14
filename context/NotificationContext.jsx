'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'prescripto-notifications';

const NotificationContext = createContext({
    notifications: [],
    addNotification: () => {},
    markAllRead: () => {},
    clearNotifications: () => {},
});

function buildNotification(payload) {
    const { title, description = '', type = 'info' } = payload ?? {};
    const id = typeof crypto?.randomUUID === 'function'
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`;

    return {
        id,
        title: title ?? 'Notification',
        description,
        type,
        createdAt: new Date().toISOString(),
        read: false,
    };
}

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    setNotifications(parsed);
                }
            } catch (error) {
                console.error('Unable to restore notifications from storage', error);
            }
        }

        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (!isHydrated || typeof window === 'undefined') {
            return;
        }

        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
        } catch (error) {
            console.error('Unable to persist notifications', error);
        }
    }, [isHydrated, notifications]);

    const addNotification = useCallback((payload) => {
        const nextNotification = buildNotification(payload);
        setNotifications((prev) => [nextNotification, ...prev].slice(0, 12));
    }, []);

    const markAllRead = useCallback(() => {
        setNotifications((prev) => prev.map((notification) => ({
            ...notification,
            read: true,
        })));
    }, []);

    const clearNotifications = useCallback(() => {
        setNotifications([]);
    }, []);

    const value = useMemo(() => ({
        notifications,
        addNotification,
        markAllRead,
        clearNotifications,
    }), [notifications, addNotification, markAllRead, clearNotifications]);

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used inside NotificationProvider');
    }
    return context;
}
