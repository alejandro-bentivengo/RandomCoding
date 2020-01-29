package org.benti.common.model;

import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.time.LocalDateTime;

/**
 * @author Alejandro Bentivengo
 * @name Audit
 * @date 1/29/2020
 */
@MappedSuperclass
public abstract class Audit {

    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private long version;


    @PrePersist
    private void onCreate() {
        createDate = LocalDateTime.now();
        updateDate = LocalDateTime.now();
        version = 0L;
    }

    @PreUpdate
    private void onUpdate() {
        version = version + 1;
        updateDate = LocalDateTime.now();
    }

}
