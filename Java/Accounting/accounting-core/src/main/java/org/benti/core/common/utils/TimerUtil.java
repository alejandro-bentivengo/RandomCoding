package org.benti.core.common.utils;

public class TimerUtil {

    private long start;
    private long end;
    private TimerType timerType;

    public TimerUtil(TimerType timerType) {
        this.timerType = timerType;
    }

    public TimerUtil startTimer() {
        start = timerType.parse(System.nanoTime());
        return this;
    }

    public long stopTimer() {
        return ((end = timerType.parse(System.nanoTime())) - start);
    }

    public long getStart() {
        return start;
    }

    public long getEnd() {
        return end;
    }

}
