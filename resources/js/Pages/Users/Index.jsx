import { Head, Link, useForm } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Index({ users, auth }) {
    const { delete: destroy } = useForm();

    return (
        <div className="min-h-screen bg-[#0B0B0B] text-white">
            <Head title="Gestión de Usuarios" />
            <Header auth={auth} />

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-black uppercase italic tracking-tighter border-l-4 border-[#F47521] pl-4">
                        Usuarios
                    </h1>
                    <Link
                        href={route('users.create')}
                        className="bg-[#F47521] text-black px-6 py-2 rounded font-bold uppercase text-xs hover:bg-[#ff8533] transition"
                    >
                        Registrar Usuario
                    </Link>
                </div>

                <div className="bg-[#121212] rounded-xl border border-white/5 overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-gray-400">
                                <th className="px-6 py-4">Avatar</th>
                                <th className="px-6 py-4">Nombre</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.data.map((user) => (
                                <tr key={user.id} className="hover:bg-white/[0.02]">
                                    <td className="px-6 py-4">
                                        <img 
                                            src={user.avatar ? `/storage/${user.avatar}` : '/default-avatar.png'} 
                                            className="w-10 h-10 rounded-full object-cover border border-[#F47521]"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-bold">{user.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-400">{user.email}</td>
                                    <td className="px-6 py-4 text-right space-x-4">
                                        <Link href={route('users.show', user.id)} className="text-[10px] font-bold uppercase text-gray-400 hover:text-white">Ver</Link>
                                        <Link href={route('users.edit', user.id)} className="text-[10px] font-bold uppercase text-[#F47521]">Editar</Link>
                                        <button 
                                            onClick={() => confirm('¿Borrar usuario?') && destroy(route('users.destroy', user.id))}
                                            className="text-[10px] font-bold uppercase text-red-500"
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
