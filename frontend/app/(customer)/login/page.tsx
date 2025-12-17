'use client';

import React from 'react';
import z from 'zod';
import { useForm, Controller, type FieldErrors } from 'react-hook-form'; // Added Controller
import { zodResolver } from '@hookform/resolvers/zod';
import { useLCDAuthStore } from '@/store/lcdAuthStore';
import { useRouter } from 'next/navigation';
import { useLoadingStore } from '@/store/loadingStore';
import { Eye, EyeOff } from 'lucide-react';

import { Label } from '@/components/custom/Label';
import { Input } from '@/components/custom/Input';
import { ErrorInfo } from '@/app/auth/components/ErrorMessage';
import Link from 'next/link';
import Image from 'next/image';
import { Spinner } from '@/components/custom/ZenfipaySpinner';
import { CustomButton } from '@/components/custom/CustomButton';
import DividerHorizontal from '@/components/custom/dividerHorizontal';
import { signInSchema } from '@/lib/schemas';

const emailSignInSchema = signInSchema;
const pinSignInSchema = z.object({
  staffPin: z
    .string()
    .min(6, 'PIN must be 6 digits')
    .max(6, 'PIN must be 6 digits')
    .regex(/^\d+$/, 'PIN must contain only numbers'),
});

type EmailSignInData = z.infer<typeof emailSignInSchema>;
type PinSignInData = z.infer<typeof pinSignInSchema>;

// --- PinBoxes Component ---
function PinBoxes({
  value,
  onChange,
  length = 6,
}: {
  value: string;
  onChange: (next: string) => void;
  length?: number;
}) {
  const refs = React.useRef<Array<HTMLInputElement | null>>([]);

  React.useEffect(() => {
    refs.current = Array(length)
      .fill(null)
      .map((_, i) => refs.current[i] ?? null);
  }, [length]);

  const handleDigit = (index: number, digit: string) => {
    if (!/^\d$/.test(digit)) return;
    const chars = value.split('').slice(0, length);
    chars[index] = digit;
    // Fill gaps if user clicks ahead
    for (let i = 0; i < length; i++) {
        if (!chars[i]) chars[i] = ''; 
    }
    const next = chars.join('').slice(0, length);
    onChange(next);
    const nextIndex = Math.min(length - 1, index + 1);
    refs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (key === 'Backspace') {
      e.preventDefault();
      const chars = value.split('');
      if (chars[index]) {
        chars[index] = '';
        onChange(chars.join(''));
      } else if (index > 0) {
        chars[index - 1] = '';
        onChange(chars.join(''));
        refs.current[index - 1]?.focus();
      }
    } else if (key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      refs.current[index - 1]?.focus();
    } else if (key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      refs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (paste.length === 0) return;
    onChange(paste);
    const nextIndex = Math.min(length - 1, paste.length - 1);
    refs.current[nextIndex]?.focus();
  };

  return (
    <div className="flex justify-center gap-2 mt-3">
      {Array.from({ length }).map((_, i) => (
        <Input
          key={i}
          // FIX 1: Add curly braces to return void for ref callback
          ref={(el) => { refs.current[i] = el }}
          
          // FIX 2: Satisfy InputProps requirements
          type="text" 
          placeholder=""
          
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={value[i] ?? ''}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, '');
            if (!v) {
              const chars = value.split('');
              chars[i] = '';
              onChange(chars.join(''));
              return;
            }
            handleDigit(i, v[v.length - 1]);
          }}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={`bg-transparent w-[62px] h-9 flex justify-center items-center rounded-lg border border-[#EEEEEE] text-[#2B2B2B] text-[11px] font-bold text-center outline-none transition-colors
            ${(value[i]) ? 'border-[#20195F]' : ''}
          `}
        />
      ))}
    </div>
  );
}

