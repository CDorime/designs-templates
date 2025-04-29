import { useEffect } from "react";

interface BankInfoInterface {
  client_id: string;
  client_name: string;
  client_balance: number;
  client_pin: number;
  client_transferblock: boolean;
  client_transactions: BankTransactionsInterface[];
}

interface BankTransactionsInterface {
  transaction_id: string;
  transaction_sender: string;
  transaction_amount: number;
  transaction_date: string;
  transaction_from: string;
  transaction_to: string;
}

let initExecuted = false;

export function BankOperations() {
  useEffect(() => {
    if (initExecuted) return;
    initExecuted = true;

    const BankOperations: { [key: string]: BankInfoInterface } = {};
    const BankFunctions = {
      BankAccountManagment: {
        createAccount(name: string, pin: number) {
          const bank_client_id = "client." + Date.now();
          if (pin.toString().length !== 4) return false;
          if (BankOperations[name] && BankOperations[name].client_name)
            return false;
          return (BankOperations[name] = {
            client_id: bank_client_id,
            client_name: name,
            client_balance: 0,
            client_pin: pin,
            client_transferblock: false,
            client_transactions: [],
          });
        },
        deleteAccount(name: string) {
          if (!BankOperations[name]) return false;
          return delete BankOperations[name];
        },
        findAccount(name: string) {
          if (!BankOperations[name]) return false;
          return BankOperations[name] || null;
        },
        getAllAcounts() {
          return Object.values(BankOperations);
        },
      },
      BankMoneyManagment: {
        addDepositMoney(name: string, amount: number) {
          if (!BankOperations[name]) return false;
          return (BankOperations[name].client_balance += amount);
        },
        removeDepositMoney(name: string, amount: number) {
          if (!BankOperations[name]) return false;
          return (BankOperations[name].client_balance -= amount);
        },
        sendTransferMoney(fromName: string, toName: string, amount: number) {
          const transferID = "transfer." + Date.now();
          const transferDate = "transferDate." + Date.now();
          if (!BankOperations[fromName] || !BankOperations[toName])
            return false;
          if (BankOperations[fromName].client_balance < amount) return false;
          if (BankOperations[fromName && toName].client_transferblock)
            return false;
          BankOperations[fromName].client_transactions.push({
            transaction_id: transferID,
            transaction_sender: BankOperations[fromName].client_name,
            transaction_amount: amount,
            transaction_date: transferDate,
            transaction_from: BankOperations[fromName].client_id,
            transaction_to: BankOperations[toName].client_id,
          });
          BankOperations[toName].client_transactions.push({
            transaction_id: transferID,
            transaction_sender: BankOperations[fromName].client_name,
            transaction_amount: amount,
            transaction_date: transferDate,
            transaction_from: BankOperations[fromName].client_id,
            transaction_to: BankOperations[toName].client_id,
          });
          BankFunctions.BankMoneyManagment.addDepositMoney(toName, amount);
          BankFunctions.BankMoneyManagment.removeDepositMoney(fromName, amount);
          return true;
        },
        getBalance(name: string) {
          if (!BankOperations[name]) return false;
          return BankOperations[name].client_balance;
        },
      },
      BankSecurityManagment: {
        setNewPin(name: string, newPin: number) {
          if (!BankOperations[name]) return false;
          if (newPin.toString.length !== 4) return false;
          return (BankOperations[name].client_pin = newPin);
        },
        verifyPin(name: string, verifyPin: number) {
          if (!BankOperations[name]) return false;
          if (BankOperations[name].client_pin !== verifyPin) return false;
          return true;
        },
        blockTransferAccount(name: string) {
          if (!BankOperations[name]) return false;
          return (BankOperations[name].client_transferblock =
            !BankOperations[name].client_transferblock);
        },
      },
    };
    console.log(
      BankFunctions.BankAccountManagment.createAccount("Иван Иванов", 1234)
    );
    console.log(
      BankFunctions.BankMoneyManagment.addDepositMoney("Иван Иванов", 1000)
    );
    console.log(
      BankFunctions.BankAccountManagment.createAccount("Петр Петров", 4321)
    );
    console.log(
      BankFunctions.BankMoneyManagment.addDepositMoney("Петр Петров", 500)
    );
    console.log(
      BankFunctions.BankMoneyManagment.sendTransferMoney(
        "Иван Иванов",
        "Петр Петров",
        300
      )
    );
    console.log(BankFunctions.BankAccountManagment.findAccount("Иван Иванов"));
    console.log(BankFunctions.BankAccountManagment.findAccount("Петр Петров"));
  }, []);
  return true;
}
