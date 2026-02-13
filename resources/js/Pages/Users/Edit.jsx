import { Head, useForm, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import InputError from '@/Components/InputError';

export default function Edit({ user, auth }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: user.name,
        email: user.email,
        password: '',
        avatar: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('users.update', user.id));
    };

    return (
        <div className="min-h-screen bg-[#0B0B0B] text-white">
            <Head title="Editar Usuario" />
            <Header auth={auth} />

            <main className="max-w-2xl mx-auto px-6 py-12">
                <form onSubmit={submit} className="bg-[#121212] p-8 rounded-xl border border-white/5 space-y-6">
                    <h1 className="text-2xl font-black uppercase italic tracking-tighter mb-6">Editar: {user.name}</h1>
                    
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Nombre</label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full bg-[#0B0B0B] border-white/10 rounded-lg text-white focus:ring-[#F47521]" />
                        <InputError message={errors.name} />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Email</label>
                        <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full bg-[#0B0B0B] border-white/10 rounded-lg text-white focus:ring-[#F47521]" />
                        <InputError message={errors.email} />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Nueva Password (dejar vacío para mantener)</label>
                        <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} className="w-full bg-[#0B0B0B] border-white/10 rounded-lg text-white focus:ring-[#F47521]" />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Cambiar Avatar</label>
                        <input type="file" onChange={e => setData('avatar', e.target.files[0])} className="w-full text-xs text-gray-400 file:bg-[#F47521] file:text-black" />
                    </div>

                    <button disabled={processing} className="w-full bg-[#F47521] text-black py-4 rounded font-black uppercase text-xs hover:bg-[#ff8533]">
                        Actualizar Usuario
                    </button>
                </form>
            </main>
        </div>
    );
}
