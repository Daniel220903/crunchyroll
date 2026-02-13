import { Head, Link, useForm } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Index({ plans, auth }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de eliminar este plan? Esto podría afectar a los usuarios suscritos.')) {
            destroy(route('subscription-plans.destroy', id));
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0B0B] text-white">
            <Head title="Planes de Suscripción" />
            <Header auth={auth} />

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-black uppercase italic tracking-tighter border-l-4 border-[#F47521] pl-4">
                        Planes de Suscripción
                    </h1>
                    <Link
                        href={route('subscription-plans.create')}
                        className="bg-[#F47521] text-black px-6 py-3 rounded font-black uppercase text-xs hover:bg-[#ff8533] transition hover:scale-105"
                    >
                        + Crear Nuevo Plan
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div key={plan.id} className="bg-[#121212] border border-white/5 rounded-2xl p-8 relative overflow-hidden group hover:border-[#F47521] transition duration-300">
                            <div className="absolute top-0 right-0 bg-[#F47521] text-black text-[10px] font-black uppercase px-3 py-1 rounded-bl-lg">
                                ID: {plan.id}
                            </div>
                            
                            <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-2">{plan.name}</h2>
                            <p className="text-3xl font-bold text-[#F47521] mb-6">
                                ${plan.price} <span className="text-sm text-gray-500 font-normal">/ {plan.duration_in_days} días</span>
                            </p>
                            
                            <div className="bg-[#0B0B0B] p-4 rounded-lg mb-6 min-h-[80px]">
                                <p className="text-sm text-gray-400">{plan.description || 'Sin descripción disponible.'}</p>
                            </div>

                            <div className="flex gap-3">
                                <Link 
                                    href={route('subscription-plans.edit', plan.id)} 
                                    className="flex-1 bg-white/10 text-center py-2 rounded text-xs font-bold uppercase hover:bg-white/20 transition"
                                >
                                    Editar
                                </Link>
                                <button 
                                    onClick={() => handleDelete(plan.id)}
                                    className="flex-1 bg-red-500/10 text-red-500 border border-red-500/20 py-2 rounded text-xs font-bold uppercase hover:bg-red-500 hover:text-white transition"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    {plans.length === 0 && (
                        <div className="col-span-3 text-center py-20 bg-[#121212] rounded-2xl border border-dashed border-white/10">
                            <p className="text-gray-500 uppercase font-bold text-sm">No hay planes activos</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
