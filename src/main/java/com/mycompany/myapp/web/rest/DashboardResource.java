package com.mycompany.myapp.web.rest;


import com.mycompany.myapp.domain.PersistentToken;
import com.mycompany.myapp.repository.BankAccountRepository;
import com.mycompany.myapp.repository.OperationRepository;
import com.mycompany.myapp.repository.PersistentTokenRepository;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.service.MailService;
import com.mycompany.myapp.service.UserService;
import com.mycompany.myapp.service.dto.PasswordChangeDTO;
import com.mycompany.myapp.service.dto.UserDTO;
import com.mycompany.myapp.web.rest.errors.*;
import com.mycompany.myapp.web.rest.vm.DashboardVM;
import com.mycompany.myapp.web.rest.vm.KeyAndPasswordVM;
import com.mycompany.myapp.web.rest.vm.ManagedUserVM;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.*;

/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/api")
public class DashboardResource {

    private final Logger log = LoggerFactory.getLogger(DashboardResource.class);

    private final BankAccountRepository bankAccountRepository;

    private final OperationRepository operationRepository;

    public DashboardResource(BankAccountRepository bankAccountRepository, OperationRepository operationRepository) {
        this.bankAccountRepository = bankAccountRepository;
        this.operationRepository = operationRepository;
    }

    /**
     * GET  /dashboard : get the current user's dashboard.
     *
     * @return the current user's dashboard
     * @throws RuntimeException 500 (Internal Server Error) if the user couldn't be returned
     */
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardVM> getDashboard() {
        DashboardVM dashboardVM = new DashboardVM();
        dashboardVM.setBankAccounts(bankAccountRepository.findByUserIsCurrentUser());
        dashboardVM.setOperations(operationRepository.findByBankAccountIn(dashboardVM.getBankAccounts()));
        return ResponseEntity.ok(dashboardVM);
    }
}
