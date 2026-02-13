import { Head, Link, useForm } from '@inertiajs/react';
import Header from '@/Components/Header';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Create({ auth, series }) {
    const { data, setData, post, processing, errors } = useForm({
        series_id: '',
        season_number: '', 
        title: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('seasons.store'));
    };

    return (
        <>
            <Head title="Nueva Temporada" />

            <div className="min-h-screen bg-[#0B0B0B] text-white">
                <Header auth={auth} />

                <section className="py-12 px-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-4xl font-black">Nueva Temporada</h1>
                            
                            <Link
                                href={route('seasons.index')}
                                className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white transition"
                            >
                                Cancelar
                            </Link>
                        </div>

                        <div className="bg-[#0F0F0F] border border-white/10 rounded-lg overflow-hidden p-8">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel 
                                        htmlFor="series_id" 
                                        value="Serie" 
                                        className="text-gray-300 font-bold text-xs uppercase tracking-widest mb-2" 
                                    />
                                    <select
                                        id="series_id"
                                        name="series_id"
                                        value={data.series_id}
                                        className="mt-1 block w-full bg-[#121212] border border-white/10 text-gray-200 focus:border-[#F47521] focus:ring-[#F47521] rounded-lg transition-all"
                                        onChange={(e) => setData('series_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Selecciona una serie</option>
                                        {series.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.title}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.series_id} className="mt-2 text-[#ff424e]" />
                                </div>

                                <div>
                                    <InputLabel 
                                        htmlFor="season_number" 
                                        value="Número de Temporada" 
                                        className="text-gray-300 font-bold text-xs uppercase tracking-widest mb-2" 
                                    />
                                    <TextInput
                                        id="season_number"
                                        type="number"
                                        name="season_number"
                                        value={data.season_number}
                                        className="mt-1 block w-full bg-[#121212] border border-white/10 text-gray-200 focus:border-[#F47521] focus:ring-[#F47521] rounded-lg transition-all"
                                        onChange={(e) => setData('season_number', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.season_number} className="mt-2 text-[#ff424e]" />
                                </div>

                                <div>
                                    <InputLabel 
                                        htmlFor="title" 
                                        value="Título (Opcional)" 
                                        className="text-gray-300 font-bold text-xs uppercase tracking-widest mb-2" 
                                    />
                                    <TextInput
                                        id="title"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-full bg-[#121212] border border-white/10 text-gray-200 focus:border-[#F47521] focus:ring-[#F47521] rounded-lg transition-all"
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Ej: Arco del Distrito Rojo"
                                    />
                                    <InputError message={errors.title} className="mt-2 text-[#ff424e]" />
                                </div>

                                <div className="pt-4 border-t border-white/5 mt-8 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-8 py-3 bg-[#F47521] rounded-lg font-bold text-black uppercase tracking-wide hover:bg-[#E56717] transition-all shadow-[0_4px_0_0_#d4621a] active:shadow-none active:translate-y-[2px]"
                                    >
                                        Guardar Temporada
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
