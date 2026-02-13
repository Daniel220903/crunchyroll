import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Index({ payments, auth }) {
    return (
        <div className="min-h-screen bg-[#0B0B0B] text-white">
            <Head title="Historial de Pagos" />
            <Header auth={auth} />

            <main className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-black uppercase italic tracking-tighter border-l-4 border-[#F47521] pl-4 mb-8">
                    Historial de Pagos
                </h1>

                <div className="bg-[#121212] rounded-xl border border-white/5 overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-gray-400">
                                <th className="px-6 py-4">Usuario</th>
                                <th className="px-6 py-4">Suscripción</th>
                                <th className="px-6 py-4">Monto</th>
                                <th className="px-6 py-4">Fecha</th>
                                <th className="px-6 py-4 text-right">Detalles</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {payments.data.map((payment) => (
                                <tr key={payment.id} className="hover:bg-white/[0.02]">
                                    <td className="px-6 py-4 font-bold">{payment.user?.name}</td>
                                    <td className="px-6 py-4 text-sm">{payment.subscription?.type || 'Plan Estándar'}</td>
                                    <td className="px-6 py-4 text-[#F47521] font-black">${payment.amount}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(payment.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={route('payments.show', payment.id)}
                                            className="text-xs font-bold uppercase bg-white/10 px-3 py-1 rounded hover:bg-white/20 transition"
                                        >
                                            Ver Recibo
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
