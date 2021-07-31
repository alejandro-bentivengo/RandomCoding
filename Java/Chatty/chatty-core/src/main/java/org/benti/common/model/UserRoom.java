package org.benti.common.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

/**
 * @author Alejandro Bentivengo
 * @name UserRoom
 * @date 1/29/2020
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class UserRoom extends Audit implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userRoomPk;

    @ManyToOne
    @JoinColumn(name = "role_pk")
    private Role role;

    @ManyToOne
    @JoinColumn(name = "room_pk")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "user_pk")
    private User user;

}
