import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Crear Cuenta" />

            <div className="mb-8 text-center">
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                    Crear Cuenta
                </h2>
                <p className="text-gray-400 text-sm mt-2">
                    ¡Únete a la comunidad!
                </p>
            </div>

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel 
                        htmlFor="name" 
                        value="Nombre" 
                        className="text-gray-300 font-bold text-xs uppercase tracking-widest mb-1"
                    />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full bg-[#23252b] border-[#3a3d44] text-white focus:border-[#F47521] focus:ring-[#F47521] rounded-none transition-all"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2 text-[#ff424e]" />
                </div>

                <div>
                    <InputLabel 
                        htmlFor="email" 
                        value="Correo Electrónico" 
                        className="text-gray-300 font-bold text-xs uppercase tracking-widest mb-1"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-[#23252b] border-[#3a3d44] text-white focus:border-[#F47521] focus:ring-[#F47521] rounded-none transition-all"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2 text-[#ff424e]" />
                </div>

                <div>
                    <InputLabel 
                        htmlFor="password" 
                        value="Contraseña" 
                        className="text-gray-300 font-bold text-xs uppercase tracking-widest mb-1"
                    />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-[#23252b] border-[#3a3d44] text-white focus:border-[#F47521] focus:ring-[#F47521] rounded-none transition-all"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2 text-[#ff424e]" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirmar Contraseña"
                        className="text-gray-300 font-bold text-xs uppercase tracking-widest mb-1"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full bg-[#23252b] border-[#3a3d44] text-white focus:border-[#F47521] focus:ring-[#F47521] rounded-none transition-all"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2 text-[#ff424e]"
                    />
                </div>

                <div className="mt-8">
                    <PrimaryButton 
                        className="w-full justify-center py-4 bg-[#F47521] hover:bg-[#ff8a3d] active:bg-[#d4621a] text-black font-black uppercase tracking-widest text-sm rounded-none shadow-[0_4px_0_0_#d4621a] active:shadow-none active:translate-y-[2px] transition-all" 
                        disabled={processing}
                    >
                        Registrarse
                    </PrimaryButton>
                </div>

                <div className="mt-6 text-center border-t border-white/10 pt-6">
                    <p className="text-gray-400 text-sm">
                        ¿Ya tienes una cuenta?{' '}
                        <Link
                            href={route('login')}
                            className="font-bold text-[#F47521] hover:underline"
                        >
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
