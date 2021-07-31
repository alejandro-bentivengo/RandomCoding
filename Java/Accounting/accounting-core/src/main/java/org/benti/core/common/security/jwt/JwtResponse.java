package org.benti.core.common.security.jwt;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    private String issuer;
    private String token;
    private LocalDateTime issueTime;
}
