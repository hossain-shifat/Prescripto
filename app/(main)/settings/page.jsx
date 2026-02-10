'use client';

import Link from 'next/link';

export default function SettingsPage() {
    return (
        <section className="mx-auto max-w-6xl space-y-8 px-4 py-10">
            <div className="rounded-3xl bg-base-100/60 p-6 shadow-[0_35px_90px_rgba(15,15,15,0.12)]">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.4em] text-[#6b7280]">Preferences</p>
                        <h1 className="text-3xl font-semibold text-base-content">Settings hub</h1>
                        <p className="text-sm text-[#6b7280]">Centralized controls for notifications, security, and privacy.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button className="btn btn-sm btn-outline text-base-content">Download profile data</button>
                        <button className="btn btn-sm btn-ghost text-base-content">Manage alerts</button>
                    </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-3">
                    <div className="rounded-2xl bg-base-200/60 p-5 shadow-inner">
                        <p className="text-xs uppercase tracking-[0.3em] text-[#6b7280]">Security posture</p>
                        <p className="mt-2 text-2xl font-semibold text-base-content">98% protected</p>
                        <p className="mt-1 text-sm text-[#6b7280]">Two-factor authentication recommended.</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <Link
                                href="/settings"
                                className="btn btn-xs btn-primary rounded-full px-4 uppercase tracking-[0.3em]"
                            >
                                Configure
                            </Link>
                            <button className="btn btn-xs btn-ghost rounded-full px-4 uppercase tracking-[0.3em]">
                                Audit logs
                            </button>
                        </div>
                    </div>
                    <div className="rounded-2xl bg-base-200/60 p-5 shadow-inner">
                        <p className="text-xs uppercase tracking-[0.3em] text-[#6b7280]">Communications</p>
                        <p className="mt-2 text-xl font-semibold text-base-content">Healthy cadence</p>
                        <p className="mt-1 text-sm text-[#6b7280]">
                            You receive appointment reminders and important policy updates via email.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <button className="btn btn-xs btn-outline rounded-full px-4 uppercase tracking-[0.3em]">
                                Pause notifications
                            </button>
                            <button className="btn btn-xs btn-primary rounded-full px-4 uppercase tracking-[0.3em]">
                                Update preferences
                            </button>
                        </div>
                    </div>
                    <div className="rounded-2xl bg-base-200/60 p-5 shadow-inner">
                        <p className="text-xs uppercase tracking-[0.3em] text-[#6b7280]">Connected apps</p>
                        <p className="mt-2 text-xl font-semibold text-base-content">2 active</p>
                        <p className="mt-1 text-sm text-[#6b7280]">
                            Grant/revoke API tokens and device access from the dashboard.
                        </p>
                        <Link
                            href="/settings"
                            className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-[#5F6FFF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#5F6FFF] transition hover:bg-[#5F6FFF] hover:text-white"
                        >
                            Review connected tools
                        </Link>
                    </div>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <div className="rounded-3xl bg-base-200/60 p-5">
                        <p className="text-xs uppercase tracking-[0.3em] text-[#6b7280]">Activity snapshot</p>
                        <div className="mt-3 space-y-2 text-sm text-[#374151]">
                            <p>
                                <span className="font-semibold text-base-content">Next sync:</span> Tomorrow at 9:00
                                AM
                            </p>
                            <p>
                                <span className="font-semibold text-base-content">Pending approvals:</span> 0
                            </p>
                            <p>
                                <span className="font-semibold text-base-content">Data usage:</span> 1.2 GB this month
                            </p>
                        </div>
                        <button className="mt-4 rounded-2xl border border-[#5F6FFF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#5F6FFF] transition hover:bg-[#5F6FFF] hover:text-white">
                            Request export
                        </button>
                    </div>
                    <div className="rounded-3xl bg-base-200/60 p-5">
                        <p className="text-xs uppercase tracking-[0.3em] text-[#6b7280]">Support</p>
                        <h2 className="mt-2 text-xl font-semibold text-base-content">Need assistance?</h2>
                        <p className="mt-1 text-sm text-[#6b7280]">
                            Reach out to our care team for billing, compliance, or troubleshooting help anytime.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <button className="btn btn-sm btn-primary rounded-2xl px-4 uppercase tracking-[0.3em]">
                                Live chat
                            </button>
                            <button className="btn btn-sm btn-outline rounded-2xl px-4 uppercase tracking-[0.3em]">
                                Open ticket
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
