import { Head, Link, useForm, router } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Index({ subscriptions, auth }) {
    const { delete: destroy } = useForm();

    const handleAction = (routeUrl, message) => {
        if (confirm(message)) {
            router.post(routeUrl);
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0B0B] text-white">
            <Head title="Suscripciones Activas" />
            <Header auth={auth} />

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-black uppercase italic tracking-tighter border-l-4 border-[#F47521] pl-4">
                        Suscripciones de Usuarios
                    </h1>
                    <Link
                        href={route('subscriptions.create')}
                        className="bg-[#F47521] text-black px-6 py-2 rounded font-bold uppercase text-xs hover:bg-[#ff8533] transition hover:scale-105"
                    >
                        + Nueva Suscripción
                    </Link>
                </div>

                <div className="bg-[#121212] rounded-xl border border-white/5 overflow-hidden shadow-2xl">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-gray-400">
                                <th className="px-6 py-4">Usuario</th>
                                <th className="px-6 py-4">Plan</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4">Inicio / Fin</th>
                                <th className="px-6 py-4 text-right">Gestión</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {subscriptions.data.map((sub) => (
                                <tr key={sub.id} className="hover:bg-white/[0.02]">
                                    <td className="px-6 py-4">
                                        <div className="font-bold">{sub.user?.name || 'Usuario eliminado'}</div>
                                        <div className="text-xs text-gray-500">{sub.user?.email}</div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-[#F47521] uppercase text-xs">
                                        {sub.plan?.name || 'Plan eliminado'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                            sub.status === 'active' ? 'bg-green-500/10 text-green-500' : 
                                            sub.status === 'cancelled' ? 'bg-red-500/10 text-red-500' : 
                                            'bg-gray-500/10 text-gray-500'
                                        }`}>
                                            {sub.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-gray-400">
                                        <p>Desde: {new Date(sub.starts_at).toLocaleDateString()}</p>
                                        <p>Hasta: {new Date(sub.ends_at).toLocaleDateString()}</p>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-3">
                                        {sub.status === 'active' ? (
                                            <button 
                                                onClick={() => handleAction(route('subscriptions.cancel', sub.id), '¿Cancelar esta suscripción?')}
                                                className="text-[10px] font-bold uppercase text-red-500 border border-red-500/30 px-2 py-1 rounded hover:bg-red-500 hover:text-white transition"
                                            >
                                                Cancelar
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => handleAction(route('subscriptions.resume', sub.id), '¿Reactivar suscripción?')}
                                                className="text-[10px] font-bold uppercase text-green-500 border border-green-500/30 px-2 py-1 rounded hover:bg-green-500 hover:text-black transition"
                                            >
                                                Reactivar
                                            </button>
                                        )}
                                        
                                        <Link href={route('subscriptions.edit', sub.id)} className="text-[10px] font-bold uppercase text-gray-400 hover:text-white">
                                            Editar
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {subscriptions.data.length === 0 && (
                        <div className="p-12 text-center text-gray-500 text-sm uppercase font-bold">
                            No hay suscripciones activas.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
