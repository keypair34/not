export interface GroupActivity {
  coin: string;
  id: string;
  totalSupply: number;
  activities: Activity[];
}

export interface Activity {
  amount: number;
  date: string;
  type: "received" | "sent" | "airdrop";
}

export const activities: GroupActivity[] = [
  {
    coin: "BACH",
    id: "CTQBjyrX8pYyqbNa8vAhQfnRXfu9cUxnvrxj5PvbzTmf",
    totalSupply: 11999999.999347324911,
    activities: [
      {
        amount: 10.9345,
        date: "Jun 9, 2025",
        type: "airdrop",
      },
      {
        amount: 100.0,
        date: "Jun 10, 2025",
        type: "received",
      },
      {
        amount: 50.0,
        date: "Jun 11, 2025",
        type: "sent",
      },
      {
        amount: 25.0,
        date: "Jun 12, 2025",
        type: "received",
      },
      {
        amount: 10.0,
        date: "Jun 13, 2025",
        type: "sent",
      },
    ],
  },
  {
    coin: "USDC",
    id: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    totalSupply: 100000000,
    activities: [
      {
        amount: 5.0,
        date: "Jun 14, 2025",
        type: "received",
      },
      {
        amount: 2.5,
        date: "Jun 15, 2025",
        type: "sent",
      },
      {
        amount: 1.25,
        date: "Jun 16, 2025",
        type: "received",
      },
      {
        amount: 0.625,
        date: "Jun 17, 2025",
        type: "sent",
      },
      {
        amount: 0.3125,
        date: "Jun 18, 2025",
        type: "received",
      },
      {
        amount: 0.15625,
        date: "Jun 19, 2025",
        type: "sent",
      },
    ],
  },
];

export const activitiesTestnet: GroupActivity[] = [
  {
    coin: "BACH",
    id: "A6a2s9LTZcYZQgxrDatLHYfvHhJEfb5ZWuFENhHtxJtR",
    totalSupply: 11999999.999347324911,
    activities: [
      {
        amount: 100.0,
        date: "Jun 10, 2025",
        type: "received",
      },
      {
        amount: 50.0,
        date: "Jun 11, 2025",
        type: "sent",
      },
      {
        amount: 25.0,
        date: "Jun 12, 2025",
        type: "received",
      },
      {
        amount: 10.0,
        date: "Jun 13, 2025",
        type: "sent",
      },
    ],
  },
  {
    coin: "USDC",
    id: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    totalSupply: 100000000,
    activities: [
      {
        amount: 5.0,
        date: "Jun 14, 2025",
        type: "received",
      },
      {
        amount: 2.5,
        date: "Jun 15, 2025",
        type: "sent",
      },
      {
        amount: 1.25,
        date: "Jun 16, 2025",
        type: "received",
      },
      {
        amount: 0.625,
        date: "Jun 17, 2025",
        type: "sent",
      },
      {
        amount: 0.3125,
        date: "Jun 18, 2025",
        type: "received",
      },
      {
        amount: 0.15625,
        date: "Jun 19, 2025",
        type: "sent",
      },
    ],
  },
];
