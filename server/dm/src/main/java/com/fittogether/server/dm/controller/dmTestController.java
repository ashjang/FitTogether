package com.fittogether.server.dm.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class dmTestController {
    @GetMapping("/dmTest")
    public String dmTest(){
        System.out.println("get mapping!");
        return "test world!!";
    }

}
