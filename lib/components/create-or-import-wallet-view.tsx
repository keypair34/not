import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Box from '@mui/material/Box';

export default function CreateOrImportWalletView() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f5f6fa' }}>
      <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3 }}>
        <Box sx={{ p: 3, bgcolor: '#fff' }}>
          <CardMedia
            component="img"
            height="120"
            image="/images/usd-coin-usdc-logo.png"
            alt="Stablecoin Wallet"
            sx={{ objectFit: 'contain', bgcolor: '#fff' }}
          />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            Not Wallet
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Your non-custodial stablecoins wallet. Secure, private, and easy to use.
          </Typography>
        </CardContent>
        <CardActions sx={{ flexDirection: 'column', gap: 2, pb: 2 }}>
          <Link href="/import" passHref legacyBehavior>
            <Button variant="contained" color="primary" fullWidth>
              Import Seed Phrase
            </Button>
          </Link>
          <Link href="/create-password" passHref legacyBehavior>
            <Button variant="outlined" color="primary" fullWidth>
              Create New Wallet
            </Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}
