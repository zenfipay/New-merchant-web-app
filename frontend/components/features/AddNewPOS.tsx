'use client'

import * as React from 'react'
import * as z from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { SelectViewport } from '@radix-ui/react-select';

import { CustomButton } from '../custom/CustomButton';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import Spinner from '../custom/ZenfipaySpinner';
import AnimatedCheckmark from './AnimatedCheckmark';

import { useLoadingStore } from '@/store/loadingStore';
import Image from 'next/image';
import { InfoDiv } from '../custom/infoDiv';
import { Label } from '../custom/Label';
import { Input } from '../custom/Input';
import { ErrorInfo } from '@/app/auth/components/ErrorMessage';

const addNewPOSSchema = z.object({
    deviceID: z.string().trim().regex(/^\d{6}$/g, {
        message: "Device ID must be a 6-digit number"
    }),
    deviceName: z.string().min(3, "Must be at least 3 characters long"),
    deviceType: z.enum(['Android desktop', 'iPad', 'Custom device']),
    assignStaff:z.string().min(1, "Please select a staff member"),
})

type AddNewPOSFormData = z.infer<typeof addNewPOSSchema>

const deviceTypes = [
    {
        device: 'Android desktop',
    },
    {
        device: 'iPad',
    },
    {
        device: 'Custom device',
    },
]

const staffData = [
    {
        name: 'John Adewale',
        role: 'cashier',
    },
    {
        name: 'Tunde Balogun',
        role: 'branch manager',
    },
    {
        name: 'Mary Okonkwo',
        role: 'cashier',
    },
    {
        name: 'Chinedu Eze',
        role: 'Admin',
    },
]

export default function AddNewPOS() {

    const { isLoading, setIsLoading } = useLoadingStore();
    const [ step, setStep ] = React.useState<number>(1);
    const [ openModal, setOpenModal ] = React.useState<boolean>(false);

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<AddNewPOSFormData>({
        resolver: zodResolver(addNewPOSSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
    })

    const onSubmitForm = async ( data:AddNewPOSFormData ) => {
        console.log("Point Of Sale Successfully added: ", data);
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2500))
        setIsLoading(false);
        reset();
        setStep(2);
    }

    const onCloseModal = () => {
        setOpenModal(false);
        setStep(1);
        reset();
    }


    return (
        <div>
            <CustomButton
                variant="secondaryBrand"
                size="sm"
                onClick={() => setOpenModal(true)}
            >
                <Image src='/icons/addIconBlue.svg' alt='add icon' width={14} height={14} />
                Add new POS
            </CustomButton>

            {openModal && isLoading ? (
                <div className='fixed inset-0 z-50 bg-[#20195F]/10 backdrop-blur-lg flex justify-center items-center'>
                    <Spinner />
                </div>
            ): openModal && !isLoading && (
                <div className='fixed inset-0 z-50 bg-[#20195F]/10 backdrop-blur-lg flex justify-center items-center'>

                    <div className='bg-white w-[480px] border border-white rounded-2xl overflow-hidden'>

                        {/* HEADER */}
                        <header className='bg-[#FAFAFA] flex justify-between items-center py-2 px-4 border border-[#F5F5F5] '>
                            <h5 className='text-[#636363] text-[11px] tracking-[1.4px]'>
                                ADD NEW POS
                            </h5>
                            <CustomButton
                                variant='secondary'
                                size='sm'
                                onClick={onCloseModal}
                            >
                                <Image src='/icons/closeIconBlack.svg' alt='close icon' width={12} height={12} />
                            </CustomButton>
                        </header>

                        {/* CONTENT */}
                        <div className='py-6 px-8 space-y-6'>

                            {step === 1 && (
                                <form
                                    onSubmit={handleSubmit(onSubmitForm)}
                                    className='flex flex-col gap-6'
                                >
                                    <InfoDiv text='Create and configure a new Point of Sale device for your business' />

                                    {/* FORM CONTENT */}
                                    <div className='flex flex-col gap-3'>
                                        {/* DEVICE ID */}
                                        <div className='flex flex-col gap-2'>
                                            <Label htmlFor='deviceID' text='Device ID' />
                                            <Input
                                                type='text'
                                                placeholder='009283'
                                                {...register('deviceID')}
                                                className={errors.deviceID ? 'border-[#FFC0C2]' : ''}
                                            />
                                            <ErrorInfo message={errors.deviceID?.message} />
                                        </div>

                                        {/* DEVICE NAME */}
                                        <div className='flex flex-col gap-2'>
                                            <Label htmlFor='deviceName' text='Device name' />
                                            <Input
                                                type='text'
                                                placeholder='Enter name'
                                                {...register('deviceName')}
                                                className={errors.deviceName ? 'border-[#FFC0C2]' : ''}
                                            />
                                            <ErrorInfo message={errors.deviceName?.message} />
                                        </div>

                                        {/* DEVICE TYPE */}
                                        <div className='flex flex-col gap-2'>
                                            <Label htmlFor='deviceType' text='Device type' />
                                            <Controller
                                                control={control}
                                                name='deviceType'
                                                render={({ field }) => (
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        value={field.value}
                                                    >
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder='Select a device type' />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {deviceTypes.map((type) => (
                                                                <SelectItem
                                                                    key={type.device}
                                                                    value={type.device}
                                                                >
                                                                    {type.device}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                            <ErrorInfo message={errors.deviceType?.message} />
                                        </div>

                                        {/* ASSIGN STAFF */}
                                        <div className='flex flex-col gap-2'>
                                            <Label htmlFor='assignStaff' text='Assign staff' />
                                            <Controller
                                                control={control}
                                                name='assignStaff'
                                                render={({ field }) => (
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        value={field.value}
                                                    >
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder='Asssign staff' />
                                                        </SelectTrigger>
                                                        <SelectContent className='min-w-full'>
                                                            <SelectViewport className="w-full">
                                                                {staffData.length > 0 ? (
                                                                    staffData.map((staff) => (
                                                                    <SelectItem
                                                                        key={staff.name}
                                                                        value={staff.name}
                                                                        className="w-full [&>[data-radix-select-item-text]]:w-full"
                                                                        >
                                                                        <div className="flex justify-between w-full items-center">
                                                                            <p className="uppercase">{staff.name}</p>
                                                                            <p className="uppercase">{staff.role}</p>
                                                                        </div>
                                                                    </SelectItem>
                                                                    ))
                                                                ) : (
                                                                    <div className="p-4 text-center text-sm text-[#636363]">
                                                                    No staff available. Please add staff members first.
                                                                    </div>
                                                                )}
                                                            </SelectViewport>
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <CustomButton
                                        variant={isValid ? 'primary' : 'disabled'}
                                        type='submit'
                                        className='w-full mt-6'
                                        text='Add device'
                                        disabled={!isValid}
                                    />
                                    
                                </form>
                            )}

                            {step === 2 && (
                                <div className='bg-white w-[480px] border border-white rounded-2xl overflow-hidden'>
                                    <AnimatedCheckmark />
                                    <div className='w-3/6'>
                                        <h3 className='font-neue text-2xl leading-8 text-[#212121]'>Device added!</h3>
                                        <p className='text-[#636363]'>
                                            A new Point of sale has been added & registered under your business account
                                        </p>
                                    </div>
                                    <CustomButton
                                        variant='secondary'
                                        text='Close'
                                        className='w-full'
                                        onClick={onCloseModal}
                                    />
                                </div>
                            )}

                        </div>  
                    </div>


                </div>
            )}
        </div>
    )
}