'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { SquarePen, X } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { getCities, getDistricts, getDivisions } from '@/utils/bdLocations';

const emptyState = {
    name: '',
    email: '',
    phone: '',
    division: '',
    district: '',
    city: '',
    addressLine: '',
};

const fieldClass =
    'w-full rounded-2xl border border-base-200 bg-base-200/60 px-4 text-sm text-base-content focus:border-primary focus:outline-none h-12';
const textareaClass = `${fieldClass} min-h-[3rem] resize-none`;

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [formState, setFormState] = useState(emptyState);
    const [isEditing, setIsEditing] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [statusTone, setStatusTone] = useState('info');
    const [previewImage, setPreviewImage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [districtOptions, setDistrictOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const divisions = useMemo(() => getDivisions(), []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (!user || isEditing) {
            return;
        }

        setFormState({
            name: user.displayName ?? '',
            email: user.email ?? '',
            phone: user.phoneNumber ?? '',
            division: '',
            district: '',
            city: '',
            addressLine: '',
        });
        setPreviewImage(user.photoURL ?? '');
    }, [user, isEditing]);

    useEffect(() => {
        if (!formState.division) {
            setDistrictOptions([]);
            setCityOptions([]);
            return;
        }

        const districts = getDistricts(formState.division);
        setDistrictOptions(districts);
        if (formState.district && !districts.includes(formState.district)) {
            setFormState((prev) => ({ ...prev, district: '', city: '' }));
            setCityOptions([]);
        }
    }, [formState.division]);

    useEffect(() => {
        if (!formState.division || !formState.district) {
            setCityOptions([]);
            return;
        }

        const cities = getCities(formState.division, formState.district);
        setCityOptions(cities);
        if (formState.city && !cities.includes(formState.city)) {
            setFormState((prev) => ({ ...prev, city: '' }));
        }
    }, [formState.division, formState.district]);

    useEffect(() => {
        if (!showToast) {
            return undefined;
        }

        const timer = setTimeout(() => {
            setShowToast(false);
        }, 3200);

        return () => clearTimeout(timer);
    }, [showToast]);

    const handleInputChange = (field, value) => {
        setFormState((prev) => ({ ...prev, [field]: value }));
    };

    const handleEditToggle = () => {
        if (isEditing) {
            setStatusMessage('');
            setIsEditing(false);
            return;
        }

        setStatusMessage('');
        setIsEditing(true);
    };

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) {
            setPreviewImage(user?.photoURL ?? '');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        setStatusTone('success');
        setStatusMessage('Profile preferences saved locally. Real updates happen via Firebase console.');
        setIsEditing(false);
        setShowToast(true);
    };

    return (
        <section className="mx-auto flex max-w-6xl flex-col gap-6 py-10">
            <div className="rounded-3xl bg-base-100/60 p-6 shadow-[0_30px_90px_rgba(15,15,15,0.08)]">
                <div className="flex flex-col gap-3">
                    <p className="text-xs uppercase tracking-[0.4em] text-[#6b7280]">Account record</p>
                    <h1 className="text-3xl font-semibold text-base-content">Profile overview</h1>
                </div>
                <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(220px,280px)_1fr]">
                    <div className="relative space-y-4 rounded-2xl bg-base-200/60 p-5 shadow-inner">
                        <button
                            type="button"
                            onClick={handleEditToggle}
                            aria-label={isEditing ? 'Cancel editing profile' : 'Edit profile'}
                            className="absolute right-3 top-3 rounded-full border border-base-300 bg-base-100/80 p-2 text-xs text-[#5F6FFF] transition hover:bg-white focus:outline-none"
                        >
                            {isEditing ? <X size={18} /> : <SquarePen size={18} />}
                        </button>
                        <label className="relative mx-auto block h-28 w-28 cursor-pointer overflow-visible rounded-full border-[3px] border-primary/50 bg-base-100/60">
                            {previewImage ? (
                                <Image
                                    src={previewImage}
                                    alt="avatar"
                                    width={112}
                                    height={112}
                                    className="h-full w-full rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-3xl font-semibold uppercase text-white">
                                    {formState.name?.charAt(0) || 'A'}
                                </div>
                            )}
                            <span
                                className={`absolute bottom-2 right-2 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-base-200 bg-white text-base-content shadow-lg transition hover:scale-105 focus-visible:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${isEditing ? 'opacity-100 pointer-events-auto' : 'hidden'}`}
                            >
                                <SquarePen size={16} />
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                disabled={!isEditing}
                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                            />
                        </label>
                        <div className="space-y-1 border-t border-base-300/60 pt-4 text-sm text-[#6b7280]">
                            <p>Member since {user?.metadata?.creationTime?.split(', ')[0] ?? 'N/A'}</p>
                            <p>Last login {user?.metadata?.lastSignInTime ?? 'not available'}</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {statusMessage && (
                            <div
                                className={`rounded-2xl px-4 py-3 text-sm ${
                                    statusTone === 'success'
                                        ? 'bg-success/15 text-success'
                                        : 'bg-primary/10 text-primary'
                                }`}
                            >
                                {statusMessage}
                            </div>
                        )}

                        {isEditing ? (
                            <form onSubmit={handleUpdate} className="space-y-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6b7280]">
                                            Full name
                                        </label>
                                        <input
                                            type="text"
                                            value={formState.name}
                                            onChange={(event) => handleInputChange('name', event.target.value)}
                                            className={fieldClass}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6b7280]">
                                            Email (read-only)
                                        </label>
                                        <input
                                            type="email"
                                            value={formState.email}
                                            disabled
                                            className={`${fieldClass} cursor-not-allowed opacity-70`}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6b7280]">
                                            Phone number
                                        </label>
                                        <input
                                            type="tel"
                                            value={formState.phone}
                                            onChange={(event) => handleInputChange('phone', event.target.value)}
                                            placeholder="+8801XXXXXXX"
                                            className={fieldClass}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6b7280]">
                                            Address line
                                        </label>
                                        <textarea
                                            value={formState.addressLine}
                                            onChange={(event) => handleInputChange('addressLine', event.target.value)}
                                            rows={2}
                                            className={textareaClass}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6b7280]">
                                            Division
                                        </label>
                                        <select
                                            value={formState.division}
                                            onChange={(event) => handleInputChange('division', event.target.value)}
                                            className={`${fieldClass} appearance-none`}
                                        >
                                            <option value="">Choose division</option>
                                            {divisions.map((division) => (
                                                <option key={division} value={division}>
                                                    {division}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6b7280]">
                                            District
                                        </label>
                                        <select
                                            value={formState.district}
                                            disabled={!districtOptions.length}
                                            onChange={(event) => handleInputChange('district', event.target.value)}
                                            className={`${fieldClass} appearance-none`}
                                        >
                                            <option value="">Choose district</option>
                                            {districtOptions.map((district) => (
                                                <option key={district} value={district}>
                                                    {district}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6b7280]">
                                            City / Thana
                                        </label>
                                        <select
                                            value={formState.city}
                                            disabled={!cityOptions.length}
                                            onChange={(event) => handleInputChange('city', event.target.value)}
                                            className={`${fieldClass} appearance-none`}
                                        >
                                            <option value="">Choose city</option>
                                            {cityOptions.map((city) => (
                                                <option key={city} value={city}>
                                                    {city}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary text-white h-fit rounded-2xl px-6 py-2 text-sm font-semibold capitalize tracking-[0.3em]"
                                    >
                                        Save updates
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6b7280]">Full name</p>
                                    <p className="text-base font-semibold">{formState.name || 'Not provided'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6b7280]">Email</p>
                                    <p className="text-base font-semibold">{formState.email || 'Not provided'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6b7280]">Phone</p>
                                    <p className="text-base font-semibold">{formState.phone || 'Not provided'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6b7280]">Address</p>
                                    <p className="text-base font-semibold">
                                        {formState.addressLine || 'Not provided'}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6b7280]">Division</p>
                                    <p className="text-base font-semibold">{formState.division || 'Not selected'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6b7280]">District</p>
                                    <p className="text-base font-semibold">{formState.district || 'Not selected'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6b7280]">City / Thana</p>
                                    <p className="text-base font-semibold">{formState.city || 'Not selected'}</p>
                                </div>
                            </div>
                        )}
                        <div className="rounded-2xl bg-base-200/70 p-4 text-sm text-[#374151]">
                            <p className="text-xs uppercase tracking-[0.3em] text-[#6b7280]">Address on file</p>
                            {formState.division ? (
                                <>
                                    <p className="font-semibold text-base-content">
                                        {formState.addressLine || 'No street address added yet'}
                                    </p>
                                    <p className="text-[#6b7280]">
                                        {[formState.city, formState.district, formState.division]
                                            .filter(Boolean)
                                            .join(' · ')}
                                    </p>
                                </>
                            ) : (
                                <p className="text-[#9ca3af]">Add a division to map an address.</p>
                            )}
                        </div>
                    </div>
                </div>
            <div className="mt-10 grid gap-4 rounded-2xl bg-base-200/60 p-5 text-sm text-[#374151] shadow-inner md:grid-cols-3">
                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[#6b7280]">Security status</p>
                    <p className="text-2xl font-semibold text-base-content">Protected</p>
                    <p className="text-xs text-[#9ca3af]">Two-factor authentication available in settings.</p>
                </div>
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-[#6b7280]">Preferred actions</p>
                        <p className="font-semibold text-base-content">Push notifications</p>
                        <p className="text-xs text-[#9ca3af]">You are subscribed to critical reminders.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-xs uppercase tracking-[0.3em] text-[#6b7280]">Need help?</p>
                        <Link
                            href="/settings"
                            className="inline-flex w-fit items-center justify-center rounded-full border border-[#5F6FFF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#5F6FFF] transition hover:bg-[#5F6FFF] hover:text-white"
                        >
                            Go to settings
                        </Link>
                    </div>
                </div>
            </div>
            {showToast && (
                <div className="pointer-events-none fixed right-5 bottom-5 z-50 rounded-2xl bg-success text-success-content px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] shadow-[0_25px_60px_rgba(37,99,235,0.35)] transition duration-300">
                    Profile updated
                </div>
            )}
        </section>
    );
}
