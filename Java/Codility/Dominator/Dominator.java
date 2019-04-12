import java.util.HashMap;
import java.util.Map;

/**
 * Dominator class to solve codility problem
 *
 * @author Alejandro Bentivengo
 * @see <a href="https://app.codility.com/programmers/lessons/8-leader/dominator/">https://app.codility.com/programmers/lessons/8-leader/dominator/</a>
 */
public class Dominator {
    /**
     * Main class to display time of the algorithm as well
     */
    public static void main(String[] args) {
        long start = System.nanoTime();
        System.out.print(Dominator.solution(new int[]{1, 2, 3, 4, 5, 1, 1, 1, 1, 1, 4, 3}));
        long end = System.nanoTime();
        System.out.println("Total time: " + (double) (end - start) / (double) 1000000 + "ms");
    }

    /**
     * @param A Array of values to determine which value is the dominant in the array
     * @return dominating index
     */
    public static int solution(int[] A) {
        if (A.length != 0) {
            Map<Integer, Integer> values = new HashMap<>();
            Map<Integer, Integer> indexes = new HashMap<>();
            for (int i = 0; i < A.length; i++) {
                if (values.containsKey(A[i])) {
                    values.put(A[i], values.get(A[i]) + 1);
                } else {
                    values.put(A[i], 1);
                }
                if (!indexes.containsKey(A[i])) {
                    indexes.put(A[i], i);
                }
            }
            int index = -1;
            for (int key : values.keySet()) {
                if (values.get(key) > A.length / 2) {
                    index = indexes.get(key);
                }
            }
            return index;
        } else {
            return -1;
        }
    }
}
