import { Head, useForm, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import InputError from '@/Components/InputError';

export default function Create({ users, plans, auth }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: '',
        subscription_plan_id: '',
        status: 'active',
        starts_at: new Date().toISOString().split('T')[0],
        ends_at: '',
    });

    const handlePlanChange = (e) => {
        const planId = e.target.value;
        const selectedPlan = plans.find(p => p.id == planId);
        
        setData(data => ({
            ...data,
            subscription_plan_id: planId,
            ends_at: selectedPlan 
                ? new Date(new Date().setDate(new Date().getDate() + selectedPlan.duration_in_days)).toISOString().split('T')[0]
                : ''
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('subscriptions.store'));
    };

    return (
        <div className="min-h-screen bg-[#0B0B0B] text-white">
            <Head title="Asignar Suscripción" />
            <Header auth={auth} />

            <main className="max-w-2xl mx-auto px-6 py-12">
                <Link href={route('subscriptions.index')} className="text-[#F47521] text-xs font-bold uppercase mb-6 block">
                    ← Volver a lista
                </Link>

                <form onSubmit={submit} className="bg-[#121212] p-8 rounded-xl border border-white/5 space-y-6">
                    <h1 className="text-2xl font-black uppercase italic tracking-tighter mb-6">Nueva Suscripción Manual</h1>
                    
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Usuario</label>
                        <select 
                            value={data.user_id} 
                            onChange={e => setData('user_id', e.target.value)} 
                            className="w-full bg-[#0B0B0B] border-white/10 rounded-lg text-white focus:ring-[#F47521]"
                        >
                            <option value="">Selecciona un usuario</option>
                            {users.map(u => (
                                <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                            ))}
                        </select>
                        <InputError message={errors.user_id} />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Plan</label>
                        <select 
                            value={data.subscription_plan_id} 
                            onChange={handlePlanChange} 
                            className="w-full bg-[#0B0B0B] border-white/10 rounded-lg text-white focus:ring-[#F47521]"
                        >
                            <option value="">Selecciona un plan</option>
                            {plans.map(p => (
                                <option key={p.id} value={p.id}>{p.name} - ${p.price}</option>
                            ))}
                        </select>
                        <InputError message={errors.subscription_plan_id} />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Fecha Inicio</label>
                            <input 
                                type="date" 
                                value={data.starts_at} 
                                onChange={e => setData('starts_at', e.target.value)} 
                                className="w-full bg-[#0B0B0B] border-white/10 rounded-lg text-white focus:ring-[#F47521]"
                            />
                            <InputError message={errors.starts_at} />
                        </div>
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
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Estado Inicial</label>
                        <select 
                            value={data.status} 
                            onChange={e => setData('status', e.target.value)} 
                            className="w-full bg-[#0B0B0B] border-white/10 rounded-lg text-white focus:ring-[#F47521]"
                        >
                            <option value="active">Activa</option>
                            <option value="pending">Pendiente</option>
                            <option value="expired">Expirada</option>
                        </select>
                    </div>

                    <button disabled={processing} className="w-full bg-[#F47521] text-black py-4 rounded font-black uppercase text-xs hover:bg-[#ff8533]">
                        Crear Suscripción
                    </button>
                </form>
            </main>
        </div>
    );
}
