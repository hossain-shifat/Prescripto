'use client';

import { Bell, CheckCircle2, Info, XCircle } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNotifications } from '@/context/NotificationContext';

const ICON_MAP = {
    success: CheckCircle2,
    error: XCircle,
    info: Info,
};

const typeColors = {
    success: 'bg-success/10 text-success',
    error: 'bg-error/10 text-error',
    info: 'bg-primary/5 text-primary',
};

function formatTimestamp(value) {
    if (!value) {
        return '';
    }

    try {
        return new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        }).format(new Date(value));
    } catch {
        return '';
    }
}

export default function NotificationBell() {
    const {
        notifications,
        markNotificationRead,
        clearNotifications,
    } = useNotifications();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();

    const unreadCount = useMemo(
        () => notifications.filter((notification) => !notification.read).length,
        [notifications],
    );

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [open]);

    const toggleDropdown = () => setOpen((prev) => !prev);

    const handleClear = (event) => {
        event.stopPropagation();
        clearNotifications();
    };

    const handleNotificationClick = (notification) => {
        setOpen(false);
        markNotificationRead(notification.id);
        router.push(`/notifications/${notification.id}`);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={toggleDropdown}
                className="btn btn-ghost btn-square relative h-11 w-11 border border-base-200/50 p-0 text-base-content transition hover:bg-base-200/60"
                aria-expanded={open}
                aria-label="Toggle notifications"
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-error text-[10px] font-semibold uppercase leading-none text-white">
                        {unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-2 min-w-[18rem] rounded-2xl border border-base-200/60 bg-base-100/95 shadow-[0_25px_60px_rgba(8,8,8,0.25)] backdrop-blur">
                    <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#6b7280]">
                        <span>Notifications</span>
                        <button
                            type="button"
                            onClick={handleClear}
                            className="text-[11px] uppercase tracking-[0.4em] text-error transition hover:text-base-content"
                        >
                            Clear
                        </button>
                    </div>
                    <div className="max-h-72 overflow-y-auto rounded-b-2xl">
                        {notifications.length === 0 ? (
                            <p className="px-4 py-6 text-center text-sm text-[#9ca3af]">
                                You're all caught up.
                            </p>
                        ) : (
                            notifications.map((notification) => {
                                const Icon = ICON_MAP[notification.type] ?? Info;
                                return (
                                    <button
                                        key={notification.id}
                                        type="button"
                                        onClick={() => handleNotificationClick(notification)}
                                        className={`group flex w-full items-start gap-3 px-4 py-3 text-sm text-left transition hover:bg-base-200/80 sm:px-5 sm:gap-4 ${typeColors[notification.type] ?? typeColors.info} border-t border-base-200/60`}
                                    >
                                        <Icon className="h-5 w-5 flex-shrink-0 text-base-content" />
                                        <div className="flex-1 space-y-1">
                                            <p className="font-semibold text-base-content transition group-hover:text-primary">
                                                {notification.title}
                                            </p>
                                            {notification.description && (
                                                <p className="text-xs text-base-content/70">
                                                    {notification.description}
                                                </p>
                                            )}
                                            <p className="text-[10px] uppercase tracking-[0.4em] text-[#9ca3af]">
                                                {formatTimestamp(notification.createdAt)}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
