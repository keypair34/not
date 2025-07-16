package xyz.notwallet.NotWallet.presentation.transactions

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.wear.tooling.preview.devices.WearDevices
import xyz.notwallet.NotWallet.presentation.theme.NotWalletTheme

data class Transaction(val date: String, val amount: String, val description: String)

@Composable
fun TransactionListView(transactions: List<Transaction>) {
    var selectedTransaction by remember { mutableStateOf<Transaction?>(null) }

    NotWalletTheme {
        Scaffold(modifier = Modifier.background(Color.Black)) {
            LazyColumn(
                    modifier =
                            Modifier.fillMaxSize()
                                    .padding(it)
                                    .background(Color.Black),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(transactions) { tx ->
                    Button(
                            onClick = { selectedTransaction = tx },
                            modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(
                                modifier = Modifier.padding(8.dp),
                                horizontalAlignment = Alignment.Start
                        ) {
                            Text(
                                    text = tx.amount,
                                    fontSize = 18.sp,
                                    fontWeight = FontWeight.SemiBold,
                                    color =
                                            if (tx.amount.startsWith("+")) Color.Green
                                            else Color.Red
                            )
                            Text(
                                    text = tx.description,
                                    fontSize = 16.sp,
                                    fontWeight = FontWeight.Normal,
                                    color = MaterialTheme.colorScheme.onBackground
                            )
                            Text(
                                    text = tx.date,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.Light,
                                    color = Color.Gray
                            )
                        }
                    }
                }
            }

            if (selectedTransaction != null) {
                val context = LocalContext.current
                LaunchedEffect(selectedTransaction) {
                    context.startActivity(
                            Intent(context, TransactionDetailActivity::class.java).apply {
                                putExtra("amount", selectedTransaction!!.amount)
                                putExtra("description", selectedTransaction!!.description)
                                putExtra("date", selectedTransaction!!.date)
                            }
                    )
                    selectedTransaction = null
                }
            }
        }
    }
}

class TransactionListActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            val transactions =
                    listOf(
                            Transaction("2025-07-13", "+2.000 BACH", "Salary"),
                            Transaction("2025-07-12", "-0.500 BACH", "Coffee Shop"),
                            Transaction("2025-07-11", "+1.200 BACH", "Gift"),
                            Transaction("2025-07-10", "-0.300 BACH", "Groceries"),
                            Transaction("2025-07-09", "+0.800 BACH", "Refund")
                    )
            TransactionListView(transactions)
        }
    }
}

@Preview(device = WearDevices.SMALL_ROUND, showSystemUi = true)
@Composable
fun DefaultPreview() {
    TransactionListView(
            transactions =
                    listOf(
                            Transaction("2025-07-13", "+2.000 BACH", "Salary"),
                            Transaction("2025-07-12", "-0.500 BACH", "Coffee Shop"),
                            Transaction("2025-07-11", "+1.200 BACH", "Gift"),
                            Transaction("2025-07-10", "-0.300 BACH", "Groceries"),
                            Transaction("2025-07-09", "+0.800 BACH", "Refund")
                    )
    )
}
