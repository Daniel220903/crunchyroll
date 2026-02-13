import { Head, Link, useForm } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Show({ auth, season }) {
    const { delete: destroy } = useForm();

    const handleDelete = () => {
        if (confirm('¿Estás seguro de que deseas eliminar esta temporada?')) {
            destroy(route('seasons.destroy', season.id));
        }
    };

    return (
        <>
            <Head title={`Temporada ${season.season_number} - ${season.series?.title}`} />

            <div className="min-h-screen bg-[#0B0B0B] text-white">
                <Header auth={auth} />

                <section className="py-12 px-6">
                    <div className="max-w-5xl mx-auto">
                        
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                            <div>
                                <Link 
                                    href={route('seasons.index')}
                                    className="text-[#F47521] text-xs font-bold uppercase tracking-[0.2em] hover:underline mb-2 block"
                                >
                                    ← Volver a temporadas
                                </Link>
                                <h1 className="text-5xl font-black uppercase tracking-tighter">
                                    {season.series?.title}
                                </h1>
                                <p className="text-2xl text-gray-400 font-medium mt-1">
                                    Temporada {season.season_number} {season.title && `— ${season.title}`}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Link
                                    href={route('seasons.edit', season.id)}
                                    className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg font-bold text-xs uppercase tracking-widest transition"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    className="px-6 py-3 bg-[#ff424e]/10 hover:bg-[#ff424e] text-[#ff424e] hover:text-white border border-[#ff424e]/20 rounded-lg font-bold text-xs uppercase tracking-widest transition"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            
                            <div className="lg:col-span-2 space-y-4">
                                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                    <h3 className="text-xl font-bold uppercase tracking-tight">Episodios</h3>
                                    <span className="text-sm text-gray-500 font-bold uppercase tracking-widest">
                                        {season.episodes?.length || 0} Total
                                    </span>
                                </div>

                                {season.episodes && season.episodes.length > 0 ? (
                                    <div className="space-y-2">
                                        {season.episodes.map((episode) => (
                                            <div 
                                                key={episode.id}
                                                className="group flex items-center justify-between p-4 bg-[#0F0F0F] border border-white/5 hover:border-[#F47521]/50 transition rounded-lg"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span className="text-2xl font-black text-white/20 group-hover:text-[#F47521] transition">
                                                        {episode.number}
                                                    </span>
                                                    <div>
                                                        <h4 className="font-bold text-gray-200 group-hover:text-white transition">
                                                            {episode.title}
                                                        </h4>
                                                        <p className="text-xs text-gray-500 uppercase tracking-wider">
                                                            {episode.duration || '24 min'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Link 
                                                    href={route('episodes.show', episode.id)} 
                                                    className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-white/5 rounded text-xs font-bold uppercase tracking-widest transition hover:bg-[#F47521] hover:text-black"
                                                >
                                                    Ver Detalle
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-20 text-center bg-[#0F0F0F] border border-dashed border-white/10 rounded-lg">
                                        <p className="text-gray-500 italic">No hay episodios registrados en esta temporada.</p>
                                        <Link 
                                            href={route('episodes.create')} 
                                            className="mt-4 inline-block text-[#F47521] font-bold text-sm uppercase tracking-widest hover:underline"
                                        >
                                            + Añadir primer episodio
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div className="bg-[#0F0F0F] border border-white/10 p-6 rounded-lg">
                                    <h4 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-4">Información</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold">Fecha de Creación</p>
                                            <p className="text-sm text-gray-300">{new Date(season.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold">ID de Registro</p>
                                            <p className="text-sm text-gray-300">#{season.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold">Estado</p>
                                            <span className="inline-block mt-1 px-2 py-1 bg-green-500/10 text-green-500 text-[10px] font-black uppercase rounded">
                                                Publicado
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
