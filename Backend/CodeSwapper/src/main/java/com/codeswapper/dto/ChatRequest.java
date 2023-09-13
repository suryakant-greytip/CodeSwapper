package com.codeswapper.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatRequest {

	private String model;
	private List<Message> messages;
	private double temperature;
	
	
	public ChatRequest(String model, String prompt) {
		this.model=model;
		this.temperature=0.5;
		this.messages=new ArrayList<>();
		this.messages.add(new Message("user",prompt));
	}
	
}
