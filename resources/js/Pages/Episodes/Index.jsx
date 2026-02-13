import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Index({ episodes, auth }) {
    return (
        <>
            <Head title="Episodios - Crunchyroll Clone" />

            <div className="min-h-screen bg-[#0B0B0B] text-white">
                <Header auth={auth} />

                <section className="py-12 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-4xl font-black uppercase tracking-tighter">Episodios</h1>

                            <Link
                                href={route('episodes.create')}
                                className="px-6 py-3 bg-[#F47521] rounded-lg font-bold uppercase tracking-widest hover:bg-[#E56717] transition shadow-[0_4px_0_0_#d4621a] active:translate-y-[2px] active:shadow-none"
                            >
                                Nuevo Episodio
                            </Link>
                        </div>

                        <div className="bg-[#0F0F0F] border border-white/10 rounded-lg overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-[#121212] border-b border-white/10">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Ep</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Serie / Temporada</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Título</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {episodes.data.map((episode) => (
                                        <tr key={episode.id} className="border-b border-white/5 hover:bg-white/5 transition">
                                            <td className="px-6 py-4 font-black text-[#F47521]">
                                                {episode.number}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-bold text-gray-200">
                                                    {episode.season?.series?.title}
                                                </div>
                                                <div className="text-xs text-gray-500 uppercase tracking-tighter">
                                                    Temporada {episode.season?.season_number}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium">
                                                {episode.title}
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <Link
                                                    href={route('episodes.edit', episode.id)}
                                                    className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition"
                                                >
                                                    Editar
                                                </Link>
                                                <Link
                                                    href={route('episodes.show', episode.id)}
                                                    className="px-3 py-1 bg-[#F47521]/10 text-[#F47521] border border-[#F47521]/20 rounded text-[10px] font-black uppercase tracking-widest hover:bg-[#F47521] hover:text-black transition"
                                                >
                                                    Ver
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
