import Image from "next/image";

interface BranchMetricsBadgeProps {
    status: unknown;
}

export const BranchMetricsBadge: React.FC<BranchMetricsBadgeProps> = ({
    status
}) => {
    const statusStr = String(status).toLowerCase();

    const getStatusColor = ( status: string ) => {
        switch( status ) {
            case "active":
                return "bg-[#C4FFE2] ring-[#DCFFEE] text-[#5DA481]";
            case "inactive":
                return "bg-[#F8E8B7] ring-[#FFF5D7] text-[#B68B07]";
            default:
                return "bg-gray-100 ring-gray-200 text-gray-500";
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
        case "active":
            return "/icons/settledPaymentIcon.svg";
        case "inactive":
            return "/icons/pendingPaymentIcon.svg";
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