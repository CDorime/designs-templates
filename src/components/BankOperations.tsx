import { useEffect } from "react";

interface BankTransactionsInterface {
  transactionID: string;
  transactionSender: string;
  transactionAmount: number;
  transactionDate: string;
  transactionFrom: string;
  transactionTo: string;
}

interface BankAliasInterface {
  aliasID: number;
  aliasclientName: string;
  aliasPin: number;
  aliasBalance: number;
  aliasIsBlocked: boolean;
  aliasTransactions: BankTransactionsInterface[];
}

interface BankInfoInterface {
  [x: string]: any;
  clientID: string;
  clientclientName: string;
  clientPassword: number;
  clientAlias: BankAliasInterface[];
}

let initExecuted = false;

export function BankOperations() {
  useEffect(() => {
    if (initExecuted) return;
    initExecuted = true;

    const BankOperations: { [key: string]: BankInfoInterface } = {};
    const BankFunctions = {
      BankAccountManagment: {
        createAccount(clientName: string, password: number) {
          const bankClientID = "client." + Date.now();
          if (password.toString().length !== 4) return false;
          if (BankOperations[clientName]) return false;

          return (BankOperations[clientName] = {
            clientID: bankClientID,
            clientclientName: clientName,
            clientPassword: password,
            clientAlias: [],
          });
        },

        deleteAccount(clientName: string) {
          if (!BankOperations[clientName]) return false;
          return delete BankOperations[clientName];
        },

        findAccount(clientName: string) {
          return BankOperations[clientName] || null;
        },

        getAllAccounts() {
          return Object.values(BankOperations);
        },
      },

      BankMoneyManagment: {
        addDepositMoney(clientName: string, cardID: number, amount: number) {
          if (!BankOperations[clientName]) return false;
          if (!BankOperations[clientName].clientAlias[cardID]) return false;

          return (BankOperations[clientName].clientAlias[cardID].aliasBalance +=
            amount);
        },

        removeDepositMoney(clientName: string, cardID: number, amount: number) {
          if (!BankOperations[clientName]) return false;
          if (!BankOperations[clientName].clientAlias[cardID]) return false;

          return (BankOperations[clientName].clientAlias[cardID].aliasBalance -=
            amount);
        },

        sendTransferMoney(
          fromCard: number,
          toCard: number,
          fromclientName: string,
          toclientName: string,
          amount: number
        ) {
          const transferID = "transfer." + Date.now();
          const transferDate = new Date().toString();

          if (!BankOperations[fromclientName] || !BankOperations[toclientName])
            return false;
          if (
            BankOperations[fromclientName].clientAlias[fromCard].aliasBalance <
            amount
          )
            return false;
          if (
            BankOperations[fromclientName].clientAlias[fromCard]
              .aliasIsBlocked ||
            BankOperations[toclientName].clientAlias[toCard].aliasIsBlocked
          )
            return false;
          if (
            !BankOperations[fromclientName].clientAlias[fromCard] ||
            !BankOperations[toclientName].clientAlias[toCard]
          )
            return false;

          const transaction: BankTransactionsInterface = {
            transactionID: transferID,
            transactionSender: BankOperations[fromclientName].clientclientName,
            transactionAmount: amount,
            transactionDate: transferDate,
            transactionFrom: BankOperations[fromclientName].clientID,
            transactionTo: BankOperations[toclientName].clientID,
          };

          BankOperations[fromclientName].clientAlias[
            fromCard
          ].aliasTransactions.push(transaction);

          BankOperations[toclientName].clientAlias[
            toCard
          ].aliasTransactions.push(transaction);

          BankFunctions.BankMoneyManagment.addDepositMoney(
            toclientName,
            0,
            amount
          );

          BankFunctions.BankMoneyManagment.removeDepositMoney(
            fromclientName,
            0,
            amount
          );

          return true;
        },
      },

      BankSecurityManagment: {
        setNewPin(clientclientName: string, cardID: number, newPin: number) {
          if (!BankOperations[clientclientName]) return false;
          if (newPin.toString().length !== 4) return false;
          if (!BankOperations[clientclientName].clientAlias[cardID])
            return false;

          return (BankOperations[clientclientName].clientAlias[
            cardID
          ].aliasPin = newPin);
        },

        verifyPin(clientclientName: string, verifyPin: number) {
          if (!BankOperations[clientclientName]) return false;
          return BankOperations[clientclientName].clientAlias.some(
            (card: { aliasPin: number }) => card.aliasPin === verifyPin
          );
        },
      },
      BankAliasManagment: {
        createCard(
          clientclientName: string,
          cardID: number,
          cardclientName: string,
          pin: number
        ) {
          if (!BankOperations[clientclientName]) return false;
          if (BankOperations[clientclientName].clientAlias[cardID])
            return false;
          if (pin.toString().length !== 4) return false;
          if (
            Object.keys(BankOperations[clientclientName].clientAlias).length >=
            5
          )
            return false;

          return (BankOperations[clientclientName].clientAlias[cardID] = {
            aliasID: cardID,
            aliasclientName: cardclientName,
            aliasPin: pin,
            aliasBalance: 0,
            aliasIsBlocked: false,
            aliasTransactions: [],
          });
        },
        deleteCard(clientclientName: string, cardID: number) {
          if (!BankOperations[clientclientName]) return false;
          if (!BankOperations[clientclientName].clientAlias[cardID])
            return false;
          if (!BankOperations[clientclientName].clientAlias[cardID])
            return false;
          return delete BankOperations[clientclientName].clientAlias[cardID];
        },
        getCardByID(clientclientName: string, cardID: number) {
          if (!BankOperations[clientclientName]) return false;
          if (!BankOperations[clientclientName].clientAlias[cardID])
            return false;
          return BankOperations[clientclientName].clientAlias[cardID];
        },
        getCardByclientName(clientclientName: string, cardclientName: string) {
          if (!BankOperations[clientclientName]) return false;
          if (!BankOperations[clientclientName].clientAlias) return false;
          return BankOperations[clientclientName].clientAlias.find(
            (alias) => alias.aliasclientName === cardclientName
          );
        },
        reclientNameCard(
          clientclientName: string,
          cardID: number,
          newCardclientName: string
        ) {
          if (!BankOperations[clientclientName]) return false;
          if (!BankOperations[clientclientName].clientAlias[cardID])
            return false;
          return (BankOperations[clientclientName].clientAlias[
            cardID
          ].aliasclientName = newCardclientName);
        },
        getAllCards(clientclientName: string) {
          if (!BankOperations[clientclientName]) return false;
          if (!BankOperations[clientclientName].clientAlias) return false;
          return Object.values(BankOperations[clientclientName].clientAlias);
        },
        getCardHistory(clientName: string, cardID: number) {
          if (!BankOperations[clientName]) return false;
          if (!BankOperations[clientName].clientAlias[cardID]) return false;
          return Object.values(
            BankOperations[clientName].clientAlias[cardID].aliasTransactions
          );
        },
        deleteAllCard(clientName: string) {
          if (!BankOperations[clientName]) return false;
          if (!BankOperations[clientName].clientAlias) return false;
          return (BankOperations[clientName].clientAlias = []);
        },
        lockCard(clientName: string, cardID: number) {
          if (!BankOperations[clientName]) return false;
          if (!BankOperations[clientName].clientAlias[cardID]) return false;
          return (BankOperations[clientName].clientAlias[
            cardID
          ].aliasIsBlocked =
            !BankOperations[clientName].clientAlias[cardID].aliasIsBlocked);
        },
      },
    };
    console.log(
      BankFunctions.BankAccountManagment.createAccount("user1", 1234)
    );
    console.log(
      BankFunctions.BankAliasManagment.createCard("user1", 0, "Название", 1234)
    );
    console.log(
      BankFunctions.BankMoneyManagment.addDepositMoney("user1", 0, 500)
    );
    console.log(BankFunctions.BankAccountManagment.findAccount("user1"));
    console.log(BankFunctions.BankAccountManagment.getAllAccounts());

    console.log(
      BankFunctions.BankMoneyManagment.removeDepositMoney("user1", 0, 100)
    );
    (window as any).BankFunctions = BankFunctions;
  }, []);

  return null;
}
