package org.benti.common.message;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    public final static int TEXT = 0;
    public final static int IMAGE = 1;
    public final static int FILE = 2;

    private String auth;
    private String data;
    private String userId;
    private String roomId;
    private int type;

}
