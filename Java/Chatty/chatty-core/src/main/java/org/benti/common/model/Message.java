package org.benti.common.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;
import java.io.Serializable;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Message extends Audit implements Serializable {

    public static final int TEXT = 0;
    public static final int IMAGE = 1;
    public static final int FILE = 2;
    public static final int AUDIO = 3;

    @Transient
    private String auth;
    private String data;
    @ManyToOne
    @JoinColumn(name = "user_pk")
    private User user;
    @ManyToOne
    @JoinColumn(name = "room_pk")
    private Room room;
    private int type;

}
