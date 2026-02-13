import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Index({ auth, actors }) {
    return (
        <>
            <Head title="Actores de Voz - Crunchyroll" />

            <div className="min-h-screen bg-[#0B0B0B] text-white">
                <Header auth={auth} />

                <section className="py-12 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h1 className="text-4xl font-black uppercase tracking-tighter">Reparto de Voces</h1>
                                <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest font-bold">Base de datos de talentos</p>
                            </div>

                            <Link
                                href={route('voice-actors.create')}
                                className="px-6 py-3 bg-[#F47521] rounded-lg font-bold uppercase tracking-widest hover:bg-[#E56717] transition shadow-[0_4px_0_0_#d4621a] active:translate-y-[2px] active:shadow-none"
                            >
                                Nuevo Actor
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {actors.map((actor) => (
                                <div key={actor.id} className="bg-[#0F0F0F] border border-white/10 rounded-xl p-6 group hover:border-[#F47521]/50 transition duration-300">
                                    <div className="w-16 h-16 bg-[#121212] rounded-full flex items-center justify-center mb-4 border border-white/5 group-hover:border-[#F47521]/30 transition">
                                        <span className="text-2xl font-black text-white/20 group-hover:text-[#F47521]">
                                            {actor.name.charAt(0)}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold mb-1 group-hover:text-white transition">{actor.name}</h3>
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-tighter mb-6">Voice Talent</p>

                                    <div className="flex gap-2 border-t border-white/5 pt-4">
                                        <Link
                                            href={route('voice-actors.edit', actor.id)}
                                            className="flex-1 text-center py-2 bg-white/5 hover:bg-white/10 rounded font-bold text-[10px] uppercase tracking-widest transition"
                                        >
                                            Editar
                                        </Link>
                                        <Link
                                            href={route('voice-actors.show', actor.id)}
                                            className="flex-1 text-center py-2 bg-[#F47521]/10 text-[#F47521] hover:bg-[#F47521] hover:text-black rounded font-bold text-[10px] uppercase tracking-widest transition"
                                        >
                                            Perfil
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
