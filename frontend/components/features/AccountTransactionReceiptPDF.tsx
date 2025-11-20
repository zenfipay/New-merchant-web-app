// components/features/AccountReceiptPDF.tsx
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { accountTransactions } from '@/types';

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: 'Helvetica' },
  header: { textAlign: 'center', marginBottom: 30 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  section: {
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  label: { color: '#636363', fontSize: 12 },
  value: { fontWeight: 'bold', fontSize: 12 },
});

export const AccountReceiptPDF = ({ data }: { data: accountTransactions }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Transaction Receipt</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.row}><Text style={styles.label}>Transaction ID:</Text><Text style={styles.value}>{data.transactionId}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Status:</Text><Text style={styles.value}>{data.status}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Type:</Text><Text style={styles.value}>{data.type}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Amount:</Text><Text style={styles.value}>{data.amount}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Date:</Text><Text style={styles.value}>{data.date}</Text></View>
        <View style={styles.row}><Text style={styles.label}>From:</Text><Text style={styles.value}>{data.from}</Text></View>
        <View style={styles.row}><Text style={styles.label}>To:</Text><Text style={styles.value}>{data.to}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Branch:</Text><Text style={styles.value}>{data.branch}</Text></View>
      </View>
    </Page>
  </Document>
);
