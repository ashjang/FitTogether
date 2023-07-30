package com.fittogether.server.dm.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/dm/test")
    public String test(){
        return "test dm";
    }

}
