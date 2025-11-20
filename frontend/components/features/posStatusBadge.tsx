import Image from "next/image";

interface posStatusBadgeProps {
    status: unknown;
}

export const PosStatusBadge: React.FC<posStatusBadgeProps> = ({
    status
}) => {
    const statusStr = String(status).toLowerCase();

    const getStatusColor = ( status: string ) => {
        switch( status ) {
            case "active":
                return "bg-[#C4FFE2] ring-[#DCFFEE] text-[#5DA481]";
            case "offline":
                return "bg-[#F8E8B7] ring-[#FFF5D7] text-[#B68B07]";
            case "disabled":
                return "bg-[#FFC7C7] ring-[#FFE3E3] text-[#D76262]";
            default:
                return "bg-gray-100 ring-gray-200 text-gray-500";
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
        case "active":
            return "/icons/settledPaymentIcon.svg";
        case "offline":
            return "/icons/pendingPaymentIcon.svg";
        case "disabled":
            return "/icons/failedPaymentIcon.svg";
        default:
            return "/icons/infoIconBlack.svg";
        }
    }

    return (
        <div
            className={`w-fit h-6 flex items-center gap-1 p-1.5 text-[12px] ring-2 rounded-md leading-[100%] ${getStatusColor(
            statusStr
            )}`}
        >
            <Image
            src={getStatusIcon(statusStr)}
            alt={`${statusStr} icon`}
            width={14}
            height={14}
            />
            {statusStr.charAt(0).toUpperCase() + statusStr.slice(1)}
        </div>
    )

}