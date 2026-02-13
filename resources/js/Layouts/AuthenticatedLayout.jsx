import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    const { flash } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b p-4 flex gap-6 shadow-sm">
                <Link href="/series.index" className="font-bold text-blue-600">App</Link>
                <Link href={route('users.index')} className="text-gray-600 hover:text-black">Usuarios</Link>
                <Link href={route('series.index')} className="text-gray-600 hover:text-black">Series</Link>
                <Link href={route('subscription-plans.index')} className="text-gray-600 hover:text-black">Planes</Link>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="p-8">
                {flash?.message && (
                    <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                        {flash.message}
                    </div>
                )}
                {children}
            </main>
        </div>
    );
}
