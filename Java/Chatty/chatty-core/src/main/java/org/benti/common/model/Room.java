package org.benti.common.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.io.Serializable;
import java.util.Set;

/**
 * @author Alejandro Bentivengo
 * @name Room
 * @date 1/29/2020
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Room extends Audit implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long roomPk;

    @OneToMany(mappedBy = "room")
    private Set<UserRoom> users;

    @OneToMany(mappedBy = "room")
    private Set<Message> messages;
}
