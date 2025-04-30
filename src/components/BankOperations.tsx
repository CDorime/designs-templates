import { useEffect } from "react";

interface BankTransactionsInterface {
  transaction_id: string;
  transaction_sender: string;
  transaction_amount: number;
  transaction_date: string;
  transaction_from: string;
  transaction_to: string;
}

interface BankAliasInterface {
  alias_id: number;
  alias_name: string;
  alias_pin: number;
  alias_balance: number;
  alias_is_blocked: boolean;
  alias_transitions: BankTransactionsInterface[];
}

interface BankInfoInterface {
  [x: string]: any;
  client_id: string;
  client_name: string;
  client_password: number;
  client_alias: BankAliasInterface[];
}

let initExecuted = false;

export function BankOperations() {
  useEffect(() => {
    if (initExecuted) return;
    initExecuted = true;

    const BankOperations: { [key: string]: BankInfoInterface } = {};

    const BankFunctions = {
      BankAccountManagment: {
        createAccount(name: string, password: number) {
          const bank_client_id = "client." + Date.now();
          if (password.toString().length !== 4) return false;
          if (BankOperations[name]) return false;

          return (BankOperations[name] = {
            client_id: bank_client_id,
            client_name: name,
            client_password: password,
            client_alias: [],
          });
        },
        deleteAccount(name: string) {
          if (!BankOperations[name]) return false;
          return delete BankOperations[name];
        },
        findAccount(name: string) {
          return BankOperations[name] || null;
        },
        getAllAccounts() {
          return Object.values(BankOperations);
        },
      },

      BankMoneyManagment: {
        addDepositMoney(name: string, card_id: number, amount: number) {
          if (!BankOperations[name]) return false;
          if (!BankOperations[name].client_alias[card_id]) return false;
          return (BankOperations[name].client_alias[card_id].alias_balance +=
            amount);
        },
        removeDepositMoney(name: string, card_id: number, amount: number) {
          if (!BankOperations[name]) return false;
          if (!BankOperations[name].client_alias[card_id]) return false;
          return (BankOperations[name].client_alias[card_id].alias_balance -=
            amount);
        },
        sendTransferMoney(
          fromCard: number,
          toCard: number,
          fromName: string,
          toName: string,
          amount: number
        ) {
          const transferID = "transfer." + Date.now();
          const transferDate = new Date().toString();

          if (!BankOperations[fromName] || !BankOperations[toName])
            return false;
          if (
            BankOperations[fromName].client_alias[fromCard].alias_balance <
            amount
          )
            return false;
          if (
            BankOperations[fromName].client_transferblock ||
            BankOperations[toName].client_transferblock
          )
            return false;
          if (
            !BankOperations[fromName].client_alias[fromCard] ||
            !BankOperations[toName].client_alias[toCard]
          )
            return false;

          const transaction: BankTransactionsInterface = {
            transaction_id: transferID,
            transaction_sender: BankOperations[fromName].client_name,
            transaction_amount: amount,
            transaction_date: transferDate,
            transaction_from: BankOperations[fromName].client_id,
            transaction_to: BankOperations[toName].client_id,
          };

          BankOperations[fromName].client_alias[
            fromCard
          ].alias_transitions.push(transaction);
          BankOperations[toName].client_alias[toCard].alias_transitions.push(
            transaction
          );

          BankFunctions.BankMoneyManagment.addDepositMoney(toName, 0, amount);
          BankFunctions.BankMoneyManagment.removeDepositMoney(
            fromName,
            0,
            amount
          );

          return true;
        },
      },

      BankSecurityManagment: {
        setNewPin(name: string, card_id: number, newPin: number) {
          if (!BankOperations[name]) return false;
          if (newPin.toString().length !== 4) return false;
          if (!BankOperations[name].client_alias[card_id]) return false;
          return (BankOperations[name].client_alias[card_id].alias_pin =
            newPin);
        },
        verifyPin(name: string, verifyPin: number) {
          if (!BankOperations[name]) return false;
          return BankOperations[name].client_cards.some(
            (card: { alias_pin: number }) => card.alias_pin === verifyPin
          );
        },
      },
      BankAliasManagment: {
        createCard(
          name: string,
          card_id: number,
          card_name: string,
          pin: number
        ) {
          if (!BankOperations[name]) return false;
          if (BankOperations[name].client_alias[card_id]) return false;
          if (pin.toString().length !== 4) return false;
          if (Object.keys(BankOperations[name].client_alias).length >= 5)
            return false;
          return (BankOperations[name].client_alias[card_id] = {
            alias_id: card_id,
            alias_name: card_name,
            alias_pin: pin,
            alias_balance: 0,
            alias_is_blocked: false,
            alias_transitions: [],
          });
        },
        deleteCard(name: string, card_id: number) {
          if (!BankOperations[name]) return false;
          if (!BankOperations[name].client_alias[card_id]) return false;
          if (!BankOperations[name].client_alias[card_id]) return false;
          return delete BankOperations[name].client_alias[card_id];
        },
        getCardByID(name: string, card_id: number) {
          if (!BankOperations[name]) return false;
          if (!BankOperations[name].client_alias[card_id]) return false;
          return BankOperations[name].client_alias[card_id];
        },
        getCardByName(name: string, card_name: string) {
          if (!BankOperations[name]) return false;
          if (!BankOperations[name].client_alias) return false;
          return BankOperations[name].client_alias.find(
            (alias) => alias.alias_name === card_name
          );
        },
        renameCard(name: string, card_id: number, newCardName: string) {
          if (!BankOperations[name]) return false;
          if (!BankOperations[name].client_alias[card_id]) return false;
          return (BankOperations[name].client_alias[card_id].alias_name =
            newCardName);
        },
        getAllCards(name: string) {
          if (!BankOperations[name]) return false;
          if (!BankOperations[name].client_alias) return false;
          return Object.values(BankOperations[name].client_alias);
        },
        getCardHistory(name: string, card_id: number) {
          if (!BankOperations[name]) return false;
          if (!BankOperations[name].client_alias[card_id]) return false;
          return Object.values(
            BankOperations[name].client_alias[card_id].alias_transitions
          );
        },
        deleteAllCard(name: string) {
          if (!BankOperations[name]) return false;
          if (!BankOperations[name].client_alias) return false;
          return (BankOperations[name].client_alias = []);
        },
        lockCard(name: string, card_id: number) {
          if (!BankOperations[name]) return false;
          if (!BankOperations[name].client_alias[card_id]) return false;
          return (BankOperations[name].client_alias[card_id].alias_is_blocked =
            !BankOperations[name].client_alias[card_id].alias_is_blocked);
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
