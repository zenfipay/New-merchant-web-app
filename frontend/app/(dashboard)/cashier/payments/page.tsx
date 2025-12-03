import PaymentTabs from "@/components/features/PaymentTableWrapper";
import RateChecker from "@/components/features/RateChecker";

export default function CashierPayments() {
    return (
        <section className="space-y-6">
            {/* RATE CHECKER */}
            <div className="space-y-2">
                <h5>Rate checker</h5>
                <RateChecker />
            </div>

            <div className="mt-10">
                <PaymentTabs />
            </div>
        </section>
    )
}