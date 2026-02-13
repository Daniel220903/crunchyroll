import { Head, Link, useForm } from '@inertiajs/react';
import Header from '@/Components/Header';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('voice-actors.store'));
    };

    return (
        <>
            <Head title="Registrar Actor de Voz" />
            <div className="min-h-screen bg-[#0B0B0B] text-white">
                <Header auth={auth} />
                <section className="py-12 px-6">
                    <div className="max-w-2xl mx-auto">
                        <div className="mb-8">
                            <Link href={route('voice-actors.index')} className="text-[#F47521] text-xs font-bold uppercase tracking-widest hover:underline">
                                ← Volver al reparto
                            </Link>
                            <h1 className="text-4xl font-black uppercase tracking-tighter mt-2">Nuevo Talento</h1>
                        </div>

                        <form onSubmit={submit} className="bg-[#0F0F0F] border border-white/10 rounded-xl p-8 space-y-6">
                            <div>
                                <InputLabel htmlFor="name" value="Nombre Completo" className="text-gray-400 text-xs uppercase font-bold mb-2" />
                                <TextInput
                                    id="name"
                                    value={data.name}
                                    className="w-full bg-[#121212] border-white/10 text-white rounded-lg focus:ring-[#F47521]"
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Ej: Daisuke Ono"
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 bg-[#F47521] rounded-lg font-black text-black uppercase tracking-widest hover:bg-[#E56717] transition shadow-[0_4px_0_0_#d4621a] active:shadow-none active:translate-y-[2px]"
                            >
                                Registrar Actor
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </>
    );
}
