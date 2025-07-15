import SwiftUI

struct Transaction: Identifiable {
    let id = UUID()
    let date: String
    let amount: String
    let description: String
}

struct TransactionListView: View {
    let transactions: [Transaction] = [
        Transaction(date: "2025-07-13", amount: "+2.000 BACH", description: "Salary"),
        Transaction(date: "2025-07-12", amount: "-0.500 BACH", description: "Coffee Shop"),
        Transaction(date: "2025-07-11", amount: "+1.200 BACH", description: "Gift"),
        Transaction(date: "2025-07-10", amount: "-0.300 BACH", description: "Groceries"),
        Transaction(date: "2025-07-09", amount: "+0.800 BACH", description: "Refund")
    ]
    
    var body: some View {
        List(transactions) { tx in
            NavigationLink(destination: TransactionDetailView(transaction: tx)) {
                VStack(alignment: .leading, spacing: 4) {
                    Text(tx.amount)
                        .font(.system(size: 18, weight: .semibold, design: .monospaced))
                        .foregroundColor(tx.amount.hasPrefix("+") ? .green : .red)
                    Text(tx.description)
                        .font(.system(size: 16, weight: .regular, design: .rounded))
                        .foregroundColor(.primary)
                    Text(tx.date)
                        .font(.system(size: 12, weight: .light, design: .rounded))
                        .foregroundColor(.secondary)
                }
                .padding(.vertical, 4)
            }
        }
        .navigationTitle("Transactions")
    }
}

#Preview {
    TransactionListView()
}
