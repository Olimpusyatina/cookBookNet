package pro.olimpus.cookBook.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pro.olimpus.cookBook.domain.Receipt;
import pro.olimpus.cookBook.domain.Views;
import pro.olimpus.cookBook.repo.ReceiptRepo;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("receipt")
public class ReceiptController {
    private final ReceiptRepo receiptRepo;

    @Autowired
    public ReceiptController(ReceiptRepo receiptRepo) {
        this.receiptRepo = receiptRepo;
    }


    @GetMapping
    public List<Receipt> list(){
        return receiptRepo.findAll();
    }
    @GetMapping("{id}")
    @JsonView(Views.IdName.class)
    public Receipt getOne(@PathVariable("id") Receipt receipt){
        return receipt;
    }

    @PostMapping
    public Receipt create(@RequestBody Receipt receipt){
        receipt.setCreationDate(LocalDateTime.now());
        return receiptRepo.save(receipt);
    }
    @PutMapping("{id}")
    public Receipt update(
            @PathVariable("id") Receipt receiptFromDb,
            @RequestBody Receipt receipt){
        BeanUtils.copyProperties(receipt, receiptFromDb, "id");
        return receiptRepo.save(receiptFromDb);
    }
    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Receipt receipt){
        receiptRepo.delete(receipt);
    }
}