// --- Main Page Component ---
export default function LCDLoginPage() {
  const router = useRouter();
  const { isLoading, setIsLoading } = useLoadingStore();
  const [step, setStep] = React.useState<'email' | 'pin'>('email');
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const { loginLCD, isAuthenticated } = useLCDAuthStore();

  const form = useForm<EmailSignInData | PinSignInData>({
    resolver: zodResolver(step === 'email' ? emailSignInSchema : pinSignInSchema),
    mode: 'onChange',
    defaultValues: {
      staffPin: '',
      email: '',
      password: ''
    }
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = form;

  const emailErrors = errors as FieldErrors<EmailSignInData>;
  const pinErrors = errors as FieldErrors<PinSignInData>; 

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/terminal');
    }
  }, [isAuthenticated, router]);


  // Handler for Email Login
  const handleEmailSubmit = async (data: EmailSignInData | PinSignInData) => {
    // Type guard to ensure we are processing email data
    if (!('email' in data)) return;

    setIsLoading(true);
    
    // Simulate API call or Real Auth logic here
    console.log("Email Login:", data.email);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // if successful:
    router.push('/terminal');
    setIsLoading(false);
  };

  // Handler for PIN Login
  const handlePinSubmit = async (data: EmailSignInData | PinSignInData) => {
    if (!('staffPin' in data)) return;
    
    const pin = data.staffPin;
    setIsLoading(true);

    const success = await loginLCD(pin);

    if (success) {
      router.push('/terminal');
    } else {
      setError('staffPin', { message: 'Invalid PIN. Please try again.' });
      reset({ staffPin: '' });
    }

    setIsLoading(false);
  };

  const changeStep = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    reset({ staffPin: '', email: '', password: '' });
    
    setStep((prev) => (prev === 'email' ? 'pin' : 'email'));
    setIsLoading(false);
  };

  return (
    <div className='w-full min-h-[600px] flex flex-row overflow-y-hidden'>
      {/* LEFT SIDE */}
      <div className="w-[45%] bg-[#EEF3FF] flex flex-col p-8">
        <div className="h-full flex flex-col justify-between">
          <div className="">
            <div className="w-[401px] space-y-[13px]">
              <h1 className="w-[305px] text-[26px] font-neue font-medium leading-[100%] tracking-[-0.4px] text-[#014DFF]">
                One dashboard. All your payments.
              </h1>
              <p className="font-inter font-medium text-[11px] leading-[100%] tracking-[0px] text-[#636363]">
                Track sales, manage devices, and withdraw to your bank with ease.
              </p>
            </div>
            <div className="w-full mx-auto overflow-hidden ">
              <Image src="/images/onboardingImage.png" alt="hand holding device" width={560} height={374} className="mt-[29px]" />
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <Image src="/icons/logo.svg" alt="Zenfipay Logo" width={120} height={200} />
            <p className="font-inter font-medium text-xs text-[#636363]">Copyright &copy; 2025 Zenstar tech.</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className='w-[480px] min-h-[400px] mt- mx-auto py-6 px-8 space-y-8'>

        <h2 className='font-neue text-[20px] leading-8 tracking-[-0.4px] text-[#212121]'>Staff sign in</h2>
        
        <CustomButton
          variant='divider'
          className='w-full'
          text={step === 'email' ? 'Continue with pin' : 'Continue with email'}
          onClick={changeStep}
        />

        <div className='w-full flex items-center gap-2'>
          <DividerHorizontal />
          <p>OR</p>
          <DividerHorizontal />
        </div>

        
        {isLoading && (
          <div className='fixed inset-0 z-50 bg-white flex justify-center items-center'>
            <Spinner />
          </div>
        )}

        {/* EMAIL FORM */}
        {step === 'email' && !isLoading && (
          <form onSubmit={handleSubmit(handleEmailSubmit)} className='space-y-10'>
            <div className='space-y-6'>
              {/* EMAIL ADDRESS */}
              <div className='flex flex-col gap-1'>
                <Label htmlFor='email' text='Email address' />
                <Input
                  type='email'
                  placeholder='e.g. adeyera08@gmail.com'
                  {...register('email')}
                />
                <ErrorInfo message={emailErrors.email?.message} />
              </div>

              {/* PASSWORD */}
              <div className='relative flex flex-col gap-1'>
                <Label htmlFor='password' text='Password' />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter password'
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 cursor-pointer transition-transform duration-300 ease-in-out"
                  tabIndex={0}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <ErrorInfo message={emailErrors.password?.message} />
              </div>

              <Link href="" className="inline-block mt-4 font-medium text-[13px] text-[#20195F] underline-grow">
                Reset password
              </Link>
            </div>

            <CustomButton
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full mt-12"
              variant={`${isValid ? "primary" : "disabled"}`}
              text="Continue"
            />
          </form>
        )}

        {/* PIN FORM */}
        {step === 'pin' && !isLoading && (
          <form onSubmit={handleSubmit(handlePinSubmit)} className='space-y-10'>
            <div className='space-y-4'>
              <Label htmlFor='staffPin' text='Staff PIN' />
              <Controller
                control={control}
                name="staffPin"
                render={({ field: { onChange, value } }) => (
                  <PinBoxes 
                    value={value as string || ''} 
                    onChange={onChange} 
                    length={6}
                  />
                )}
              />
              <ErrorInfo message={pinErrors.staffPin?.message} />
            </div>

            <CustomButton
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full mt-12"
              variant={`${isValid ? "primary" : "disabled"}`}
              text="Continue"
            />
          </form>
        )}
      </div>
    </div>
  );
}