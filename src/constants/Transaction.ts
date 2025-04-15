import { Transaction } from "../components/Transaction/TransactionDetail";

export const transactions: Transaction[] = [
    {
      id: "1",
      date: "28 Oct 2024",
      description: "Deposit to FlickStar Wallet",
      time: "11:45 AM",
      status: "Success",
      amount: 100,
      type: "deposit",
      transactionId: "TZ34567890-989",
      debitedFrom: "Bank Of London - xx2344",
      creditedTo: "FlickStar Wallet"
    },
    {
        id: "2",
        date: "28 Oct 2024",
        description: "Withdrawal to Bank Account",
        time: "11:50 AM",
        status: "Success",
        amount: 50,
        type: "withdrawal",
        transactionId: "TZ12345678-542",
        debitedFrom: "FlickStar Wallet",
        creditedTo: "Bank Of London - xx2344"
      },
      {
        id: "3",
        date: "28 Oct 2024",
        description: "Deposit to FlickStar Wallet",
        time: "12:05 PM",
        status: "Failed",
        amount: 200,
        type: "deposit",
        transactionId: "TZ98765432-321",
        debitedFrom: "Bank Of London - xx9876",
        creditedTo: "FlickStar Wallet"
      },
      {
        id: "4",
        date: "28 Oct 2024",
        description: "Withdrawal to Bank Account",
        time: "12:30 PM",
        status: "Success",
        amount: 120,
        type: "withdrawal",
        transactionId: "TZ56473829-001",
        debitedFrom: "FlickStar Wallet",
        creditedTo: "Bank Of London - xx1111"
      },
      {
        id: "5",
        date: "28 Oct 2024",
        description: "Deposit to FlickStar Wallet",
        time: "01:10 PM",
        status: "Success",
        amount: 300,
        type: "deposit",
        transactionId: "TZ13579246-888",
        debitedFrom: "Bank Of London - xx5555",
        creditedTo: "FlickStar Wallet"
      },
      {
        id: "6",
        date: "28 Oct 2024",
        description: "Withdrawal to Bank Account",
        time: "02:15 PM",
        status: "Failed",
        amount: 80,
        type: "withdrawal",
        transactionId: "TZ24681357-444",
        debitedFrom: "FlickStar Wallet",
        creditedTo: "Bank Of London - xx6789"
      }
  ];