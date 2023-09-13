package com.codeswapper;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class OpenAIRestTemplateConfig {
	
	@Value("${openai.api.key}")
	private String openaiApiKey;
	
	@Bean
	@Qualifier("openaiRestTemplate")
	public RestTemplate openaiRestTemplate() {
		RestTemplate restTemp=new RestTemplate();
		restTemp.getInterceptors().add((request, body, execution)->{
			request.getHeaders().add("Authorization", "Bearer "+openaiApiKey);
			return execution.execute(request, body);
		});
		return restTemp;
	}
	
}
