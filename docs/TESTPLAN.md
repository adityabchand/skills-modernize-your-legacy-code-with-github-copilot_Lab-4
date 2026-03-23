# Test Plan - Student Account Management System

## Overview
This test plan documents all test cases for the legacy COBOL-based Student Account Management System. The test cases cover all business logic and functionality, including normal operations, edge cases, and error scenarios. This plan serves as a baseline for validation with business stakeholders and will guide the creation of unit and integration tests during the Node.js modernization effort.

---

## Test Cases

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
|---|---|---|---|---|---|---|---|
| TC-001 | Verify application startup and menu display | Application compiled successfully | 1. Run accountsystem executable | Menu displays with options: 1. View Balance, 2. Credit Account, 3. Debit Account, 4. Exit | | | |
| TC-002 | View initial account balance | Application started, menu displayed | 1. Select option 1 (View Balance) | Display "Current balance: 001000.00" (initial balance of 1000.00) | | | |
| TC-003 | Credit account with valid amount | Application started, menu displayed, initial balance = 1000.00 | 1. Select option 2 (Credit Account)<br/>2. Enter credit amount: 500 | Display "Amount credited. New balance: 001500.00" | | | |
| TC-004 | Credit account with small amount | Application started, menu displayed, balance = 1000.00 | 1. Select option 2 (Credit Account)<br/>2. Enter credit amount: 1 | Display "Amount credited. New balance: 001001.00" | | | |
| TC-005 | Credit account with large amount | Application started, menu displayed, balance = 1000.00 | 1. Select option 2 (Credit Account)<br/>2. Enter credit amount: 100000 | Display "Amount credited. New balance: 101000.00" | | | |
| TC-006 | Verify balance persists after credit | Credit of 500 completed, balance now 1500.00 | 1. Select option 1 (View Balance) | Display "Current balance: 001500.00" | | | |
| TC-007 | Debit account with valid amount | Application started, menu displayed, balance = 1000.00 | 1. Select option 3 (Debit Account)<br/>2. Enter debit amount: 250 | Display "Amount debited. New balance: 000750.00" | | | |
| TC-008 | Debit account with small amount | Application started, menu displayed, balance = 1000.00 | 1. Select option 3 (Debit Account)<br/>2. Enter debit amount: 1 | Display "Amount debited. New balance: 000999.00" | | | |
| TC-009 | Debit account with amount equal to balance | Application started, menu displayed, balance = 1000.00 | 1. Select option 3 (Debit Account)<br/>2. Enter debit amount: 1000 | Display "Amount debited. New balance: 000000.00" | | | |
| TC-010 | Debit account with insufficient funds | Application started, menu displayed, balance = 1000.00 | 1. Select option 3 (Debit Account)<br/>2. Enter debit amount: 1500 | Display "Insufficient funds for this debit." and balance remains 001000.00 | | | |
| TC-011 | Debit account when balance is zero | Application started, balance = 0.00 | 1. Select option 3 (Debit Account)<br/>2. Enter debit amount: 1 | Display "Insufficient funds for this debit." and balance remains 000000.00 | | | |
| TC-012 | Verify balance persists after debit | Debit of 250 completed, balance now 750.00 | 1. Select option 1 (View Balance) | Display "Current balance: 000750.00" | | | |
| TC-013 | Multiple credit operations in sequence | Application started, balance = 1000.00 | 1. Select option 2 (Credit Account), enter 200<br/>2. Select option 2 (Credit Account), enter 300<br/>3. Select option 1 (View Balance) | After first credit: "New balance: 001200.00"<br/>After second credit: "New balance: 001500.00"<br/>Final view: "Current balance: 001500.00" | | | |
| TC-014 | Multiple debit operations in sequence | Application started, balance = 1000.00 | 1. Select option 3 (Debit Account), enter 200<br/>2. Select option 3 (Debit Account), enter 300<br/>3. Select option 1 (View Balance) | After first debit: "New balance: 000800.00"<br/>After second debit: "New balance: 000500.00"<br/>Final view: "Current balance: 000500.00" | | | |
| TC-015 | Mixed credit and debit operations | Application started, balance = 1000.00 | 1. Credit 300 → balance 1300.00<br/>2. Debit 200 → balance 1100.00<br/>3. Credit 100 → balance 1200.00<br/>4. View balance | After each operation, display correct balance<br/>Final view: "Current balance: 001200.00" | | | |
| TC-016 | Invalid menu choice - below range | Application started, menu displayed | 1. Enter 0 (below valid range) | Display "Invalid choice, please select 1-4." and return to menu | | | |
| TC-017 | Invalid menu choice - above range | Application started, menu displayed | 1. Enter 5 (above valid range) | Display "Invalid choice, please select 1-4." and return to menu | | | |
| TC-018 | Invalid menu choice - non-numeric | Application started, menu displayed | 1. Enter 'A' or non-numeric character | Display "Invalid choice, please select 1-4." and return to menu | | | |
| TC-019 | Exit application gracefully | Application started, menu displayed | 1. Select option 4 (Exit) | Display "Exiting the program. Goodbye!" and application terminates | | | |
| TC-020 | Verify menu loop continues after invalid input | Invalid choice entered | 1. Select option 0 (invalid)<br/>2. Display error message<br/>3. Verify menu redisplays | Error message displayed, menu redisplays for next selection | | | |
| TC-021 | Credit with amount of 0 | Application started, balance = 1000.00 | 1. Select option 2 (Credit Account)<br/>2. Enter credit amount: 0 | Balance should remain 1000.00 or reject with appropriate message | | | |
| TC-022 | Debit with amount of 0 | Application started, balance = 1000.00 | 1. Select option 3 (Debit Account)<br/>2. Enter debit amount: 0 | Balance should remain 1000.00 or deduction applied (0 has no effect) | | | |
| TC-023 | Debit almost exceeds balance | Application started, balance = 1000.00 | 1. Select option 3 (Debit Account)<br/>2. Enter debit amount: 999 | Display "Amount debited. New balance: 000001.00" | | | |
| TC-024 | Maximum balance boundary | Application started, balance = 1000.00 | 1. Credit 999999 (testing max capacity PIC 9(6)V99 = 999,999.99) | Balance updates to maximum allowed: 001000999.00 (or application handles appropriately) | | | |
| TC-025 | Credit followed by immediate view | Application started, balance = 1000.00 | 1. Select option 2 (Credit), enter 500<br/>2. Immediately select option 1 (View Balance) | Display "New balance: 001500.00" from credit, then option 1 displays "Current balance: 001500.00" | | | |
| TC-026 | Debit followed by immediate view | Application started, balance = 1000.00 | 1. Select option 3 (Debit), enter 300<br/>2. Immediately select option 1 (View Balance) | Display "New balance: 000700.00" from debit, then option 1 displays "Current balance: 000700.00" | | | |
| TC-027 | View balance multiple times without operations | Application started, balance = 1000.00 | 1. Select option 1 (View Balance)<br/>2. Select option 1 (View Balance)<br/>3. Select option 1 (View Balance) | Each time displays "Current balance: 001000.00" consistently | | | |
| TC-028 | Negative amount handling - Credit | Application started, balance = 1000.00 | 1. Select option 2 (Credit)<br/>2. Enter -500 | Application should either reject negative amount or handle accordingly (behavior to be confirmed) | | | |
| TC-029 | Negative amount handling - Debit | Application started, balance = 1000.00 | 1. Select option 3 (Debit)<br/>2. Enter -200 | Application should either reject negative amount or handle accordingly (behavior to be confirmed) | | | |
| TC-030 | Data persistence verification | Multiple operations completed: Credit 500, Debit 200, etc. | 1. Run View Balance after sequence of operations | Balance reflects all cumulative operations correctly (persistent storage) | | | |

