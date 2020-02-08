package org.benti.core.model;

import javax.persistence.Column;
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

    @Column(name = "created_date", nullable = false)
    private LocalDateTime createDate;
    @Column(name = "update_date", nullable = false)
    private LocalDateTime updateDate;
    @Column(nullable = false)
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
