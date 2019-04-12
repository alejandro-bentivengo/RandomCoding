import java.util.concurrent.atomic.AtomicInteger;

/**
 * BinaryGap class to solve codility problem:
 * https://app.codility.com/programmers/lessons/1-iterations/binary_gap/
 *
 * @author Alejandro Bentivengo
 * @see <a href="https://app.codility.com/programmers/lessons/1-iterations/binary_gap/">https://app.codility.com/programmers/lessons/1-iterations/binary_gap/</a>
 */
public class BinaryGap {
    /**
     * Main class to display time of the algorithm as well
     */
    public static void main(String[] args) {
        long start = System.nanoTime();
        System.out.println(BinaryGap.solution(500));
        long end = System.nanoTime();
        System.out.println("Total time: " + (double) (end - start) / (double) 1000000 + "ms");
    }

    /**
     * @param N integer number to calculate gaps
     * @return largest gap
     */
    public static int solution(int N) {
        String binaryValue = Integer.toBinaryString(N);
        System.out.println(binaryValue);
        AtomicInteger counter = new AtomicInteger(0);
        AtomicInteger bestMatch = new AtomicInteger(0);
        for (byte bit : binaryValue.getBytes()) {
            if (bit == 49) {
                if (bestMatch.get() < counter.get()) {
                    bestMatch.set(counter.get());
                }
                counter.set(0);
            } else {
                counter.set(counter.get() + 1);
            }
        }
        return bestMatch.get();
    }

    /**
     * Slower solution to the same problem
     * @param N integer number to calculate gaps
     * @return largest gap
     */
    public static int solution2(int N) {
        String binaryValue = Integer.toBinaryString(N);
        System.out.println(binaryValue);
        AtomicInteger counter = new AtomicInteger(0);
        AtomicInteger bestMatch = new AtomicInteger(0);
        binaryValue.chars().forEach(value -> {
            if (value == 49) {
                if (bestMatch.get() < counter.get()) {
                    bestMatch.set(counter.get());
                }
                counter.set(0);
            } else {
                counter.set(counter.get() + 1);
            }
        });
        return bestMatch.get();
    }
}
