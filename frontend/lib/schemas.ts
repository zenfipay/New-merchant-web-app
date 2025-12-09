import * as z from 'zod';

export const signInSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
})


// NEW BRANCH
export const newBranchSchema = z.object({
    branchName: z.string().min(1, 'Enter your branch name'),
    countryCode: z.literal("+234"),
    branchContactNumber: z.string().trim().regex(/^\d{10}$/g, {
        message: "Enter a valid phone number",
    }),
    branchAddress: z.string().min(1, 'Input your address'),
    branchCountry: z.literal("Nigeria"),
    branchState: z.string().min(1, "Select your state of business" ),
    branchCity: z.string().min(1, "Select a city"),
    branchZipCode: z.string().regex(/^\d{6}$/, {
        message: "Must be 6 digits"
    }),
})

// REGISTER SECTION
export const signUpFormSchema = z.object({
    firstName: z.string().min(1, "This field cannot be empty"),
    lastName: z.string().min(1, "This field cannot be empty"),
    email: z.string().min(1, "This field cannot be empty").email("Invalid email"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[a-z]/, "Must contain lower case letter")
        .regex(/[A-Z]/, "Must contain Upper case letter")
        .regex(/\d/, "Must contain a number")
        .regex(/[^A-Za-z0-9]/, "Must contain a special character")
})

export const verifyAccountSchema = z.object({
    verification: z.string().regex(/^\d{6}$/, {
        message: "Invalid input",
    }),
})


// STATES SECTION
export const businessProfileSchema = z.object({
    businessName: z.string().min(1, "Enter your business name"),
    businessEmail: z.string().min(1, "Enter your business email address").email("Enter a valid email address"),
    countryCode: z.literal("+234"),
    businessPhoneNumber: z.string().trim().regex(/^\d{10}$/g, {
        message: "Enter a valid phone number",
    }),
    businessType: z.enum(["Sole proprietorship", "Limited Liability Company (LLC)", "Private Limited Company (Ltd)", "Freelancer"], {
        message: "Select a business type"
    }),
    businessIndustry: z.string().min(1, "Select a business Industry"),
    proofOfBusiness: z.string().url("Enter a valid url").min(1, "This field cannot be empty")
})

export const businessAddressSchema = z.object({
    country: z.literal("Nigeria"),
    address: z.string().min(1, "Input your address"),
    city: z.string().min(1, "Select a city"),
    state: z.string().min(1, "Select your state of business"),
    zipCode: z.string().regex(/^\d{6}$/, {
        message: "Must be 6 digits"
    }),
})

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
    "image/jpeg",
    "image/png",
    "application/pdf",
];

export const businessDocumentsSchema = z.object({
    cacDocument: z
        .any()
        .refine((val) => val instanceof File, {
            message: "Please upload a valid file for CAC document"
        })
        .refine((val) => val instanceof File && val.size <= MAX_FILE_SIZE, {
            message: "File size must be less than 5MB",
        })
        .refine((val) => val instanceof File && ACCEPTED_FILE_TYPES.includes(val.type), {
            message: "File must be a JPEG, PNG or PDF"
        }),
        directorId: z
            .any()
            .refine((val) => val instanceof File, {
                message: "Please upload a valid file for Director ID"
            })
            .refine((val) => val instanceof File && val.size <= MAX_FILE_SIZE, {
                message: "File size must be less than 5MB"
            })
            .refine((val) => val instanceof File && ACCEPTED_FILE_TYPES.includes(val.type), {
                message: 'File must be JPEG, PNG, or PDF'
            })
})


// SETTLEMENT AND STAFF
export const settlementSchema = z.object({
    bankName: z.string().min(1, "You must select a bank")
        .refine((val) => val, { message: "Invalid" }),
    accountNumber: z.string().trim().regex(/^\d{10}$/g, {
        message: "Enter a valid account number"
    })
})

export const addStaffSchema = z.object({
    staffFirstName: z.string().min(1, "Field cannot be empty"),
    staffLastName: z.string().min(1, "Field cannot be empty"),
    staffEmail: z.string().min(1, "Field cannot be empty").email("Enter a valid email address"),
    role: z.enum(["co-owner", "Admin/GM", "Branch manager", "Cashier"])
})

// ADD NEW SETTLEMENT ACCOUNT
export const newSettlementAccountSchema = z.object({
    branchName: z.string().min(1, "Select a branch")
        .refine((val) => val, { message:"Invalid"}),
    bankName: z.string().min(1, "Select a bank")
        .refine((val) => val, { message: "Invalid"}),
    accountNumber: z.string().trim().regex(/^\d{10}$/g, {
        message: "Enter a valid account number"
    })
})