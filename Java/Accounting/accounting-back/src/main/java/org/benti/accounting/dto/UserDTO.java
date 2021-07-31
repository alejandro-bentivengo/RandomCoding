package org.benti.accounting.dto;

import lombok.Builder;
import lombok.Data;
import org.benti.core.model.ownership.User;

@Data
@Builder
public class UserDTO {
    private long userId;
    private String username;
    private String email;
    private String name;
    private String phone;

    public static UserDTO fromUser(User user) {
        return UserDTO.builder()
                .userId(user.getUserPk())
                .username(user.getUser())
                .email(user.getEmail())
                .name(user.getName())
                .phone(user.getPhone())
                .build();
    }

}
