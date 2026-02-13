import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Show({ payment, auth }) {
    return (
        <div className="min-h-screen bg-[#0B0B0B] text-white">
            <Head title={`Recibo #${payment.id}`} />
            <Header auth={auth} />

            <main className="max-w-3xl mx-auto px-6 py-12">
                <Link href={route('payments.index')} className="text-[#F47521] text-xs font-bold uppercase mb-4 block">
                    ← Volver al historial
                </Link>

                <div className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="bg-[#F47521] p-8 text-black flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-black uppercase italic tracking-tighter">Recibo de Pago</h1>
                            <p className="text-xs font-bold opacity-80 uppercase">Crunchyroll Clone Project</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold uppercase">ID de Transacción</p>
                            <p className="text-xl font-black">#{payment.id}</p>
                        </div>
                    </div>

                    <div className="p-8 space-y-8">
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-[10px] font-bold text-gray-500 uppercase mb-1">Cliente</h3>
                                <p className="font-bold">{payment.user?.name}</p>
                                <p className="text-sm text-gray-400">{payment.user?.email}</p>
                            </div>
                            <div className="text-right">
                                <h3 className="text-[10px] font-bold text-gray-500 uppercase mb-1">Fecha de Pago</h3>
                                <p className="font-bold">{new Date(payment.created_at).toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="border-y border-white/5 py-6 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold">Suscripción Mensual</h3>
                                <p className="text-sm text-gray-500">{payment.subscription?.type || 'Acceso Premium'}</p>
                            </div>
                            <p className="text-2xl font-black text-[#F47521]">${payment.amount}</p>
                        </div>

                        <div className="bg-[#0B0B0B] p-4 rounded-lg flex gap-3 items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Estado: Transacción Completada</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
