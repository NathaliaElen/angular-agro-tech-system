# 🔧 CONFIGURAÇÃO DO BACKEND JAVA - CORS E SEGURANÇA

## ⚠️ IMPORTANTE: Configuração Necessária no Backend

Para que a aplicação Angular funcione corretamente com o backend Java, é necessário configurar o CORS (Cross-Origin Resource Sharing).

---

## 📝 PASSO A PASSO

### 1. Criar Classe de Configuração CORS

Crie um arquivo `CorsConfig.java` no pacote de configuração do seu backend:

**Localização sugerida:**

```
c:\Users\n.fialho.de.araujo\eclipse-workspace\agro-tech-system\src\main\java\com\agro\tech\system\agrotech\config\CorsConfig.java
```

**Conteúdo do arquivo:**

```java
package com.agro.tech.system.agrotech.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();

        // Permite requisições do Angular (desenvolvimento)
        config.addAllowedOrigin("http://localhost:4200");

        // Permite todas as origens (use apenas em desenvolvimento)
        // config.addAllowedOriginPattern("*");

        // Métodos HTTP permitidos
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));

        // Headers permitidos
        config.setAllowedHeaders(Arrays.asList("*"));

        // Permite envio de credenciais (cookies, authorization headers)
        config.setAllowCredentials(true);

        // Tempo de cache da configuração CORS (em segundos)
        config.setMaxAge(3600L);

        // Registra a configuração para todos os endpoints
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}
```

---

### 2. Alternativa: Configuração via WebMvcConfigurer

Se preferir, pode usar esta abordagem:

```java
package com.agro.tech.system.agrotech.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

---

### 3. Configuração de Segurança (SecurityConfig)

Se você tem uma classe `SecurityConfig`, adicione/atualize:

```java
package com.agro.tech.system.agrotech.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**", "/usuarios").permitAll()
                .anyRequest().authenticated()
            );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

---

## 🔑 IMPORTANTE: Endpoint de Cadastro Público

Para permitir que novos usuários se cadastrem (primeira vez), o endpoint POST `/usuarios` deve estar público.

Verifique no `SecurityConfig`:

```java
.requestMatchers("/auth/**", "/usuarios").permitAll()
```

Ou adicione anotação no Controller:

```java
@PostMapping
@PermitAll  // ou não use @PreAuthorize
public ResponseEntity<Void> cadastrar(@RequestBody @Valid UsuarioRequestDTO usuarioDto) {
    // ...
}
```

---

## 🧪 TESTANDO A CONFIGURAÇÃO

### 1. Verifique se o Backend está Rodando

```bash
# No terminal do Eclipse/IntelliJ, deve aparecer:
Tomcat started on port(s): 8080 (http)
```

### 2. Teste o Endpoint de Saúde (Opcional)

Crie um endpoint simples para testar:

```java
@RestController
@RequestMapping("/health")
public class HealthController {

    @GetMapping
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Backend is running!");
    }
}
```

Acesse: http://localhost:8080/health

### 3. Teste CORS via cURL

```bash
curl -X OPTIONS http://localhost:8080/auth/login \
  -H "Origin: http://localhost:4200" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

Deve retornar headers:

```
Access-Control-Allow-Origin: http://localhost:4200
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
```

---

## 🚨 PROBLEMAS COMUNS E SOLUÇÕES

### Erro: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Causa**: CORS não configurado no backend

**Solução**: Implemente uma das configurações acima

---

### Erro: "401 Unauthorized" ao acessar endpoints protegidos

**Causa**: Token JWT não está sendo enviado ou é inválido

**Solução**:

1. Verifique se o login retorna o token
2. Confirme que o interceptor está adicionando o header
3. No backend, valide se o filtro JWT está processando

---

### Erro: "403 Forbidden" ao cadastrar usuário

**Causa**: Endpoint POST `/usuarios` está protegido

**Solução**: Adicione `.permitAll()` para este endpoint

---

### Erro: "Cannot read property 'token' of undefined"

**Causa**: Estrutura do LoginResponseDTO não bate com o backend

**Solução**: Verifique o DTO Java:

```java
public record LoginResponseDTO(
    String token,
    String tipo,
    String email,
    String nome
) {}
```

---

## 📋 CHECKLIST DE VERIFICAÇÃO

Antes de executar o Angular, certifique-se:

- [ ] Backend Java rodando em http://localhost:8080
- [ ] CORS configurado (uma das opções acima)
- [ ] Endpoint `/auth/login` acessível
- [ ] Endpoint POST `/usuarios` público (permitAll)
- [ ] JWT sendo gerado corretamente no login
- [ ] Sem erros no console do backend
- [ ] Teste manual de um endpoint via Postman/cURL

---

## 🎯 URLS PADRÃO

| Ambiente            | Backend               | Frontend              |
| ------------------- | --------------------- | --------------------- |
| **Desenvolvimento** | http://localhost:8080 | http://localhost:4200 |
| **Produção**        | Configurar no deploy  | Configurar no build   |

---

## 🔄 FLUXO DE AUTENTICAÇÃO

```
1. Angular envia POST /auth/login
   Body: { "email": "...", "senha": "..." }

2. Backend valida credenciais

3. Backend retorna:
   {
     "token": "eyJhbGc...",
     "tipo": "Bearer",
     "email": "...",
     "nome": "..."
   }

4. Angular armazena token no localStorage

5. Interceptor adiciona em todas as requisições:
   Authorization: Bearer eyJhbGc...

6. Backend valida token JWT em cada request
```

---

## 📝 EXEMPLO DE application.properties

Configure no backend (se necessário):

```properties
# Server
server.port=8080

# CORS (se não usar configuração Java)
# spring.web.cors.allowed-origins=http://localhost:4200
# spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS,PATCH
# spring.web.cors.allowed-headers=*
# spring.web.cors.allow-credentials=true

# JWT
jwt.secret=your-secret-key-here
jwt.expiration=86400000

# Database
spring.datasource.url=jdbc:...
spring.datasource.username=...
spring.datasource.password=...
```

---

## ✅ VALIDAÇÃO FINAL

Após configurar, teste:

```bash
# 1. Backend está rodando?
curl http://localhost:8080/health

# 2. CORS está funcionando?
curl -X OPTIONS http://localhost:8080/auth/login \
  -H "Origin: http://localhost:4200" -v

# 3. Login funciona?
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","senha":"123456"}'
```

---

## 🎉 PRONTO!

Com essas configurações, o backend Java estará totalmente compatível com a aplicação Angular 19.

**Lembre-se:**

- CORS é essencial para desenvolvimento local
- Em produção, configure apenas as origens necessárias
- Mantenha a segurança JWT ativa
- Teste cada endpoint antes de integrar com o frontend

---

**Para mais informações, consulte:**

- [Spring CORS Documentation](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-cors)
- [Spring Security Documentation](https://docs.spring.io/spring-security/reference/servlet/integrations/cors.html)