---

## Test Execution Guidelines

### Pre-Test Setup
1. Ensure COBOL compiler (cobc) is available on the system
2. Compile the application using: `cobc -x src/cobol/main.cob src/cobol/operations.cob src/cobol/data.cob -o accountsystem`
3. Reset the application between test cases to ensure initial balance of 1000.00 (restart application or implement reset mechanism)

### Test Execution Notes
- **Initial Balance**: All test cases assume starting balance of 1000.00
- **Application State**: Each test case should start with a fresh application instance
- **Input Handling**: Verify numeric input handling and validation
- **Output Format**: Balance displays in format `###000.00` (6 digits with 2 decimal places)
- **Menu Loop**: Application should loop continuously until option 4 (Exit) is selected

### Business Logic Coverage
- ✓ Menu-driven user interface
- ✓ View balance operation
- ✓ Credit (deposit) operation with user input
- ✓ Debit (withdrawal) operation with user input
- ✓ Insufficient funds validation
- ✓ Input validation (menu choices)
- ✓ Data persistence (balance maintained across operations)
- ✓ Exit/termination functionality
- ✓ Boundary conditions and edge cases

---

## Modernization Notes for Node.js Implementation

When migrating to Node.js, the following should be considered:

1. **Input Validation**: Implement robust validation for all numeric inputs
2. **Error Handling**: Handle negative amounts and invalid inputs gracefully
3. **Data Persistence**: Current COBOL uses in-memory storage; Node.js version should use database (e.g., MongoDB, PostgreSQL)
4. **API Interface**: Consider REST API endpoints for each operation
5. **Testing Framework**: Use Jest or Mocha for unit and integration tests based on this test plan
6. **Type Safety**: Consider TypeScript for better type checking
7. **Logging**: Add comprehensive logging for audit trails
8. **Authentication**: Prepare for adding user authentication in modernized version

---

## Sign-Off

| Role | Name | Date | Signature |
|---|---|---|---|
| Test Lead | | | |
| Developer | | | |
| Business Stakeholder | | | |
| QA Manager | | | |
