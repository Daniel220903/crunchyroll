import { Head, useForm, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import InputError from '@/Components/InputError';

export default function Edit({ subscription, users, plans, auth }) {
    const { data, setData, put, processing, errors } = useForm({
        user_id: subscription.user_id,
        subscription_plan_id: subscription.subscription_plan_id,
        status: subscription.status,
        starts_at: subscription.starts_at.split('T')[0],
        ends_at: subscription.ends_at ? subscription.ends_at.split('T')[0] : '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('subscriptions.update', subscription.id));
    };

    return (
        <div className="min-h-screen bg-[#0B0B0B] text-white">
            <Head title="Editar Suscripción" />
            <Header auth={auth} />

            <main className="max-w-2xl mx-auto px-6 py-12">
                <Link href={route('subscriptions.index')} className="text-[#F47521] text-xs font-bold uppercase mb-6 block">
                    ← Volver a lista
                </Link>

                <form onSubmit={submit} className="bg-[#121212] p-8 rounded-xl border border-white/5 space-y-6">
                    <h1 className="text-2xl font-black uppercase italic tracking-tighter mb-6">Editar Suscripción #{subscription.id}</h1>
                    
                    <div className="p-4 bg-white/5 rounded border border-white/10 mb-4">
                        <p className="text-xs text-gray-400">Usuario: <span className="text-white font-bold">{users.find(u => u.id === data.user_id)?.name}</span></p>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Plan</label>
                        <select 
                            value={data.subscription_plan_id} 
                            onChange={e => setData('subscription_plan_id', e.target.value)} 
                            className="w-full bg-[#0B0B0B] border-white/10 rounded-lg text-white focus:ring-[#F47521]"
                        >
                            {plans.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                        <InputError message={errors.subscription_plan_id} />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Fecha Fin</label>
                            <input 
                                type="date" 
                                value={data.ends_at} 
                                onChange={e => setData('ends_at', e.target.value)} 
                                className="w-full bg-[#0B0B0B] border-white/10 rounded-lg text-white focus:ring-[#F47521]"
                            />
                            <InputError message={errors.ends_at} />
                        </div>
                         <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Estado</label>
                            <select 
                                value={data.status} 
                                onChange={e => setData('status', e.target.value)} 
                                className="w-full bg-[#0B0B0B] border-white/10 rounded-lg text-white focus:ring-[#F47521]"
                            >
                                <option value="active">Activa</option>
                                <option value="cancelled">Cancelada</option>
                                <option value="expired">Expirada</option>
                            </select>
                        </div>
                    </div>

                    <button disabled={processing} className="w-full bg-[#F47521] text-black py-4 rounded font-black uppercase text-xs hover:bg-[#ff8533]">
                        Guardar Cambios
                    </button>
                </form>
            </main>
        </div>
    );
}
