import { Head, useForm, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import InputError from '@/Components/InputError';

export default function Edit({ genre, auth }) {
    const { data, setData, put, processing, errors } = useForm({
        name: genre.name,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('genres.update', genre.id));
    };

    return (
        <div className="min-h-screen bg-[#0B0B0B] text-white">
            <Head title={`Editar Género: ${genre.name}`} />
            <Header auth={auth} />

            <main className="max-w-2xl mx-auto px-6 py-12">
                <Link href={route('genres.index')} className="text-[#F47521] text-xs font-bold uppercase mb-4 block">
                    ← Cancelar
                </Link>
                
                <h1 className="text-3xl font-black uppercase italic tracking-tighter mb-8">Editar Género</h1>

                <form onSubmit={submit} className="bg-[#121212] p-8 rounded-xl border border-white/5 space-y-6">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Nombre del Género</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full bg-[#0B0B0B] border-white/10 rounded-lg text-white focus:ring-[#F47521] focus:border-[#F47521]"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-[#F47521] text-black py-4 rounded font-black uppercase text-xs hover:bg-[#ff8533] transition disabled:opacity-50"
                    >
                        {processing ? 'Actualizando...' : 'Actualizar Género'}
                    </button>
                </form>
            </main>
        </div>
    );
}
