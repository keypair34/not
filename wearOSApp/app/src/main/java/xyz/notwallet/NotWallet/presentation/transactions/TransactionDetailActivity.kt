
package xyz.notwallet.NotWallet.presentation.transactions

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import xyz.notwallet.NotWallet.presentation.theme.NotWalletTheme

data class TransactionDetail(
    val amount: String,
    val description: String,
    val date: String
)

class TransactionDetailActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val transactionDetail = TransactionDetail(
            amount = intent.getStringExtra("amount") ?: "N/A",
            description = intent.getStringExtra("description") ?: "N/A",
            date = intent.getStringExtra("date") ?: "N/A"
        )

        setContent {
            TransactionDetailView(transactionDetail)
        }
    }
}

@Composable
fun TransactionDetailView(transactionDetail: TransactionDetail) {
    NotWalletTheme {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            contentAlignment = Alignment.Center
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Text(
                    text = "Transaction Details",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary
                )
                Spacer(modifier = Modifier.height(16.dp))
                Text(
                    text = "Amount: ${transactionDetail.amount}",
                    fontSize = 18.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = if (transactionDetail.amount.startsWith("+")) Color.Green else Color.Red
                )
                Text(
                    text = "Description: ${transactionDetail.description}",
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Normal,
                    color = MaterialTheme.colorScheme.onBackground
                )
                Text(
                    text = "Date: ${transactionDetail.date}",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Light,
                    color = Color.Gray
                )
            }
        }
    }
}
