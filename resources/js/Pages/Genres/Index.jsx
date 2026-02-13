import { Head, Link, useForm } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Index({ genres, auth }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de eliminar este género?')) {
            destroy(route('genres.destroy', id));
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0B0B] text-white">
            <Head title="Administrar Géneros" />
            <Header auth={auth} />

            <main className="max-w-5xl mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-black uppercase italic tracking-tighter border-l-4 border-[#F47521] pl-4">
                        Géneros
                    </h1>
                    <Link
                        href={route('genres.create')}
                        className="bg-[#F47521] text-black px-6 py-2 rounded font-bold uppercase text-xs hover:bg-[#ff8533] transition"
                    >
                        Nuevo Género
                    </Link>
                </div>

                <div className="bg-[#121212] rounded-xl border border-white/5 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-gray-400">
                                <th className="px-6 py-4 font-bold">Nombre</th>
                                <th className="px-6 py-4 font-bold">Slug / Identificador</th>
                                <th className="px-6 py-4 font-bold text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {genres.map((genre) => (
                                <tr key={genre.id} className="hover:bg-white/[0.02] transition">
                                    <td className="px-6 py-4 font-bold text-[#F47521]">{genre.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-400">{genre.slug || '---'}</td>
                                    <td className="px-6 py-4 text-right space-x-4">
                                        <Link
                                            href={route('genres.edit', genre.id)}
                                            className="text-xs font-bold uppercase hover:text-[#F47521] transition"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(genre.id)}
                                            className="text-xs font-bold uppercase text-red-500 hover:text-red-400 transition"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
