// import { Role } from "@/types/roles";

// function getCurrentUser(): { id?: string; role: Role; [key: string]: any } | null {
//     // Avoid accessing localStorage during SSR
//     if (typeof window === "undefined") return null;

//     // Try a few common keys where an app might store the user
//     const raw =
//         localStorage.getItem("currentUser") ??
//         localStorage.getItem("user") ??
//         localStorage.getItem("authUser");

//     if (!raw) return null;

//     try {
//         const parsed = JSON.parse(raw);

//         // Basic validation: must be an object with a role that exists in rolePermissions
//         if (
//             !parsed ||
//             typeof parsed !== "object" ||
//             !("role" in parsed) ||
//             !Object.prototype.hasOwnProperty.call(rolePermissions, parsed.role)
//         ) {
//             return null;
//         }

//         return parsed as { id?: string; role: Role; [key: string]: any };
//     } catch {
//         return null;
//     }
// }
// function getCurrentUser() {
//     throw new Error("Function not implemented.");
// }