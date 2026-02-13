import { Head, useForm, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import InputError from '@/Components/InputError';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        avatar: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('users.store'));
    };

    return (
        <div className="min-h-screen bg-[#0B0B0B] text-white">
            <Head title="Crear Usuario" />
            <Header auth={auth} />

            <main className="max-w-2xl mx-auto px-6 py-12">
                <form onSubmit={submit} className="bg-[#121212] p-8 rounded-xl border border-white/5 space-y-6">
                    <h1 className="text-2xl font-black uppercase italic tracking-tighter mb-6">Nuevo Usuario</h1>
                    
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
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Password</label>
                        <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} className="w-full bg-[#0B0B0B] border-white/10 rounded-lg text-white focus:ring-[#F47521]" />
                        <InputError message={errors.password} />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Avatar</label>
                        <input type="file" onChange={e => setData('avatar', e.target.files[0])} className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-bold file:bg-[#F47521] file:text-black" />
                        <InputError message={errors.avatar} />
                    </div>

                    <button disabled={processing} className="w-full bg-[#F47521] text-black py-4 rounded font-black uppercase text-xs hover:bg-[#ff8533]">
                        Crear Usuario
                    </button>
                </form>
            </main>
        </div>
    );
}
