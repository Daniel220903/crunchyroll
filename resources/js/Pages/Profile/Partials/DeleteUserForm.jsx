import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function DeleteUserForm() {
    const { data, setData, delete: destroy, processing, errors } = useForm({
        password: '',
    });

    const deleteUser = (e) => {
        e.preventDefault();
        if (confirm('¿Estás completamente seguro? Esta acción no se puede deshacer.')) {
            destroy(route('profile.destroy'));
        }
    };

    return (
        <section>
            <header className="mb-6">
                <h2 className="text-lg font-bold text-red-500 uppercase">Eliminar Cuenta</h2>
                <p className="text-sm text-gray-500">Una vez que tu cuenta sea eliminada, todos sus datos serán borrados permanentemente.</p>
            </header>

            <form onSubmit={deleteUser} className="space-y-6 max-w-xl">
                <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Contraseña para confirmar</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="w-full bg-[#0B0B0B] border-white/10 rounded-lg text-white focus:ring-red-500"
                        placeholder="Ingresa tu contraseña"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <button
                    disabled={processing}
                    className="bg-red-600/20 text-red-500 border border-red-600/50 px-6 py-2 rounded font-black uppercase text-xs hover:bg-red-600 hover:text-white transition disabled:opacity-50"
                >
                    Eliminar permanentemente
                </button>
            </form>
        </section>
    );
}
