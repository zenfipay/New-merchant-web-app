// components/features/PaymentReceiptPDF.tsx
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { payment } from '@/types';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica',
    },
    header: {
        textAlign: 'center',
        marginBottom: 30,
        paddingBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        borderBottomStyle: 'solid',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    statusContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    status: {
        fontSize: 12,
        fontWeight: 'bold',
        padding: 8,
        borderRadius: 6,
        textAlign: 'center',
    },
    statusSettled: {
        backgroundColor: '#C4FFE2',
        color: '#5DA481',
    },
    statusPending: {
        backgroundColor: '#F8E8B7',
        color: '#B68B07',
    },
    statusFailed: {
        backgroundColor: '#FFC7C7',
        color: '#D76262',
    },
    amount: {
        fontSize: 32,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    section: {
        marginVertical: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderStyle: 'solid',
        borderRadius: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    label: {
        color: '#636363',
        fontSize: 12,
    },
    value: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    footer: {
        marginTop: 30,
        paddingTop: 20,
        borderTopWidth: 2,
        borderTopColor: '#000',
        borderTopStyle: 'solid',
        textAlign: 'center',
        fontSize: 10,
        color: '#636363',
    },
});

const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
        case 'settled':
            return [styles.status, styles.statusSettled];
        case 'pending':
            return [styles.status, styles.statusPending];
        case 'failed':
            return [styles.status, styles.statusFailed];
        default:
            return styles.status;
    }
};

export const ReceiptPDF = ({ payment }: { payment: payment }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.title}>Payment Receipt</Text>
                <View style={styles.statusContainer}>
                    <Text style={getStatusStyle(payment.status)}>
                        {payment.status.toUpperCase()}
                    </Text>
                </View>
            </View>

            <Text style={styles.amount}>
                {payment.amount} {payment.stableCoin}
            </Text>

            <View style={styles.section}>
                <View style={styles.row}>
                    <Text style={styles.label}>Payment ID:</Text>
                    <Text style={styles.value}>{payment.paymentID}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Date:</Text>
                    <Text style={styles.value}>{payment.date}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Branch:</Text>
                    <Text style={styles.value}>{payment.branch}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.row}>
                    <Text style={styles.label}>Token:</Text>
                    <Text style={styles.value}>{payment.token}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Conversion:</Text>
                    <Text style={styles.value}>₦{payment.conversion}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Exchange Rate:</Text>
                    <Text style={styles.value}>₦{payment.exchangeRate} / {payment.stableCoin}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Customer ID:</Text>
                    <Text style={styles.value}>{payment.customerId}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>POS:</Text>
                    <Text style={styles.value}>{payment.pointOfSale}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Chain:</Text>
                    <Text style={styles.value}>{payment.chain}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Text>Thank you for your business</Text>
                <Text>Downloaded on {new Date().toLocaleString()}</Text>
            </View>
        </Page>
    </Document>
);