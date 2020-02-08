package org.benti.core.common.utils;

public enum TimerType {

    M(-9),
    S(-6),
    MS(-3),
    NM(0);
    private long pow;

    TimerType(long pow) {
        this.pow = pow;
    }

    public long parse(long nanoTime) {
        if (this.pow == 0) {
            return nanoTime;
        } else {
            return (long) (nanoTime * Math.pow(10, this.pow));
        }
    }

}
