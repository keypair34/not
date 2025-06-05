"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const feed = [
	{
		id: 1,
		user: {
			name: "Alex Morgan",
			avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=alexmorgan",
			wallet: "7k3h...2x9v",
		},
		time: "2 hours ago",
		action: "Received 1,000 USDC",
		description: "Payment from @johnny for freelance work.",
		image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=480&q=80", // freelance work
		amount: "+1,000 USDC",
	},
	{
		id: 2,
		user: {
			name: "Alex Morgan",
			avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=alexmorgan",
			wallet: "7k3h...2x9v",
		},
		time: "1 day ago",
		action: "Sent 250 USDC",
		description: "Sent to @coffeehouse for coffee subscription.",
		image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=480&q=80", // coffee
		amount: "-250 USDC",
	},
	{
		id: 3,
		user: {
			name: "Alex Morgan",
			avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=alexmorgan",
			wallet: "7k3h...2x9v",
		},
		time: "3 days ago",
		action: "Received 500 USDC",
		description: "Gift from @mom.",
		image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=480&q=80", // gift
		amount: "+500 USDC",
	},
];

export default function HomeFeedPage() {
	return (
		<Box
			sx={{
				minHeight: "100vh",
				bgcolor: "#f5f6fa",
				pb: 10,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Box sx={{ width: "100%", maxWidth: 480, pt: 3, pb: 2 }}>
				<Typography
					variant="h4"
					fontWeight="bold"
					align="center"
					sx={{ mb: 2 }}
				>
					Activity Feed
				</Typography>
			</Box>
			<Box sx={{ width: "100%", maxWidth: 480 }}>
				{feed.map((item) => (
					<Card
						key={item.id}
						sx={{
							mb: 3,
							borderRadius: 3,
							boxShadow: 2,
							background: "#fff",
							overflow: "hidden",
						}}
					>
						<CardHeader
							avatar={
								<Avatar src={item.user.avatar} alt={item.user.name}>
									{item.user.name[0]}
								</Avatar>
							}
							action={
								<IconButton>
									<MoreVertIcon />
								</IconButton>
							}
							title={
								<Box>
									<Typography
										fontWeight="bold"
										variant="subtitle1"
									>
										{item.user.name}
									</Typography>
									<Typography
										variant="caption"
										color="text.secondary"
										sx={{
											fontFamily: "monospace",
											fontSize: "0.95rem",
											wordBreak: "break-all",
											display: "block",
										}}
									>
										{item.user.wallet}
									</Typography>
								</Box>
							}
							subheader={
								<Typography variant="caption" color="text.secondary">
									{item.time}
								</Typography>
							}
						/>
						{item.image && (
							<Box
								component="img"
								src={item.image}
								alt={item.action}
								sx={{
									width: "100%",
									height: 220,
									objectFit: "cover",
									bgcolor: "#f3f4f6",
								}}
							/>
						)}
						<CardContent sx={{ pb: 1 }}>
							<Typography
								variant="subtitle1"
								fontWeight="bold"
								sx={{ mb: 0.5 }}
							>
								{item.action}
							</Typography>
							<Typography
								variant="body2"
								color="text.secondary"
								sx={{ mb: 1 }}
							>
								{item.description}
							</Typography>
							<Typography
								variant="body2"
								fontWeight="bold"
								sx={{
									color: item.amount.startsWith("+")
										? "#43a047"
										: "#e53935",
									fontFamily: "monospace",
									fontSize: "1.1rem",
									mb: 1,
								}}
							>
								{item.amount}
							</Typography>
							<Box sx={{ display: "flex", gap: 2 }}>
								<IconButton>
									<FavoriteBorderIcon />
								</IconButton>
								<IconButton>
									<ChatBubbleOutlineIcon />
								</IconButton>
								<IconButton>
									<ShareIcon />
								</IconButton>
							</Box>
						</CardContent>
					</Card>
				))}
			</Box>
		</Box>
	);
}
