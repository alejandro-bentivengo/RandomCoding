import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * OddOccurrences class to solve codility problem
 *
 * @author Alejandro Bentivengo
 * @see <a href="https://app.codility.com/programmers/lessons/2-arrays/odd_occurrences_in_array/">https://app.codility.com/programmers/lessons/2-arrays/odd_occurrences_in_array/</a>
 */
public class OddOccurrences {
    /**
     * Main class to display time of the algorithm as well
     */
    public static void main(String[] args) {
        long start = System.nanoTime();
        System.out.print(OddOccurrences.solution(new int[]{9, 3, 9, 3, 9, 7, 9}));
        long end = System.nanoTime();
        System.out.println("Total time: " + (double) (end - start) / (double) 1000000 + "ms");
    }

    /**
     * @param A array with values
     * @return unpaired value (only 1 should be returned)
     */
    public static int solution(int[] A) {
        Map<Integer, Integer> values = new HashMap<>();
        for (int i = 0; i < A.length; i++) {
            if (values.containsKey(A[i])) {
                values.put(A[i], values.get(A[i]) + 1);
            } else {
                values.put(A[i], 1);
            }
        }
        AtomicInteger returnValue = new AtomicInteger(-1);
        values.entrySet().stream().forEach(value -> {
            if (value.getValue() == 1) {
                returnValue.set(value.getKey());
                return;
            }
        });
        return returnValue.get();
    }

    /**
     * @param A array with values
     * @return unpaired value (only 1 should be returned)
     */
    public static int solution2(int[] A) {
        Map<Integer, Integer> values = new HashMap<>();
        for (int i = 0; i < A.length; i++) {
            if (values.containsKey(A[i])) {
                values.put(A[i], values.get(A[i]) + 1);
            } else {
                values.put(A[i], 1);
            }
        }
        for (Map.Entry<Integer, Integer> temp : values.entrySet()) {
            if (temp.getValue() == 1) {
                return temp.getKey();
            }
        }
        return -1;
    }
}
