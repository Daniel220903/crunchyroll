import { Head, useForm, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import InputError from '@/Components/InputError';

export default function Edit({ plan, auth }) {
    const { data, setData, put, processing, errors } = useForm({
        name: plan.name,
        price: plan.price,
        duration_in_days: plan.duration_in_days,
        description: plan.description || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('subscription-plans.update', plan.id));
    };

    return (
        <div className="min-h-screen bg-[#0B0B0B] text-white">
            <Head title={`Editar ${plan.name}`} />
            <Header auth={auth} />

            <main className="max-w-2xl mx-auto px-6 py-12">
                <Link href={route('subscription-plans.index')} className="text-[#F47521] text-xs font-bold uppercase mb-6 block">
                    ← Volver a planes
                </Link>

                <form onSubmit={submit} className="bg-[#121212] p-8 rounded-xl border border-white/5 space-y-6 shadow-2xl">
                    <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                        <h1 className="text-2xl font-black uppercase italic tracking-tighter">
                            Editar Plan
                        </h1>
                        <span className="text-gray-500 text-xs font-bold">ID: {plan.id}</span>
                    </div>
                    
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Nombre del Plan</label>
                        <input 
                            type="text" 
                            value={data.name} 
                            onChange={e => setData('name', e.target.value)} 
                            className="w-full bg-[#0B0B0B] border-white/10 rounded-lg text-white focus:ring-[#F47521]"
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Precio ($)</label>
                            <input 
                                type="number" 
                                step="0.01" 
                                value={data.price} 
                                onChange={e => setData('price', e.target.value)} 
                                className="w-full bg-[#0B0B0B] border-white/10 rounded-lg text-white focus:ring-[#F47521]"
                            />
                            <InputError message={errors.price} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Duración (Días)</label>
                            <input 
                                type="number" 
                                value={data.duration_in_days} 
                                onChange={e => setData('duration_in_days', e.target.value)} 
                                className="w-full bg-[#0B0B0B] border-white/10 rounded-lg text-white focus:ring-[#F47521]"
                            />
                            <InputError message={errors.duration_in_days} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Descripción / Beneficios</label>
                        <textarea 
                            value={data.description} 
                            onChange={e => setData('description', e.target.value)} 
                            className="w-full bg-[#0B0B0B] border-white/10 rounded-lg text-white focus:ring-[#F47521] h-32"
                        />
                        <InputError message={errors.description} />
                    </div>

                    <button disabled={processing} className="w-full bg-[#F47521] text-black py-4 rounded font-black uppercase text-xs hover:bg-[#ff8533] transition tracking-widest">
                        Actualizar Plan
                    </button>
                </form>
            </main>
        </div>
    );
}
