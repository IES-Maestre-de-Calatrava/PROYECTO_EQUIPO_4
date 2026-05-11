package com.grupo4.frances.Controllers;

import com.grupo4.frances.Services.ChatService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("ai/")
public class AIController {
    private final ChatService chatService;

    public AIController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/ask")
    public String ask(@RequestParam String prompt){
        return chatService.askClaude(prompt);
    }
}
