import { Head, Link, useForm } from '@inertiajs/react';
import Header from '@/Components/Header';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Edit({ auth, actor }) {
    const { data, setData, put, processing, errors } = useForm({
        name: actor.name || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('voice-actors.update', actor.id));
    };

    return (
        <>
            <Head title={`Editar ${actor.name}`} />
            <div className="min-h-screen bg-[#0B0B0B] text-white">
                <Header auth={auth} />
                <section className="py-12 px-6">
                    <div className="max-w-2xl mx-auto">
                        <h1 className="text-4xl font-black uppercase tracking-tighter mb-8">Editar Perfil</h1>
                        <form onSubmit={submit} className="bg-[#0F0F0F] border border-white/10 rounded-xl p-8 space-y-6">
                            <div>
                                <InputLabel value="Nombre del Actor" className="text-gray-400 text-xs uppercase font-bold mb-2" />
                                <TextInput
                                    value={data.name}
                                    className="w-full bg-[#121212] border-white/10 text-white rounded-lg"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="flex gap-4">
                                <Link href={route('voice-actors.index')} className="flex-1 text-center py-4 bg-white/5 rounded-lg font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition">
                                    Cancelar
                                </Link>
                                <button type="submit" disabled={processing} className="flex-2 px-10 py-4 bg-[#F47521] rounded-lg font-black text-black uppercase tracking-widest hover:bg-[#E56717] transition">
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </>
    );
}
