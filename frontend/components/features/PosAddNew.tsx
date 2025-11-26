// "use client"

// import * as React from 'react';
// import * as z from 'zod';
// import { useForm, Controller } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import Image from 'next/image';
// import { CustomButton } from '../custom/CustomButton'; 

// const newPosSchema = z.object({
//     deviceId: z.string().trim().regex(/^\d{7}$/g, {
//         message: "Device ID must be 7 digits",
//     }),
//     deviceName: z.string().trim().regex(/^\d{3}$/g, {
//         message: "Enter 3 digits to complete device name"
//     }),
//     deviceType: z.enum(["Android desktop", "ipad", "Custom device"]),
// })

// export default function AddNewPos() {


//     const [ openModal, setOpenModal ] = React.useState(false);
// }