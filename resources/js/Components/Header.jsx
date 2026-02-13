import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Header({ auth, active = null }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const isAdmin = auth?.user?.role === 'admin';

    return (
        <header className="sticky top-0 z-50 bg-[#0B0B0B]/95 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center py-4">
                    
                    <Link href={route('series.index')} className="text-2xl font-black text-[#F47521] tracking-tighter">
                        CRUNCHYROLL
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        <Link href={route('series.index')} className={`text-sm font-bold uppercase tracking-widest hover:text-[#F47521] transition ${active === 'index' ? 'text-[#F47521]' : 'text-white'}`}>
                            Inicio
                        </Link>
                        <Link href={route('series.index')} className={`text-sm font-bold uppercase tracking-widest hover:text-[#F47521] transition ${active === 'browse' ? 'text-[#F47521]' : 'text-white'}`}>
                            Explorar
                        </Link>

                        {auth?.user ? (
                            <div className="relative">
                                <button 
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-2 bg-zinc-900 border border-white/10 px-4 py-2 rounded-full hover:bg-zinc-800 transition"
                                >
                                    <div className="w-6 h-6 rounded-full bg-[#F47521] flex items-center justify-center text-[10px] font-black text-black uppercase">
                                        {auth.user.name.charAt(0)}
                                    </div>
                                    <span className="text-sm font-bold uppercase tracking-tight text-white">{auth.user.name}</span>
                                    <svg className={`w-4 h-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                </button>

                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-[#121212] border border-white/10 rounded-xl shadow-2xl py-2 overflow-hidden animate-in fade-in zoom-in duration-200">
                                        <div className="px-4 py-2 border-b border-white/5 mb-2">
                                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Mi Actividad</p>
                                        </div>
                                        <Link href={route('profile.edit')} className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#F47521] hover:text-black font-bold transition">Mi Perfil</Link>
                                        <Link href={route('watch-history.index')} className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#F47521] hover:text-black font-bold transition">Historial</Link>
                                        <Link href={route('favorites.index')} className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#F47521] hover:text-black font-bold transition">Mis Likes</Link>
                                        <Link href={route('reviews.index')} className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#F47521] hover:text-black font-bold transition">Mis Reseñas</Link>
                                        
                                        {isAdmin && (
                                            <>
                                                <div className="border-t border-white/5 my-2"></div>
                                                <div className="px-4 py-1">
                                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Gestión</p>
                                                </div>

                                                <Link href={route('users.index')} className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Usuarios</Link>
                                                <Link href={route('genres.index')} className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Géneros</Link>
                                                <Link href={route('seasons.index')} className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Temporadas</Link>
                                                <Link href={route('episodes.index')} className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Episodios</Link>
                                                <Link href={route('payments.index')} className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Pagos</Link>
                                                <Link href={route('subscription-plans.index')} className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Planes</Link>
                                                <Link href={route('subscriptions.index')} className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Suscripciones</Link>
                                            </>
                                        )}
                                        
                                        <Link 
                                            href={route('logout')} 
                                            method="post" 
                                            as="button" 
                                            className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 font-bold border-t border-white/5"
                                        >
                                            Cerrar Sesión
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href={route('login')} className="px-6 py-2 bg-[#F47521] text-black rounded font-black uppercase text-xs tracking-widest hover:scale-105 transition">
                                Iniciar Sesión
                            </Link>
                        )}
                    </nav>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
                            {isMobileMenuOpen ? (
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden bg-[#0B0B0B] border-t border-white/10 h-[calc(100vh-73px)] overflow-y-auto pb-20 animate-in slide-in-from-top duration-300">
                    <div className="flex flex-col">
                        <Link href={route('series.index')} className="px-6 py-4 text-sm font-black uppercase tracking-widest text-[#F47521] border-b border-white/5 bg-white/[0.02]">Inicio</Link>
                        <Link href={route('series.index')} className="px-6 py-4 text-sm font-black uppercase tracking-widest text-white border-b border-white/5">Explorar</Link>

                        <div className="bg-white/5 px-6 py-3">
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Mi Actividad</p>
                        </div>
                        <Link href={route('profile.edit')} className="px-8 py-3 text-sm font-bold text-gray-300 hover:text-white transition border-b border-white/5">Mi Perfil</Link>
                        <Link href={route('watch-history.index')} className="px-8 py-3 text-sm font-bold text-gray-300 hover:text-white transition border-b border-white/5">Historial</Link>
                        <Link href={route('favorites.index')} className="px-8 py-3 text-sm font-bold text-gray-300 hover:text-white transition border-b border-white/5">Favoritos</Link>
                        
                        {isAdmin && (
                            <>
                                <div className="bg-white/5 px-6 py-3 mt-4">
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Gestión de Admin</p>
                                </div>
                                <div className="grid grid-cols-2 gap-px bg-white/5 border-b border-white/5">
                                    <Link href={route('users.index')} className="bg-[#0B0B0B] px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-tighter hover:text-[#F47521]">Usuarios</Link>
                                    <Link href={route('genres.index')} className="bg-[#0B0B0B] px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-tighter hover:text-[#F47521]">Géneros</Link>
                                    <Link href={route('seasons.index')} className="bg-[#0B0B0B] px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-tighter hover:text-[#F47521]">Temporadas</Link>
                                    <Link href={route('episodes.index')} className="bg-[#0B0B0B] px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-tighter hover:text-[#F47521]">Episodios</Link>
                                    <Link href={route('subscription-plans.index')} className="bg-[#0B0B0B] px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-tighter hover:text-[#F47521]">Planes</Link>
                                    <Link href={route('subscriptions.index')} className="bg-[#0B0B0B] px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-tighter hover:text-[#F47521]">Suscripciones</Link>
                                </div>
                            </>
                        )}

                        <Link 
                            href={route('logout')} 
                            method="post" 
                            as="button" 
                            className="mx-6 mt-8 py-4 bg-red-500/10 text-red-500 rounded-lg font-black uppercase text-xs tracking-[0.2em] border border-red-500/20"
                        >
                            Cerrar Sesión
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
