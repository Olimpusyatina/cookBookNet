package pro.olimpus.cookBook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import pro.olimpus.cookBook.domain.User;
import pro.olimpus.cookBook.repo.ReceiptRepo;

import java.util.HashMap;

@Controller
@RequestMapping("/")
public class MainController {
    private final ReceiptRepo receiptRepo;

    @Autowired
    public MainController(ReceiptRepo receiptRepo) {
        this.receiptRepo = receiptRepo;
    }

    @GetMapping
    public String main(Model model, @AuthenticationPrincipal User user){
        HashMap<Object, Object> data = new HashMap<>();
        data.put("profile",user);
        data.put("receipts", receiptRepo.findAll());
        model.addAttribute("frontendData", data);
        return "index";
    }
}
