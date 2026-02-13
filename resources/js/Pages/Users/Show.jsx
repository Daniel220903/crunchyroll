import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Show({ user, auth }) {
    return (
        <div className="min-h-screen bg-[#0B0B0B] text-white">
            <Head title={`Perfil de ${user.name}`} />
            <Header auth={auth} />

            <main className="max-w-5xl mx-auto px-6 py-12">
                <Link href={route('users.index')} className="text-[#F47521] text-xs font-bold uppercase mb-8 block">
                    ← Volver a la lista
                </Link>

                <div className="bg-[#121212] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                    <div className="h-32 bg-gradient-to-r from-[#F47521] to-[#ff8533]" />
                    
                    <div className="px-8 pb-8">
                        <div className="relative flex justify-between items-end -mt-12 mb-8">
                            <img 
                                src={user.avatar ? `/storage/${user.avatar}` : '/default-avatar.png'} 
                                alt={user.name}
                                className="w-32 h-32 rounded-2xl object-cover border-4 border-[#121212] shadow-xl"
                            />
                            <Link 
                                href={route('users.edit', user.id)}
                                className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full font-bold text-xs uppercase transition mb-2"
                            >
                                Editar Perfil
                            </Link>
                        </div>

                        <div className="space-y-1">
                            <h1 className="text-3xl font-black italic uppercase tracking-tighter">{user.name}</h1>
                            <p className="text-gray-500 font-medium">{user.email}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                            <div className="bg-[#0B0B0B] p-6 rounded-2xl border border-white/5">
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Favoritos</p>
                                <p className="text-2xl font-black text-[#F47521]">{user.favorites?.length || 0}</p>
                            </div>
                            <div className="bg-[#0B0B0B] p-6 rounded-2xl border border-white/5">
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Reseñas</p>
                                <p className="text-2xl font-black text-[#F47521]">{user.reviews?.length || 0}</p>
                            </div>
                            <div className="bg-[#0B0B0B] p-6 rounded-2xl border border-white/5">
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Suscripciones</p>
                                <p className="text-2xl font-black text-[#F47521]">{user.subscriptions?.length || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-[#121212] p-8 rounded-2xl border border-white/5">
                        <h2 className="text-lg font-bold uppercase italic tracking-tighter mb-6 border-l-4 border-[#F47521] pl-4">Detalles Técnicos</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase">ID de Usuario</p>
                                <p className="font-mono text-sm">#{user.id}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase">Miembro desde</p>
                                <p>{new Date(user.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase">Estado de Cuenta</p>
                                <span className="inline-block mt-1 px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-black uppercase rounded-full">Activo</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#121212] p-8 rounded-2xl border border-white/5 flex flex-col justify-center items-center text-center">
                        <div className="w-16 h-16 bg-[#F47521]/10 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-[#F47521]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="font-bold uppercase tracking-tight">Verificación del Sistema</h3>
                        <p className="text-sm text-gray-500 mt-2">Este perfil ha sido validado correctamente por el administrador.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
