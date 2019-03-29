package com.mycompany.myapp.web.rest.vm;

import java.util.List;

import com.mycompany.myapp.domain.BankAccount;
import com.mycompany.myapp.domain.Operation;

/**
 * View Model object for storing a Dashboard.
 */
public class DashboardVM {

    private List<BankAccount> bankAccounts;

    private List<Operation> operations;

    public DashboardVM(List<BankAccount> bankAccounts, List<Operation> operations) {
        this.bankAccounts = bankAccounts;
        this.operations = operations;
    }

    public DashboardVM() {
        // Empty public constructor used by Jackson.
    }

    @Override
    public String toString() {
        return "DashboardVM{" +
            "bankAccounts='" + bankAccounts + '\'' +
            ", operations='" + operations + '\'' +
            '}';
    }

    /**
     * @return the bankAccounts
     */
    public List<BankAccount> getBankAccounts() {
        return bankAccounts;
    }

    /**
     * @param bankAccounts the bankAccounts to set
     */
    public void setBankAccounts(List<BankAccount> bankAccounts) {
        this.bankAccounts = bankAccounts;
    }

    /**
     * @return the operations
     */
    public List<Operation> getOperations() {
        return operations;
    }

    /**
     * @param operations the operations to set
     */
    public void setOperations(List<Operation> operations) {
        this.operations = operations;
    }
}
