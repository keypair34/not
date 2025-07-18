package xyz.notwallet.NotWallet.presentation

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.HorizontalDivider
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.wear.compose.material.Button
import androidx.wear.compose.material.MaterialTheme
import androidx.wear.compose.material.Text
import androidx.wear.tooling.preview.devices.WearDevices
import xyz.notwallet.NotWallet.presentation.components.PriceGraphView
import xyz.notwallet.NotWallet.presentation.theme.NotWalletTheme
import xyz.notwallet.NotWallet.presentation.transactions.TransactionListActivity

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        installSplashScreen()

        super.onCreate(savedInstanceState)

        setTheme(android.R.style.Theme_DeviceDefault)

        setContent { WearApp() }
    }
}

@Composable
fun WearApp() {

    val context = LocalContext.current

    NotWalletTheme {
        Box(
                modifier = Modifier.fillMaxSize().background(Color.Black, RoundedCornerShape(30)),
                contentAlignment = Alignment.TopCenter
        ) {
            Column(
                    modifier =
                            Modifier.fillMaxSize()
                                    .padding(16.dp)
                                    .verticalScroll(rememberScrollState())
                                    .background(Color.Black, RoundedCornerShape(30)),
                    horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Spacer(modifier = Modifier.height(16.dp))
                Text(
                        text = "€BACH",
                        fontSize = 32.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF9932CC),
                        modifier =
                                Modifier.clickable {
                                    context.startActivity(
                                            Intent(context, BachInfoActivity::class.java)
                                    )
                                }
                )
                Text(text = "Fixed supply", fontSize = 12.sp, color = Color.Gray)
                Text(text = "12 million BACH", fontSize = 18.sp, textAlign = TextAlign.Center)
                Spacer(modifier = Modifier.height(16.dp))
                Box(modifier = Modifier.fillMaxWidth().height(60.dp).background(Color.Black)) {
                    PriceGraphView(modifier = Modifier.fillMaxSize())
                }
                Spacer(modifier = Modifier.height(16.dp))
                HorizontalDivider()
                Text(
                        text = "My saldo",
                        fontSize = 18.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = Color.Gray,
                        modifier = Modifier.padding(vertical = 8.dp)
                )
                Button(
                        onClick = {
                            context.startActivity(
                                    Intent(context, TransactionListActivity::class.java)
                            )
                        },
                        modifier = Modifier.fillMaxWidth()
                ) {
                    Text(
                            text = "10.624434723489 BACH",
                            fontSize = 20.sp,
                            fontFamily = FontFamily.Monospace,
                            color = Color.Black,
                            modifier =
                                    Modifier.padding(8.dp)
                                            .clip(RectangleShape)
                                            .horizontalScroll(rememberScrollState()),
                            maxLines = 1
                    )
                }
                Spacer(modifier = Modifier.height(16.dp))
            }
        }
    }
}

@Preview(device = WearDevices.SMALL_ROUND, showSystemUi = true)
@Composable
fun DefaultPreview() {
    WearApp()
}
