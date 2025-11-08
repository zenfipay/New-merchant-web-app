import { CustomButton } from "./CustomButton";
import Image from "next/image";

export default function ExportReportBtn() {
    return (
        <CustomButton
            variant="secondary"
            size="sm"
            className="flex justify-evenly gap-1"
        >
            <Image src="/icons/exportReportIcon.svg" alt="export icon" width={16} height={16} />
            Export CSV 
            <Image src="/icons/rarrBlack.svg" alt="right arrow black" width={12} height={12} />
        </CustomButton>
    )
}