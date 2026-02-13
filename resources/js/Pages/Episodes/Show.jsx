import { Head, Link, useForm } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Show({ auth, episode }) {
    const { delete: destroy } = useForm();

    const handleDelete = () => {
        if (confirm('¿Estás seguro de que deseas eliminar este episodio?')) {
            destroy(route('episodes.destroy', episode.id));
        }
    };

    return (
        <>
            <Head title={`Episodio ${episode.number} - ${episode.title}`} />

            <div className="min-h-screen bg-[#0B0B0B] text-white">
                <Header auth={auth} />

                <section className="py-12 px-6">
                    <div className="max-w-5xl mx-auto">
                        
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
                            <div className="flex gap-6 items-center">
                                <div className="text-6xl font-black text-[#F47521] border-r border-white/10 pr-6">
                                    {episode.number}
                                </div>
                                <div>
                                    <Link 
                                        href={route('seasons.show', episode.season_id)}
                                        className="text-[#F47521] text-xs font-bold uppercase tracking-[0.2em] hover:underline mb-1 block"
                                    >
                                        {episode.season?.series?.title} — Temporada {episode.season?.season_number}
                                    </Link>
                                    <h1 className="text-4xl font-black uppercase tracking-tighter">
                                        {episode.title}
                                    </h1>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Link
                                    href={route('episodes.edit', episode.id)}
                                    className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-bold text-xs uppercase tracking-widest transition"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    className="px-6 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-lg font-bold text-xs uppercase tracking-widest transition"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2 space-y-8">
                                <div>
                                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-4 border-b border-white/10 pb-2">
                                        Reparto de Voces (Hacer clic en el nombre para ver perfil)
                                    </h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {episode.voice_actors?.map((actor) => (
                                            <div key={actor.id} className="bg-[#0F0F0F] border border-white/5 p-4 rounded-lg flex justify-between items-center group hover:border-[#F47521]/30 transition">
                                                <div>
                                                    {/* RUTA CORREGIDA: Al perfil del actor */}
                                                    <Link 
                                                        href={route('voice-actors.show', actor.id)}
                                                        className="text-white font-bold group-hover:text-[#F47521] transition hover:underline"
                                                    >
                                                        {actor.name}
                                                    </Link>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Actor de voz</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-black text-gray-300 italic">
                                                        "{actor.pivot?.character_name}"
                                                    </p>
                                                    <p className="text-[10px] text-gray-600 uppercase font-bold">Personaje</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-[#0F0F0F] border border-white/10 p-6 rounded-lg">
                                    <h4 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-4">Navegación</h4>
                                    <Link
                                        href={route('seasons.show', episode.season_id)}
                                        className="block w-full text-center py-3 bg-[#F47521] text-black rounded-lg text-xs font-black uppercase tracking-widest transition"
                                    >
                                        Volver a la temporada
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
