import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Show({ auth, actor }) {
    return (
        <>
            <Head title={`Perfil: ${actor.name}`} />
            <div className="min-h-screen bg-[#0B0B0B] text-white">
                <Header auth={auth} />
                
                <section className="py-12 px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-8 items-center mb-12 bg-[#0F0F0F] p-8 rounded-2xl border border-white/10">
                            <div className="w-32 h-32 bg-[#F47521] rounded-full flex items-center justify-center text-5xl font-black text-black shadow-[0_0_30px_rgba(244,117,33,0.2)]">
                                {actor.name.charAt(0)}
                            </div>
                            <div className="text-center md:text-left">
                                <h1 className="text-5xl font-black uppercase tracking-tighter">{actor.name}</h1>
                                <p className="text-[#F47521] font-bold uppercase tracking-[0.3em] text-sm mt-2">Actor de Voz / Seiyū</p>
                                <div className="flex gap-4 mt-4">
                                    <Link href={route('voice-actors.edit', actor.id)} className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest transition">
                                        Editar Perfil
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-xl font-black uppercase tracking-tight mb-6 border-b border-white/10 pb-2 flex justify-between items-center">
                            <span>Filmografía / Participaciones</span>
                            <span className="text-[#F47521] text-sm">{actor.episodes?.length || 0} Roles</span>
                        </h3>

                        <div className="grid grid-cols-1 gap-4">
                            {actor.episodes?.map((episode) => (
                                <div key={episode.id} className="bg-[#0F0F0F] border border-white/5 p-6 rounded-xl flex flex-col md:flex-row justify-between items-center group hover:border-[#F47521]/40 transition">
                                    <div className="mb-4 md:mb-0">
                                        <p className="text-[10px] text-[#F47521] font-black uppercase tracking-widest mb-1">
                                            {episode.season?.series?.title} — T{episode.season?.season_number}
                                        </p>
                                        <Link 
                                            href={route('episodes.show', episode.id)}
                                            className="text-xl font-bold text-gray-200 group-hover:text-white transition hover:underline"
                                        >
                                            Episodio {episode.number}: {episode.title}
                                        </Link>
                                    </div>
                                    <div className="text-center md:text-right bg-white/5 px-6 py-3 rounded-lg border border-white/5">
                                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter mb-1">Personaje Interpretado</p>
                                        <p className="text-lg font-black text-[#F47521] italic">
                                            "{episode.pivot?.character_name}"
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {(!actor.episodes || actor.episodes.length === 0) && (
                                <div className="text-center py-20 bg-[#0F0F0F] rounded-xl border border-dashed border-white/10 text-gray-500 italic">
                                    No hay participaciones registradas para este actor.
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
