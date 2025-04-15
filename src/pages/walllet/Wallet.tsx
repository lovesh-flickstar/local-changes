import { useState } from "react";
import { SolarArrowDownLinear } from "../../components/icons/ArrowDown"
import { SolarArrowUpLinear } from "../../components/icons/ArrowUp"
import RightSidebar from "../../components/Sidebar/RightSidebar"
import { Transaction, TransactionDetail } from "../../components/Transaction/TransactionDetail";
import { TransactionLog } from "../../components/Transaction/TransactionLog";

export const Wallet = () => {
    const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  return (
    <>
    <div className="flex flex-col gap-5 h-full w-full p-8">
        <h1 className="text-bold fontPrimary text-white text-3xl">
            Wallet
        </h1>
        <div className="flex w-full justify-between flex-wrap gap-4">
            <div className="flex w-full flex-1 flex-col lg:p-3 px-1 py-2 lg:gap-3 font-semibold fontPrimary bg-gradient-to-r from-[#BAE8FB] to-[#B2B1FD]  rounded-lg">
                <p className="text-xs lg:text-md  rounded-lg  text-center">Current balance</p>
                <p className="text-2xl lg:text-xl  rounded-lg text-center">$61,200.89</p>
            </div>
            <div className="flex flex-1 w-full flex-col lg:p-3 px-1 py-2 lg:gap-3 font-semibold text-white fontPrimary bg-gradient-to-br from-[#4A24E3] to-white  rounded-lg">
                <p className="text-xs lg:text-md  rounded-lg  text-center">Total Earnings</p>
                <p className="text-2xl lg:text-xl  rounded-lg text-center">$61,200.89</p>
            </div>
        </div>

        <div className="flex gap-4 fontPrimary tracking-wider">
            <button className="lg:px-8 px-4 rounded-lg py-2 bg-[#2C2C2E] text-center text-red-500 flex gap-1"><SolarArrowDownLinear width={20} height={20}/><p>Withdraw</p></button>
            <button className="lg:px-8 px-4 rounded-lg py-2 bg-[#2C2C2E] text-center text-green-500 flex gap-1"><SolarArrowUpLinear width={20} height={20}/>Deposite</button>
        </div>
        
        <div className="w-full h-full">
         <TransactionLog onSelect={setSelectedTx} />
        </div>
    </div>
    <RightSidebar>
        {selectedTx && (
          <TransactionDetail transaction={selectedTx} />
        )}
    </RightSidebar>
    </>
  )
}
