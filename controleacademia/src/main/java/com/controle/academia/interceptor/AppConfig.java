package com.controle.academia.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableCaching
public class AppConfig extends CachingConfigurerSupport implements WebMvcConfigurer {

	@Autowired
	CustomInterceptor customInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(customInterceptor)
        	.addPathPatterns("/usuario/autorizar")
        	.addPathPatterns("/cliente")
        	.addPathPatterns("/cliente/*")
        	.addPathPatterns("/instrutor")
        	.addPathPatterns("/instrutor/*");
    }

}
