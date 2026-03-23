#!/usr/bin/env node

/**
 * Student Account Management System
 * Modernized from legacy COBOL to Node.js
 * 
 * This application preserves the original business logic, data integrity,
 * and menu options from the three-part COBOL system:
 * - DataProgram: Data Storage Layer
 * - Operations: Business Logic Layer
 * - MainProgram: User Interface Layer
 */

const prompt = require('prompt-sync')();

// ============================================================================
// DATA STORAGE LAYER (Equivalent to DataProgram.cob)
// ============================================================================

class DataStorage {
  constructor() {
    // STORAGE-BALANCE: PIC 9(6)V99 VALUE 1000.00
    this.storageBalance = 1000.00;
  }

  /**
   * READ operation: Retrieves current balance from storage
   * @returns {number} Current balance
   */
  read() {
    return this.storageBalance;
  }

  /**
   * WRITE operation: Persists updated balance to storage
   * @param {number} balance - New balance to store
   */
  write(balance) {
    this.storageBalance = balance;
  }

  /**
   * Format balance for display (equivalent to COBOL PIC 9(6)V99)
   * @param {number} balance - Balance to format
   * @returns {string} Formatted balance string
   */
  formatBalance(balance) {
    return String(balance.toFixed(2)).padStart(9, '0');
  }
}

// ============================================================================
// BUSINESS LOGIC LAYER (Equivalent to Operations.cob)
// ============================================================================

class Operations {
  constructor(dataStorage) {
    this.dataStorage = dataStorage;
  }

  /**
   * TOTAL operation: View current account balance
   * Equivalent to COBOL 'TOTAL ' operation
   */
  viewBalance() {
    const balance = this.dataStorage.read();
    const formattedBalance = this.dataStorage.formatBalance(balance);
    console.log(`Current balance: ${formattedBalance}`);
  }

  /**
   * CREDIT operation: Add funds to account
   * Equivalent to COBOL 'CREDIT' operation
   * 
   * Process:
   * 1. Prompt user for credit amount
   * 2. Read current balance
   * 3. Add credit amount to balance
   * 4. Write new balance to storage
   * 5. Display confirmation with new balance
   */
  creditAccount() {
    console.log('Enter credit amount: ');
    const amount = parseFloat(prompt());

    // Validate input
    if (isNaN(amount) || amount < 0) {
      console.log('Invalid amount. Please enter a positive number.');
      return;
    }

    // READ: Get current balance
    let finalBalance = this.dataStorage.read();

    // ADD: Add credit amount to balance
    finalBalance += amount;

    // WRITE: Update storage with new balance
    this.dataStorage.write(finalBalance);

    // DISPLAY: Show confirmation with formatted balance
    const formattedBalance = this.dataStorage.formatBalance(finalBalance);
    console.log(`Amount credited. New balance: ${formattedBalance}`);
  }

  /**
   * DEBIT operation: Withdraw funds from account
   * Equivalent to COBOL 'DEBIT ' operation
   * 
   * Process:
   * 1. Prompt user for debit amount
   * 2. Read current balance
   * 3. Check if balance >= debit amount (VALIDATION)
   * 4. If sufficient funds:
   *    - Subtract amount from balance
   *    - Write new balance to storage
   *    - Display confirmation with new balance
   * 5. If insufficient funds:
   *    - Display error message
   *    - Do not modify balance
   */
  debitAccount() {
    console.log('Enter debit amount: ');
    const amount = parseFloat(prompt());

    // Validate input
    if (isNaN(amount) || amount < 0) {
      console.log('Invalid amount. Please enter a positive number.');
      return;
    }

    // READ: Get current balance
    let finalBalance = this.dataStorage.read();

    // VALIDATION: Check sufficient funds
    if (finalBalance >= amount) {
      // SUBTRACT: Deduct amount from balance
      finalBalance -= amount;

      // WRITE: Update storage with new balance
      this.dataStorage.write(finalBalance);

      // DISPLAY: Show confirmation with formatted balance
      const formattedBalance = this.dataStorage.formatBalance(finalBalance);
      console.log(`Amount debited. New balance: ${formattedBalance}`);
    } else {
      // INSUFFICIENT FUNDS: Display error message, do not modify balance
      console.log('Insufficient funds for this debit.');
    }
  }

  /**
   * Route operation based on operation type
   * @param {string} operationType - Operation type ('TOTAL ', 'CREDIT', 'DEBIT ')
   */
  execute(operationType) {
    const trimmedOp = operationType.trim();

    if (trimmedOp === 'TOTAL') {
      this.viewBalance();
    } else if (trimmedOp === 'CREDIT') {
      this.creditAccount();
    } else if (trimmedOp === 'DEBIT') {
      this.debitAccount();
    }
  }
}

// ============================================================================
// USER INTERFACE LAYER (Equivalent to MainProgram.cob)
// ============================================================================

class MainProgram {
  constructor(operations) {
    this.operations = operations;
    this.continueFlag = true;
  }

  /**
   * Display menu options
   * Equivalent to COBOL DISPLAY statements
   */
  displayMenu() {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');
  }

  /**
   * Prompt user for menu choice
   * Equivalent to COBOL ACCEPT USER-CHOICE
   */
  getUserChoice() {
    const input = prompt('Enter your choice (1-4): ');
    return parseInt(input, 10);
  }

  /**
   * Process user menu selection
   * Equivalent to COBOL EVALUATE USER-CHOICE
   * @param {number} userChoice - User's menu selection
   */
  handleMenuChoice(userChoice) {
    switch (userChoice) {
      case 1:
        // CALL 'Operations' USING 'TOTAL '
        this.operations.execute('TOTAL ');
        break;
      case 2:
        // CALL 'Operations' USING 'CREDIT'
        this.operations.execute('CREDIT');
        break;
      case 3:
        // CALL 'Operations' USING 'DEBIT '
        this.operations.execute('DEBIT ');
        break;
      case 4:
        // MOVE 'NO' TO CONTINUE-FLAG
        this.continueFlag = false;
        break;
      default:
        // WHEN OTHER: Invalid choice
        console.log('Invalid choice, please select 1-4.');
        break;
    }
  }

  /**
   * Main application loop
   * Equivalent to COBOL PERFORM UNTIL CONTINUE-FLAG = 'NO'
   */
  run() {
    // PERFORM UNTIL CONTINUE-FLAG = 'NO'
    while (this.continueFlag) {
      this.displayMenu();
      const userChoice = this.getUserChoice();
      this.handleMenuChoice(userChoice);
    }

    // DISPLAY "Exiting the program. Goodbye!"
    console.log('Exiting the program. Goodbye!');
    // STOP RUN
    process.exit(0);
  }
}

// ============================================================================
// APPLICATION INITIALIZATION
// ============================================================================

/**
 * Initialize and run the application
 * 
 * Architecture Overview:
 * 1. DataStorage - Data persistence layer (replaces DataProgram.cob)
 * 2. Operations - Business logic layer (replaces Operations.cob)
 * 3. MainProgram - User interface layer (replaces MainProgram.cob)
 */
function main() {
  const dataStorage = new DataStorage();
  const operations = new Operations(dataStorage);
  const mainProgram = new MainProgram(operations);

  mainProgram.run();
}

// Export classes for testing
module.exports = {
  DataStorage,
  Operations,
  MainProgram,
  main
};

// Start the application only if this is the main module
if (require.main === module) {
  main();
}

