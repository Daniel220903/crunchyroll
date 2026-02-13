import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Acceder" />

            <div className="mb-8 text-center">
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                    Acceder
                </h2>
                <p className="text-gray-400 text-sm mt-2">
                    ¡Hola de nuevo, sensei!
                </p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-500 bg-green-500/10 p-3 rounded border border-green-500/20">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
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
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2 text-[#ff424e]" />
                </div>

                <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                        <InputLabel 
                            htmlFor="password" 
                            value="Contraseña" 
                            className="text-gray-300 font-bold text-xs uppercase tracking-widest"
                        />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs font-bold text-[#F47521] hover:underline"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        )}
                    </div>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-[#23252b] border-[#3a3d44] text-white focus:border-[#F47521] focus:ring-[#F47521] rounded-none transition-all"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2 text-[#ff424e]" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center cursor-pointer group">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            className="bg-[#23252b] border-[#3a3d44] text-[#F47521] focus:ring-[#F47521] rounded-none"
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
                            Recordarme
                        </span>
                    </label>
                </div>

                <div className="mt-8">
                    <PrimaryButton 
                        className="w-full justify-center py-4 bg-[#F47521] hover:bg-[#ff8a3d] active:bg-[#d4621a] text-black font-black uppercase tracking-widest text-sm rounded-none shadow-[0_4px_0_0_#d4621a] active:shadow-none active:translate-y-[2px] transition-all" 
                        disabled={processing}
                    >
                        Entrar
                    </PrimaryButton>
                </div>

                <div className="mt-6 text-center border-t border-white/10 pt-6">
                    <p className="text-gray-400 text-sm">
                        ¿No tienes cuenta?{' '}
                        <Link
                            href={route('register')}
                            className="font-bold text-[#F47521] hover:underline"
                        >
                            Crear una cuenta
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
